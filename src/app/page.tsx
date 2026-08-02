import { NavbarExtraSimple } from "@/components/marketing/header-navigation/navbar-extrasimple";
import { HeaderCenteredBrand } from "@/components/marketing/header-section/header-centered-brand";
import { FooterLarge01Brand } from "@/components/marketing/footers/footer-large-01-brand";

export default function Home() {
  return (
    <div className="flex flex-col">
      <NavbarExtraSimple />
      <HeaderCenteredBrand />

      <FooterLarge01Brand />
    </div>
  );
}
