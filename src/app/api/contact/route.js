import { portfolioSite } from "@/lib/portfolio";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MESSAGE_LIMIT = 4000;
const NAME_LIMIT = 120;
const COMPANY_LIMIT = 160;

function normalizeValue(value, maxLength) {
  return String(value || "")
    .trim()
    .slice(0, maxLength);
}

function jsonResponse(body, status) {
  return Response.json(body, { status });
}

export async function POST(request) {
  const formId = process.env.FORMSPREE_FORM_ID;

  if (!formId) {
    return jsonResponse(
      {
        error: `Form delivery is not configured yet. Email ${portfolioSite.email} directly for now.`,
      },
      503
    );
  }

  let payload;

  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: "Send JSON from the contact form." }, 400);
  }

  const name = normalizeValue(payload.name, NAME_LIMIT);
  const email = normalizeValue(payload.email, NAME_LIMIT);
  const company = normalizeValue(payload.company, COMPANY_LIMIT);
  const message = normalizeValue(payload.message, MESSAGE_LIMIT);
  const website = normalizeValue(payload.website, COMPANY_LIMIT);

  if (website) {
    return jsonResponse({ error: "Spam detection triggered." }, 400);
  }

  if (!name || !email || !message) {
    return jsonResponse({ error: "Name, email, and message are required." }, 400);
  }

  if (!EMAIL_PATTERN.test(email)) {
    return jsonResponse({ error: "Enter a valid email address." }, 400);
  }

  try {
    const response = await fetch(`https://formspree.io/f/${formId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        company,
        message,
        source: "john-rodriguez-portfolio",
        _subject: `Portfolio inquiry${company ? ` - ${company}` : ""}`,
      }),
    });

    if (!response.ok) {
      let errorMessage = "The message could not be delivered right now.";

      try {
        const errorBody = await response.json();
        errorMessage =
          errorBody?.errors?.[0]?.message || errorBody?.error || errorMessage;
      } catch {
        errorMessage = "The message could not be delivered right now.";
      }

      return jsonResponse(
        {
          error: `${errorMessage} You can also email ${portfolioSite.email} directly.`,
        },
        502
      );
    }

    return jsonResponse(
      {
        message: "Thanks. Your note has been sent and John will follow up soon.",
      },
      200
    );
  } catch {
    return jsonResponse(
      {
        error: `The message could not be sent right now. Please email ${portfolioSite.email} directly.`,
      },
      502
    );
  }
}
