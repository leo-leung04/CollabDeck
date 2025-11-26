import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import type { Server, Socket } from "socket.io";

@WebSocketGateway({
  namespace: "boards",
  cors: {
    origin: ["http://localhost:3000"]
  }
})
export class RealtimeGateway {
  @WebSocketServer()
  server!: Server;

  @SubscribeMessage("join_board")
  handleJoinBoard(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { boardId: string }
  ) {
    const room = `board:${payload.boardId}`;
    client.join(room);
    client.emit("joined_board", { boardId: payload.boardId });
  }

  // Example method to broadcast a task update to all clients in a board room.
  broadcastTaskUpdated(boardId: string, task: unknown) {
    const room = `board:${boardId}`;
    this.server.to(room).emit("task_updated", { boardId, task });
  }
}


