import type { Metadata } from "next";
import "./globals.css";
import "ghostui-react/styles.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "GhostUI - Spectral React Component Library",
  description: "A Halloween-themed, atmospheric React component library engineered for highly animated, cinematic user experiences.",
  keywords: ["react", "components", "halloween", "ui library", "animated", "spectral"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

