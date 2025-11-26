## CollabDeck Frontend

This is the **Next.js 14 + TypeScript + Tailwind CSS** app that powers the CollabDeck web UI.  
目前它已经通过 React Query 调用 NestJS 后端的 REST API，并接入了 Zustand 和 Socket.io 的基础设施，可以平滑扩展为完整的实时协作看板。

---

## 技术栈概览

- **框架**: `Next.js 14`（App Router，使用 `app/` 目录）
- **语言**: TypeScript（`strict: true`）
- **样式**: Tailwind CSS，配合自定义「莫兰迪」风格的调色板
- **状态 / 数据**:
  - 服务器数据：全局使用 `@tanstack/react-query` 调用后端 REST API，并做缓存/错误处理。
  - UI 状态：使用 `Zustand` 管理全局 UI（如 Command Palette 开关，后续可扩展到拖拽状态等）。
- **实时通信**:
  - 前端通过 `socket.io-client` 连接 NestJS 的 WebSocket Gateway，为后续实时任务更新/在线协作打通通道。

---

## 目录结构 & 模块说明

### 顶层文件

- **`package.json`**  
  - 定义前端 app 的依赖和脚本：
    - `npm run dev`：启动本地 Next.js 开发服务器
    - `npm run build`：构建生产版本
    - `npm run start`：启动生产环境服务器（基于构建产物）
    - `npm run lint`：运行 Next.js 默认 ESLint 规则
  - 依赖里最重要的几项：
    - `next`, `react`, `react-dom`：核心前端框架
    - `@tanstack/react-query`, `@tanstack/react-query-devtools`：数据请求与缓存
    - `zustand`：轻量级全局状态管理，用于 UI 状态（非服务器数据）
    - `socket.io-client`：连接后端 WebSocket Gateway 的实时客户端
    - `tailwindcss`, `postcss`, `autoprefixer`：样式方案

- **`tsconfig.json`**  
  - TypeScript 编译配置：
    - `strict: true`：严格类型检查
    - `moduleResolution: "bundler"`：适配 Next.js 14 的打包方式
    - `paths` 中定义了别名：`"@/*": ["./*"]`

- **`next.config.mjs`**  
  - Next.js 配置：
    - `reactStrictMode: true`：React 严格模式
    - `experimental.appDir: true`：启用 App Router（`app/` 目录）

- **`tailwind.config.ts`**  
  - Tailwind 的配置，重点是自定义的莫兰迪风格颜色：
    - `canvas`：页面背景主色（偏米白）
    - `card` / `cardSoft`：卡片 & 浅卡片背景色
    - `outline`：边框颜色
    - `ink.300/500/700`：不同深度的文字颜色
    - `accent.100/300/500`：按钮/高亮的点缀色

- **`postcss.config.mjs`**  
  - Tailwind + Autoprefixer 插件接入，Next.js 编译时会自动使用。

---

## `app/` 目录（Next.js App Router）

App Router 的核心思想是：**文件结构 = 路由结构**。

### 全局布局 & Provider

- **`app/globals.css`**
  - Tailwind 的基础导入：
    - `@tailwind base;`
    - `@tailwind components;`
    - `@tailwind utilities;`
  - 设置了 `html, body` 高度和系统字体族。

- **`app/layout.tsx`**
  - Next.js App Router 的「根布局」：
    - `export const metadata`：页面默认 `title` / `description`
    - 包裹所有页面的 HTML 骨架：
      - `<html lang="en">`
      - `<body className="bg-canvas text-ink-700">`
    - 在 `body` 内部，按顺序挂了：
      - `Providers`（React Query Provider，全局数据访问）
      - `TopNav`（全局顶部导航，使用 Zustand 控制）
      - `CommandPalette`（命令面板，使用 Zustand 控制开关）
      - `children`（每个路由对应的页面内容）

- **`app/providers.tsx`**
  - `"use client"` 组件，因为 React Query 需要在客户端初始化：
    - 创建 `QueryClient` 并通过 `QueryClientProvider` 提供给整棵 React 树。
    - 通过 `ReactQueryDevtools` 在开发阶段调试请求/缓存。

### 顶部导航 & Command Palette

- **`components/top-nav.tsx`**
  - **Client Component**（使用 `"use client"`），因为内部使用了 Zustand。
  - 全局导航栏组件：
    - 左侧：简单 Logo「CD」+ 文案 `CollabDeck`（点击回到 `/`）。
    - 右侧：`Workspaces` 链接、「Command Palette ⌘K」按钮、用户头像占位。
    - 点击「Command Palette ⌘K」会调用 `useUIStore().openCommandPalette()` 打开命令面板。

- **`components/command-palette.tsx`**
  - 简单的命令面板对话框，展示在视图中央。
  - 从 `useUIStore` 读取 `commandPaletteOpen` 控制显隐，并提供关闭按钮。
  - 未来会扩展为全局搜索 Workspaces / Boards / Tasks 的入口。

---

## 页面路由

### 首页：Workspaces 列表

- **路由**: `/`
- **文件**: `app/page.tsx`
- 作用：
  - 展示当前用户可见的 Workspaces 列表（真实数据来自后端 REST API）。
  - 每个 Workspace 卡片可以点击，跳转到 `/workspaces/[workspaceId]`。
- 数据来源：
  - 使用 `useQuery` 调用 `GET /api/workspaces`（封装在 `apiClient.fetchJson("/workspaces")` 中）。
- 面试要点：
  - 首页相当于「团队/Space 入口」，通过 React Query 调用后端 `/workspaces` API，并且内置加载/错误状态处理。

### Workspace 详情页：Boards 列表

- **路由**: `/workspaces/[workspaceId]`
- **文件**: `app/workspaces/[workspaceId]/page.tsx`
- 作用：
  - 根据 `workspaceId` 查询该 Workspace 的详细信息和其下属 Boards 列表。
  - 点击某个 Board 卡片，跳转到 `/boards/[boardId]`。
  - 右上角有「← All workspaces」按钮返回首页。
- 数据来源：
  - `useWorkspace(id)`：`GET /api/workspaces/:id`
  - `useWorkspaceBoards(id)`：`GET /api/workspaces/:id/boards`
- 面试要点：
  - 演示了 Next App Router 的 **动态路由参数**（`[workspaceId]`）。
  - 展示了如何为同一个页面拆分多个 React Query（workspace + boards），并分别处理 loading/error。

### Board 看板页：列和任务骨架 + 实时通道

- **路由**: `/boards/[boardId]`
- **文件**: `app/boards/[boardId]/page.tsx`
- 作用：
  - 展示一个 Board 的基本信息 + 其下的列（Columns）和任务（Tasks）。
  - UI 是典型 Kanban 结构：多列左右横向滚动，每列下面是一组任务卡片。
- 数据来源：
  - `useBoardDetail(id)`：`GET /api/boards/:id`，后端返回 `{ ...board, columns, tasks }`。
- 实时通道：
  - 在 `useEffect` 中通过 `getBoardSocket()` 建立到 `ws://localhost:4000/boards` 的 Socket.io 连接。
  - 进入页面时发送 `join_board` 事件加入房间 `board:{boardId}`，监听：
    - `joined_board`：确认加入成功（目前在控制台打印）。
    - `task_updated`：任务更新事件（目前在控制台打印，未来会合并入 React Query/Zustand）。
- 面试要点：
  - 当前是「只读骨架」，但已经打通了 REST + WebSocket 通道，后续只需在任务更新时调用 Gateway 即可实现实时协作。

---

## `lib` 目录：数据访问 & 状态 & 实时

- **`lib/mock-data.ts`**
  - 定义了核心类型：`Workspace`, `Board`, `Column`, `Task`。
  - 保留了一份与后端 mock 数据结构一致的本地数据，主要用于类型共享和开发阶段的对照。

- **`lib/api-client.ts`**
  - 封装了调用后端 REST API 的工具：
    - `API_BASE_URL` 默认指向 `http://localhost:4000/api`（可通过 `NEXT_PUBLIC_API_BASE_URL` 覆盖）。
    - `apiClient.fetchJson<T>(path)`：统一处理 `fetch`、错误封装与 JSON 解析。

- **`lib/ui-store.ts`**
  - 使用 `Zustand` 管理全局 UI 状态：
    - `commandPaletteOpen` 布尔值。
    - `openCommandPalette/closeCommandPalette/toggleCommandPalette` 方法。
  - 与 React Query 负责的「服务器数据」形成明确分层。

- **`lib/realtime.ts`**
  - 使用 `socket.io-client` 连接后端 WebSocket Gateway：
    - `getBoardSocket()`：单例化 Socket 连接到 `WS_BASE_URL/boards`。
    - `WS_BASE_URL` 从 `NEXT_PUBLIC_API_BASE_URL` 推导，默认是 `http://localhost:4000`。

---

## 面试时可以怎样描述这一部分

- **整体架构**  
  - 前端采用 Next.js 14 App Router + TypeScript + Tailwind 搭建。  
  - 使用 React Query 作为统一的数据访问层，连接 NestJS REST API，并处理加载/错误/缓存。  
  - 使用 Zustand 管理纯 UI 状态（如命令面板、拖拽状态），避免与服务器数据混在一起。  
  - 使用 Socket.io 建立与后端 Gateway 的实时通道，为任务更新、在线协作准备好基础设施。

- **路由与信息架构**  
  - 路由结构与业务对象对应：`/` 显示 Workspaces，`/workspaces/[id]` 显示该空间下的 Boards，`/boards/[id]` 显示具体任务看板。  
  - 这和系统设计中的「Workspace → Board → Column → Task」层级保持一致，方便用户理解，也方便后端对齐。

- **演进路径**  
  - 目前已经用 React Query + REST API 把核心数据链路打通，并用 WebSocket 打好实时协作的通道。  
  - 下一步会在 Board 页引入拖拽、任务编辑、权限控制，并将任务更新事件通过 Gateway 广播给同一个 board room 的所有在线用户。


