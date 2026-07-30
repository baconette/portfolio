import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SpacingTokens } from "./SpacingTokens";

const meta = {
    title: "Design System/Tokens/Spacing",
    component: SpacingTokens,
    parameters: {
        layout: "padded",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof SpacingTokens>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllSpacing: Story = {};
