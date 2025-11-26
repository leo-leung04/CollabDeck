"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspacesService = void 0;
const common_1 = require("@nestjs/common");
let WorkspacesService = class WorkspacesService {
    constructor() {
        this.workspaces = [
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
    }
    findAll() {
        return this.workspaces;
    }
    findOne(id) {
        return this.workspaces.find((w) => w.id === id);
    }
    findBoardsForWorkspace(workspaceId) {
        return this.boards.filter((b) => b.workspaceId === workspaceId);
    }
};
exports.WorkspacesService = WorkspacesService;
exports.WorkspacesService = WorkspacesService = __decorate([
    (0, common_1.Injectable)()
], WorkspacesService);
//# sourceMappingURL=workspaces.service.js.map