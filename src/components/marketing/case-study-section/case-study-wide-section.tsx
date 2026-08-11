import type { ReactNode } from "react";
import { cx } from "@/utils/cx";

interface CaseStudyWideSectionProps {
    children: ReactNode;
    /** Number of columns to lay content out in.
     * @default 1
     */
    columns?: 1 | 2;
}

export const CaseStudyWideSection = ({ children, columns = 1 }: CaseStudyWideSectionProps) => (
    <div className="relative mx-[calc(50%-50vw)] w-auto">
        <div className={cx("mx-auto w-full max-w-5xl gap-6 px-4 md:px-8", columns === 2 ? "grid grid-cols-1 sm:grid-cols-2" : "flex flex-col")}>{children}</div>
    </div>
);
