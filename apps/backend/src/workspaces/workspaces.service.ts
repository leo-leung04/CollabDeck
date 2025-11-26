import { Injectable } from "@nestjs/common";

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

@Injectable()
export class WorkspacesService {
  // In-memory mock data for now. Will be replaced by DB access later.
  private readonly workspaces: Workspace[] = [
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

  private readonly boards: Board[] = [
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

  findAll(): Workspace[] {
    return this.workspaces;
  }

  findOne(id: string): Workspace | undefined {
    return this.workspaces.find((w) => w.id === id);
  }

  findBoardsForWorkspace(workspaceId: string): Board[] {
    return this.boards.filter((b) => b.workspaceId === workspaceId);
  }
}


