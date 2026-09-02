import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { WorkPasswordForm } from "./work-password-form";
import * as actions from "./actions";

describe("WorkPasswordForm", () => {
    it("renders a password input and submit button", () => {
        render(<WorkPasswordForm />);
        expect(screen.getByLabelText(/Password/)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Unlock" })).toBeInTheDocument();
    });

    it("surfaces the error message when unlockWork resolves to an error state", async () => {
        vi.spyOn(actions, "unlockWork").mockResolvedValue({
            status: "error",
            message: "Incorrect password.",
        });

        const user = userEvent.setup();
        render(<WorkPasswordForm />);

        await user.type(screen.getByLabelText(/Password/), "wrong-password");
        await user.click(screen.getByRole("button", { name: "Unlock" }));

        expect(await screen.findByRole("status")).toHaveTextContent("Incorrect password.");
    });
});
