import { Injectable } from "@nestjs/common";

export type Column = {
  id: string;
  boardId: string;
  name: string;
};

export type Task = {
  id: string;
  boardId: string;
  columnId: string;
  title: string;
  assignee?: string;
};

export type BoardDetail = {
  id: string;
  workspaceId: string;
  name: string;
  description?: string;
  columns: Column[];
  tasks: Task[];
};

@Injectable()
export class BoardsService {
  // In-memory mock data mirroring the frontend for now.
  private readonly boards = [
    {
      id: "b-1",
      workspaceId: "w-1",
      name: "Project Alpha",
      description: "Main Kanban for the demo project."
    },
    {
      id: "b-2",
      workspaceId: "w-1",
      name: "Bug Board",
      description: "Track and triage bugs."
    },
    {
      id: "b-3",
      workspaceId: "w-2",
      name: "Product Roadmap",
      description: "High level roadmap."
    }
  ];

  private readonly columns: Column[] = [
    { id: "c-1", boardId: "b-1", name: "Todo" },
    { id: "c-2", boardId: "b-1", name: "Doing" },
    { id: "c-3", boardId: "b-1", name: "Done" },
    { id: "c-4", boardId: "b-2", name: "Open" },
    { id: "c-5", boardId: "b-2", name: "Investigating" },
    { id: "c-6", boardId: "b-2", name: "Resolved" },
    { id: "c-7", boardId: "b-3", name: "Now" },
    { id: "c-8", boardId: "b-3", name: "Next" },
    { id: "c-9", boardId: "b-3", name: "Later" }
  ];

  private readonly tasks: Task[] = [
    {
      id: "t-1",
      boardId: "b-1",
      columnId: "c-1",
      title: "Set up auth flow",
      assignee: "You"
    },
    {
      id: "t-2",
      boardId: "b-1",
      columnId: "c-2",
      title: "Design workspace model",
      assignee: "You"
    },
    {
      id: "t-3",
      boardId: "b-1",
      columnId: "c-3",
      title: "Create monorepo skeleton",
      assignee: "You"
    },
    {
      id: "t-4",
      boardId: "b-2",
      columnId: "c-4",
      title: "Fix drag & drop glitch",
      assignee: "Alex"
    },
    {
      id: "t-5",
      boardId: "b-3",
      columnId: "c-7",
      title: "Ship real-time collaboration",
      assignee: "Team"
    }
  ];

  findDetail(id: string): BoardDetail | undefined {
    const board = this.boards.find((b) => b.id === id);
    if (!board) return undefined;

    const columns = this.columns.filter((c) => c.boardId === id);
    const tasks = this.tasks.filter((t) => t.boardId === id);

    return {
      ...board,
      columns,
      tasks
    };
  }
}


