import { Controller, Get, NotFoundException, Param } from "@nestjs/common";
import { WorkspacesService } from "./workspaces.service";

@Controller("workspaces")
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @Get()
  findAll() {
    return this.workspacesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    const ws = this.workspacesService.findOne(id);
    if (!ws) {
      throw new NotFoundException("Workspace not found");
    }
    return ws;
  }

  @Get(":id/boards")
  findBoards(@Param("id") id: string) {
    const ws = this.workspacesService.findOne(id);
    if (!ws) {
      throw new NotFoundException("Workspace not found");
    }
    return this.workspacesService.findBoardsForWorkspace(id);
  }
}


