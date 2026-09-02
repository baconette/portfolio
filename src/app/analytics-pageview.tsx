"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

/** @next/third-parties' <GoogleAnalytics> only fires its initial gtag config call once on mount —
 * it does not track subsequent client-side route changes, so App Router navigations between pages
 * (e.g. via next/link) never produce additional GA4 pageviews without this. */
export const AnalyticsPageview = () => {
    const pathname = usePathname();
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return; // the initial page load is already tracked by GoogleAnalytics' own config call
        }
        trackEvent("page_view", { page_location: window.location.href, page_title: document.title });
    }, [pathname]);

    return null;
};
