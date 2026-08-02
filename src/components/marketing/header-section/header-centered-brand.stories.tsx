import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { HeaderCenteredBrand } from "./header-centered-brand";

const meta = {
    title: "Marketing/Header Section/HeaderCenteredBrand",
    component: HeaderCenteredBrand,
    parameters: {
        layout: "fullscreen",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof HeaderCenteredBrand>;

export default meta;
type Story = StoryObj<typeof meta>;

// `HeaderCenteredBrand` is an async Server Component (it awaits Notion content, falling
// back to sample copy). Storybook's preview renders as a plain Client Component, which
// can't render an async function directly — so it's resolved up front in a loader and the
// already-awaited element is rendered synchronously.
export const Default: Story = {
    loaders: [async () => ({ element: await HeaderCenteredBrand() })],
    render: (_args, { loaded }) => loaded.element,
};
