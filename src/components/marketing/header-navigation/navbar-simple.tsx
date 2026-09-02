"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cx } from "@/utils/cx";

const navLinks = [
    { label: "Profile", href: "/profile" },
    { label: "Work", href: "/work" },
    { label: "Play", href: "/play" },
    { label: "Contact", href: "/contact" },
];

const AUTO_REVEAL_MS = 7000;

export const NavbarSimple = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [autoReveal, setAutoReveal] = useState(false);
    const lastScrollY = useRef(0);
    const wasVisible = useRef(true);
    const autoRevealTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    useEffect(() => {
        lastScrollY.current = window.scrollY;

        const handleScroll = () => {
            const scrollY = window.scrollY;
            let visible = wasVisible.current;

            if (scrollY <= 8) {
                visible = true;
            } else if (scrollY > lastScrollY.current) {
                visible = false;
            } else if (scrollY < lastScrollY.current) {
                visible = true;
            }

            // Reappearing after being hidden briefly shows the menu items, then hides them again.
            if (visible && !wasVisible.current) {
                setAutoReveal(true);
                clearTimeout(autoRevealTimeout.current);
                autoRevealTimeout.current = setTimeout(() => setAutoReveal(false), AUTO_REVEAL_MS);
            }

            setIsVisible(visible);
            wasVisible.current = visible;
            lastScrollY.current = scrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearTimeout(autoRevealTimeout.current);
        };
    }, []);

    return (
        <header
            className={cx(
                "sticky top-0 z-20 border-b border-secondary bg-brand transition-transform duration-300",
                isVisible || isOpen ? "translate-y-0" : "-translate-y-full",
            )}
        >
            <div className="mx-auto flex h-18 w-full max-w-container items-center justify-between px-4 md:px-8">
                <Link href="/" className="flex items-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/monogram-fill-brass.svg" alt="" className="h-auto w-12" />
                </Link>

                <div className="group flex items-center gap-8">
                    {/* Hidden by default; hovering the menu button reveals it inline on md+, and a click pins it
                        open (also covers touch/keyboard, where hover isn't available). */}
                    <nav
                        className={cx(
                            "hidden items-center gap-8 md:group-hover:flex",
                            (isOpen || autoReveal) && "md:flex",
                        )}
                    >
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href} className="text-md font-semibold text-brand-secondary hover:text-brand-secondary_hover">
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                        onClick={() => setIsOpen((prev) => !prev)}
                        className="flex size-10 shrink-0 items-end justify-center pb-[3px] bg-[url('/sys-btn.svg')] bg-contain bg-center bg-no-repeat text-[0.625rem] font-semibold lowercase text-brand-secondary outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                        menu
                    </button>
                </div>
            </div>

            {/* Small viewports keep the stacked list below the header instead of the inline hover reveal. */}
            {isOpen && (
                <nav className="flex flex-col gap-1 border-t border-secondary px-4 py-3 md:hidden">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="rounded-lg px-3 py-2 text-md font-semibold text-brand-secondary hover:bg-primary_hover hover:text-brand-secondary_hover"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            )}
        </header>
    );
};
