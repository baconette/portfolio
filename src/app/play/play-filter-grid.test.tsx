import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Article } from "@/components/marketing/blog/base-components/blog-cards";
import { PlayFilterGrid } from "./play-filter-grid";

function article(overrides: Partial<Article>): Article {
    return {
        id: overrides.id ?? Math.random().toString(),
        href: "https://example.com",
        thumbnailUrl: "",
        title: "Example play item",
        summary: "",
        category: { href: "#", name: "Product Design" },
        author: { href: "#", name: "Erika", avatarUrl: "" },
        publishedAt: "",
        readingTime: "",
        tags: [],
        roles: [],
        ...overrides,
    };
}

describe("PlayFilterGrid", () => {
    it("renders one tab per distinct category, plus an All tab", () => {
        const articles = [
            article({ id: "1", category: { href: "#", name: "Branding" } }),
            article({ id: "2", category: { href: "#", name: "UX Research" } }),
        ];
        render(<PlayFilterGrid articles={articles} />);

        expect(screen.getByRole("tab", { name: "All" })).toBeInTheDocument();
        expect(screen.getByRole("tab", { name: "Branding" })).toBeInTheDocument();
        expect(screen.getByRole("tab", { name: "UX Research" })).toBeInTheDocument();
    });

    it("filters visible cards when a category tab is selected", async () => {
        const user = userEvent.setup();
        const articles = [
            article({ id: "1", title: "Branding project", category: { href: "#", name: "Branding" } }),
            article({ id: "2", title: "Research project", category: { href: "#", name: "UX Research" } }),
        ];
        render(<PlayFilterGrid articles={articles} />);

        await user.click(screen.getByRole("tab", { name: "Branding" }));

        expect(screen.getByText("Branding project")).toBeInTheDocument();
        expect(screen.queryByText("Research project")).not.toBeInTheDocument();
    });

    it("renders a stage badge for items that have a Stage value", () => {
        const articles = [article({ id: "1", stage: "Live" }), article({ id: "2", title: "No stage item", stage: undefined })];
        render(<PlayFilterGrid articles={articles} />);

        expect(screen.getByText("Live")).toBeInTheDocument();
    });
});
