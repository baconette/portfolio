import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { expect, userEvent } from "storybook/test";

import { Button } from "@/components/base/buttons/button";
import { InputBase } from "./input";
import { InputGroup } from "./input-group";

const meta = {
    title: "Base/Input/InputGroup",
    component: InputGroup,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    decorators: [(Story) => <div className="w-80">{Story()}</div>],
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithPrefix: Story = {
    args: {
        label: "Website",
        prefix: "https://",
        children: <InputBase placeholder="www.example.com" />,
    },
    play: async ({ canvas }) => {
        const input = canvas.getByPlaceholderText("www.example.com");
        await userEvent.type(input, "erikaaldrichmurga.com");
        await expect(input).toHaveValue("erikaaldrichmurga.com");
    },
};

export const WithTrailingAddon: Story = {
    args: {
        label: "Coupon code",
        children: <InputBase placeholder="Enter code" />,
        trailingAddon: (
            <Button size="md" color="secondary">
                Apply
            </Button>
        ),
    },
};

export const WithHint: Story = {
    args: {
        label: "Website",
        prefix: "https://",
        hint: "Include the full domain, without a trailing slash.",
        children: <InputBase placeholder="www.example.com" />,
    },
};
