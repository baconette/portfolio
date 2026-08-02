import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { BookClosed } from "@untitledui/icons";

import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { NavMenuItemLink } from "./nav-menu-item";

const meta = {
    title: "Marketing/Header Navigation/NavMenuItemLink",
    component: NavMenuItemLink,
    parameters: {
        layout: "padded",
    },
    tags: ["autodocs"],
    args: {
        href: "#",
        title: "Blog",
        subtitle: "The latest industry news and guides curated by our expert team.",
    },
} satisfies Meta<typeof NavMenuItemLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => (
        <div className="max-w-80 rounded-xl bg-primary shadow-xs ring-1 ring-secondary_alt">
            <NavMenuItemLink {...args} />
        </div>
    ),
};

export const WithIcon: Story = {
    render: (args) => (
        <div className="max-w-80 rounded-xl bg-primary shadow-xs ring-1 ring-secondary_alt">
            <NavMenuItemLink {...args} icon={BookClosed} />
        </div>
    ),
};

export const WithBadge: Story = {
    render: (args) => (
        <div className="max-w-80 rounded-xl bg-primary shadow-xs ring-1 ring-secondary_alt">
            <NavMenuItemLink {...args} icon={BookClosed} badge={<Badge color="success">New</Badge>} />
        </div>
    ),
};

export const WithActions: Story = {
    render: (args) => (
        <div className="max-w-80 rounded-xl bg-primary shadow-xs ring-1 ring-secondary_alt">
            <NavMenuItemLink
                {...args}
                icon={BookClosed}
                actionsContent={
                    <div className="inline-flex gap-3">
                        <Button color="link-gray" size="sm">
                            Dismiss
                        </Button>
                        <Button color="link-color" size="sm">
                            Learn more
                        </Button>
                    </div>
                }
            />
        </div>
    ),
};
