import { ImageResponse } from "next/og"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#000",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(circle at 50% 35%, rgba(255,255,255,0.10), transparent 60%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", marginBottom: 36 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.55)",
                }}
              />
              {i < 4 && (
                <div
                  style={{
                    width: 56,
                    height: 1,
                    margin: "0 10px",
                    background: "rgba(255,255,255,0.25)",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 10,
            color: "rgba(255,255,255,0.55)",
            marginBottom: 28,
          }}
        >
          CREFUN PROJECT
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 600,
            color: "#fff",
            letterSpacing: 4,
          }}
        >
          Antarctica Expedition
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "rgba(255,255,255,0.45)",
            letterSpacing: 6,
            marginTop: 28,
          }}
        >
          ONE WOMAN'S VOYAGE TO THE SOUTH POLE
        </div>
      </div>
    ),
    { ...size },
  )
}
