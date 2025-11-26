export type Workspace = {
  id: string;
  name: string;
  description?: string;
};

export type Board = {
  id: string;
  workspaceId: string;
  name: string;
  description?: string;
};

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

const workspaces: Workspace[] = [
  {
    id: "w-1",
    name: "CollabDeck Demo",
    description: "Demo workspace with sample boards."
  },
  {
    id: "w-2",
    name: "Product Team",
    description: "Backlog and roadmap for product work."
  }
];

const boards: Board[] = [
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

const columns: Column[] = [
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

const tasks: Task[] = [
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

export function getWorkspaces(): Workspace[] {
  return workspaces;
}

export function getWorkspace(id: string): Workspace | undefined {
  return workspaces.find((w) => w.id === id);
}

export function getBoardsForWorkspace(workspaceId: string): Board[] {
  return boards.filter((b) => b.workspaceId === workspaceId);
}

export function getBoard(id: string): Board | undefined {
  return boards.find((b) => b.id === id);
}

export function getColumnsForBoard(boardId: string): Column[] {
  return columns.filter((c) => c.boardId === boardId);
}

export function getTasksForBoard(boardId: string): Task[] {
  return tasks.filter((t) => t.boardId === boardId);
}


