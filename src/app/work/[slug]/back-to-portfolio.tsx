"use client";

import { ArrowLeft } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";

export const BackToPortfolio = () => (
    <div className="relative z-10 bg-primary px-4 pt-6 md:fixed md:top-1/2 md:left-[max(1rem,calc(50%_-_640px_-_4rem))] md:z-50 md:-translate-y-1/2 md:bg-transparent md:px-0 md:pt-0">
        <Button
            href="/work"
            color="primary"
            size="md"
            iconLeading={ArrowLeft}
            className="text-brand-secondary! *:data-icon:text-brand-secondary/60! hover:*:data-icon:text-brand-secondary/70!"
        >
            Back to portfolio
        </Button>
    </div>
);
