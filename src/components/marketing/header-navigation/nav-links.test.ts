import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/notion", () => ({
    isPagePublished: vi.fn(async (slug: string) => slug !== "/play"),
}));

describe("getNavLinks", () => {
    it("filters out links whose page isn't published", async () => {
        const { getNavLinks } = await import("./nav-links");
        const links = await getNavLinks();

        expect(links.map((link) => link.href)).toEqual(["/profile", "/work", "/contact"]);
    });
});
