declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
        dataLayer?: unknown[];
    }
}
export {};

type GtagEventParams = Record<string, string | number | boolean | undefined>;

/** No-ops when gtag isn't loaded (env var unset, ad blocker, or during SSR) instead of throwing. */
export function trackEvent(name: string, params?: GtagEventParams): void {
    if (typeof window === "undefined") return;
    if (typeof window.gtag !== "function") return;
    window.gtag("event", name, params);
}
