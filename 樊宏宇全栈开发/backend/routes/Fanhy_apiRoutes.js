/**
 * 姓名：樊宏宇 | 学号：24001010618 | 时间：2026-11-19 | 大模型：Tencent Hunyuan Hy
 * 统一 API 路由：所有接口以 /api/ 为前缀
 */
const express = require('express');
const Fanhy_router = express.Router();

const Fanhy_newsController = require('../controllers/Fanhy_newsController');
const Fanhy_galleryController = require('../controllers/Fanhy_galleryController');
const Fanhy_dbController = require('../controllers/Fanhy_dbController');

Fanhy_router.get('/news', Fanhy_newsController.Fanhy_getNews);
Fanhy_router.get('/gallery', Fanhy_galleryController.Fanhy_getGallery);
Fanhy_router.post('/db/test', Fanhy_dbController.Fanhy_testDb);

// 健康检查接口
Fanhy_router.get('/health', function (Fanhy_req, Fanhy_res) {
  Fanhy_res.json({ code: 0, msg: 'Fanhy 全栈服务运行中', data: { time: new Date().toISOString() } });
});

module.exports = Fanhy_router;
