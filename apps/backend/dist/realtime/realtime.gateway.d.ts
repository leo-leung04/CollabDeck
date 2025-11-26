import type { Server, Socket } from "socket.io";
export declare class RealtimeGateway {
    server: Server;
    handleJoinBoard(client: Socket, payload: {
        boardId: string;
    }): void;
    broadcastTaskUpdated(boardId: string, task: unknown): void;
}
