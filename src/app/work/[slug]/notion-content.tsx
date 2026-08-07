import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
import type { ReactNode } from "react";
import type { NotionBlockNode } from "@/lib/notion";

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

const renderBlocks = (blocks: NotionBlockNode[]): ReactNode[] => {
    const output: ReactNode[] = [];
    let i = 0;

    while (i < blocks.length) {
        const block = blocks[i];

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
                            {item.children && renderBlocks(item.children)}
                        </li>
                    ))}
                </ListTag>,
            );
            continue;
        }

        output.push(renderBlock(block));
        i++;
    }

    return output;
};

const renderBlock = (block: NotionBlockNode): ReactNode => {
    switch (block.type) {
        case "heading_1":
            return (
                <h1 key={block.id} className="text-display-xl text-primary">
                    <RichText richText={block.heading_1.rich_text} />
                </h1>
            );
        case "heading_2":
            return (
                <h2 key={block.id} className="text-display-lg text-primary">
                    <RichText richText={block.heading_2.rich_text} />
                </h2>
            );
        case "heading_3":
            return (
                <h3 key={block.id} className="text-display-md text-primary">
                    <RichText richText={block.heading_3.rich_text} />
                </h3>
            );
        case "paragraph":
            if (block.paragraph.rich_text.length === 0) return null;
            return (
                <p key={block.id} className="text-md text-tertiary">
                    <RichText richText={block.paragraph.rich_text} />
                </p>
            );
        case "quote":
            return (
                <blockquote key={block.id} className="border-l-2 border-utility-sage-200 pl-4 text-xl text-secondary italic">
                    <RichText richText={block.quote.rich_text} />
                </blockquote>
            );
        case "divider":
            return <hr key={block.id} className="border-secondary_alt" />;
        case "toggle":
            return (
                <details key={block.id} className="rounded-lg border border-secondary_alt p-4">
                    <summary className="cursor-pointer font-semibold text-primary">
                        <RichText richText={block.toggle.rich_text} />
                    </summary>
                    <div className="mt-3 flex flex-col gap-3">{block.children && renderBlocks(block.children)}</div>
                </details>
            );
        case "image": {
            const src = block.image.type === "external" ? block.image.external.url : block.image.file.url;
            const hasCaption = block.image.caption.length > 0;
            return (
                <figure key={block.id} className="flex flex-col gap-2">
                    <img src={src} alt="" className="w-full rounded-xl" />
                    {hasCaption && (
                        <figcaption className="text-sm text-tertiary">
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
        default:
            // The installed @notionhq/client types don't include heading_4/heading_5 yet, even though
            // Notion's API returns them — cast narrowly rather than widening NotionBlockNode itself.
            if ((block.type as string) === "heading_4") {
                const { rich_text } = (block as unknown as { heading_4: { rich_text: RichTextItemResponse[] } }).heading_4;
                return (
                    <h4 key={block.id} className="text-display-sm text-primary">
                        <RichText richText={rich_text} />
                    </h4>
                );
            }
            if ((block.type as string) === "heading_5") {
                const { rich_text } = (block as unknown as { heading_5: { rich_text: RichTextItemResponse[] } }).heading_5;
                return (
                    <h5 key={block.id} className="text-display-xs text-primary">
                        <RichText richText={rich_text} />
                    </h5>
                );
            }
            return null;
    }
};

export const NotionContent = ({ blocks }: { blocks: NotionBlockNode[] }) => <div className="flex flex-col gap-6">{renderBlocks(blocks)}</div>;
