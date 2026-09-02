"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { WORK_SESSION_COOKIE, passwordsMatch, signSession } from "@/lib/work-auth";

export interface WorkAuthState {
    status: "idle" | "error";
    message?: string;
}

const GENERIC_ERROR = "Something went wrong on our end, please try again later.";

export async function unlockWork(_prevState: WorkAuthState, formData: FormData): Promise<WorkAuthState> {
    const password = formData.get("password")?.toString() ?? "";

    const expectedPassword = process.env.WORK_PASSWORD;
    if (!expectedPassword || !process.env.WORK_AUTH_SECRET) {
        console.error("WORK_PASSWORD or WORK_AUTH_SECRET is not set; /work cannot be unlocked.");
        return { status: "error", message: GENERIC_ERROR };
    }

    if (!password || !passwordsMatch(password, expectedPassword)) {
        return { status: "error", message: "Incorrect password." };
    }

    const session = signSession();
    if (!session) {
        console.error("signSession() returned null despite WORK_AUTH_SECRET being set.");
        return { status: "error", message: GENERIC_ERROR };
    }

    (await cookies()).set(WORK_SESSION_COOKIE, session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/work",
        maxAge: 60 * 60 * 24 * 30,
    });

    redirect("/work");
}
