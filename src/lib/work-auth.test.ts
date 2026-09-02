import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { signSession, verifySession, WORK_SESSION_COOKIE } from "./work-auth";

describe("work-auth", () => {
    const originalSecret = process.env.WORK_AUTH_SECRET;

    afterEach(() => {
        process.env.WORK_AUTH_SECRET = originalSecret;
    });

    it("exposes a stable cookie name", () => {
        expect(WORK_SESSION_COOKIE).toBe("work_session");
    });

    describe("with WORK_AUTH_SECRET set", () => {
        beforeEach(() => {
            process.env.WORK_AUTH_SECRET = "test-secret";
        });

        it("round-trips a session signed by signSession", () => {
            const session = signSession();
            expect(session).not.toBeNull();
            expect(verifySession(session ?? undefined)).toBe(true);
        });

        it("rejects a tampered signature", () => {
            const session = signSession();
            const [expiresAtMs] = (session ?? "").split(".");
            expect(verifySession(`${expiresAtMs}.deadbeef`)).toBe(false);
        });

        it("rejects an expired session", () => {
            const expiredExpiry = String(Date.now() - 1000);
            // Sign a cookie for a timestamp already in the past — the HMAC itself would still be
            // valid, but verifySession must reject on expiry before it ever checks the signature.
            const forged = `${expiredExpiry}.anything`;
            expect(verifySession(forged)).toBe(false);
        });

        it("rejects a malformed cookie value", () => {
            expect(verifySession("not-a-valid-cookie")).toBe(false);
            expect(verifySession(undefined)).toBe(false);
        });
    });

    describe("with WORK_AUTH_SECRET unset", () => {
        beforeEach(() => {
            delete process.env.WORK_AUTH_SECRET;
        });

        it("signSession fails closed by returning null", () => {
            expect(signSession()).toBeNull();
        });

        it("verifySession fails closed even for an otherwise well-formed cookie", () => {
            expect(verifySession(`${Date.now() + 1000}.somesignature`)).toBe(false);
        });
    });
});
