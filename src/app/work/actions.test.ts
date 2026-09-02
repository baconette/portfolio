import { describe, expect, it } from "vitest";
import { passwordsMatch } from "./actions";

describe("passwordsMatch", () => {
    it("returns true for identical strings", () => {
        expect(passwordsMatch("hunter2", "hunter2")).toBe(true);
    });

    it("returns false for different strings of the same length", () => {
        expect(passwordsMatch("hunter2", "hunter3")).toBe(false);
    });

    it("returns false (not throw) when lengths differ", () => {
        // node:crypto's timingSafeEqual throws on unequal-length buffers — passwordsMatch must
        // guard that itself rather than letting a mismatched-length password 500 the request.
        expect(() => passwordsMatch("short", "a-much-longer-password")).not.toThrow();
        expect(passwordsMatch("short", "a-much-longer-password")).toBe(false);
    });

    it("returns false for an empty submitted password against a non-empty expected one", () => {
        expect(passwordsMatch("", "hunter2")).toBe(false);
    });
});
