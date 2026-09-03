import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { expect, userEvent } from "storybook/test";

import { NavbarSimple } from "./navbar-simple";

const meta = {
    title: "Marketing/Header Navigation/NavbarSimple",
    component: NavbarSimple,
    parameters: {
        layout: "fullscreen",
    },
    tags: ["autodocs"],
    args: {
        links: [
            { label: "Profile", href: "/profile" },
            { label: "Work", href: "/work" },
            { label: "Play", href: "/play" },
            { label: "Contact", href: "/contact" },
        ],
    },
} satisfies Meta<typeof NavbarSimple>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MobileMenuToggle: Story = {
    play: async ({ canvas }) => {
        // The desktop nav renders its links unconditionally (CSS-hidden below `md`), so
        // the mobile menu toggling is verified by the extra, JS-mounted set of links it adds.
        await expect(canvas.getAllByRole("link", { name: "Contact", hidden: true })).toHaveLength(1);

        await userEvent.click(canvas.getByRole("button", { name: "Open menu", hidden: true }));
        await expect(canvas.getAllByRole("link", { name: "Contact", hidden: true })).toHaveLength(2);

        await userEvent.click(canvas.getByRole("button", { name: "Close menu", hidden: true }));
        await expect(canvas.getAllByRole("link", { name: "Contact", hidden: true })).toHaveLength(1);
    },
};
