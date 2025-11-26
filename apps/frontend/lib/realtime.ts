"use client";

import { io, type Socket } from "socket.io-client";

let socket: Socket | null = null;

const WS_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace("/api", "") ??
  "http://localhost:4000";

export function getBoardSocket(): Socket {
  if (!socket) {
    socket = io(`${WS_BASE_URL}/boards`, {
      transports: ["websocket"],
      autoConnect: true
    });
  }
  return socket;
}


