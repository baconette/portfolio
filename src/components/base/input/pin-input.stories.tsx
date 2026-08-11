import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { expect, userEvent } from "storybook/test";

import { PinInput } from "./pin-input";

const meta = {
    title: "Base/Input/PinInput",
    component: PinInput,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    args: {
        size: "sm",
    },
} satisfies Meta<typeof PinInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const renderFourDigitPin: Story["render"] = (args) => (
    <PinInput {...args}>
        <PinInput.Label>Verification code</PinInput.Label>
        <PinInput.Group maxLength={4}>
            {[0, 1, 2, 3].map((index) => (
                <PinInput.Slot key={index} index={index} />
            ))}
        </PinInput.Group>
        <PinInput.Description>Enter the 4-digit code we sent to your phone.</PinInput.Description>
    </PinInput>
);

export const Default: Story = {
    render: renderFourDigitPin,
    play: async ({ canvas }) => {
        const input = canvas.getByLabelText("Enter your pin");
        await userEvent.type(input, "1234");
        await expect(input).toHaveValue("1234");
    },
};

export const Invalid: Story = {
    args: {
        invalid: true,
    },
    render: renderFourDigitPin,
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
    render: renderFourDigitPin,
    play: async ({ canvas }) => {
        const input = canvas.getByLabelText("Enter your pin");
        await expect(input).toBeDisabled();
    },
};

export const SixDigits: Story = {
    render: (args) => (
        <PinInput {...args}>
            <PinInput.Label>One-time passcode</PinInput.Label>
            <PinInput.Group maxLength={6}>
                {[0, 1, 2, 3, 4, 5].map((index) => (
                    <PinInput.Slot key={index} index={index} />
                ))}
            </PinInput.Group>
        </PinInput>
    ),
};
