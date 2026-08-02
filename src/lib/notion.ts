import { Client } from "@notionhq/client";
import type {
    BlockObjectResponse,
    PageObjectResponse,
    QueryDataSourceResponse,
} from "@notionhq/client/build/src/api-endpoints";
import type { Article } from "@/components/marketing/blog/base-components/blog-cards";

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

function plainText(richText: Array<{ plain_text: string }> | undefined): string {
    return richText?.map((t) => t.plain_text).join("") ?? "";
}

function toArticle(page: PageObjectResponse): Article {
    const props = page.properties;

    const title = props.Title?.type === "title" ? plainText(props.Title.title) : "";
    const excerpt = props.Excerpt?.type === "rich_text" ? plainText(props.Excerpt.rich_text) : "";
    const slug = props.Slug?.type === "rich_text" ? plainText(props.Slug.rich_text) : "";
    const cover = props.Cover?.type === "url" ? (props.Cover.url ?? "") : "";
    const type = props.Type?.type === "select" ? (props.Type.select?.name ?? "") : "";
    const industry = props.Industry?.type === "multi_select" ? props.Industry.multi_select : [];

    return {
        id: page.id,
        href: `/work/${slug}`,
        thumbnailUrl: cover,
        title,
        summary: excerpt,
        category: { href: "#", name: type },
        author: AUTHOR,
        publishedAt: "",
        readingTime: "",
        tags: industry.map((tag) => ({ name: tag.name, color: "brand" as const, href: "#" })),
    };
}

/** Fetches Published projects from the Portfolio CMS Notion database, ordered by the Order property. */
export async function getPortfolioProjects(): Promise<Article[]> {
    const notion = getClient();
    if (!notion || !DATA_SOURCE_ID) return [];

    const response: QueryDataSourceResponse = await notion.dataSources.query({
        data_source_id: DATA_SOURCE_ID,
        filter: {
            property: "Published",
            checkbox: { equals: true },
        },
        sorts: [{ property: "Order", direction: "ascending" }],
    });

    return response.results.filter((page): page is PageObjectResponse => "properties" in page).map(toArticle);
}

export interface HomepageContent {
    heading: string;
    subheading: string;
}

const FALLBACK_HOMEPAGE_CONTENT: HomepageContent = {
    heading: "Erika Aldrich Murga",
    subheading: "Product Strategy",
};

/**
 * Fetches the homepage hero copy from the Portfolio CMS row with Slug "/" (Published only).
 * The H1/H2 text lives in that page's body content, not its properties.
 */
export async function getHomepageContent(): Promise<HomepageContent> {
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
    for (const block of blocks.results) {
        if (!("type" in block)) continue;
        const typedBlock = block as BlockObjectResponse;
        if (typedBlock.type === "heading_1" && !heading) {
            heading = plainText(typedBlock.heading_1.rich_text);
        }
        if (typedBlock.type === "heading_2" && !subheading) {
            subheading = plainText(typedBlock.heading_2.rich_text);
        }
    }

    return {
        heading: heading || FALLBACK_HOMEPAGE_CONTENT.heading,
        subheading: subheading || FALLBACK_HOMEPAGE_CONTENT.subheading,
    };
}
