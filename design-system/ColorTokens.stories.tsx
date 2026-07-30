import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PrimitiveColorTokens, SemanticColorTokens } from "./ColorTokens";

const meta = {
    title: "Design System/Tokens/Colors",
    component: PrimitiveColorTokens,
    parameters: {
        layout: "padded",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof PrimitiveColorTokens>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primitives: Story = {};

export const Semantic: Story = {
    render: () => <SemanticColorTokens />,
};
