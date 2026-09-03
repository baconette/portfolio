import { cookies } from "next/headers";
import { NavbarSimple } from "@/components/marketing/header-navigation/navbar-simple";
import { getNavLinks } from "@/components/marketing/header-navigation/nav-links";
import { FooterLarge01Brand } from "@/components/marketing/footers/footer-large-01-brand";
import { WORK_SESSION_COOKIE, verifySession } from "@/lib/work-auth";
import { WorkPasswordForm } from "./work-password-form";
import { WorkUnlockedTracker } from "./work-unlocked-tracker";

export default async function WorkLayout({ children }: { children: React.ReactNode }) {
    const session = (await cookies()).get(WORK_SESSION_COOKIE)?.value;

    if (verifySession(session)) {
        return (
            <>
                {children}
                <WorkUnlockedTracker />
            </>
        );
    }

    const links = await getNavLinks();

    return (
        <div className="flex min-h-screen flex-col">
            <NavbarSimple links={links} />

            <main className="flex-1 bg-secondary">
                <div className="mx-auto w-full max-w-md px-4 py-16 md:px-8 md:py-24">
                    <h1 className="text-display-xl text-primary">This section is password protected</h1>
                    <p className="mt-4 text-lg text-tertiary">Enter the password to view case studies.</p>

                    <div className="mt-10">
                        <WorkPasswordForm />
                    </div>
                </div>
            </main>

            <FooterLarge01Brand />
        </div>
    );
}
