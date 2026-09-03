import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NavbarSimple } from "@/components/marketing/header-navigation/navbar-simple";
import { getNavLinks } from "@/components/marketing/header-navigation/nav-links";
import { FooterLarge01Brand } from "@/components/marketing/footers/footer-large-01-brand";
import { getContactContent, getPageSeo } from "@/lib/notion";
import { ContactForm } from "./contact-form";

/** Serve a cached page and re-fetch Notion in the background at most every 5 minutes, instead of
 * hitting Notion on every single visitor request. */
export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
    const { title, description } = await getPageSeo("/contact", {
        title: "Contact — Erika Aldrich Murga",
        description: "Get in touch with Erika Aldrich Murga.",
    });
    return { title, description };
}

export default async function Contact() {
    const { heading, body, published } = await getContactContent();
    if (!published) notFound();

    const links = await getNavLinks();

    return (
        <div className="flex min-h-screen flex-col">
            <NavbarSimple links={links} />

            <main className="flex-1 bg-secondary">
                <div className="mx-auto w-full max-w-3xl px-4 py-16 md:px-8 md:py-24">
                    <h1 className="text-display-xl text-primary">{heading}</h1>
                    <p className="mt-4 text-lg text-tertiary">{body}</p>

                    <div className="mt-10">
                        <ContactForm />
                    </div>
                </div>
            </main>

            <FooterLarge01Brand />
        </div>
    );
}
