import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NavbarExtraSimple } from "@/components/marketing/header-navigation/navbar-extrasimple";
import { HeaderCenteredBrand } from "@/components/marketing/header-section/header-centered-brand";
import { FooterLarge01Brand } from "@/components/marketing/footers/footer-large-01-brand";
import { getPageSeo, isPagePublished } from "@/lib/notion";
import { HomepageIntroSection } from "./homepage-intro-section";

export async function generateMetadata(): Promise<Metadata> {
  const { title, description } = await getPageSeo("/", {
    title: "Erika Aldrich Murga",
    description: "Product strategy and design portfolio of Erika Aldrich Murga.",
  });
  return { title, description };
}

export default async function Home() {
  if (!(await isPagePublished("/"))) notFound();

  return (
    <div className="flex min-h-screen flex-col">
      <NavbarExtraSimple />
      <HeaderCenteredBrand short />
      <HomepageIntroSection />

      <FooterLarge01Brand />
    </div>
  );
}
