import { isPagePublished } from "@/lib/notion";

const NAV_LINKS = [
    { label: "Profile", href: "/profile" },
    { label: "Work", href: "/work" },
    { label: "Play", href: "/play" },
    { label: "Contact", href: "/contact" },
];

/** Static nav routes, filtered down to whichever are currently Published in the Portfolio CMS. */
export async function getNavLinks(): Promise<{ label: string; href: string }[]> {
    const publishedFlags = await Promise.all(NAV_LINKS.map((link) => isPagePublished(link.href)));
    return NAV_LINKS.filter((_, i) => publishedFlags[i]);
}
