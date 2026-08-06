"use client";

import { useState } from "react";
import Link from "next/link";
import { cx } from "@/utils/cx";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
    { label: "Contact", href: "/contact" },
];

export const NavbarSimple = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="relative z-20 border-b border-secondary bg-brand">
            <div className="mx-auto flex h-18 w-full max-w-container items-center justify-between px-4 md:px-8">
                <Link href="/" className="flex items-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/monogram-fill-brass.svg" alt="" className="h-9 w-auto" />
                </Link>

                <div className="group flex items-center gap-4">
                    {/* Hidden by default; hovering the menu button reveals it inline on md+, and a click pins it
                        open (also covers touch/keyboard, where hover isn't available). */}
                    <nav
                        className={cx(
                            "hidden items-center gap-6 md:group-hover:flex",
                            isOpen && "md:flex",
                        )}
                    >
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href} className="text-sm font-semibold text-tertiary hover:text-tertiary_hover">
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
                            className="rounded-lg px-3 py-2 text-sm font-semibold text-tertiary hover:bg-primary_hover hover:text-tertiary_hover"
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
