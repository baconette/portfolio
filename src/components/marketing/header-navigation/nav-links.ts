import { cache } from "react";
import { isPagePublished } from "@/lib/notion";

const NAV_LINKS = [
    { label: "Profile", href: "/profile" },
    { label: "Work", href: "/work" },
    { label: "Play", href: "/play" },
    { label: "Contact", href: "/contact" },
];

/** Static nav routes, filtered down to whichever are currently Published in the Portfolio CMS.
 * Wrapped in React's `cache()` so every page that renders the nav shares one set of publish checks
 * per request, on top of `isPagePublished` itself already deduping each individual slug. */
export const getNavLinks = cache(async (): Promise<{ label: string; href: string }[]> => {
    const publishedFlags = await Promise.all(NAV_LINKS.map((link) => isPagePublished(link.href)));
    return NAV_LINKS.filter((_, i) => publishedFlags[i]);
});
