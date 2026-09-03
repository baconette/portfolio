import { cache } from "react";
import { Client } from "@notionhq/client";
import type {
    BlockObjectResponse,
    PageObjectResponse,
    QueryDataSourceResponse,
} from "@notionhq/client/build/src/api-endpoints";
import type { Article } from "@/components/marketing/blog/base-components/blog-cards";

export type NotionBlockNode = BlockObjectResponse & { children?: NotionBlockNode[] };

const DATA_SOURCE_ID = process.env.NOTION_PORTFOLIO_DATA_SOURCE_ID ?? "";

const AUTHOR = {
    href: "#",
    name: "Erika Grijalva",
    avatarUrl: "https://www.untitledui.com/images/avatars/avatar-01.webp",
};

function getClient() {
    if (!process.env.NOTION_TOKEN) return null;
    return new Client({ auth: process.env.NOTION_TOKEN });
}

export function plainText(richText: Array<{ plain_text: string }> | undefined): string {
    return richText?.map((t) => t.plain_text).join("") ?? "";
}

export function toArticle(page: PageObjectResponse): Article {
    const props = page.properties;

    const title = props.Title?.type === "title" ? plainText(props.Title.title) : "";
    const excerpt = props.Excerpt?.type === "rich_text" ? plainText(props.Excerpt.rich_text) : "";
    const slug = props.Slug?.type === "rich_text" ? plainText(props.Slug.rich_text) : "";
    const cover = props.Cover?.type === "url" ? (props.Cover.url ?? "") : "";
    const type = props.Type?.type === "select" ? (props.Type.select?.name ?? "") : "";
    const role = props.Role?.type === "multi_select" ? props.Role.multi_select : [];

    return {
        id: page.id,
        href: slug,
        thumbnailUrl: cover,
        title,
        summary: excerpt,
        category: { href: "#", name: type },
        author: AUTHOR,
        publishedAt: "",
        readingTime: "",
        tags: [],
        roles: role.map((r) => r.name),
    };
}

export function toPlayArticle(page: PageObjectResponse): Article {
    const props = page.properties;

    const title = props.Title?.type === "title" ? plainText(props.Title.title) : "";
    const excerpt = props.Excerpt?.type === "rich_text" ? plainText(props.Excerpt.rich_text) : "";
    const url = props.URL?.type === "url" ? (props.URL.url ?? "") : "";
    const cover = props.Cover?.type === "url" ? (props.Cover.url ?? "") : "";
    const type = props.Type?.type === "select" ? (props.Type.select?.name ?? "") : "";
    const role = props.Role?.type === "multi_select" ? props.Role.multi_select : [];
    const stage = props.Stage?.type === "select" ? (props.Stage.select?.name ?? undefined) : undefined;

    return {
        id: page.id,
        href: url,
        thumbnailUrl: cover,
        title,
        summary: excerpt,
        category: { href: "#", name: type },
        author: AUTHOR,
        publishedAt: "",
        readingTime: "",
        tags: [],
        roles: role.map((r) => r.name),
        stage,
    };
}

/** Fetches Published Play items (Slug "/play") from the Portfolio CMS, ordered by the Order property.
 * Unlike case studies, each card links out via its URL property rather than an internal /work/{slug} page. */
export async function getPlayProjects(): Promise<Article[]> {
    const notion = getClient();
    if (!notion || !DATA_SOURCE_ID) return [];

    const response: QueryDataSourceResponse = await notion.dataSources.query({
        data_source_id: DATA_SOURCE_ID,
        filter: {
            and: [
                { property: "Published", checkbox: { equals: true } },
                { property: "Slug", rich_text: { equals: "/play" } },
            ],
        },
        sorts: [{ property: "Order", direction: "ascending" }],
    });

    return response.results.filter((page): page is PageObjectResponse => "properties" in page).map(toPlayArticle);
}

/** Fetches Published projects from the Portfolio CMS Notion database, ordered by the Order property. */
export async function getPortfolioProjects(): Promise<Article[]> {
    const notion = getClient();
    if (!notion || !DATA_SOURCE_ID) return [];

    const response: QueryDataSourceResponse = await notion.dataSources.query({
        data_source_id: DATA_SOURCE_ID,
        filter: {
            and: [
                { property: "Published", checkbox: { equals: true } },
                { property: "Slug", rich_text: { starts_with: "/work/" } },
            ],
        },
        sorts: [{ property: "Order", direction: "ascending" }],
    });

    return response.results.filter((page): page is PageObjectResponse => "properties" in page).map(toArticle);
}

export interface HomepageContent {
    heading: string;
    subheading: string;
    /** First Heading 3 block below the H1/H2 hero, if any — the intro section's heading. */
    sectionHeading: string;
    /** Paragraph blocks immediately following that Heading 3 — the intro section's body. */
    sectionParagraphs: string[];
}

const FALLBACK_HOMEPAGE_CONTENT: HomepageContent = {
    heading: "Erika Aldrich Murga",
    subheading: "Product Strategy",
    sectionHeading: "",
    sectionParagraphs: [],
};

/**
 * Fetches the homepage hero copy and intro section from the Portfolio CMS row with Slug "/"
 * (Published only). The H1/H2 hero text and the Heading 3 + paragraphs intro section both live in
 * that page's body content, not its properties. Wrapped in React's `cache()` so the hero and intro
 * section components — which both need this — share one fetch per request.
 */
export const getHomepageContent = cache(async (): Promise<HomepageContent> => {
    const notion = getClient();
    if (!notion || !DATA_SOURCE_ID) return FALLBACK_HOMEPAGE_CONTENT;

    const response: QueryDataSourceResponse = await notion.dataSources.query({
        data_source_id: DATA_SOURCE_ID,
        filter: {
            and: [
                { property: "Published", checkbox: { equals: true } },
                { property: "Slug", rich_text: { equals: "/" } },
            ],
        },
    });

    const page = response.results.find((p): p is PageObjectResponse => "properties" in p);
    if (!page) return FALLBACK_HOMEPAGE_CONTENT;

    const blocks = await notion.blocks.children.list({ block_id: page.id });

    let heading = "";
    let subheading = "";
    let sectionHeading = "";
    const sectionParagraphs: string[] = [];
    let inSection = false;

    for (const block of blocks.results) {
        if (!("type" in block)) continue;
        const typedBlock = block as BlockObjectResponse;
        if (typedBlock.type === "heading_1" && !heading) {
            heading = plainText(typedBlock.heading_1.rich_text);
        }
        if (typedBlock.type === "heading_2" && !subheading) {
            subheading = plainText(typedBlock.heading_2.rich_text);
        }
        if (typedBlock.type === "heading_3" && !sectionHeading) {
            sectionHeading = plainText(typedBlock.heading_3.rich_text);
            inSection = true;
            continue;
        }
        if (inSection && typedBlock.type === "paragraph") {
            const text = plainText(typedBlock.paragraph.rich_text);
            if (text) sectionParagraphs.push(text);
        }
    }

    return {
        heading: heading || FALLBACK_HOMEPAGE_CONTENT.heading,
        subheading: subheading || FALLBACK_HOMEPAGE_CONTENT.subheading,
        sectionHeading,
        sectionParagraphs,
    };
});

export interface ContactContent {
    heading: string;
    body: string;
}

const FALLBACK_CONTACT_CONTENT: ContactContent = {
    heading: "Get in touch",
    body: "Have a project in mind or just want to say hello? Send a message below.",
};

/**
 * Fetches the contact page copy from the Portfolio CMS row with Slug "/contact" (Published only).
 * The H1/body text lives in that page's body content, not its properties.
 */
export async function getContactContent(): Promise<ContactContent> {
    const notion = getClient();
    if (!notion || !DATA_SOURCE_ID) return FALLBACK_CONTACT_CONTENT;

    const response: QueryDataSourceResponse = await notion.dataSources.query({
        data_source_id: DATA_SOURCE_ID,
        filter: {
            and: [
                { property: "Published", checkbox: { equals: true } },
                { property: "Slug", rich_text: { equals: "/contact" } },
            ],
        },
    });

    const page = response.results.find((p): p is PageObjectResponse => "properties" in p);
    if (!page) return FALLBACK_CONTACT_CONTENT;

    const blocks = await notion.blocks.children.list({ block_id: page.id });

    let heading = "";
    let body = "";
    for (const block of blocks.results) {
        if (!("type" in block)) continue;
        const typedBlock = block as BlockObjectResponse;
        if (typedBlock.type === "heading_1" && !heading) {
            heading = plainText(typedBlock.heading_1.rich_text);
        }
        if (typedBlock.type === "paragraph" && !body) {
            body = plainText(typedBlock.paragraph.rich_text);
        }
    }

    return {
        heading: heading || FALLBACK_CONTACT_CONTENT.heading,
        body: body || FALLBACK_CONTACT_CONTENT.body,
    };
}

export interface PageSeo {
    title: string;
    description: string;
}

/**
 * Fetches SEO Title/SEO Description from the Portfolio CMS row matching the given Slug (Published only).
 * Falls back to the provided defaults when Notion isn't configured, the row isn't found, or the fields are empty.
 */
export async function getPageSeo(slug: string, fallback: PageSeo): Promise<PageSeo> {
    const notion = getClient();
    if (!notion || !DATA_SOURCE_ID) return fallback;

    const response: QueryDataSourceResponse = await notion.dataSources.query({
        data_source_id: DATA_SOURCE_ID,
        filter: {
            and: [
                { property: "Published", checkbox: { equals: true } },
                { property: "Slug", rich_text: { equals: slug } },
            ],
        },
    });

    const page = response.results.find((p): p is PageObjectResponse => "properties" in p);
    if (!page) return fallback;

    const props = page.properties;
    const seoTitle = props["SEO Title"]?.type === "rich_text" ? plainText(props["SEO Title"].rich_text) : "";
    const seoDescription = props["SEO Description"]?.type === "rich_text" ? plainText(props["SEO Description"].rich_text) : "";

    return {
        title: seoTitle || fallback.title,
        description: seoDescription || fallback.description,
    };
}

async function fetchBlocksRecursive(notion: Client, blockId: string): Promise<NotionBlockNode[]> {
    const nodes: NotionBlockNode[] = [];
    let cursor: string | undefined;

    do {
        const response = await notion.blocks.children.list({ block_id: blockId, start_cursor: cursor });
        const pageNodes = response.results.filter((block): block is BlockObjectResponse => "type" in block).map((block): NotionBlockNode => ({ ...block }));

        await Promise.all(
            pageNodes.map(async (node) => {
                if (node.has_children) {
                    node.children = await fetchBlocksRecursive(notion, node.id);
                }
            }),
        );

        nodes.push(...pageNodes);
        cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
    } while (cursor);

    return nodes;
}

export interface CaseStudy {
    title: string;
    coverUrl: string;
    blocks: NotionBlockNode[];
}

/**
 * Fetches a Published Portfolio CMS case study's cover image and body content by its Slug (e.g. "/work/speed-scale").
 * Wrapped in React's `cache()` so `generateMetadata` and the page component — which both need this — share one fetch per request.
 */
export const getCaseStudy = cache(async (slug: string): Promise<CaseStudy | null> => {
    const notion = getClient();
    if (!notion || !DATA_SOURCE_ID) return null;

    const response: QueryDataSourceResponse = await notion.dataSources.query({
        data_source_id: DATA_SOURCE_ID,
        filter: {
            and: [
                { property: "Published", checkbox: { equals: true } },
                { property: "Slug", rich_text: { equals: slug } },
            ],
        },
    });

    const page = response.results.find((p): p is PageObjectResponse => "properties" in p);
    if (!page) return null;

    const props = page.properties;
    const title = props.Title?.type === "title" ? plainText(props.Title.title) : "";
    const coverUrl = props.Cover?.type === "url" ? (props.Cover.url ?? "") : "";
    const blocks = await fetchBlocksRecursive(notion, page.id);

    return { title, coverUrl, blocks };
});
