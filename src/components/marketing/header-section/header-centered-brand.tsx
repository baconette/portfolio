import { InteractiveMapBackground } from "@/components/marketing/header-section/interactive-map-background";
import { getHomepageContent } from "@/lib/notion";

const HeaderText = ({ heading, subheading }: { heading: string; subheading: string }) => (
    <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <h1 className="font-heading text-display-2xl lowercase text-primary">{heading}</h1>
        <h2 className="mt-4 text-display-xl uppercase text-primary md:mt-6">{subheading}</h2>
    </div>
);

export const HeaderCenteredBrand = async ({ short = false, compact = false }: { short?: boolean; compact?: boolean } = {}) => {
    const { heading, subheading } = await getHomepageContent();

    if (compact) {
        // The heading is its own absolutely-positioned overlay, centered within this fixed 350px box
        // (independent of InteractiveMapBackground's internal padding/crop math, so it's reliably
        // centered regardless of that component's own sizing). The background's top-crop is shifted
        // from the short variant's -mt-[150px] to -mt-[205.5px] so the same section-relative point
        // that the short variant's text center sits over (325px padding + half the text block's own
        // height) lines up with this box's center too — keeping the map/shapes framed the same way
        // relative to the heading as they are on the homepage's short (500px) header.
        return (
            <div className="relative h-[350px] max-h-[350px] w-full overflow-hidden">
                <InteractiveMapBackground className="-mt-[205.5px] -mb-[50px] pt-[325px] pb-16 md:pb-24" />
                <div className="absolute inset-0 z-10 flex items-center justify-center px-4 md:px-8">
                    <HeaderText heading={heading} subheading={subheading} />
                </div>
            </div>
        );
    }

    const header = (
        <InteractiveMapBackground className={short ? "-mt-[150px] -mb-[50px] pt-[325px] pb-16 md:pb-24" : "flex-1 pt-[325px] pb-16 md:pb-24"}>
            <div className="relative z-10 mx-auto max-w-container px-4 md:px-8">
                <HeaderText heading={heading} subheading={subheading} />
            </div>
        </InteractiveMapBackground>
    );

    if (!short) return header;

    // overflow-hidden + negative margins crop 150px off the top and 50px off the bottom of the section
    // without shifting the h1/h2 relative to the background image/SVGs — they're all cropped as one unit.
    return <div className="flex-1 overflow-hidden">{header}</div>;
};
