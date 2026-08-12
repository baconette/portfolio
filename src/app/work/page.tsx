import type { Metadata } from "next";
import { NavbarSimple } from "@/components/marketing/header-navigation/navbar-simple";
import { HeaderCenteredBrand } from "@/components/marketing/header-section/header-centered-brand";
import type { Article } from "@/components/marketing/blog/base-components/blog-cards";
import { FooterLarge01Brand } from "@/components/marketing/footers/footer-large-01-brand";
import { getPortfolioProjects, getPageSeo } from "@/lib/notion";
import { WorkFilterGrid } from "./work-filter-grid";

export async function generateMetadata(): Promise<Metadata> {
  const { title, description } = await getPageSeo("/work", {
    title: "Work — Erika Aldrich Murga",
    description: "Case studies and product work by Erika Aldrich Murga.",
  });
  return { title, description };
}

const sampleArticles: Article[] = [
  {
    id: "1",
    href: "#",
    thumbnailUrl: "https://www.untitledui.com/images/blog/blog-post-01.webp",
    title: "Redesigning the onboarding flow",
    summary: "A look at how we cut time-to-first-value in half through user research and iterative prototyping.",
    category: { href: "#", name: "Case Study" },
    author: { href: "#", name: "Erika Grijalva", avatarUrl: "https://www.untitledui.com/images/avatars/avatar-01.webp" },
    publishedAt: "Jan 12, 2026",
    readingTime: "8 min read",
    tags: [{ name: "UX Research", color: "brand", href: "#" }],
    roles: ["Lead UX Researcher"],
  },
  {
    id: "2",
    href: "#",
    thumbnailUrl: "https://www.untitledui.com/images/blog/blog-post-02.webp",
    title: "Building a scalable design system",
    summary: "How a token-driven design system helped a product team ship consistent UI 3x faster.",
    category: { href: "#", name: "Case Study" },
    author: { href: "#", name: "Erika Grijalva", avatarUrl: "https://www.untitledui.com/images/avatars/avatar-01.webp" },
    publishedAt: "Feb 3, 2026",
    readingTime: "6 min read",
    tags: [{ name: "Design Systems", color: "brand", href: "#" }],
    roles: ["Lead Product Designer"],
  },
  {
    id: "3",
    href: "#",
    thumbnailUrl: "https://www.untitledui.com/images/blog/blog-post-03.webp",
    title: "From service blueprint to shipped product",
    summary: "Mapping a fragmented customer journey into a single, testable workflow.",
    category: { href: "#", name: "Case Study" },
    author: { href: "#", name: "Erika Grijalva", avatarUrl: "https://www.untitledui.com/images/avatars/avatar-01.webp" },
    publishedAt: "Mar 21, 2026",
    readingTime: "10 min read",
    tags: [{ name: "Product Strategy", color: "brand", href: "#" }],
    roles: ["Product Strategist", "Product Owner"],
  },
];

export default async function Work() {
  const projects = await getPortfolioProjects();
  const articles = projects.length > 0 ? projects : sampleArticles;

  return (
    <div className="flex min-h-screen flex-col">
      <NavbarSimple />
      <HeaderCenteredBrand short />

      <main className="bg-secondary">
        <div className="mx-auto w-full max-w-container px-4 py-16 md:px-8 md:py-24">
          <WorkFilterGrid articles={articles} />
        </div>
      </main>

      <FooterLarge01Brand />
    </div>
  );
}
