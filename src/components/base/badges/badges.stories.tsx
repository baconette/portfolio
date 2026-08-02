import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Star01 } from "@untitledui/icons";
import { expect, fn, userEvent } from "storybook/test";

import { Badge, BadgeIcon, BadgeWithButton, BadgeWithDot, BadgeWithFlag, BadgeWithIcon, BadgeWithImage, filledColors } from "./badges";
import type { BadgeColors } from "./badge-types";

const colorNames = Object.keys(filledColors) as BadgeColors[];

const meta = {
    title: "Base/Badges/Badge",
    component: Badge,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        type: { control: "select", options: ["pill-color", "color", "modern"] },
        size: { control: "select", options: ["sm", "md", "lg"] },
        color: { control: "select", options: colorNames },
    },
    args: {
        children: "Badge",
    },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        type: "pill-color",
        size: "md",
        color: "gray",
    },
};

export const AllColors: Story = {
    render: () => (
        <div className="flex flex-wrap gap-2">
            {colorNames.map((color) => (
                <Badge key={color} color={color}>
                    {color}
                </Badge>
            ))}
        </div>
    ),
};

export const AllSizes: Story = {
    render: () => (
        <div className="flex items-center gap-2">
            {(["sm", "md", "lg"] as const).map((size) => (
                <Badge key={size} size={size} color="brand">
                    {size}
                </Badge>
            ))}
        </div>
    ),
};

export const PillColor: Story = {
    args: { type: "pill-color", color: "brand" },
};

export const SquareColor: Story = {
    args: { type: "color", color: "brand" },
};

export const Modern: Story = {
    args: { type: "modern" },
};

export const WithDot: Story = {
    render: (args) => (
        <BadgeWithDot color={args.color as BadgeColors} size={args.size} type={args.type}>
            {args.children}
        </BadgeWithDot>
    ),
    args: {
        color: "success",
        children: "Online",
    },
};

export const WithLeadingIcon: Story = {
    render: (args) => (
        <BadgeWithIcon color={args.color as BadgeColors} size={args.size} type={args.type} iconLeading={Star01}>
            {args.children}
        </BadgeWithIcon>
    ),
    args: {
        color: "warning",
        children: "Featured",
    },
};

export const WithFlag: Story = {
    render: (args) => (
        <BadgeWithFlag color={args.color as BadgeColors} size={args.size} type={args.type} flag="US">
            {args.children}
        </BadgeWithFlag>
    ),
    args: {
        color: "gray",
        children: "United States",
    },
};

export const WithImage: Story = {
    render: (args) => (
        <BadgeWithImage
            color={args.color as BadgeColors}
            size={args.size}
            type={args.type}
            imgSrc="https://www.untitledui.com/images/avatars/avatar-01.webp"
        >
            {args.children}
        </BadgeWithImage>
    ),
    args: {
        color: "gray",
        children: "Erika Grijalva",
    },
};

export const IconOnly: Story = {
    render: (args) => <BadgeIcon color={args.color as BadgeColors} size={args.size} type={args.type} icon={Star01} />,
    args: {
        color: "brand",
    },
};

const handleDismiss = fn();

export const WithDismissButton: Story = {
    render: (args) => (
        <BadgeWithButton color={args.color as BadgeColors} size={args.size} type={args.type} buttonLabel="Remove tag" onButtonClick={handleDismiss}>
            {args.children}
        </BadgeWithButton>
    ),
    args: {
        color: "brand",
        children: "Design",
    },
    play: async ({ canvas }) => {
        await userEvent.click(canvas.getByRole("button", { name: "Remove tag" }));
        await expect(handleDismiss).toHaveBeenCalled();
    },
};
