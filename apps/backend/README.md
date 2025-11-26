## CollabDeck Backend

This is the **NestJS** backend for CollabDeck.  
它提供 REST API（workspaces/boards/auth/users），以及基于 Socket.io 的 WebSocket Gateway，用于后续的实时协作。

---

## 技术栈概览

- **框架**: `NestJS 10`（模块化架构）
- **运行时**: Node.js + TypeScript
- **传输协议**:
  - REST API（基于 Express）
  - WebSocket（基于 `@nestjs/websockets` + `@nestjs/platform-socket.io`）
- **依赖**（核心）:
  - `@nestjs/common`, `@nestjs/core`, `@nestjs/platform-express`
  - `@nestjs/websockets`, `@nestjs/platform-socket.io`, `socket.io`
  - `rxjs`, `reflect-metadata`

> 目前所有数据都存放在内存中作为 mock，后续接入 PostgreSQL/Prisma 时只需要替换 Service 的实现。

---

## 应用入口 & 全局配置

- **`src/main.ts`**
  - 使用 `NestFactory.create(AppModule)` 启动应用。
  - `app.setGlobalPrefix("api")`：所有 REST 路由挂载在 `/api` 之下。
  - `app.enableCors({ origin: ["http://localhost:3000"], credentials: false })`：
    - 允许前端 Next.js dev server 从 `http://localhost:3000` 调用。
  - `app.listen(4000)`：后端运行在 `http://localhost:4000`。

- **`src/app.module.ts`**
  - 根模块，聚合了所有业务模块：
    - `AuthModule`
    - `UsersModule`
    - `WorkspacesModule`
    - `BoardsModule`
    - `RealtimeModule`
  - 同时注册了：
    - `AppController`（健康检查）
    - `AppService`

- **`src/app.controller.ts` / `src/app.service.ts`**
  - 暴露 `GET /api/health`：
    - 返回 `{ status: "ok", service: "collabdeck-backend", timestamp }`。
  - 用于前端/监控探活。

---

## 模块拆分

### WorkspacesModule（工作区相关）

- **文件**: `src/workspaces/*`
- **Service: `WorkspacesService`**
  - 内存 mock 数据：
    - `workspaces: { id, name, description }[]`
    - `boards: { id, workspaceId, name, description }[]`
  - 提供方法：
    - `findAll()`：返回所有 workspaces。
    - `findOne(id)`：按 id 查 workspace。
    - `findBoardsForWorkspace(workspaceId)`：返回该 workspace 下所有 boards。

- **Controller: `WorkspacesController`**
  - 前缀：`/api/workspaces`
  - 路由：
    - `GET /api/workspaces` → 所有 workspaces。
    - `GET /api/workspaces/:id` → 单个 workspace（找不到时抛 `NotFoundException`）。
    - `GET /api/workspaces/:id/boards` → 该 workspace 下的 boards 列表。
  - 这些接口对应前端：
    - 首页：`GET /api/workspaces`
    - Workspace 页：`GET /api/workspaces/:id` + `GET /api/workspaces/:id/boards`

### BoardsModule（看板详情）

- **文件**: `src/boards/*`
- **Service: `BoardsService`**
  - 内存 mock 数据：
    - `boards`：与 `WorkspacesService` 中一致。
    - `columns: { id, boardId, name }[]`
    - `tasks: { id, boardId, columnId, title, assignee? }[]`
  - 方法：
    - `findDetail(id)`：
      - 查出对应 board；
      - 聚合该 board 的 `columns` 与 `tasks`；
      - 返回 `{ ...board, columns, tasks }`。

- **Controller: `BoardsController`**
  - 前缀：`/api/boards`
  - 路由：
    - `GET /api/boards/:id` → Board 详情（含列 + 任务），不存在时抛 `NotFoundException`。
  - 对应前端：
    - Board 页通过 `GET /api/boards/:id` 渲染列和任务。

### AuthModule（认证空壳）

- **文件**: `src/auth/*`
- **Service: `AuthService`**
  - 定义 `AuthUser` 类型：`{ id, email, name }`。
  - 提供 `mockLogin()`：
    - 返回 `{ accessToken: "mock-token", user: AuthUser }`。
    - 未来会替换为真正的 OAuth/JWT 登录。

- **Controller: `AuthController`**
  - 前缀：`/api/auth`
  - 路由：
    - `GET /api/auth/mock-login` → 返回 mock 登录结果。
  - 目前作为「模块 wiring 是否正常」的演示接口，后续会被真正的 OAuth 回调/登录接口替换。

### UsersModule（用户空壳）

- **文件**: `src/users/*`
- **Service: `UsersService`**
  - 定义 `User` 类型：`{ id, email, name }`。
  - 内存中维护一个 `mockUser`：
    - `findMe()` 始终返回该用户。

- **Controller: `UsersController`**
  - 前缀：`/api/users`
  - 路由：
    - `GET /api/users/me` → 当前用户信息。
  - 后续会被加上认证 Guard，从 JWT/OAuth session 中解析真实用户，再查询数据库。

### RealtimeModule（WebSocket 实时通道）

- **文件**: `src/realtime/*`
- **Gateway: `RealtimeGateway`**
  - 使用装饰器：
    ```ts
    @WebSocketGateway({
      namespace: "boards",
      cors: { origin: ["http://localhost:3000"] }
    })
    ```
  - 字段：
    - `@WebSocketServer() server: Server`：底层 Socket.io server 实例。
  - 事件处理：
    - `@SubscribeMessage("join_board") handleJoinBoard(@ConnectedSocket() client, @MessageBody() { boardId })`
      - 把客户端加入房间 `board:{boardId}`。
      - 通过 `client.emit("joined_board", { boardId })` 通知加入成功。
    - `broadcastTaskUpdated(boardId, task)`：
      - 示例方法：向房间 `board:{boardId}` 内所有客户端广播 `task_updated` 事件。
  - 对应前端：
    - 前端在 Board 页面中通过 `socket.io-client` 连接到 `ws://localhost:4000/boards`，发送 `join_board` 并监听 `joined_board`/`task_updated`，为后续实时任务更新做准备。

---

## 为什么需要这些功能 / 模块？

- **模块化（workspaces / boards / auth / users / realtime）**
  - 将业务按领域拆分为不同的 Nest 模块（DDD-ish），每个模块有自己的 Controller + Service。
  - 好处：
    - 便于多人协作和代码维护；
    - 后续可以为每个模块单独加中间件/Guard/拦截器（例如 Auth Guard、RBAC）。

- **REST API（/workspaces, /boards, /auth, /users）**
  - 前端页面有明确的数据需求：
    - 首页需要「所有 workspaces」；
    - Workspace 页需要「workspaces/:id + 其 boards」；
    - Board 页需要「board + columns + tasks」；
    - 登录/用户信息需要 `auth` 和 `users`。
  - 通过 REST API 为这些页面提供清晰的接口边界，有利于前后端解耦和后续文档化。

- **WebSocket Gateway（boards namespace）**
  - 看板类应用的核心卖点之一是「实时协作」：
    - 多人同时拖拽任务、编辑字段；
    - 实时看到别人动作（谁在线、谁在编辑哪个任务）。
  - 通过 Socket.io + Gateway：
    - 后端可以按「board 房间」粒度向所有在线客户端推送更新；
    - 前端只需订阅对应 room 的事件，无需反复轮询 REST API。

- **Auth/Users 空壳**
  - 现在的实现是 mock，但模块 skeleton 已经成型：
    - 路由路径、Controller、Service、类型定义都准备好。
  - 未来接入 OAuth（Google/GitHub）与 JWT 时：
    - 只需替换 `AuthService` 的实现，并在 `UsersService` 里改为数据库查询；
    - 现有前端/文档/路由结构保持不变。

---

## 面试时可以怎样概括后端

> CollabDeck 的后端使用 NestJS 10，按领域拆分成 `auth/users/workspaces/boards/realtime` 模块。  
> HTTP 层通过 REST API 暴露基础数据读取接口，比如 `/api/workspaces`、`/api/boards/:id` 等，前端用 React Query 直接消费。  
> 实时层通过 `@WebSocketGateway` + Socket.io 搭了一个 `boards` namespace，前端在进入某个 board 时会加入对应的 room，将来任务更新时可以通过 Gateway 在房间内广播 `task_updated` 等事件，实现多人协作的实时同步。


