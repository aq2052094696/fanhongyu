<!-- 姓名：樊宏宇 | 学号：24001010618 | 时间：2026-11-19 | 大模型：Tencent Hunyuan Hy -->
# Fanhy 全栈典藏展厅

- **学号**：24001010618
- **姓名**：樊宏宇
- **项目类别**：自选 · 高级特效典藏版

## 项目简介
一个基于 Vibe Coding 的完整前后端项目，采用「流体渐变 + 玻璃拟态 + 星空粒子光轨」的典藏特效风格，涵盖环境搭建、数据库连接测试、科技新闻列表、图文列表与开发步骤手册。

## 技术栈
- 前端：原生 HTML / CSS / JavaScript（无任何第三方库、框架、CDN）
- 后端：Node.js + Express（RESTful + MVC），端口 `8618`，接口前缀 `/api/`
- 数据库：MySQL（凭据在 `backend/.env`，已加入 `.gitignore`；不可用时自动降级为内置数据）

## 运行方式
1. 双击项目根目录的 `启动项目.bat`（或进入 `backend/` 执行 `node app.js`）
2. 浏览器访问 `http://localhost:8618`

## 页面一览
| 页面 | 说明 |
|------|------|
| `frontend/index.html` | 典藏特效首页 + 页面导航 |
| `frontend/database.html` | 数据库连接测试 |
| `frontend/news.html` | 科技新闻列表（Fanhy_news 表） |
| `frontend/gallery.html` | 图文列表（Fanhy_gallery 表） |
| `frontend/guide.html` | 全栈开发步骤典藏版手册 |

## 接口一览
- `GET /api/news` — 科技新闻列表
- `GET /api/gallery` — 图文列表
- `POST /api/db/test` — 数据库连接测试
- `GET /api/health` — 健康检查

## 记录文件
- `Fanhy_prompt.md` — 开发指令记录
- `backend/Fanhy_interface.md` — 接口记录
- `backend/Fanhy_database.md` — 数据库重建记录（可完整重建）
