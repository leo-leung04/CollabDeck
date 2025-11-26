 "use client";

import Link from "next/link";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import type {
  Board,
  Column,
  Task
} from "../../../lib/mock-data";
import { apiClient } from "../../../lib/api-client";
import { getBoardSocket } from "../../../lib/realtime";

type Props = {
  params: {
    boardId: string;
  };
};

type BoardDetail = Board & {
  columns: Column[];
  tasks: Task[];
};

function useBoardDetail(id: string) {
  return useQuery<BoardDetail>({
    queryKey: ["board", id],
    queryFn: () => apiClient.fetchJson<BoardDetail>(`/boards/${id}`)
  });
}

export default function BoardPage({ params }: Props) {
  const {
    data,
    isLoading,
    error
  } = useBoardDetail(params.boardId);

  useEffect(() => {
    const socket = getBoardSocket();
    socket.emit("join_board", { boardId: params.boardId });

    const handleJoined = (payload: { boardId: string }) => {
      // eslint-disable-next-line no-console
      console.log("Joined board room", payload.boardId);
    };

    const handleTaskUpdated = (payload: unknown) => {
      // Placeholder: later we'll merge this into React Query cache / Zustand
      // eslint-disable-next-line no-console
      console.log("Received task_updated event", payload);
    };

    socket.on("joined_board", handleJoined);
    socket.on("task_updated", handleTaskUpdated);

    return () => {
      socket.off("joined_board", handleJoined);
      socket.off("task_updated", handleTaskUpdated);
    };
  }, [params.boardId]);

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-ink-300">Loading board…</p>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-ink-300">
          Failed to load board.{" "}
          <Link href="/" className="text-ink-700 underline">
            Go back
          </Link>
        </p>
      </main>
    );
  }

  const { columns, tasks, workspaceId, name, description } = data;

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 px-4 py-8">
      <header className="flex items-center justify-between border-b border-outline pb-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-ink-300">Board</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-ink-700">
            {name}
          </h1>
          {description && (
            <p className="mt-2 text-sm text-ink-300">{description}</p>
          )}
        </div>
        <Link
          href={`/workspaces/${workspaceId}`}
          className="rounded-lg border border-outline bg-cardSoft px-3 py-1.5 text-xs font-medium text-ink-700 hover:border-accent-300 hover:bg-card"
        >
          ← Back to workspace
        </Link>
      </header>

      <section className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((column) => (
          <div
            key={column.id}
            className="min-w-[260px] flex-1 rounded-2xl border border-outline bg-card p-4"
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-ink-500">
                {column.name}
              </h2>
              <span className="text-[11px] text-ink-300">
                {
                  tasks.filter((task) => task.columnId === column.id)
                    .length
                }{" "}
                cards
              </span>
            </div>

            <div className="space-y-3">
              {tasks
                .filter((task) => task.columnId === column.id)
                .map((task) => (
                  <article
                    key={task.id}
                    className="rounded-xl border border-outline bg-cardSoft p-3 text-xs shadow-sm shadow-ink-700/10"
                  >
                    <p className="font-medium text-ink-700">
                      {task.title}
                    </p>
                    {task.assignee && (
                      <p className="mt-1 text-[11px] text-ink-300">
                        Assignee: {task.assignee}
                      </p>
                    )}
                  </article>
                ))}

              {tasks.filter((task) => task.columnId === column.id).length ===
                0 && (
                <p className="text-[11px] italic text-ink-300">
                  No tasks yet.
                </p>
              )}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}


