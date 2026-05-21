import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "infra.nyc";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "flex-end",
          background: "#e8e0d1",
          color: "#191713",
          display: "flex",
          height: "100%",
          justifyContent: "space-between",
          padding: 64,
          width: "100%",
        }}
      >
        <div style={{ maxWidth: 920 }}>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 24,
              letterSpacing: 4,
              marginBottom: 48,
              textTransform: "uppercase",
            }}
          >
            infra.nyc
          </div>
          <div
            style={{
              fontSize: 78,
              fontWeight: 700,
              letterSpacing: 0,
              lineHeight: 0.95,
            }}
          >
            Private infrastructure engineering community.
          </div>
        </div>
        <div
          style={{
            border: "2px solid rgba(25, 23, 19, 0.26)",
            borderRadius: 999,
            height: 92,
            width: 92,
          }}
        />
      </div>
    ),
    size,
  );
}
