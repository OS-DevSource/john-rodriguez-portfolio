import { ImageResponse } from "next/og";

import { portfolioSite, socialProofLabel } from "./portfolio";

export const socialImageSize = {
  width: 1200,
  height: 630,
};

export const socialImageContentType = "image/png";

export function renderSocialImage({ eyebrow, title, body, accent, footer }) {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "48px",
          background:
            "radial-gradient(circle at 14% 18%, rgba(56, 189, 248, 0.28), rgba(56, 189, 248, 0) 42%), radial-gradient(circle at 84% 20%, rgba(249, 115, 22, 0.18), rgba(249, 115, 22, 0) 38%), linear-gradient(180deg, #020617 0%, #000000 100%)",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flex: 1,
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "36px",
            padding: "40px",
            background: "rgba(255, 255, 255, 0.03)",
            boxShadow: "0 24px 80px rgba(2, 6, 23, 0.45)",
          }}
        >
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "22px",
                maxWidth: "760px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  fontSize: "18px",
                  textTransform: "uppercase",
                  letterSpacing: "0.24em",
                  color: accent || "#bae6fd",
                }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "999px",
                    background: accent || "#38bdf8",
                    boxShadow: `0 0 24px ${accent || "rgba(56, 189, 248, 0.9)"}`,
                  }}
                />
                <span>{eyebrow}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "18px",
                }}
              >
                <div
                  style={{
                    fontSize: "64px",
                    fontWeight: 700,
                    lineHeight: 1.06,
                    letterSpacing: "-0.04em",
                  }}
                >
                  {title}
                </div>
                <div
                  style={{
                    fontSize: "26px",
                    lineHeight: 1.45,
                    color: "rgba(248, 250, 252, 0.8)",
                  }}
                >
                  {body}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "18px",
                color: "rgba(248, 250, 252, 0.64)",
              }}
            >
              <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                <span>{portfolioSite.name}</span>
                <span style={{ color: "rgba(248, 250, 252, 0.35)" }}>|</span>
                <span>{footer || portfolioSite.title}</span>
              </div>
              <div>{socialProofLabel}</div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...socialImageSize,
    }
  );
}
