import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { expect, userEvent } from "storybook/test";

import { TextArea } from "./textarea";

const meta = {
    title: "Base/Input/TextArea",
    component: TextArea,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    decorators: [(Story) => <div className="w-80">{Story()}</div>],
    args: {
        label: "Bio",
        placeholder: "Tell us a little about yourself...",
    },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    play: async ({ canvas }) => {
        const textarea = canvas.getByPlaceholderText("Tell us a little about yourself...");
        await userEvent.type(textarea, "Product designer based in Los Angeles.");
        await expect(textarea).toHaveValue("Product designer based in Los Angeles.");
    },
};

export const WithHint: Story = {
    args: {
        hint: "Maximum 200 characters.",
    },
};

export const Invalid: Story = {
    args: {
        isInvalid: true,
        hint: "Bio is required.",
    },
};

export const Disabled: Story = {
    args: {
        isDisabled: true,
        defaultValue: "Product designer based in Los Angeles.",
    },
};

export const Small: Story = {
    args: {
        size: "sm",
        rows: 3,
    },
};
