import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ArrowRight, Plus } from "@untitledui/icons";
import { expect, fn, userEvent } from "storybook/test";

import { Button, styles } from "./button";

const meta = {
    title: "Base/Buttons/Button",
    component: Button,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        color: { control: "select", options: Object.keys(styles.colors) },
        size: { control: "select", options: Object.keys(styles.sizes) },
        isDisabled: { control: "boolean" },
        isLoading: { control: "boolean" },
        showTextWhileLoading: { control: "boolean" },
    },
    args: {
        children: "Button",
        onPress: fn(),
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        color: "primary",
    },
    play: async ({ canvas, args }) => {
        await userEvent.click(canvas.getByRole("button", { name: "Button" }));
        await expect(args.onPress).toHaveBeenCalled();
    },
};

export const Secondary: Story = {
    args: {
        color: "secondary",
    },
};

export const Tertiary: Story = {
    args: {
        color: "tertiary",
    },
};

export const LinkColor: Story = {
    args: {
        color: "link-color",
    },
};

export const LinkGray: Story = {
    args: {
        color: "link-gray",
    },
};

export const PrimaryDestructive: Story = {
    args: {
        color: "primary-destructive",
        children: "Delete",
    },
};

export const SecondaryDestructive: Story = {
    args: {
        color: "secondary-destructive",
        children: "Delete",
    },
};

export const TertiaryDestructive: Story = {
    args: {
        color: "tertiary-destructive",
        children: "Delete",
    },
};

export const LinkDestructive: Story = {
    args: {
        color: "link-destructive",
        children: "Delete",
    },
};

export const WithLeadingIcon: Story = {
    args: {
        color: "primary",
        iconLeading: Plus,
        children: "Add item",
    },
};

export const WithTrailingIcon: Story = {
    args: {
        color: "secondary",
        iconTrailing: ArrowRight,
        children: "Continue",
    },
};

export const IconOnly: Story = {
    args: {
        color: "secondary",
        iconLeading: Plus,
        children: undefined,
        "aria-label": "Add item",
    },
};

export const Loading: Story = {
    args: {
        color: "primary",
        isLoading: true,
    },
};

export const LoadingWithText: Story = {
    args: {
        color: "primary",
        isLoading: true,
        showTextWhileLoading: true,
        children: "Saving…",
    },
};

export const Disabled: Story = {
    args: {
        color: "primary",
        isDisabled: true,
    },
    play: async ({ canvas, args }) => {
        await userEvent.click(canvas.getByRole("button", { name: "Button" }));
        await expect(args.onPress).not.toHaveBeenCalled();
    },
};

export const AsLink: Story = {
    args: {
        color: "primary",
        children: "Go to page",
    },
    render: (args) => (
        <Button color={args.color} size={args.size} isDisabled={args.isDisabled} href="#">
            {args.children}
        </Button>
    ),
};

export const AllSizes: Story = {
    args: { color: "primary" },
    render: (args) => (
        <div className="flex items-center gap-3">
            {(Object.keys(styles.sizes) as Array<keyof typeof styles.sizes>).map((size) => (
                <Button key={size} {...args} size={size}>
                    {size}
                </Button>
            ))}
        </div>
    ),
};

export const AllColors: Story = {
    render: () => (
        <div className="flex flex-wrap items-center gap-3">
            {(Object.keys(styles.colors) as Array<keyof typeof styles.colors>).map((color) => (
                <Button key={color} color={color}>
                    {color}
                </Button>
            ))}
        </div>
    ),
};
