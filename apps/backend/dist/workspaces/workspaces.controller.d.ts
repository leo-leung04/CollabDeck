import { WorkspacesService } from "./workspaces.service";
export declare class WorkspacesController {
    private readonly workspacesService;
    constructor(workspacesService: WorkspacesService);
    findAll(): import("./workspaces.service").Workspace[];
    findOne(id: string): import("./workspaces.service").Workspace;
    findBoards(id: string): import("./workspaces.service").Board[];
}
