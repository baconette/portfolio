import type { Metadata } from "next";
import { Bodoni_Moda, Bricolage_Grotesque } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { AnalyticsPageview } from "./analytics-pageview";
import "@/styles/globals.css";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
});

const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni-moda",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Erika Aldrich Murga",
  description: "Product strategy and design portfolio of Erika Aldrich Murga.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html
      lang="en"
      className={`${bricolageGrotesque.variable} ${bodoniModa.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        {gaId && (
          <>
            <GoogleAnalytics gaId={gaId} />
            <AnalyticsPageview />
          </>
        )}
      </body>
    </html>
  );
}
