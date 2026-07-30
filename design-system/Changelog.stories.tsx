import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Changelog } from "./Changelog";

const meta = {
    title: "Design System/Tokens/Changelog",
    component: Changelog,
    parameters: {
        layout: "padded",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Changelog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Current: Story = {};
