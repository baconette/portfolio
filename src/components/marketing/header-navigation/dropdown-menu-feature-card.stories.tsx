import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { DropdownMenuFeatureCard } from "./dropdown-menu-feature-card";

const meta = {
    title: "Marketing/Header Navigation/DropdownMenuFeatureCard",
    component: DropdownMenuFeatureCard,
    parameters: {
        layout: "padded",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof DropdownMenuFeatureCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
