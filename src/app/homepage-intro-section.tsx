import Image from "next/image";
import { Button } from "@/components/base/buttons/button";
import { getHomepageContent } from "@/lib/notion";

export const HomepageIntroSection = async () => {
    const { sectionHeading, sectionParagraphs } = await getHomepageContent();

    if (!sectionHeading) return null;

    return (
        <section className="mx-auto w-full max-w-3xl px-4 py-16 md:px-8 md:py-24">
            <div className="relative mx-auto mb-6 aspect-square w-1/2 max-w-1/2 overflow-hidden rounded-full md:float-right md:mx-0 md:mb-4 md:ml-6 md:w-[30%] md:max-w-[30%]">
                <Image src="/erika-aldrich-murga-sq.jpg" alt="Erika Aldrich Murga" fill sizes="(min-width: 768px) 30vw, 50vw" className="object-cover" />
            </div>
            <h3 className="text-display-md text-primary">{sectionHeading}</h3>
            {/* space-y (not flex/gap) keeps these as plain block boxes, so their line boxes
                individually reflow around the floated image instead of the whole group avoiding it
                as one rigid rectangle — true editorial wrap, full width again once text clears it. */}
            <div className="mt-6 space-y-4 text-lg text-tertiary">
                {sectionParagraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>
            <Button href="/play" color="primary" size="lg" className="clear-both mt-8">
                See Projects
            </Button>
        </section>
    );
};
