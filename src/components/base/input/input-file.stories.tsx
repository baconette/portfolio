import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { expect, userEvent } from "storybook/test";

import { InputFile } from "./input-file";

const meta = {
    title: "Base/Input/InputFile",
    component: InputFile,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    decorators: [(Story) => <div className="w-80">{Story()}</div>],
    args: {
        label: "Resume",
    },
} satisfies Meta<typeof InputFile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    play: async ({ canvas }) => {
        await expect(canvas.getByRole("button", { name: "Upload" })).toBeInTheDocument();
        await expect(canvas.getByPlaceholderText("Choose a file")).toBeInTheDocument();
    },
};

export const CustomButtonText: Story = {
    args: {
        buttonText: "Browse",
        placeholder: "PDF up to 10MB",
    },
};

export const Loading: Story = {
    args: {
        isLoading: true,
    },
};

export const WithHint: Story = {
    args: {
        hint: "PDF, DOC, or DOCX up to 10MB.",
        acceptedFileTypes: [".pdf", ".doc", ".docx"],
    },
};

export const Disabled: Story = {
    args: {
        isDisabled: true,
    },
    play: async ({ canvas }) => {
        const uploadButton = canvas.getByRole("button", { name: "Upload" });
        await userEvent.click(uploadButton);
        await expect(uploadButton).toBeDisabled();
    },
};
