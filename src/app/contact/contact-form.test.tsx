import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "./contact-form";
import * as actions from "./actions";

describe("ContactForm", () => {
    it("renders the honeypot field hidden and outside the tab order", () => {
        render(<ContactForm />);
        const honeypot = screen.getByLabelText("Company", { selector: "input" });

        expect(honeypot).toHaveAttribute("tabIndex", "-1");
        expect(honeypot.closest("div")).toHaveAttribute("aria-hidden", "true");
    });

    it("renders an error message when the submit action resolves to an error state", async () => {
        vi.spyOn(actions, "sendContactMessage").mockResolvedValue({
            status: "error",
            message: "Please fill in every field.",
        });

        const user = userEvent.setup();
        render(<ContactForm />);

        await user.type(screen.getByLabelText(/Full name/), "Ray-Bernice Eames");
        await user.type(screen.getByLabelText(/Email/), "ray@eames.com");
        await user.type(screen.getByLabelText(/Message/), "Tell me more.");
        await user.click(screen.getByRole("button", { name: "Send message" }));

        expect(await screen.findByRole("status")).toHaveTextContent("Please fill in every field.");
    });
});
