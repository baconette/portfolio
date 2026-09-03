import { Button } from "@/components/base/buttons/button";
import { getHomepageContent } from "@/lib/notion";

export const HomepageIntroSection = async () => {
    const { sectionHeading, sectionParagraphs } = await getHomepageContent();

    if (!sectionHeading) return null;

    return (
        <section className="mx-auto w-full max-w-3xl px-4 py-16 md:px-8 md:py-24">
            <h3 className="text-display-md text-primary">{sectionHeading}</h3>
            <div className="mt-6 flex flex-col gap-4 text-lg text-tertiary">
                {sectionParagraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>
            <Button href="/play" color="primary" size="lg" className="mt-8">
                See Projects
            </Button>
        </section>
    );
};
