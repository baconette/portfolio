import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { HeaderCenteredCaseStudy } from "./header-centered-casestudy";

const meta = {
    title: "Marketing/Header Section/HeaderCenteredCaseStudy",
    component: HeaderCenteredCaseStudy,
    parameters: {
        layout: "fullscreen",
    },
    tags: ["autodocs"],
    argTypes: {
        coverUrl: { control: "text" },
        title: { control: "text" },
    },
} satisfies Meta<typeof HeaderCenteredCaseStudy>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        coverUrl: "/images/speed-scale/OKRS.png",
        title: "Speed & Scale",
    },
};

export const LongTitle: Story = {
    args: {
        coverUrl: "/images/mobility/A218313_large.jpg",
        title: "Dealership Mobility Research & Product Strategy",
    },
};
