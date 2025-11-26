 "use client";

import Link from "next/link";
import { useUIStore } from "../lib/ui-store";

export function TopNav() {
  const openCommandPalette = useUIStore(
    (s) => s.openCommandPalette
  );

  return (
    <header className="sticky top-0 z-20 border-b border-outline/80 bg-canvas/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-accent-100 to-accent-300 text-xs font-black text-ink-700 shadow-sm shadow-ink-700/20">
            CD
          </div>
          <Link
            href="/"
            className="text-sm font-semibold tracking-tight text-ink-700"
          >
            CollabDeck
          </Link>
        </div>

        <nav className="flex items-center gap-4 text-xs text-ink-300">
          <Link
            href="/"
            className="rounded-md px-2 py-1 hover:bg-cardSoft hover:text-ink-700"
          >
            Workspaces
          </Link>
          <button
            onClick={openCommandPalette}
            className="hidden rounded-md border border-outline bg-cardSoft px-2 py-1 text-[11px] font-medium text-ink-500 hover:border-accent-300 hover:bg-card md:inline-flex"
          >
            Command Palette ⌘K
          </button>
          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-outline bg-card text-[11px] font-semibold text-ink-700">
            U
          </div>
        </nav>
      </div>
    </header>
  );
}


