import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { FooterLarge01Brand } from "./footer-large-01-brand";

const meta = {
    title: "Marketing/Footers/FooterLarge01Brand",
    component: FooterLarge01Brand,
    parameters: {
        layout: "fullscreen",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof FooterLarge01Brand>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
