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
export declare class WorkspacesService {
    private readonly workspaces;
    private readonly boards;
    findAll(): Workspace[];
    findOne(id: string): Workspace | undefined;
    findBoardsForWorkspace(workspaceId: string): Board[];
}
