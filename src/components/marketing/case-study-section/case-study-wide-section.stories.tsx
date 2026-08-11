import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CaseStudyWideSection } from "./case-study-wide-section";

const meta = {
    title: "Marketing/Case Study Section/CaseStudyWideSection",
    component: CaseStudyWideSection,
    parameters: {
        layout: "fullscreen",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof CaseStudyWideSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleColumn: Story = {
    args: {
        columns: 1,
        children: (
            <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&h=600&fit=crop"
                alt="Wide product photography"
                className="w-full rounded-xl object-cover"
            />
        ),
    },
};

export const TwoColumns: Story = {
    args: {
        columns: 2,
        children: (
            <>
                <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop" alt="First product photo" className="w-full rounded-xl object-cover" />
                <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&h=600&fit=crop" alt="Second product photo" className="w-full rounded-xl object-cover" />
            </>
        ),
    },
};
