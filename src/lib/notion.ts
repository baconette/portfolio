import { Client } from "@notionhq/client";
import type {
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
