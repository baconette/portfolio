import "@testing-library/jest-dom/vitest";

// react-aria-components (used by the Tabs component) relies on browser APIs jsdom doesn't
// implement — polyfill the minimum needed for interaction tests to run.
if (typeof window !== "undefined") {
    if (!window.ResizeObserver) {
        window.ResizeObserver = class {
            observe() {}
            unobserve() {}
            disconnect() {}
        } as unknown as typeof ResizeObserver;
    }

    if (!window.HTMLElement.prototype.scrollIntoView) {
        window.HTMLElement.prototype.scrollIntoView = () => {};
    }

    if (!window.HTMLElement.prototype.hasPointerCapture) {
        window.HTMLElement.prototype.hasPointerCapture = () => false;
    }
    if (!window.HTMLElement.prototype.setPointerCapture) {
        window.HTMLElement.prototype.setPointerCapture = () => {};
    }
    if (!window.HTMLElement.prototype.releasePointerCapture) {
        window.HTMLElement.prototype.releasePointerCapture = () => {};
    }
}
