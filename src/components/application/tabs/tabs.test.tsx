import { describe, expect, it } from "vitest";
import { getTabStyles } from "./tabs";

const state = (overrides: Partial<{ isFocusVisible: boolean; isSelected: boolean; isHovered: boolean }>) => ({
    isFocusVisible: false,
    isSelected: false,
    isHovered: false,
    ...overrides,
});

describe("getTabStyles", () => {
    it("applies the selected/hover highlight class for button-brand when selected", () => {
        const classes = getTabStyles(state({ isSelected: true }) as never)["button-brand"];
        expect(classes).toContain("bg-brand-primary_alt");
        expect(classes).toContain("text-brand-secondary");
    });

    it("omits the highlight class for button-brand when neither selected nor hovered", () => {
        const classes = getTabStyles(state({}) as never)["button-brand"];
        expect(classes).not.toContain("bg-brand-primary_alt");
    });

    it("applies the focus-visible outline classes when focus is visible", () => {
        const classes = getTabStyles(state({ isFocusVisible: true }) as never)["button-gray"];
        expect(classes).toContain("outline-2");
        expect(classes).toContain("-outline-offset-2");
    });

    it("applies a distinct highlight class set for the underline type", () => {
        const classes = getTabStyles(state({ isHovered: true }) as never).underline;
        expect(classes).toContain("border-fg-brand-primary_alt");
    });
});
