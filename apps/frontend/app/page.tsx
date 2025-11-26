 "use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import type { Workspace } from "../lib/mock-data";
import { apiClient } from "../lib/api-client";

function useWorkspaces() {
  return useQuery<Workspace[]>({
    queryKey: ["workspaces"],
    queryFn: () => apiClient.fetchJson<Workspace[]>("/workspaces")
  });
}

export default function HomePage() {
  const { data: workspaces, isLoading, error } = useWorkspaces();

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-4 py-10">
      <header className="flex items-center justify-between border-b border-outline pb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink-700">
            CollabDeck
          </h1>
          <p className="mt-2 text-sm text-ink-300">Choose a workspace.</p>
        </div>
        <button className="rounded-lg border border-outline bg-cardSoft px-3 py-1.5 text-xs font-medium text-ink-700 shadow-sm hover:border-accent-300 hover:bg-card">
          New workspace
        </button>
      </header>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-300">
          Workspaces
        </h2>
        {isLoading && (
          <p className="text-xs text-ink-300">Loading workspaces…</p>
        )}
        {error && (
          <p className="text-xs text-red-500">
            Failed to load workspaces: {(error as Error).message}
          </p>
        )}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {workspaces?.map((ws) => (
            <Link
              key={ws.id}
              href={`/workspaces/${ws.id}`}
              className="group rounded-2xl border border-outline bg-card p-5 shadow-sm shadow-ink-700/10 transition hover:border-accent-300 hover:bg-cardSoft"
            >
              <p className="text-sm font-semibold text-ink-700 group-hover:text-ink-700">
                {ws.name}
              </p>
              {ws.description && (
                <p className="mt-2 text-xs text-ink-300">{ws.description}</p>
              )}
              <p className="mt-4 text-[11px] font-medium text-ink-300">
                View boards →
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}


