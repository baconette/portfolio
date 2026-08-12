import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getCaseStudy } from "@/lib/notion";

export const alt = "Case study by Erika Aldrich Murga";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const OLIVE_900 = "#202D15";

const CONTENT_TYPES: Record<string, string> = {
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    webp: "image/webp",
    gif: "image/gif",
};

/** Notion Covers are stored as either absolute URLs or paths relative to /public — satori can't fetch the
 * latter (no origin to resolve against), so local paths are read off disk and inlined as a data URI. */
async function resolveCoverSrc(coverUrl: string): Promise<string | null> {
    if (/^https?:\/\//.test(coverUrl)) return coverUrl;

    const ext = coverUrl.split(".").pop()?.toLowerCase() ?? "";
    const mimeType = CONTENT_TYPES[ext];
    if (!mimeType) return null;

    try {
        const data = await readFile(join(process.cwd(), "public", coverUrl));
        return `data:${mimeType};base64,${data.toString("base64")}`;
    } catch {
        return null;
    }
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const caseStudy = await getCaseStudy(`/work/${slug}`);
    const coverUrl = caseStudy?.coverUrl ? await resolveCoverSrc(caseStudy.coverUrl) : null;

    return new ImageResponse(
        (
            <div style={{ height: "100%", width: "100%", display: "flex", backgroundColor: OLIVE_900 }}>
                {coverUrl && <img src={coverUrl} width={size.width} height={size.height} style={{ objectFit: "cover" }} alt="" />}
            </div>
        ),
        { ...size },
    );
}
