import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NavbarSimple } from "@/components/marketing/header-navigation/navbar-simple";
import { getNavLinks } from "@/components/marketing/header-navigation/nav-links";
import { HeaderCenteredBrand } from "@/components/marketing/header-section/header-centered-brand";
import { FooterLarge01Brand } from "@/components/marketing/footers/footer-large-01-brand";
import { getCaseStudy, getPlayProjects, isPagePublished } from "@/lib/notion";
import { NotionContent } from "@/app/work/[slug]/notion-content";
import { PlayFilterGrid } from "./play-filter-grid";

export const metadata: Metadata = {
    title: "Play — Erika Aldrich Murga",
    description: "Experiments and side projects by Erika Aldrich Murga.",
};

/** Serve a cached page and re-fetch Notion in the background at most every 5 minutes, instead of
 * hitting Notion on every single visitor request. */
export const revalidate = 300;

export default async function Play() {
    if (!(await isPagePublished("/play"))) notFound();

    const projects = await getPlayProjects();
    const links = await getNavLinks();
    const intro = await getCaseStudy("/play");

    return (
        <div className="flex min-h-screen flex-col">
            <NavbarSimple links={links} />
            <HeaderCenteredBrand short compact />

            <main className="bg-secondary">
                <div className="mx-auto w-full max-w-container px-4 py-16 md:px-8 md:py-24">
                    {intro && intro.blocks.length > 0 && (
                        <div className="mx-auto mb-8 max-w-3xl text-center md:mb-12 [&_p]:text-xl [&_p]:text-primary">
                            <NotionContent blocks={intro.blocks} />
                        </div>
                    )}
                    <PlayFilterGrid articles={projects} />
                </div>
            </main>

            <FooterLarge01Brand />
        </div>
    );
}
