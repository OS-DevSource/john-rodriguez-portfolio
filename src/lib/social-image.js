import { ImageResponse } from "next/og";

import { portfolioSite, socialProofLabel } from "./portfolio";

export const socialImageSize = {
  width: 1200,
  height: 630,
};

export const socialImageContentType = "image/png";

export function renderSocialImage({ eyebrow, title, body, footer }) {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "48px",
          background:
            "linear-gradient(138deg, #18363b 0%, #0a1317 72%)",
          color: "#eff6f5",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flex: 1,
            border: "1px solid #344b50",
            borderRadius: "6px",
            padding: "40px",
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
                  color: "#b0e9fa",
                }}
              >
                <div
                  style={{
                    width: "24px",
                    height: "3px",
                    background: "#e7a677",
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
                    color: "#d4e2e4",
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
                color: "#b4c8cc",
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
