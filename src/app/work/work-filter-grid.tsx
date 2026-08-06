"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/base/buttons/button";
import { CardFullWidthImage01Vertical, type Article } from "@/components/marketing/blog/base-components/blog-cards";

export const WorkFilterGrid = ({ articles }: { articles: Article[] }) => {
    const categories = useMemo(() => {
        const seen = new Set<string>();
        for (const article of articles) {
            seen.add(article.category.name);
        }
        return Array.from(seen);
    }, [articles]);

    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const visibleArticles = activeCategory ? articles.filter((article) => article.category.name === activeCategory) : articles;

    return (
        <>
            <div className="mb-8 flex flex-wrap gap-2 md:mb-12">
                <Button size="md" color={activeCategory === null ? "primary" : "secondary"} onPress={() => setActiveCategory(null)}>
                    All
                </Button>
                {categories.map((category) => (
                    <Button key={category} size="md" color={activeCategory === category ? "primary" : "secondary"} onPress={() => setActiveCategory(category)}>
                        {category}
                    </Button>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {visibleArticles.map((article) => (
                    <CardFullWidthImage01Vertical key={article.id} article={article} />
                ))}
            </div>
        </>
    );
};
