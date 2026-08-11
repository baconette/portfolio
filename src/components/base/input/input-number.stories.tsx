import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { expect, userEvent } from "storybook/test";

import { InputNumber } from "./input-number";

const meta = {
    title: "Base/Input/InputNumber",
    component: InputNumber,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    decorators: [(Story) => <div className="w-80">{Story()}</div>],
    args: {
        label: "Quantity",
        defaultValue: 1,
        minValue: 0,
    },
} satisfies Meta<typeof InputNumber>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    play: async ({ canvas, canvasElement }) => {
        const input = canvas.getByRole("textbox");
        await expect(input).toHaveValue("1");

        const incrementButton = canvasElement.querySelector<HTMLButtonElement>('[slot="increment"]');
        await userEvent.click(incrementButton!);
        await expect(input).toHaveValue("2");
    },
};

export const Horizontal: Story = {
    args: {
        orientation: "horizontal",
    },
};

export const WithHint: Story = {
    args: {
        hint: "Up to 10 units per order.",
        maxValue: 10,
    },
};

export const Disabled: Story = {
    args: {
        isDisabled: true,
    },
};
