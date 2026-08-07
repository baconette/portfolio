import type { Metadata } from "next";
import { NavbarSimple } from "@/components/marketing/header-navigation/navbar-simple";
import { FooterLarge01Brand } from "@/components/marketing/footers/footer-large-01-brand";
import { getPageSeo } from "@/lib/notion";
import { ContactForm } from "./contact-form";

export async function generateMetadata(): Promise<Metadata> {
    const { title, description } = await getPageSeo("/contact", {
        title: "Contact — Erika Aldrich Murga",
        description: "Get in touch with Erika Aldrich Murga.",
    });
    return { title, description };
}

export default function Contact() {
    return (
        <div className="flex min-h-screen flex-col">
            <NavbarSimple />

            <main className="flex-1 bg-secondary">
                <div className="mx-auto w-full max-w-3xl px-4 py-16 md:px-8 md:py-24">
                    <h1 className="text-display-xl text-primary">Get in touch</h1>
                    <p className="mt-4 text-lg text-tertiary">Have a project in mind or just want to say hello? Send a message below.</p>

                    <div className="mt-10">
                        <ContactForm />
                    </div>
                </div>
            </main>

            <FooterLarge01Brand />
        </div>
    );
}
