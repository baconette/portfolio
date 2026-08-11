import type { ReactNode } from "react";
import { cx } from "@/utils/cx";

interface CaseStudyDarkBrandSectionProps {
    children: ReactNode;
    /** Set to false when a brand section immediately follows, so the two sit flush against each other with no gap. */
    marginBottom?: boolean;
}

export const CaseStudyDarkBrandSection = ({ children, marginBottom = true }: CaseStudyDarkBrandSectionProps) => (
    <div
        className={cx(
            "dark-mode relative mx-[calc(50%-50vw)] mt-16 w-auto bg-primary text-primary md:mt-24",
            // The parent's `flex flex-col gap-6` still spaces siblings apart even with margin-bottom removed,
            // so a negative margin equal to that gap is needed to actually butt up against the next section.
            marginBottom ? "mb-16 md:mb-24" : "-mb-6",
        )}
    >
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-16 md:px-8 md:py-24">{children}</div>
    </div>
);
