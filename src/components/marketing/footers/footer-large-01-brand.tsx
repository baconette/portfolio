const SOCIAL_LINKS = [
    { name: "LinkedIn", href: "https://www.linkedin.com/in/baconandegg/" },
    { name: "GitHub", href: "https://github.com/baconette/" },
    { name: "Email", href: "mailto:erika.aldrich.murga@gmail.com" },
];

export const FooterLarge01Brand = () => {
    return (
        <footer className="bg-utility-brass-500 py-12 md:pt-16">
            <div className="mx-auto max-w-container px-4 md:px-8">
                <div className="flex flex-col justify-between gap-6 border-t border-brand_alt pt-8 md:flex-row md:items-center">
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 md:gap-x-8">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/sys-btn.svg" alt="" className="h-8 w-auto" />
                        <nav aria-label="Social links" className="flex flex-wrap items-center gap-x-6 gap-y-2">
                            {SOCIAL_LINKS.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-md font-semibold text-footer-button-fg transition-colors hover:text-footer-button-fg_hover"
                                    target={link.href.startsWith("http") ? "_blank" : undefined}
                                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </nav>
                    </div>
                    <p className="text-md text-footer-copy">© 2077 Erika Aldrich Murga. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
