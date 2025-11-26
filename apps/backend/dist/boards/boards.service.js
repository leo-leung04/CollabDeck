"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardsService = void 0;
const common_1 = require("@nestjs/common");
let BoardsService = class BoardsService {
    constructor() {
        this.boards = [
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
        this.columns = [
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
        this.tasks = [
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
    }
    findDetail(id) {
        const board = this.boards.find((b) => b.id === id);
        if (!board)
            return undefined;
        const columns = this.columns.filter((c) => c.boardId === id);
        const tasks = this.tasks.filter((t) => t.boardId === id);
        return Object.assign(Object.assign({}, board), { columns,
            tasks });
    }
};
exports.BoardsService = BoardsService;
exports.BoardsService = BoardsService = __decorate([
    (0, common_1.Injectable)()
], BoardsService);
//# sourceMappingURL=boards.service.js.map