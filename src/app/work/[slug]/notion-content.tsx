import type { ApiColor, RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
import type { ReactNode } from "react";
import type { NotionBlockNode } from "@/lib/notion";
import { Badge } from "@/components/base/badges/badges";
import { CaseStudyBrandSection } from "@/components/marketing/case-study-section/case-study-brand-section";
import { CaseStudyDarkBrandSection } from "@/components/marketing/case-study-section/case-study-dark-brand-section";
import { CaseStudyWideSection } from "@/components/marketing/case-study-section/case-study-wide-section";

type BlockTheme = "default" | "brand" | "dark";

/** A heading colored this way in Notion triggers the matching themed section, wrapping it and its following content. */
const HEADING_COLOR_THEME: Partial<Record<ApiColor, { theme: "brand" | "dark"; stopAtDivider: boolean }>> = {
    yellow_background: { theme: "brand", stopAtDivider: true },
    green_background: { theme: "dark", stopAtDivider: false },
};

/** A callout colored this way is a structural wrapper, not visible content — its children render wide instead of the callout box. */
const CALLOUT_WIDE_COLUMNS: Partial<Record<ApiColor, 1 | 2>> = {
    gray_background: 1,
    brown_background: 2,
};

const HEADING_TYPES = new Set(["heading_1", "heading_2", "heading_3", "heading_4", "heading_5"]);
const isHeadingBlock = (block: NotionBlockNode): boolean => HEADING_TYPES.has(block.type);

/** Reads a heading block's color at any level, including heading_4/5 (not in the installed client types — see the cast note in renderBlock). */
const headingColor = (block: NotionBlockNode): ApiColor | undefined => {
    if (block.type === "heading_1") return block.heading_1.color;
    if (block.type === "heading_2") return block.heading_2.color;
    if (block.type === "heading_3") return block.heading_3.color;
    if ((block.type as string) === "heading_4" || (block.type as string) === "heading_5") {
        return (block as unknown as { [k: string]: { color: ApiColor } })[block.type].color;
    }
    return undefined;
};

/** Reads a heading block's plain text at any level, including heading_4/5 (see the cast note in renderBlock). */
const headingPlainText = (block: NotionBlockNode): string => {
    if (block.type === "heading_1") return block.heading_1.rich_text.map((t) => t.plain_text).join("");
    if (block.type === "heading_2") return block.heading_2.rich_text.map((t) => t.plain_text).join("");
    if (block.type === "heading_3") return block.heading_3.rich_text.map((t) => t.plain_text).join("");
    if ((block.type as string) === "heading_4" || (block.type as string) === "heading_5") {
        const { rich_text } = (block as unknown as { [k: string]: { rich_text: RichTextItemResponse[] } })[block.type];
        return rich_text.map((t) => t.plain_text).join("");
    }
    return "";
};

/** Collects `blocks[start]` plus every following block up to (not including) the next heading_2, or a divider when `stopAtDivider` is set. */
const collectThemedGroup = (blocks: NotionBlockNode[], start: number, stopAtDivider: boolean): { group: NotionBlockNode[]; next: number } => {
    const group: NotionBlockNode[] = [blocks[start]];
    let j = start + 1;
    while (j < blocks.length && blocks[j].type !== "heading_2" && !(stopAtDivider && blocks[j].type === "divider")) {
        group.push(blocks[j]);
        j++;
    }
    return { group, next: j };
};

const primaryText = (theme: BlockTheme) => (theme === "brand" ? "text-primary_on-brand" : "text-primary");

const bodyText = (theme: BlockTheme) => {
    if (theme === "brand") return "text-primary_on-brand";
    if (theme === "dark") return "text-primary";
    return "text-tertiary";
};

const quoteText = (theme: BlockTheme) => {
    if (theme === "brand") return "text-primary_on-brand";
    if (theme === "dark") return "text-primary";
    return "text-secondary";
};

const RoleRow = ({ roles, theme }: { roles: string[]; theme: BlockTheme }) => (
    <div className="flex flex-wrap items-center gap-2">
        <span className={`text-md font-semibold uppercase ${bodyText(theme)}`}>Role</span>
        {roles.map((role) => (
            <Badge key={role} color="brand" size="md">
                {role}
            </Badge>
        ))}
    </div>
);

const RichText = ({ richText }: { richText: RichTextItemResponse[] }) => (
    <>
        {richText.map((item, i) => {
            let node: ReactNode = item.plain_text;
            if (item.annotations.code) node = <code>{node}</code>;
            if (item.annotations.bold) node = <strong>{node}</strong>;
            if (item.annotations.italic) node = <em>{node}</em>;
            if (item.annotations.strikethrough) node = <s>{node}</s>;
            if (item.annotations.underline) node = <u>{node}</u>;
            if (item.href) {
                node = (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-brand-secondary underline hover:text-brand-secondary_hover">
                        {node}
                    </a>
                );
            }
            return <span key={i}>{node}</span>;
        })}
    </>
);

const renderBlocks = (blocks: NotionBlockNode[], theme: BlockTheme = "default", detectSpecialBlocks = false, roles: string[] = []): ReactNode[] => {
    const output: ReactNode[] = [];
    let i = 0;

    while (i < blocks.length) {
        const block = blocks[i];

        // Wide-callout unwrapping applies at any nesting depth (unlike heading-section detection below,
        // which is intentionally top-level-only to avoid re-triggering inside an already-themed section).
        if (block.type === "callout") {
            const columns = CALLOUT_WIDE_COLUMNS[block.callout.color];
            if (columns) {
                output.push(
                    <CaseStudyWideSection key={block.id} columns={columns}>
                        {block.children && renderBlocks(block.children, theme, false)}
                    </CaseStudyWideSection>,
                );
                i++;
                continue;
            }
        }

        if (detectSpecialBlocks && isHeadingBlock(block)) {
            const color = headingColor(block);
            const themed = color ? HEADING_COLOR_THEME[color] : undefined;
            const isOverview = headingPlainText(block).trim().toLowerCase() === "overview";

            if (themed || isOverview) {
                const sectionTheme = themed?.theme ?? "default";
                const { group, next } = collectThemedGroup(blocks, i, themed?.stopAtDivider ?? false);
                const content = renderBlocks(group, sectionTheme, false);

                // Role badges land right after the section's last paragraph/bullet, before the wrapper (if any) closes.
                if (isOverview && roles.length > 0) {
                    content.push(<RoleRow key="role-row" roles={roles} theme={sectionTheme} />);
                }

                if (themed?.theme === "brand") {
                    output.push(<CaseStudyBrandSection key={block.id}>{content}</CaseStudyBrandSection>);
                } else if (themed?.theme === "dark") {
                    const nextBlock = blocks[next];
                    const nextColor = nextBlock && isHeadingBlock(nextBlock) ? headingColor(nextBlock) : undefined;
                    const isFollowedByBrand = nextColor ? HEADING_COLOR_THEME[nextColor]?.theme === "brand" : false;
                    output.push(
                        <CaseStudyDarkBrandSection key={block.id} marginBottom={!isFollowedByBrand}>
                            {content}
                        </CaseStudyDarkBrandSection>,
                    );
                } else {
                    output.push(...content);
                }

                i = next;
                continue;
            }
        }

        if (block.type === "bulleted_list_item" || block.type === "numbered_list_item") {
            const type = block.type;
            const items: NotionBlockNode[] = [];
            while (i < blocks.length && blocks[i].type === type) {
                items.push(blocks[i]);
                i++;
            }
            const ListTag = type === "bulleted_list_item" ? "ul" : "ol";
            output.push(
                <ListTag key={block.id} className={type === "bulleted_list_item" ? "list-disc space-y-1 pl-6" : "list-decimal space-y-1 pl-6"}>
                    {items.map((item) => (
                        <li key={item.id}>
                            <RichText
                                richText={
                                    item.type === "bulleted_list_item" ? item.bulleted_list_item.rich_text : item.type === "numbered_list_item" ? item.numbered_list_item.rich_text : []
                                }
                            />
                            {item.children && renderBlocks(item.children, theme, false)}
                        </li>
                    ))}
                </ListTag>,
            );
            continue;
        }

        output.push(renderBlock(block, theme));
        i++;
    }

    return output;
};

const renderBlock = (block: NotionBlockNode, theme: BlockTheme = "default"): ReactNode => {
    switch (block.type) {
        case "heading_1":
            return (
                <h1 key={block.id} className={`text-display-xl ${primaryText(theme)}`}>
                    <RichText richText={block.heading_1.rich_text} />
                </h1>
            );
        case "heading_2":
            return (
                <h2 key={block.id} className={`text-display-lg ${primaryText(theme)}`}>
                    <RichText richText={block.heading_2.rich_text} />
                </h2>
            );
        case "heading_3":
            return (
                <h3 key={block.id} className={`text-display-md ${primaryText(theme)}`}>
                    <RichText richText={block.heading_3.rich_text} />
                </h3>
            );
        case "paragraph":
            if (block.paragraph.rich_text.length === 0) return null;
            return (
                <p key={block.id} className={`text-md ${bodyText(theme)}`}>
                    <RichText richText={block.paragraph.rich_text} />
                </p>
            );
        case "quote":
            return (
                <blockquote key={block.id} className={`border-l-[8px] border-utility-sage-200 pl-4 text-xl italic ${quoteText(theme)}`}>
                    <RichText richText={block.quote.rich_text} />
                </blockquote>
            );
        case "divider":
            return <hr key={block.id} className="border-secondary_alt" />;
        case "toggle":
            return (
                <details key={block.id} className="rounded-md border border-secondary_alt p-4">
                    <summary className={`cursor-pointer font-semibold ${primaryText(theme)}`}>
                        <RichText richText={block.toggle.rich_text} />
                    </summary>
                    <div className="mt-3 flex flex-col gap-3">{block.children && renderBlocks(block.children, theme, false)}</div>
                </details>
            );
        case "image": {
            const src = block.image.type === "external" ? block.image.external.url : block.image.file.url;
            const hasCaption = block.image.caption.length > 0;
            return (
                <figure key={block.id} className="flex flex-col gap-2">
                    <img src={src} alt="" className="w-full rounded-xl" />
                    {hasCaption && (
                        <figcaption className={`text-sm ${bodyText(theme)}`}>
                            <RichText richText={block.image.caption} />
                        </figcaption>
                    )}
                </figure>
            );
        }
        case "code":
            return (
                <pre key={block.id} className="overflow-x-auto rounded-lg bg-secondary p-4 text-sm">
                    <code>
                        <RichText richText={block.code.rich_text} />
                    </code>
                </pre>
            );
        case "table": {
            const rows = (block.children ?? []).filter((row): row is NotionBlockNode & { type: "table_row" } => row.type === "table_row");
            return (
                <div key={block.id} className="overflow-x-auto">
                    <table className="w-full border-collapse text-left text-md">
                        <tbody>
                            {rows.map((row, rowIndex) => {
                                const isHeaderRow = block.table.has_column_header && rowIndex === 0;
                                const CellTag = isHeaderRow ? "th" : "td";
                                const cellColor = theme === "default" && !isHeaderRow ? bodyText(theme) : primaryText(theme);
                                const cellWeight = isHeaderRow ? "font-semibold" : "";
                                return (
                                    <tr key={row.id} className="border-b border-secondary_alt">
                                        {row.table_row.cells.map((cell, cellIndex) => (
                                            <CellTag key={cellIndex} className={`px-3 py-2 align-top ${cellWeight} ${cellColor}`}>
                                                <RichText richText={cell} />
                                            </CellTag>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            );
        }
        case "column_list": {
            const columns = (block.children ?? []).filter((c): c is NotionBlockNode & { type: "column" } => c.type === "column");
            return (
                <div key={block.id} className="flex flex-col gap-6 md:flex-row">
                    {columns.map((column) => (
                        <div key={column.id} className="flex flex-1 flex-col gap-6">
                            {column.children && renderBlocks(column.children, theme, false)}
                        </div>
                    ))}
                </div>
            );
        }
        default:
            // The installed @notionhq/client types don't include heading_4/heading_5 yet, even though
            // Notion's API returns them — cast narrowly rather than widening NotionBlockNode itself.
            if ((block.type as string) === "heading_4") {
                const { rich_text } = (block as unknown as { heading_4: { rich_text: RichTextItemResponse[] } }).heading_4;
                return (
                    <h4 key={block.id} className={`text-display-sm ${primaryText(theme)}`}>
                        <RichText richText={rich_text} />
                    </h4>
                );
            }
            if ((block.type as string) === "heading_5") {
                const { rich_text } = (block as unknown as { heading_5: { rich_text: RichTextItemResponse[] } }).heading_5;
                return (
                    <h5 key={block.id} className={`text-display-xs ${primaryText(theme)}`}>
                        <RichText richText={rich_text} />
                    </h5>
                );
            }
            return null;
    }
};

export const NotionContent = ({ blocks, roles }: { blocks: NotionBlockNode[]; roles: string[] }) => (
    <div className="flex flex-col gap-6">{renderBlocks(blocks, "default", true, roles)}</div>
);
