import type { Metadata } from "next";
import { NavbarExtraSimple } from "@/components/marketing/header-navigation/navbar-extrasimple";
import { HeaderCenteredBrand } from "@/components/marketing/header-section/header-centered-brand";
import { FooterLarge01Brand } from "@/components/marketing/footers/footer-large-01-brand";
import { getPageSeo } from "@/lib/notion";

export async function generateMetadata(): Promise<Metadata> {
  const { title, description } = await getPageSeo("/", {
    title: "Erika Aldrich Murga",
    description: "Product strategy and design portfolio of Erika Aldrich Murga.",
  });
  return { title, description };
}

export default function Home() {
  return (
    <div className="flex flex-col">
      <NavbarExtraSimple />
      <HeaderCenteredBrand />

      <FooterLarge01Brand />
    </div>
  );
}
