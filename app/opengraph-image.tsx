import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const alt = "DEXA — Web3 builder & blockchain developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default async function Image() {
  // Tribal DEXA wordmark (white artwork), embedded as PNG in the repo's SVG.
  const svg = await readFile(
    join(process.cwd(), "public/logos/dexa-logo-white.svg"),
    "utf-8"
  );
  const b64 = svg.match(/base64,([A-Za-z0-9+/=]+)/)?.[1] ?? "";

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
          backgroundColor: "#0a0a0a",
          gap: 44,
        }}
      >
        <img
          src={`data:image/png;base64,${b64}`}
          width={640}
          height={280}
          alt=""
        />
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 28,
            letterSpacing: 14,
            color: "#a3a3a3",
          }}
        >
          WEB3 BUILDER &amp; BLOCKCHAIN DEVELOPER
        </div>
      </div>
    ),
    { ...size }
  );
}
