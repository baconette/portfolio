import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { BadgeGroup } from "./badge-groups";

const meta = {
    title: "Base/Badges/BadgeGroup",
    component: BadgeGroup,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        color: { control: "select", options: ["brand", "warning", "error", "gray", "success"] },
        size: { control: "select", options: ["md", "lg"] },
        theme: { control: "select", options: ["light", "modern"] },
        align: { control: "select", options: ["leading", "trailing"] },
    },
    args: {
        addonText: "New",
        children: "Feature update",
        color: "brand",
    },
} satisfies Meta<typeof BadgeGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Leading: Story = {
    args: {
        align: "leading",
    },
};

export const Trailing: Story = {
    args: {
        align: "trailing",
    },
};

export const Modern: Story = {
    args: {
        theme: "modern",
        color: "success",
        addonText: "Live",
    },
};

export const AddonOnly: Story = {
    args: {
        children: undefined,
        addonText: "8 min read",
        iconTrailing: null,
    },
};

export const AllColors: Story = {
    render: () => (
        <div className="flex flex-wrap gap-3">
            {(["brand", "warning", "error", "gray", "success"] as const).map((color) => (
                <BadgeGroup key={color} addonText={color} color={color}>
                    Update
                </BadgeGroup>
            ))}
        </div>
    ),
};
