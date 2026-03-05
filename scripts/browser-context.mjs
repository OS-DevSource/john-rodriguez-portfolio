#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import process from "node:process";

const TARGETS = new Set(["local", "production", "compare"]);
const target = (process.argv[2] ?? "local").toLowerCase();

const LOCAL_URL = "http://localhost:3000";
const PRODUCTION_URL = "https://john-rodriguez-portfolio.vercel.app";

if (!TARGETS.has(target)) {
  console.error("Usage: node scripts/browser-context.mjs [local|production|compare]");
  process.exit(1);
}

function runGit(args) {
  try {
    return execFileSync("git", args, {
      cwd: process.cwd(),
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
  } catch {
    return null;
  }
}

function hasGitRef(ref) {
  try {
    execFileSync("git", ["rev-parse", "--verify", ref], {
      cwd: process.cwd(),
      stdio: "ignore",
    });
    return true;
  } catch {
    return false;
  }
}

function parseDivergence(spec) {
  const counts = runGit(["rev-list", "--left-right", "--count", spec]);

  if (!counts) return null;

  const [left = "0", right = "0"] = counts.split(/\s+/);

  return {
    left: Number.parseInt(left, 10) || 0,
    right: Number.parseInt(right, 10) || 0,
  };
}

function printSection(title) {
  console.log(title);
}

function printLine(label, value) {
  console.log(`${label}: ${value}`);
}

function printTargetSummary(currentTarget) {
  printSection("Browser target");

  if (currentTarget === "local") {
    printLine("Mode", "local");
    printLine("Use when", "debugging in-progress work or unshipped changes");
    printLine("Open in browser", LOCAL_URL);
    return;
  }

  if (currentTarget === "production") {
    printLine("Mode", "production");
    printLine("Use when", "validating what users see live");
    printLine("Open in browser", PRODUCTION_URL);
    return;
  }

  printLine("Mode", "compare");
  printLine("Use when", "Playwright and live behavior seem to disagree");
  printLine("Local browser", LOCAL_URL);
  printLine("Production browser", PRODUCTION_URL);
}

function printGitContext() {
  const branch = runGit(["branch", "--show-current"]) || "detached-head";
  const headShort = runGit(["rev-parse", "--short", "HEAD"]) || "unknown";
  const headFull = runGit(["rev-parse", "HEAD"]) || "unknown";
  const hasOriginMain = hasGitRef("origin/main");
  const hasLocalMain = hasGitRef("main");

  printSection("\nGit context");
  printLine("Branch", branch);
  printLine("HEAD", `${headShort} (${headFull})`);

  if (!hasOriginMain) {
    printLine("origin/main", "missing");
    console.log("Warning: cannot calculate drift without origin/main.");
    return;
  }

  const branchSpec = `${headFull}...origin/main`;
  const branchDivergence = parseDivergence(branchSpec);

  if (branchDivergence) {
    printLine(
      "Current vs origin/main",
      `${branchDivergence.left} ahead, ${branchDivergence.right} behind`
    );
  }

  if (hasLocalMain) {
    const mainSha = runGit(["rev-parse", "main"]);
    const originMainSha = runGit(["rev-parse", "origin/main"]);
    const mainShort = runGit(["rev-parse", "--short", "main"]) || "unknown";
    const originMainShort = runGit(["rev-parse", "--short", "origin/main"]) || "unknown";
    const mainDivergence = parseDivergence("main...origin/main");
    const mergeBase = runGit(["merge-base", "HEAD", "origin/main"]);
    const basedOnStaleMain =
      Boolean(mainSha) &&
      Boolean(originMainSha) &&
      mainSha !== originMainSha &&
      mergeBase === mainSha;

    printLine("Local main", `${mainShort} (${mainSha})`);
    printLine("origin/main", `${originMainShort} (${originMainSha})`);

    if (mainDivergence) {
      printLine("main vs origin/main", `${mainDivergence.left} ahead, ${mainDivergence.right} behind`);
    }

    if (basedOnStaleMain) {
      console.log(
        `Warning: this branch still roots at stale local main ${mainShort}. ` +
          `localhost may look older than production until main is fast-forwarded or the branch is rebased/merged.`
      );
    } else if (branchDivergence && branchDivergence.right > 0) {
      console.log("Warning: this branch is behind origin/main, so localhost may not match production.");
    }
  } else if (branchDivergence && branchDivergence.right > 0) {
    console.log("Warning: this branch is behind origin/main, so localhost may not match production.");
  }
}

function printNextSteps(currentTarget) {
  printSection("\nSuggested flow");

  if (currentTarget === "local") {
    console.log("1. Run `pnpm dev` if the local server is not already running.");
    console.log(`2. Open ${LOCAL_URL} in Playwright for visual debugging.`);
    console.log("3. Treat the drift warning above as context, not a blocker.");
    return;
  }

  if (currentTarget === "production") {
    console.log(`1. Open ${PRODUCTION_URL} in Playwright for live-site validation.`);
    console.log("2. If the result seems wrong, run this command again with `compare`.");
    return;
  }

  console.log("1. Run `pnpm dev` if the local server is not already running.");
  console.log(`2. Open ${LOCAL_URL} and ${PRODUCTION_URL} in separate Playwright tabs.`);
  console.log("3. Compare the same element or flow before concluding the deploy is wrong.");
}

printTargetSummary(target);
printGitContext();
printNextSteps(target);
