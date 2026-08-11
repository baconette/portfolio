import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CaseStudyDarkBrandSection } from "./case-study-dark-brand-section";

const meta = {
    title: "Marketing/Case Study Section/CaseStudyDarkBrandSection",
    component: CaseStudyDarkBrandSection,
    parameters: {
        layout: "fullscreen",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof CaseStudyDarkBrandSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DiscoveryExecutiveSummary: Story = {
    args: {
        children: (
            <>
                <h2 className="text-display-lg text-primary">Discovery Executive Summary</h2>
                <p className="text-md text-primary">
                    Research surfaced three distinct audience segments, each with different trust barriers to adoption. The synthesis below informed the roadmap and scope
                    decisions that followed.
                </p>
            </>
        ),
    },
};

export const DeliveryProcess: Story = {
    args: {
        children: (
            <>
                <h2 className="text-display-lg text-primary">Delivery Process</h2>
                <p className="text-md text-primary">
                    We worked in two-week sprints with a dedicated design review at the end of each cycle, keeping engineering and stakeholders aligned from kickoff through
                    launch.
                </p>
            </>
        ),
    },
};

export const VisualIdentity: Story = {
    args: {
        children: (
            <>
                <h2 className="text-display-lg text-primary">Visual Identity</h2>
                <p className="text-md text-primary">
                    The identity system draws on hand-thrown ceramics and natural dye textures, translated into a warm, tactile palette and a display type pairing that feels
                    crafted rather than manufactured.
                </p>
            </>
        ),
    },
};
