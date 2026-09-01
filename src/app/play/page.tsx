import type { Metadata } from "next";
import { NavbarSimple } from "@/components/marketing/header-navigation/navbar-simple";
import { HeaderCenteredBrand } from "@/components/marketing/header-section/header-centered-brand";
import { CardFullWidthImage01Vertical } from "@/components/marketing/blog/base-components/blog-cards";
import { FooterLarge01Brand } from "@/components/marketing/footers/footer-large-01-brand";
import { getPlayProjects } from "@/lib/notion";

export const metadata: Metadata = {
    title: "Play — Erika Aldrich Murga",
    description: "Experiments and side projects by Erika Aldrich Murga.",
};

export default async function Play() {
    const projects = await getPlayProjects();

    return (
        <div className="flex min-h-screen flex-col">
            <NavbarSimple />
            <HeaderCenteredBrand short />

            <main className="bg-secondary">
                <div className="mx-auto w-full max-w-container px-4 py-16 md:px-8 md:py-24">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {projects.map((project) => (
                            <CardFullWidthImage01Vertical key={project.id} article={project} openInNewTab />
                        ))}
                    </div>
                </div>
            </main>

            <FooterLarge01Brand />
        </div>
    );
}
