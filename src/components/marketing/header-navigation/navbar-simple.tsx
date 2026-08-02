"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu01, XClose } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
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

                <div className="flex items-center gap-4">
                    <nav className="hidden items-center gap-6 md:flex">
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href} className="text-sm font-semibold text-tertiary hover:text-tertiary_hover">
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <Button
                        color="tertiary"
                        size="md"
                        className="md:hidden"
                        iconLeading={isOpen ? XClose : Menu01}
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                        onPress={() => setIsOpen((prev) => !prev)}
                    />
                </div>
            </div>

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
