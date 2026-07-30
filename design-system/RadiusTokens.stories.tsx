import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { RadiusTokens } from "./RadiusTokens";

const meta = {
    title: "Design System/Tokens/Radius",
    component: RadiusTokens,
    parameters: {
        layout: "padded",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof RadiusTokens>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllRadius: Story = {};
