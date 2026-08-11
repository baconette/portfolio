import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Mail01 } from "@untitledui/icons";
import { expect, userEvent } from "storybook/test";

import { Input } from "./input";

const meta = {
    title: "Base/Input/Input",
    component: Input,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    decorators: [(Story) => <div className="w-80">{Story()}</div>],
    args: {
        label: "Email",
        placeholder: "you@example.com",
    },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    play: async ({ canvas }) => {
        const input = canvas.getByPlaceholderText("you@example.com");
        await userEvent.type(input, "erika@example.com");
        await expect(input).toHaveValue("erika@example.com");
    },
};

export const WithIcon: Story = {
    args: {
        icon: Mail01,
    },
};

export const WithHint: Story = {
    args: {
        hint: "We'll only use this to contact you about your order.",
    },
};

export const Password: Story = {
    args: {
        label: "Password",
        type: "password",
        placeholder: "Enter your password",
    },
    play: async ({ canvas }) => {
        const input = canvas.getByPlaceholderText("Enter your password");
        await userEvent.type(input, "correct-horse-battery-staple");
        await expect(input).toHaveAttribute("type", "password");

        const toggle = canvas.getByRole("button", { name: "Toggle password visibility" });
        await userEvent.click(toggle);
        await expect(input).toHaveAttribute("type", "text");

        await userEvent.click(toggle);
        await expect(input).toHaveAttribute("type", "password");
    },
};

export const Invalid: Story = {
    args: {
        isInvalid: true,
        hint: "Enter a valid email address.",
        defaultValue: "not-an-email",
    },
};

export const Disabled: Story = {
    args: {
        isDisabled: true,
        defaultValue: "erika@example.com",
    },
};

export const Required: Story = {
    args: {
        isRequired: true,
    },
};
