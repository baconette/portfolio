import { InteractiveMapBackground } from "@/components/marketing/header-section/interactive-map-background";
import { getHomepageContent } from "@/lib/notion";

export const HeaderCenteredBrand = async () => {
    const { heading, subheading } = await getHomepageContent();

    return (
        <InteractiveMapBackground className="flex-1 pt-[325px] pb-16 md:pb-24">
            <div className="relative z-10 mx-auto max-w-container px-4 md:px-8">
                <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                    <h1 className="font-heading text-display-2xl text-primary_on-brand">{heading}</h1>
                    <h2 className="mt-4 text-display-xl text-secondary_on-brand md:mt-6">{subheading}</h2>
                </div>
            </div>
        </InteractiveMapBackground>
    );
};
