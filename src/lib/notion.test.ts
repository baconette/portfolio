import { beforeEach, describe, expect, it, vi } from "vitest";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

function mockPage(properties: PageObjectResponse["properties"]): PageObjectResponse {
    return { id: "page-1", properties } as PageObjectResponse;
}

describe("Notion property mapping", () => {
    it("plainText joins rich_text segments and handles undefined", async () => {
        const { plainText } = await import("./notion");
        expect(plainText([{ plain_text: "Hello, " }, { plain_text: "world" }])).toBe("Hello, world");
        expect(plainText(undefined)).toBe("");
    });

    it("toArticle maps a minimal Notion page into the Article shape", async () => {
        const { toArticle } = await import("./notion");
        const page = mockPage({
            Title: { type: "title", title: [{ plain_text: "Speed & Scale" }] },
            Excerpt: { type: "rich_text", rich_text: [{ plain_text: "A case study" }] },
            Slug: { type: "rich_text", rich_text: [{ plain_text: "/work/speed-scale" }] },
            Cover: { type: "url", url: "https://example.com/cover.png" },
            Type: { type: "select", select: { name: "Product Design" } },
            Role: { type: "multi_select", multi_select: [{ name: "Lead Designer" }] },
        } as unknown as PageObjectResponse["properties"]);

        expect(toArticle(page)).toMatchObject({
            id: "page-1",
            href: "/work/speed-scale",
            thumbnailUrl: "https://example.com/cover.png",
            title: "Speed & Scale",
            summary: "A case study",
            category: { name: "Product Design" },
            roles: ["Lead Designer"],
        });
    });

    it("toArticle falls back to empty values when properties are missing or the wrong type", async () => {
        const { toArticle } = await import("./notion");
        const page = mockPage({} as unknown as PageObjectResponse["properties"]);

        expect(toArticle(page)).toMatchObject({
            href: "",
            thumbnailUrl: "",
            title: "",
            summary: "",
            category: { name: "" },
            roles: [],
        });
    });

    it("toPlayArticle links out via the URL property and carries the Stage select", async () => {
        const { toPlayArticle } = await import("./notion");
        const page = mockPage({
            Title: { type: "title", title: [{ plain_text: "Prototype" }] },
            Excerpt: { type: "rich_text", rich_text: [] },
            URL: { type: "url", url: "https://external.example.com" },
            Cover: { type: "url", url: "" },
            Type: { type: "select", select: { name: "UX Research" } },
            Role: { type: "multi_select", multi_select: [] },
            Stage: { type: "select", select: { name: "Live" } },
        } as unknown as PageObjectResponse["properties"]);

        expect(toPlayArticle(page)).toMatchObject({
            href: "https://external.example.com",
            category: { name: "UX Research" },
            stage: "Live",
        });
    });

    it("toPlayArticle leaves stage undefined when the Stage select is empty", async () => {
        const { toPlayArticle } = await import("./notion");
        const page = mockPage({} as unknown as PageObjectResponse["properties"]);
        expect(toPlayArticle(page).stage).toBeUndefined();
    });
});

describe("Notion fetch fallbacks when unconfigured", () => {
    beforeEach(() => {
        vi.unstubAllEnvs();
        vi.stubEnv("NOTION_TOKEN", "");
        vi.stubEnv("NOTION_PORTFOLIO_DATA_SOURCE_ID", "");
        vi.resetModules();
    });

    it("getPortfolioProjects returns an empty array without calling Notion", async () => {
        const { getPortfolioProjects } = await import("./notion");
        expect(await getPortfolioProjects()).toEqual([]);
    });

    it("getPlayProjects returns an empty array without calling Notion", async () => {
        const { getPlayProjects } = await import("./notion");
        expect(await getPlayProjects()).toEqual([]);
    });

    it("getHomepageContent returns the hardcoded fallback copy", async () => {
        const { getHomepageContent } = await import("./notion");
        const content = await getHomepageContent();
        expect(content.heading).toBeTruthy();
        expect(content.subheading).toBeTruthy();
    });

    it("getContactContent returns the hardcoded fallback copy", async () => {
        const { getContactContent } = await import("./notion");
        const content = await getContactContent();
        expect(content.heading).toBeTruthy();
        expect(content.body).toBeTruthy();
    });

    it("getPageSeo returns the caller-supplied fallback", async () => {
        const { getPageSeo } = await import("./notion");
        const fallback = { title: "Fallback title", description: "Fallback description" };
        expect(await getPageSeo("/some-slug", fallback)).toEqual(fallback);
    });

    it("getCaseStudy returns null", async () => {
        const { getCaseStudy } = await import("./notion");
        expect(await getCaseStudy("/work/missing")).toBeNull();
    });
});

describe("Notion fetch when configured", () => {
    beforeEach(() => {
        vi.unstubAllEnvs();
        vi.stubEnv("NOTION_TOKEN", "test-token");
        vi.stubEnv("NOTION_PORTFOLIO_DATA_SOURCE_ID", "test-data-source");
        vi.resetModules();
    });

    it("getPortfolioProjects queries the configured data source and maps results", async () => {
        const page = mockPage({
            Title: { type: "title", title: [{ plain_text: "Case Study" }] },
            Excerpt: { type: "rich_text", rich_text: [] },
            Slug: { type: "rich_text", rich_text: [{ plain_text: "/work/case-study" }] },
            Cover: { type: "url", url: "" },
            Type: { type: "select", select: { name: "Branding" } },
            Role: { type: "multi_select", multi_select: [] },
        } as unknown as PageObjectResponse["properties"]);

        const query = vi.fn().mockResolvedValue({ results: [page] });
        vi.doMock("@notionhq/client", () => ({
            Client: class {
                dataSources = { query };
            },
        }));

        const { getPortfolioProjects } = await import("./notion");
        const projects = await getPortfolioProjects();

        expect(query).toHaveBeenCalledWith(
            expect.objectContaining({ data_source_id: "test-data-source" }),
        );
        expect(projects).toEqual([expect.objectContaining({ title: "Case Study", category: { href: "#", name: "Branding" } })]);
    });
});
