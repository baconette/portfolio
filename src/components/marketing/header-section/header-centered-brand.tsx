import { InteractiveMapBackground } from "@/components/marketing/header-section/interactive-map-background";
import { getHomepageContent } from "@/lib/notion";

export const HeaderCenteredBrand = async ({ short = false }: { short?: boolean } = {}) => {
    const { heading, subheading } = await getHomepageContent();

    const header = (
        <InteractiveMapBackground className={short ? "-mt-[150px] -mb-[50px] pt-[325px] pb-16 md:pb-24" : "flex-1 pt-[325px] pb-16 md:pb-24"}>
            <div className="relative z-10 mx-auto max-w-container px-4 md:px-8">
                <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
                    <h1 className="font-heading text-display-2xl lowercase text-primary">{heading}</h1>
                    <h2 className="mt-4 text-display-xl uppercase text-primary md:mt-6">{subheading}</h2>
                </div>
            </div>
        </InteractiveMapBackground>
    );

    if (!short) return header;

    // overflow-hidden + negative margins crop 150px off the top and 50px off the bottom of the section
    // without shifting the h1/h2 relative to the background image/SVGs — they're all cropped as one unit.
    return <div className="flex-1 overflow-hidden">{header}</div>;
};
