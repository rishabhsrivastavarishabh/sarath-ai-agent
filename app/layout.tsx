import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import "./globals.css";

// Self-hosted Geist fonts (from the `geist` npm package) so builds work
// offline; next/font/google would fetch from Google at build time.
const sans = localFont({
  src: "../node_modules/geist/dist/fonts/geist-sans/Geist-Variable.woff2",
  variable: "--font-sans",
  weight: "100 900",
  display: "swap",
});

const mono = localFont({
  src: "../node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2",
  variable: "--font-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "sarath-ai",
  description: "A Next.js starter for eve agents with AI Elements.",
};

// The page and Eve routes validate the generated app's Better Auth session.
export default function RootLayout({ children }: { readonly children: ReactNode }) {
  return (
    <html className={cn(sans.variable, mono.variable)} lang="en">
      <body>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
