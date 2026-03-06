"use client";

import { useRef, useState } from "react";

import { buildMailtoLink, portfolioSite } from "@/lib/portfolio";

import { Button, Icon, TOKENS, cx } from "./portfolio-ui";

const FORM_STATUS = {
  idle: "idle",
  loading: "loading",
  success: "success",
  error: "error",
};

const defaultMailto = buildMailtoLink({
  subject: `Portfolio inquiry: ${portfolioSite.name}`,
  body:
    "Hey John,\n\nI saw your portfolio and would like to connect about...\n\n- Context\n- Timeline\n- Best way to reach me\n\nThanks,\n",
});

export function ContactForm() {
  const formRef = useRef(null);
  const [status, setStatus] = useState(FORM_STATUS.idle);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const isLoading = status === FORM_STATUS.loading;

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      company: String(formData.get("company") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      website: String(formData.get("website") || "").trim(),
    };

    setStatus(FORM_STATUS.loading);
    setFeedbackMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong while sending your note.");
      }

      formRef.current?.reset();
      setStatus(FORM_STATUS.success);
      setFeedbackMessage(result.message || "Thanks. Your note is on its way.");
    } catch (error) {
      setStatus(FORM_STATUS.error);
      setFeedbackMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while sending your note."
      );
    }
  }

  return (
    <>
      <div className="text-base font-bold text-white">Message</div>
      <p className={cx(TOKENS.muted, "mt-2")}>
        Send a note directly from the site or use email if you prefer.
      </p>

      <form ref={formRef} className="mt-5 grid gap-3" onSubmit={handleSubmit}>
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            required
            name="name"
            autoComplete="name"
            placeholder="Your name"
            className="h-11 w-full rounded-xl border border-white/10 bg-black/40 px-4 text-sm text-white placeholder:text-white/40 outline-none focus:border-sky-400/70"
          />
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Your email"
            className="h-11 w-full rounded-xl border border-white/10 bg-black/40 px-4 text-sm text-white placeholder:text-white/40 outline-none focus:border-sky-400/70"
          />
        </div>

        <input
          name="company"
          autoComplete="organization"
          placeholder="Company (optional)"
          className="h-11 w-full rounded-xl border border-white/10 bg-black/40 px-4 text-sm text-white placeholder:text-white/40 outline-none focus:border-sky-400/70"
        />

        <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden opacity-0">
          <label htmlFor="website">Leave this blank</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <textarea
          required
          name="message"
          placeholder="What are you trying to build or fix?"
          rows={5}
          className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm leading-6 text-white placeholder:text-white/40 outline-none focus:border-sky-400/70"
        />

        <div className="mt-1 flex flex-wrap items-center gap-3">
          <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
            {isLoading ? "Sending..." : "Send note"} <Icon name="arrow" className="h-4 w-4" />
          </Button>
          <Button href={defaultMailto} variant="tertiary" className="w-full sm:w-auto">
            Use email instead
          </Button>
        </div>

        <div aria-live="polite" className="min-h-6">
          {feedbackMessage ? (
            <p
              className={cx(
                "text-sm leading-6",
                status === FORM_STATUS.success ? "text-sky-200/92" : "text-orange-200"
              )}
            >
              {feedbackMessage}
            </p>
          ) : null}
        </div>
      </form>
    </>
  );
}
