import { Controller, Get, NotFoundException, Param } from "@nestjs/common";
import { BoardsService } from "./boards.service";

@Controller("boards")
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get(":id")
  findOne(@Param("id") id: string) {
    const board = this.boardsService.findDetail(id);
    if (!board) {
      throw new NotFoundException("Board not found");
    }
    return board;
  }
}


