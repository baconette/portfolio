import type { ReactNode } from "react";

export const CaseStudyBrandSection = ({ children }: { children: ReactNode }) => (
    <div className="relative mx-[calc(50%-50vw)] w-auto bg-brand-primary text-primary_on-brand">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-16 md:px-8 md:py-24">{children}</div>
    </div>
);
