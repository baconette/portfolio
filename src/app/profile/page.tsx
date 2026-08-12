import type { Metadata } from "next";
import { NavbarSimple } from "@/components/marketing/header-navigation/navbar-simple";
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

    return (
        <div className="flex min-h-screen flex-col">
            <NavbarSimple />

            <main className="flex-1 bg-primary">
                <div className="mx-auto w-full max-w-3xl px-4 py-16 md:px-8 md:py-24">
                    {profile ? (
                        <NotionContent blocks={profile.blocks} />
                    ) : (
                        <div className="flex flex-col gap-6">
                            <h2 className="text-display-lg text-primary">About Erika</h2>
                            <p className="text-md text-tertiary">
                                Erika is a systems thinker and avid learner of new problem spaces. A traditionally trained visual designer and self-taught brand and experience
                                strategist. For 15 years, she&apos;s been combining design principles, psychology, and behavioral economics to orchestrate digital and physical
                                experiences.
                            </p>
                            <p className="text-md text-tertiary">
                                Her experience spans a multitude of problem spaces, including civic technology, media impact, financial technology, automotive, and healthcare
                                services.
                            </p>
                            <p className="text-md text-tertiary">
                                Her passion is leading and facilitating conversations among multidisciplinary teams to enable alignment and inclusive creative exploration.
                            </p>
                            <p className="text-md text-tertiary">Erika believes the products and services we design are only as good as the diversity of the teams building them.</p>
                        </div>
                    )}
                </div>
            </main>

            <FooterLarge01Brand />
        </div>
    );
}
