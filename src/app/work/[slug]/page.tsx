import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NavbarSimple } from "@/components/marketing/header-navigation/navbar-simple";
import { HeaderCenteredCaseStudy } from "@/components/marketing/header-section/header-centered-casestudy";
import { FooterLarge01Brand } from "@/components/marketing/footers/footer-large-01-brand";
import { getCaseStudy, getPageSeo } from "@/lib/notion";
import { NotionContent } from "./notion-content";
import { BackToPortfolio } from "./back-to-portfolio";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const caseStudy = await getCaseStudy(`/work/${slug}`);
    const { title, description } = await getPageSeo(`/work/${slug}`, {
        title: caseStudy ? `${caseStudy.title} — Erika Aldrich Murga` : "Case Study — Erika Aldrich Murga",
        description: "A case study by Erika Aldrich Murga.",
    });
    return { title, description };
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const caseStudy = await getCaseStudy(`/work/${slug}`);
    if (!caseStudy) notFound();

    return (
        <div className="flex min-h-screen flex-col">
            <NavbarSimple />
            <HeaderCenteredCaseStudy coverUrl={caseStudy.coverUrl} title={caseStudy.title} />
            <BackToPortfolio />

            <main className="flex-1 bg-primary">
                <div className="mx-auto w-full max-w-3xl px-4 py-16 md:px-8 md:py-24">
                    <NotionContent blocks={caseStudy.blocks} />
                </div>
            </main>

            <FooterLarge01Brand />
        </div>
    );
}
