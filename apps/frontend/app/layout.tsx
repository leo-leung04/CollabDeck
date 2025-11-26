import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { TopNav } from "../components/top-nav";
import { CommandPalette } from "../components/command-palette";

export const metadata: Metadata = {
  title: "CollabDeck",
  description: "Real-time collaborative Kanban workspace"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-canvas text-ink-700">
        <Providers>
          <TopNav />
          <CommandPalette />
          {children}
        </Providers>
      </body>
    </html>
  );
}


