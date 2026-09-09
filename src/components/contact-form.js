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

const fieldClassName =
  "h-12 w-full rounded-xl border border-white/15 bg-black/40 px-4 text-sm text-white placeholder:text-white/45 outline-none transition focus:border-sky-300 focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-70";

const labelClassName = "text-sm font-semibold text-white";
const helperClassName = "text-xs leading-5 text-white/70";

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
      <h3 className="text-base font-bold text-white">Message</h3>
      <p className={cx(TOKENS.muted, "mt-2")}>
        For job opportunities and project inquiries.
      </p>

      <form
        ref={formRef}
        className="mt-5 grid gap-3.5 sm:mt-6 sm:gap-4"
        onSubmit={handleSubmit}
        aria-busy={isLoading}
      >
        <div className="grid gap-3.5 sm:grid-cols-2 sm:gap-4">
          <div className="grid gap-1.5">
            <label htmlFor="contact-name" className={labelClassName}>
              Name (required)
            </label>
            <input
              id="contact-name"
              required
              name="name"
              autoComplete="name"
              placeholder="Your name"
              aria-describedby="contact-name-help contact-form-status"
              className={fieldClassName}
            />
            <p id="contact-name-help" className={helperClassName}>
              Preferred reply name.
            </p>
          </div>

          <div className="grid gap-1.5">
            <label htmlFor="contact-email" className={labelClassName}>
              Email (required)
            </label>
            <input
              id="contact-email"
              required
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@example.com"
              aria-describedby="contact-email-help contact-form-status"
              className={fieldClassName}
            />
            <p id="contact-email-help" className={helperClassName}>
              Used only for follow-up.
            </p>
          </div>
        </div>

        <div className="grid gap-1.5">
          <label htmlFor="contact-company" className={labelClassName}>
            Company
          </label>
          <input
            id="contact-company"
            name="company"
            autoComplete="organization"
            placeholder="Company or team, if relevant"
            aria-describedby="contact-company-help contact-form-status"
            className={fieldClassName}
          />
          <p id="contact-company-help" className={helperClassName}>
            Optional context for team or project scope.
          </p>
        </div>

        <div aria-hidden="true" className="hidden">
          <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="grid gap-1.5">
          <label htmlFor="contact-message" className={labelClassName}>
            Message (required)
          </label>
          <textarea
            id="contact-message"
            required
            name="message"
            placeholder="What are you trying to build or fix?"
            rows={5}
            aria-describedby="contact-message-help contact-form-status"
            className={cx(
              fieldClassName,
              "min-h-[140px] py-3 leading-6 sm:min-h-[152px]"
            )}
          />
          <p id="contact-message-help" className={helperClassName}>
            Tell me about the role or project and your timeline.
          </p>
        </div>

        <div className="mt-0.5 flex flex-col gap-2.5 sm:mt-1 sm:flex-row sm:items-center sm:gap-3">
          <Button type="submit" disabled={isLoading} className="w-full sm:min-w-[144px] sm:w-auto">
            {isLoading ? "Sending note" : "Send note"} <Icon name="arrow" className="h-4 w-4" />
          </Button>
          <Button
            href={defaultMailto}
            variant="secondary"
            className="w-full sm:min-w-[144px] sm:w-auto"
          >
            Email directly
          </Button>
        </div>

        <div
          id="contact-form-status"
          aria-live={status === FORM_STATUS.error ? "assertive" : "polite"}
          className="min-h-5 sm:min-h-6"
        >
          {feedbackMessage ? (
            <p
              role={status === FORM_STATUS.error ? "alert" : "status"}
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
