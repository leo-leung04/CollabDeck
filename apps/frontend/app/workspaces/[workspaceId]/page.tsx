 "use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import type { Board, Workspace } from "../../../lib/mock-data";
import { apiClient } from "../../../lib/api-client";

type Props = {
  params: {
    workspaceId: string;
  };
};

function useWorkspace(id: string) {
  return useQuery<Workspace>({
    queryKey: ["workspace", id],
    queryFn: () => apiClient.fetchJson<Workspace>(`/workspaces/${id}`)
  });
}

function useWorkspaceBoards(id: string) {
  return useQuery<Board[]>({
    queryKey: ["workspace", id, "boards"],
    queryFn: () =>
      apiClient.fetchJson<Board[]>(`/workspaces/${id}/boards`)
  });
}

export default function WorkspacePage({ params }: Props) {
  const {
    data: workspace,
    isLoading: wsLoading,
    error: wsError
  } = useWorkspace(params.workspaceId);
  const {
    data: boards,
    isLoading: boardsLoading,
    error: boardsError
  } = useWorkspaceBoards(params.workspaceId);

  if (wsLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-ink-300">Loading workspace…</p>
      </main>
    );
  }

  if (wsError || !workspace) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-ink-300">
          Failed to load workspace.{" "}
          <Link href="/" className="text-ink-700 underline">
            Go back
          </Link>
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-4 py-10">
      <header className="flex items-center justify-between border-b border-outline pb-6">
        <div>
          <p className="text-xs uppercase tracking-wide text-ink-300">
            Workspace
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-ink-700">
            {workspace.name}
          </h1>
          {workspace.description && (
            <p className="mt-2 text-sm text-ink-300">
              {workspace.description}
            </p>
          )}
        </div>
        <Link
          href="/"
          className="rounded-lg border border-outline bg-cardSoft px-3 py-1.5 text-xs font-medium text-ink-700 hover:border-accent-300 hover:bg-card"
        >
          ← All workspaces
        </Link>
      </header>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-300">
            Boards
          </h2>
          <button className="rounded-lg border border-outline bg-cardSoft px-3 py-1.5 text-xs font-medium text-ink-700 hover:border-accent-300 hover:bg-card">
            New board
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {boardsLoading && (
            <p className="text-xs text-ink-300">Loading boards…</p>
          )}
          {boardsError && (
            <p className="text-xs text-red-500">
              Failed to load boards: {(boardsError as Error).message}
            </p>
          )}
          {boards?.map((board) => (
            <Link
              key={board.id}
              href={`/boards/${board.id}`}
              className="group rounded-2xl border border-outline bg-card p-5 shadow-sm shadow-ink-700/10 transition hover:border-accent-300 hover:bg-cardSoft"
            >
              <p className="text-sm font-semibold text-ink-700 group-hover:text-ink-700">
                {board.name}
              </p>
              {board.description && (
                <p className="mt-2 text-xs text-ink-300">
                  {board.description}
                </p>
              )}
              <p className="mt-4 text-[11px] font-medium text-ink-300">
                Open board →
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}


