import { UntitledLogo } from "@/components/foundations/logo/untitledui-logo";

export const FooterLarge01Brand = () => {
    return (
        <footer className="bg-brand-section py-12 md:pt-16">
            <div className="mx-auto max-w-container px-4 md:px-8">
                <div className="flex flex-col justify-between gap-6 border-t border-brand_alt pt-8 md:flex-row md:items-center">
                    <UntitledLogo className="dark-mode" />
                    <p className="text-sm text-quaternary_on-brand">© 2077 Erika Aldrich Murga. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
