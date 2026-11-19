<!-- 姓名：樊宏宇 | 学号：24001010618 | 时间：2026-11-19 | 大模型：Tencent Hunyuan Hy -->
# Fanhy 接口记录（追加制）

## 接口 1
- 接口路径：/api/news
- HTTP 方法：GET
- 请求参数：无
- 响应格式：
```json
{ "code": 0, "msg": "科技新闻列表获取成功", "data": { "list": [ { "Fanhy_id": 1, "Fanhy_title": "OpenAI 发布 GPT-5 多模态大模型", "Fanhy_summary": "...", "Fanhy_source": "科技前沿", "Fanhy_publishTime": "2026-11-18 09:30:00", "Fanhy_imageUrl": "images/news-ai.svg", "Fanhy_category": "人工智能", "Fanhy_views": 15820 } ], "total": 8 } }
```
- 修改时间：2026-11-19

## 接口 2
- 接口路径：/api/gallery
- HTTP 方法：GET
- 请求参数：无
- 响应格式：
```json
{ "code": 0, "msg": "图文列表获取成功", "data": { "list": [ { "Fanhy_id": 1, "Fanhy_title": "极光下的冰岛公路", "Fanhy_imageUrl": "images/gallery-aurora.svg", "Fanhy_description": "...", "Fanhy_category": "风光摄影", "Fanhy_author": "林知远", "Fanhy_createTime": "2026-11-10 20:30:00", "Fanhy_likes": 3200 } ], "total": 8 } }
```
- 修改时间：2026-11-19

## 接口 3
- 接口路径：/api/db/test
- HTTP 方法：POST
- 请求参数（含示例）：`{ "user": "root", "password": "root" }`
- 响应格式：
```json
{ "code": 0, "msg": "数据库连接成功", "data": { "connected": true, "usingPool": true, "user": "root" } }
```
- 修改时间：2026-11-19

## 接口 4
- 接口路径：/api/health
- HTTP 方法：GET
- 请求参数：无
- 响应格式：
```json
{ "code": 0, "msg": "Fanhy 全栈服务运行中", "data": { "time": "2026-11-19T06:00:00.000Z" } }
```
- 修改时间：2026-11-19
