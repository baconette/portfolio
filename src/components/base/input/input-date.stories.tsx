import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CalendarDate } from "@internationalized/date";

import { InputDate } from "./input-date";

const meta = {
    title: "Base/Input/InputDate",
    component: InputDate,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    decorators: [(Story) => <div className="w-80">{Story()}</div>],
    args: {
        label: "Date of birth",
    },
} satisfies Meta<typeof InputDate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDefaultValue: Story = {
    args: {
        defaultValue: new CalendarDate(1990, 6, 15),
    },
};

export const WithHint: Story = {
    args: {
        hint: "You must be 18 or older.",
    },
};

export const Invalid: Story = {
    args: {
        isInvalid: true,
        hint: "Enter a valid date.",
    },
};

export const Disabled: Story = {
    args: {
        isDisabled: true,
        defaultValue: new CalendarDate(1990, 6, 15),
    },
};
