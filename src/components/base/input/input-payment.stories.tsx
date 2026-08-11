import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { expect, userEvent } from "storybook/test";

import { PaymentInput } from "./input-payment";

const meta = {
    title: "Base/Input/PaymentInput",
    component: PaymentInput,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    decorators: [(Story) => <div className="w-80">{Story()}</div>],
    args: {
        label: "Card number",
        placeholder: "1234 1234 1234 1234",
    },
} satisfies Meta<typeof PaymentInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    play: async ({ canvas }) => {
        const input = canvas.getByPlaceholderText("1234 1234 1234 1234");
        await userEvent.type(input, "4111111111111111");
        await expect(input).toHaveValue("4111 1111 1111 1111");
    },
};

export const MastercardDetected: Story = {
    play: async ({ canvas }) => {
        const input = canvas.getByPlaceholderText("1234 1234 1234 1234");
        await userEvent.type(input, "5500000000000004");
        await expect(input).toHaveValue("5500 0000 0000 0004");
    },
};

export const WithHint: Story = {
    args: {
        hint: "We accept Visa, Mastercard, American Express, Discover, and UnionPay.",
    },
};

export const Invalid: Story = {
    args: {
        isInvalid: true,
        hint: "Enter a valid card number.",
    },
};

export const Disabled: Story = {
    args: {
        isDisabled: true,
        defaultValue: "4111111111111111",
    },
};
