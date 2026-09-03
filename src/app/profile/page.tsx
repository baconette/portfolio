import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NavbarSimple } from "@/components/marketing/header-navigation/navbar-simple";
import { getNavLinks } from "@/components/marketing/header-navigation/nav-links";
import { FooterLarge01Brand } from "@/components/marketing/footers/footer-large-01-brand";
import { getCaseStudy, getPageSeo } from "@/lib/notion";
import { NotionContent } from "@/app/work/[slug]/notion-content";

const FALLBACK_TITLE = "Erika Aldrich Murga — Profile";
const FALLBACK_DESCRIPTION = "Erika is an experienced brand strategist and product designer for high-stakes and complex systems.";

export async function generateMetadata(): Promise<Metadata> {
    const { title, description } = await getPageSeo("/profile", {
        title: FALLBACK_TITLE,
        description: FALLBACK_DESCRIPTION,
    });
    return { title, description };
}

export default async function Profile() {
    const profile = await getCaseStudy("/profile");
    if (!profile) notFound();

    const links = await getNavLinks();

    return (
        <div className="flex min-h-screen flex-col">
            <NavbarSimple links={links} />

            <main className="flex-1 bg-primary">
                <div className="mx-auto w-full max-w-3xl px-4 py-16 md:px-8 md:py-24">
                    <NotionContent blocks={profile.blocks} />
                </div>
            </main>

            <FooterLarge01Brand />
        </div>
    );
}
