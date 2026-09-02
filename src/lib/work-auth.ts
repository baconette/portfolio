import { createHmac, timingSafeEqual } from "node:crypto";

export const WORK_SESSION_COOKIE = "work_session";

const SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000;

function hmac(expiresAtMs: string, secret: string): string {
    return createHmac("sha256", secret).update(expiresAtMs).digest("hex");
}

/**
 * Unlike the rest of this codebase's Notion helpers, which fall back to sample data when
 * unconfigured, an unset WORK_AUTH_SECRET must fail closed — there is no safe fallback that
 * doesn't mean "let everyone in."
 */
export function signSession(): string | null {
    const secret = process.env.WORK_AUTH_SECRET;
    if (!secret) return null;

    const expiresAtMs = String(Date.now() + SESSION_DURATION_MS);
    return `${expiresAtMs}.${hmac(expiresAtMs, secret)}`;
}

export function passwordsMatch(submitted: string, expected: string): boolean {
    const submittedBuf = Buffer.from(submitted);
    const expectedBuf = Buffer.from(expected);
    // Lengths must match for timingSafeEqual; a length mismatch alone is not a meaningful timing
    // side-channel here since the password isn't secret-derived per-byte in a way worth padding for.
    if (submittedBuf.length !== expectedBuf.length) return false;
    return timingSafeEqual(submittedBuf, expectedBuf);
}

export function verifySession(cookieValue: string | undefined): boolean {
    const secret = process.env.WORK_AUTH_SECRET;
    if (!secret || !cookieValue) return false;

    const [expiresAtMs, signature] = cookieValue.split(".");
    if (!expiresAtMs || !signature) return false;
    if (Date.now() >= Number(expiresAtMs)) return false;

    const expected = hmac(expiresAtMs, secret);
    try {
        return timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
    } catch {
        return false;
    }
}
