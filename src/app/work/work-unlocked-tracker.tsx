"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/** Fires a one-time work_unlock_attempt(success) event when the /work session gate has already
 * passed server-side — see WorkLayout, which only renders this when verifySession succeeds. */
export const WorkUnlockedTracker = () => {
    useEffect(() => {
        trackEvent("work_unlock_attempt", { result: "success" });
    }, []);

    return null;
};
