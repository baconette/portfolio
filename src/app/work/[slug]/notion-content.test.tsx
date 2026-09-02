import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import type { NotionBlockNode } from "@/lib/notion";
import { collectThemedGroup, headingColor, isHeadingBlock, NotionContent } from "./notion-content";

function block(partial: Record<string, unknown> & { type: string }): NotionBlockNode {
    return { id: `block-${Math.random()}`, has_children: false, ...partial } as unknown as NotionBlockNode;
}

const richTextItem = (text: string) => ({
    plain_text: text,
    href: null,
    annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: "default" as const },
});

const heading2 = (color: string) => block({ type: "heading_2", heading_2: { rich_text: [richTextItem("Heading")], color } });
const paragraph = (text = "Body copy") => block({ type: "paragraph", paragraph: { rich_text: [richTextItem(text)] } });
const divider = () => block({ type: "divider" });

describe("isHeadingBlock", () => {
    it("recognizes heading_1 through heading_3 block types", () => {
        expect(isHeadingBlock(block({ type: "heading_1" }))).toBe(true);
        expect(isHeadingBlock(block({ type: "heading_3" }))).toBe(true);
    });

    it("returns false for non-heading block types", () => {
        expect(isHeadingBlock(paragraph())).toBe(false);
    });
});

describe("headingColor", () => {
    it("reads the color off a heading_2 block", () => {
        expect(headingColor(heading2("yellow_background"))).toBe("yellow_background");
    });

    it("returns undefined for a non-heading block", () => {
        expect(headingColor(paragraph())).toBeUndefined();
    });
});

describe("collectThemedGroup", () => {
    it("stops at a divider when stopAtDivider is true", () => {
        const blocks = [heading2("yellow_background"), paragraph("a"), divider(), paragraph("b")];
        const { group, next } = collectThemedGroup(blocks, 0, true);

        expect(group).toHaveLength(2);
        expect(next).toBe(2);
    });

    it("continues across a divider when stopAtDivider is false, stopping only at the next heading_2", () => {
        const blocks = [heading2("green_background"), paragraph("a"), divider(), paragraph("b"), heading2("yellow_background")];
        const { group, next } = collectThemedGroup(blocks, 0, false);

        expect(group).toHaveLength(4);
        expect(next).toBe(4);
    });
});

describe("NotionContent", () => {
    it("renders a simple block list", () => {
        render(<NotionContent blocks={[paragraph("Hello there")]} />);
        expect(screen.getByText("Hello there")).toBeInTheDocument();
    });
});
