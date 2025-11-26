import { BoardsService } from "./boards.service";
export declare class BoardsController {
    private readonly boardsService;
    constructor(boardsService: BoardsService);
    findOne(id: string): import("./boards.service").BoardDetail;
}
