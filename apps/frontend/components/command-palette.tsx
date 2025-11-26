"use client";

import { useUIStore } from "../lib/ui-store";

export function CommandPalette() {
  const open = useUIStore((s) => s.commandPaletteOpen);
  const close = useUIStore((s) => s.closeCommandPalette);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-30 flex items-start justify-center bg-black/20 pt-20 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-outline bg-card shadow-lg shadow-ink-700/20">
        <div className="flex items-center justify-between border-b border-outline/60 px-4 py-2">
          <p className="text-xs font-medium text-ink-500">
            Command Palette (placeholder)
          </p>
          <button
            onClick={close}
            className="text-xs text-ink-300 hover:text-ink-700"
          >
            Esc
          </button>
        </div>
        <div className="px-4 py-3 text-xs text-ink-300">
          This will later be wired to search workspaces, boards and tasks.
        </div>
      </div>
    </div>
  );
}


