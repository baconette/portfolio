"use client";

import { useMemo } from "react";
import { Tabs } from "@/components/application/tabs/tabs";
import { CardFullWidthImage01Vertical, type Article } from "@/components/marketing/blog/base-components/blog-cards";
import { BadgeWithDot, type BadgeColor } from "@/components/base/badges/badges";

const STAGE_BADGE_COLOR: Record<string, BadgeColor<"pill-color">> = {
    Live: "success",
    UAT: "amber",
};

const ArticleGrid = ({ articles }: { articles: Article[] }) => (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {articles.map((article) => (
            <div key={article.id} className="relative">
                {article.stage && (
                    <BadgeWithDot type="pill-color" size="sm" color={STAGE_BADGE_COLOR[article.stage] ?? "gray"} className="absolute top-3 right-3 z-10">
                        {article.stage}
                    </BadgeWithDot>
                )}
                <CardFullWidthImage01Vertical article={article} openInNewTab />
            </div>
        ))}
    </div>
);

export const PlayFilterGrid = ({ articles }: { articles: Article[] }) => {
    const categories = useMemo(() => {
        const seen = new Set<string>();
        for (const article of articles) {
            seen.add(article.category.name);
        }
        return Array.from(seen);
    }, [articles]);

    return (
        <Tabs>
            <Tabs.List type="button-brand" size="md" aria-label="Filter play items by type" className="mb-8 md:mb-12">
                <Tabs.Item id="all" label="All" />
                {categories.map((category) => (
                    <Tabs.Item key={category} id={category} label={category} />
                ))}
            </Tabs.List>

            <Tabs.Panel id="all">
                <ArticleGrid articles={articles} />
            </Tabs.Panel>
            {categories.map((category) => (
                <Tabs.Panel key={category} id={category}>
                    <ArticleGrid articles={articles.filter((article) => article.category.name === category)} />
                </Tabs.Panel>
            ))}
        </Tabs>
    );
};
