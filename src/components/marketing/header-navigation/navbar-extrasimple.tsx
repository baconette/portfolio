import Link from "next/link";

export const NavbarExtraSimple = () => {
    return (
        <header className="relative z-20 border-b border-secondary bg-brand">
            <div className="mx-auto flex h-18 w-full max-w-container items-center justify-center px-4 md:px-8">
                <Link href="/" className="flex items-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/monogram-fill-brass.svg" alt="" className="h-9 w-auto" />
                </Link>
            </div>
        </header>
    );
};
