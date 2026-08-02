import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
    CardFullWidthImage01Horizontal,
    CardFullWidthImage01Vertical,
    CardFullWidthImage02Horizontal,
    CardFullWidthImage02Vertical,
    CardFullWidthImage03Horizontal,
    CardFullWidthImage03Vertical,
    CardFullWidthImage04Horizontal,
    CardFullWidthImage04Vertical,
    Simple01Horizontal,
    Simple01Vertical,
    Simple02Horizontal,
    Simple02Vertical,
    Simple03Horizontal,
    Simple03Vertical,
    Simple04Horizontal,
    Simple04Vertical,
    type Article,
} from "./blog-cards";

const sampleArticle: Article = {
    id: "1",
    href: "#",
    thumbnailUrl: "https://www.untitledui.com/images/blog/blog-post-01.webp",
    title: "Redesigning the onboarding flow",
    summary: "A look at how we cut time-to-first-value in half through user research and iterative prototyping.",
    category: { href: "#", name: "Case Study" },
    author: { href: "#", name: "Erika Grijalva", avatarUrl: "https://www.untitledui.com/images/avatars/avatar-01.webp" },
    publishedAt: "Jan 12, 2026",
    readingTime: "8 min read",
    tags: [
        { name: "UX Research", color: "brand", href: "#" },
        { name: "Onboarding", color: "gray", href: "#" },
    ],
};

const meta = {
    title: "Marketing/Blog/Blog Cards",
    component: Simple01Vertical,
    parameters: {
        layout: "padded",
    },
    tags: ["autodocs"],
    args: {
        article: sampleArticle,
    },
} satisfies Meta<typeof Simple01Vertical>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Simple01VerticalStory: Story = {
    name: "Simple 01 / Vertical",
};

export const Simple02VerticalStory: Story = {
    name: "Simple 02 / Vertical",
    render: (args) => <Simple02Vertical article={args.article} />,
};

export const Simple03VerticalStory: Story = {
    name: "Simple 03 / Vertical",
    render: (args) => <Simple03Vertical article={args.article} />,
};

export const Simple04VerticalStory: Story = {
    name: "Simple 04 / Vertical",
    render: (args) => <Simple04Vertical article={args.article} />,
};

export const Simple01HorizontalStory: Story = {
    name: "Simple 01 / Horizontal",
    render: (args) => <Simple01Horizontal article={args.article} />,
};

export const Simple02HorizontalStory: Story = {
    name: "Simple 02 / Horizontal",
    render: (args) => <Simple02Horizontal article={args.article} />,
};

export const Simple03HorizontalStory: Story = {
    name: "Simple 03 / Horizontal",
    render: (args) => <Simple03Horizontal article={args.article} />,
};

export const Simple04HorizontalStory: Story = {
    name: "Simple 04 / Horizontal",
    render: (args) => <Simple04Horizontal article={args.article} />,
};

export const CardFullWidthImage01VerticalStory: Story = {
    name: "Full-width image 01 / Vertical",
    render: (args) => <CardFullWidthImage01Vertical article={args.article} />,
};

export const CardFullWidthImage02VerticalStory: Story = {
    name: "Full-width image 02 / Vertical",
    render: (args) => <CardFullWidthImage02Vertical article={args.article} />,
};

export const CardFullWidthImage03VerticalStory: Story = {
    name: "Full-width image 03 / Vertical",
    render: (args) => <CardFullWidthImage03Vertical article={args.article} />,
};

export const CardFullWidthImage04VerticalStory: Story = {
    name: "Full-width image 04 / Vertical",
    render: (args) => <CardFullWidthImage04Vertical article={args.article} />,
};

export const CardFullWidthImage01HorizontalStory: Story = {
    name: "Full-width image 01 / Horizontal",
    render: (args) => <CardFullWidthImage01Horizontal article={args.article} />,
};

export const CardFullWidthImage02HorizontalStory: Story = {
    name: "Full-width image 02 / Horizontal",
    render: (args) => <CardFullWidthImage02Horizontal article={args.article} />,
};

export const CardFullWidthImage03HorizontalStory: Story = {
    name: "Full-width image 03 / Horizontal",
    render: (args) => <CardFullWidthImage03Horizontal article={args.article} />,
};

export const CardFullWidthImage04HorizontalStory: Story = {
    name: "Full-width image 04 / Horizontal",
    render: (args) => <CardFullWidthImage04Horizontal article={args.article} />,
};
