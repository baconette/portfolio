import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NavbarSimple } from "@/components/marketing/header-navigation/navbar-simple";
import { getNavLinks } from "@/components/marketing/header-navigation/nav-links";
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

  const links = await getNavLinks();

  return (
    <div className="flex min-h-screen flex-col">
      <NavbarSimple links={links} />
      <HeaderCenteredBrand short />
      <HomepageIntroSection />

      <FooterLarge01Brand />
    </div>
  );
}
