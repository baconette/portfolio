import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "@/components/base/buttons/button";
import {
    FeatureCardHorizontal,
    FeatureCardVertical,
    ImageCardHorizontal,
    ImageCardVertical,
    VideoCardHorizontal,
    VideoCardVertical,
} from "./nav-menu-item-card";

const meta = {
    title: "Marketing/Header Navigation/NavMenuItemCard",
    component: ImageCardVertical,
    parameters: {
        layout: "padded",
    },
    tags: ["autodocs"],
    args: {
        href: "#",
        title: "We've just released an update!",
        subtitle: "Check out the all new dashboard view. Pages now load up to 3x faster.",
        imgSrc: "https://www.untitledui.com/marketing/smiling-girl.webp",
    },
} satisfies Meta<typeof ImageCardVertical>;

export default meta;
type Story = StoryObj<typeof meta>;

const dismissActions = (
    <div className="inline-flex gap-3">
        <Button color="link-gray" size="sm">
            Dismiss
        </Button>
        <Button color="link-color" size="sm">
            Changelog
        </Button>
    </div>
);

const IMG_SRC = "https://www.untitledui.com/marketing/smiling-girl.webp";

export const ImageVertical: Story = {
    render: (args) => <ImageCardVertical {...args} actionsContent={dismissActions} />,
};

export const ImageHorizontal: Story = {
    render: (args) => <ImageCardHorizontal {...args} actionsContent={dismissActions} />,
};

export const ImageVerticalNoImage: Story = {
    render: (args) => <ImageCardVertical {...args} imgSrc={undefined} />,
};

export const VideoVertical: Story = {
    render: (args) => <VideoCardVertical href={args.href} imgSrc={IMG_SRC} title={args.title} description={args.subtitle} />,
};

export const VideoHorizontal: Story = {
    render: (args) => <VideoCardHorizontal href={args.href} imgSrc={IMG_SRC} title={args.title} description={args.subtitle} />,
};

export const FeatureVertical: Story = {
    render: (args) => (
        <FeatureCardVertical href={args.href} imgSrc={IMG_SRC} title={args.title} description={args.subtitle} actionsContent={dismissActions} />
    ),
};

export const FeatureHorizontal: Story = {
    render: (args) => (
        <FeatureCardHorizontal href={args.href} imgSrc={IMG_SRC} title={args.title} description={args.subtitle} actionsContent={dismissActions} />
    ),
};
