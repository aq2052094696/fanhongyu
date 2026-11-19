/**
 * 姓名：樊宏宇 | 学号：24001010618 | 时间：2026-11-19 | 大模型：Tencent Hunyuan Hy
 * 后端入口：Express + RESTful + MVC，端口 8618，express.static 托管 frontend，支持所有跨域。
 */
const express = require('express');
const cors = require('cors');
const path = require('path');

const { Fanhy_initDb } = require('./utils/Fanhy_db');
const Fanhy_apiRoutes = require('./routes/Fanhy_apiRoutes');

const Fanhy_app = express();
const Fanhy_PORT = 8618;

// 支持所有跨域访问
Fanhy_app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
Fanhy_app.use(express.json());
Fanhy_app.use(express.urlencoded({ extended: true }));

// API 路由
Fanhy_app.use('/api', Fanhy_apiRoutes);

// 静态托管前端目录
Fanhy_app.use(express.static(path.join(__dirname, '..', 'frontend')));

// 兜底：未知接口返回统一格式
Fanhy_app.use('/api', function (Fanhy_req, Fanhy_res) {
  Fanhy_res.status(404).json({ code: 404, msg: '接口不存在：' + Fanhy_req.originalUrl, data: {} });
});

// 初始化数据库后启动服务
Fanhy_initDb().then(function () {
  Fanhy_app.listen(Fanhy_PORT, function () {
    console.log('========================================');
    console.log('  Fanhy 全栈项目已启动');
    console.log('  访问地址：http://localhost:' + Fanhy_PORT);
    console.log('========================================');
  });
});

module.exports = Fanhy_app;
