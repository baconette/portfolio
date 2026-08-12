"use client";

import { useMemo } from "react";
import { Tabs } from "@/components/application/tabs/tabs";
import { CardFullWidthImage01Vertical, type Article } from "@/components/marketing/blog/base-components/blog-cards";

const ArticleGrid = ({ articles }: { articles: Article[] }) => (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {articles.map((article) => (
            <CardFullWidthImage01Vertical key={article.id} article={article} />
        ))}
    </div>
);

export const WorkFilterGrid = ({ articles }: { articles: Article[] }) => {
    const categories = useMemo(() => {
        const seen = new Set<string>();
        for (const article of articles) {
            seen.add(article.category.name);
        }
        return Array.from(seen);
    }, [articles]);

    return (
        <Tabs>
            <Tabs.List type="button-brand" size="md" aria-label="Filter case studies by type" className="mb-8 flex-wrap gap-y-2 md:mb-12">
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
