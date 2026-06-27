import { ImageResponse } from "next/og";

export const alt =
  "PocketWize — your AI financial companion for everyday life.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#eaf1fe",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 34,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: "#1f4dbf",
          }}
        >
          PocketWize
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#0b0f19",
            }}
          >
            Your AI financial companion
            <br />
            <span style={{ color: "#2e69e8" }}>for everyday life.</span>
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 30,
              lineHeight: 1.4,
              color: "#5b6275",
              maxWidth: 900,
            }}
          >
            Understand your spending, reduce financial stress, and make smarter
            money decisions.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
