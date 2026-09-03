import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NavbarSimple } from "@/components/marketing/header-navigation/navbar-simple";
import { getNavLinks } from "@/components/marketing/header-navigation/nav-links";
import { HeaderCenteredBrand } from "@/components/marketing/header-section/header-centered-brand";
import { FooterLarge01Brand } from "@/components/marketing/footers/footer-large-01-brand";
import { getPlayProjects, isPagePublished } from "@/lib/notion";
import { PlayFilterGrid } from "./play-filter-grid";

export const metadata: Metadata = {
    title: "Play — Erika Aldrich Murga",
    description: "Experiments and side projects by Erika Aldrich Murga.",
};

export default async function Play() {
    if (!(await isPagePublished("/play"))) notFound();

    const projects = await getPlayProjects();
    const links = await getNavLinks();

    return (
        <div className="flex min-h-screen flex-col">
            <NavbarSimple links={links} />
            <HeaderCenteredBrand short />

            <main className="bg-secondary">
                <div className="mx-auto w-full max-w-container px-4 py-16 md:px-8 md:py-24">
                    <PlayFilterGrid articles={projects} />
                </div>
            </main>

            <FooterLarge01Brand />
        </div>
    );
}
