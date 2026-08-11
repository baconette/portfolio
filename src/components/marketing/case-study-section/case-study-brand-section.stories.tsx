import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CaseStudyBrandSection } from "./case-study-brand-section";

const meta = {
    title: "Marketing/Case Study Section/CaseStudyBrandSection",
    component: CaseStudyBrandSection,
    parameters: {
        layout: "fullscreen",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof CaseStudyBrandSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
    args: {
        children: (
            <>
                <h2 className="text-display-lg text-primary_on-brand">Overview</h2>
                <p className="text-md text-tertiary_on-brand">
                    This project set out to redesign the onboarding flow for a fintech app, reducing drop-off during account verification while keeping the experience
                    trustworthy and compliant.
                </p>
            </>
        ),
    },
};

export const Impact: Story = {
    args: {
        children: (
            <>
                <h2 className="text-display-lg text-primary_on-brand">Impact</h2>
                <p className="text-md text-tertiary_on-brand">Verification completion rose 32% and time-to-first-transaction dropped by half within the first quarter.</p>
            </>
        ),
    },
};
