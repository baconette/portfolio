import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { NavbarExtraSimple } from "./navbar-extrasimple";

const meta = {
    title: "Marketing/Header Navigation/NavbarExtraSimple",
    component: NavbarExtraSimple,
    parameters: {
        layout: "fullscreen",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof NavbarExtraSimple>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
