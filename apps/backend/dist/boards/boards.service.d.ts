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
export declare class BoardsService {
    private readonly boards;
    private readonly columns;
    private readonly tasks;
    findDetail(id: string): BoardDetail | undefined;
}
