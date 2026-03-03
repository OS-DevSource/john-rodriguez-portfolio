"use client";

import { type ComponentType, useEffect, useMemo, useState } from "react";
import { Command as CommandIcon, Copy, ExternalLink, Github, Linkedin, Send } from "lucide-react";

import type { ControlRoomSection } from "@/lib/sections";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

type CommandPaletteProps = {
  sections: ControlRoomSection[];
  email: string;
  github: string;
  linkedin: string;
  onNavigate: (id: ControlRoomSection["id"]) => void;
};

type CommandAction = {
  id: string;
  label: string;
  group: "Navigate" | "External" | "Actions";
  keywords?: string[];
  icon?: ComponentType<{ className?: string }>;
  shortcut?: string;
  run: () => void;
};

export function CommandPalette({ sections, email, github, linkedin, onNavigate }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== "k") return;
      if (!event.metaKey && !event.ctrlKey) return;
      event.preventDefault();
      setOpen((prev) => !prev);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const actions = useMemo<CommandAction[]>(() => {
    const navigateActions = sections.map((section) => ({
      id: `jump-${section.id}`,
      label: section.commandLabel,
      group: "Navigate" as const,
      keywords: [section.id, section.label.toLowerCase(), "section", "module"],
      icon: CommandIcon,
      run: () => {
        onNavigate(section.id);
        setOpen(false);
      },
    }));

    const externalActions: CommandAction[] = [
      {
        id: "open-github",
        label: "Open GitHub",
        group: "External",
        icon: Github,
        keywords: ["source", "repo"],
        run: () => {
          window.open(github, "_blank", "noopener,noreferrer");
          setOpen(false);
        },
      },
      {
        id: "open-linkedin",
        label: "Open LinkedIn",
        group: "External",
        icon: Linkedin,
        keywords: ["profile", "network"],
        run: () => {
          window.open(linkedin, "_blank", "noopener,noreferrer");
          setOpen(false);
        },
      },
    ];

    const utilityActions: CommandAction[] = [
      {
        id: "copy-email",
        label: "Copy email",
        group: "Actions",
        icon: Copy,
        shortcut: "C",
        keywords: ["contact", "mail", email],
        run: async () => {
          try {
            await navigator.clipboard.writeText(email);
          } catch {
            window.location.href = `mailto:${email}`;
          }
          setOpen(false);
        },
      },
      {
        id: "send-email",
        label: "Start email",
        group: "Actions",
        icon: Send,
        shortcut: "E",
        keywords: ["contact", "mail"],
        run: () => {
          window.location.href = `mailto:${email}`;
          setOpen(false);
        },
      },
    ];

    return [...navigateActions, ...externalActions, ...utilityActions];
  }, [email, github, linkedin, onNavigate, sections]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex h-10 items-center gap-2 rounded-lg border border-white/20 bg-white/[0.04] px-3 text-xs font-semibold text-white/85",
          "transition hover:border-cyan-300/65 hover:text-white"
        )}
        aria-label="Open command palette"
      >
        <CommandIcon className="h-4 w-4" />
        Command
        <span className="rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white/60">Cmd/Ctrl+K</span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-hidden border-cyan-200/20 p-0">
          <DialogTitle className="sr-only">Command palette</DialogTitle>
          <DialogDescription className="sr-only">
            Search and run navigation, profile, and contact commands.
          </DialogDescription>
          <Command>
            <CommandInput placeholder="Type a command or search modules..." />
            <CommandList>
              <CommandEmpty>No matching command.</CommandEmpty>

              <CommandGroup heading="Navigate">
                {actions
                  .filter((action) => action.group === "Navigate")
                  .map((action) => {
                    const Icon = action.icon;
                    return (
                      <CommandItem
                        key={action.id}
                        onSelect={action.run}
                        keywords={action.keywords}
                        value={action.label}
                      >
                        {Icon ? <Icon className="mr-2 h-4 w-4 text-cyan-200/85" /> : null}
                        <span>{action.label}</span>
                        <CommandShortcut>GO</CommandShortcut>
                      </CommandItem>
                    );
                  })}
              </CommandGroup>

              <CommandSeparator />

              <CommandGroup heading="External">
                {actions
                  .filter((action) => action.group === "External")
                  .map((action) => {
                    const Icon = action.icon;
                    return (
                      <CommandItem
                        key={action.id}
                        onSelect={action.run}
                        keywords={action.keywords}
                        value={action.label}
                      >
                        {Icon ? <Icon className="mr-2 h-4 w-4 text-cyan-200/85" /> : null}
                        <span>{action.label}</span>
                        <ExternalLink className="ml-auto h-3.5 w-3.5 text-white/50" />
                      </CommandItem>
                    );
                  })}
              </CommandGroup>

              <CommandSeparator />

              <CommandGroup heading="Actions">
                {actions
                  .filter((action) => action.group === "Actions")
                  .map((action) => {
                    const Icon = action.icon;
                    return (
                      <CommandItem
                        key={action.id}
                        onSelect={action.run}
                        keywords={action.keywords}
                        value={action.label}
                      >
                        {Icon ? <Icon className="mr-2 h-4 w-4 text-cyan-200/85" /> : null}
                        <span>{action.label}</span>
                        {action.shortcut ? <CommandShortcut>{action.shortcut}</CommandShortcut> : null}
                      </CommandItem>
                    );
                  })}
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}
