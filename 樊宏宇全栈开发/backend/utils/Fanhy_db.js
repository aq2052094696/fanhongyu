/**
 * 姓名：樊宏宇 | 学号：24001010618 | 时间：2026-11-19 | 大模型：Tencent Hunyuan Hy
 * 数据库连接层：优先使用 MySQL（凭据来自 backend/.env），连接失败自动切换到内置数据。
 */
const mysql = require('mysql2/promise');
const path = require('path');

// 手动加载 .env（不把凭据写死在代码里）
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const Fanhy_dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'fanhy_fullstack',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 5
};

let Fanhy_pool = null;

// 尝试建立连接池并初始化表结构
async function Fanhy_initDb() {
  let Fanhy_bootConn = null;
  try {
    // 第一步：不指定数据库先连上 MySQL 服务，确保目标库存在
    Fanhy_bootConn = await mysql.createConnection({
      host: Fanhy_dbConfig.host,
      user: Fanhy_dbConfig.user,
      password: Fanhy_dbConfig.password,
      port: Fanhy_dbConfig.port
    });
    await Fanhy_bootConn.query(
      `CREATE DATABASE IF NOT EXISTS ${Fanhy_dbConfig.database} DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci`
    );
    await Fanhy_bootConn.end();
    Fanhy_bootConn = null;

    // 第二步：建立指定数据库的连接池
    Fanhy_pool = mysql.createPool(Fanhy_dbConfig);
    const Fanhy_conn = await Fanhy_pool.getConnection();
    await Fanhy_conn.query('SELECT 1');
    Fanhy_conn.release();
    await Fanhy_ensureTables();
    console.log('[Fanhy DB] ✅ MySQL 连接成功，使用真实数据库：' + Fanhy_dbConfig.database);
    return true;
  } catch (err) {
    if (Fanhy_bootConn) { try { await Fanhy_bootConn.end(); } catch (e) {} }
    console.warn('[Fanhy DB] ⚠️ MySQL 不可用，自动切换到内置数据。原因：' + err.message);
    Fanhy_pool = null;
    return false;
  }
}

// 自动建库建表并写入测试数据（幂等：仅在空表时插入）
async function Fanhy_ensureTables() {
  const Fanhy_ddl = [
    `CREATE TABLE IF NOT EXISTS Fanhy_news (
      Fanhy_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '主键',
      Fanhy_title VARCHAR(200) NOT NULL COMMENT '新闻标题',
      Fanhy_summary VARCHAR(500) NOT NULL COMMENT '新闻摘要',
      Fanhy_source VARCHAR(100) NOT NULL COMMENT '新闻来源',
      Fanhy_publishTime DATETIME NOT NULL COMMENT '发布时间',
      Fanhy_imageUrl VARCHAR(300) COMMENT '封面图地址',
      Fanhy_category VARCHAR(50) COMMENT '分类',
      Fanhy_views INT DEFAULT 0 COMMENT '浏览量',
      Fanhy_createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='科技新闻表'`,
    `CREATE TABLE IF NOT EXISTS Fanhy_gallery (
      Fanhy_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '主键',
      Fanhy_title VARCHAR(200) NOT NULL COMMENT '图文标题',
      Fanhy_imageUrl VARCHAR(300) NOT NULL COMMENT '图片地址',
      Fanhy_description VARCHAR(500) COMMENT '图文简介',
      Fanhy_category VARCHAR(50) COMMENT '分类标签',
      Fanhy_author VARCHAR(50) COMMENT '作者',
      Fanhy_createTime DATETIME NOT NULL COMMENT '创建时间',
      Fanhy_likes INT DEFAULT 0 COMMENT '点赞数'
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='图文列表表'`
  ];
  for (const Fanhy_sql of Fanhy_ddl) {
    await Fanhy_pool.query(Fanhy_sql);
  }

  const Fanhy_fallback = require('./Fanhy_fallbackData');
  const Fanhy_newsCount = await Fanhy_pool.query('SELECT COUNT(*) AS n FROM Fanhy_news');
  if (Fanhy_newsCount[0][0].n === 0) {
    for (const Fanhy_item of Fanhy_fallback.Fanhy_newsList) {
      await Fanhy_pool.query(
        'INSERT INTO Fanhy_news (Fanhy_title,Fanhy_summary,Fanhy_source,Fanhy_publishTime,Fanhy_imageUrl,Fanhy_category,Fanhy_views) VALUES (?,?,?,?,?,?,?)',
        [Fanhy_item.Fanhy_title, Fanhy_item.Fanhy_summary, Fanhy_item.Fanhy_source, Fanhy_item.Fanhy_publishTime, Fanhy_item.Fanhy_imageUrl, Fanhy_item.Fanhy_category, Fanhy_item.Fanhy_views]
      );
    }
  }
  const Fanhy_galleryCount = await Fanhy_pool.query('SELECT COUNT(*) AS n FROM Fanhy_gallery');
  if (Fanhy_galleryCount[0][0].n === 0) {
    for (const Fanhy_item of Fanhy_fallback.Fanhy_galleryList) {
      await Fanhy_pool.query(
        'INSERT INTO Fanhy_gallery (Fanhy_title,Fanhy_imageUrl,Fanhy_description,Fanhy_category,Fanhy_author,Fanhy_createTime,Fanhy_likes) VALUES (?,?,?,?,?,?,?)',
        [Fanhy_item.Fanhy_title, Fanhy_item.Fanhy_imageUrl, Fanhy_item.Fanhy_description, Fanhy_item.Fanhy_category, Fanhy_item.Fanhy_author, Fanhy_item.Fanhy_createTime, Fanhy_item.Fanhy_likes]
      );
    }
  }
}

function Fanhy_getPool() {
  return Fanhy_pool;
}

// 测试指定账号密码能否连接 MySQL（用于 database.html）
async function Fanhy_testConnection(Fanhy_user, Fanhy_password) {
  let Fanhy_conn = null;
  try {
    Fanhy_conn = await mysql.createConnection({
      host: Fanhy_dbConfig.host,
      user: Fanhy_user,
      password: Fanhy_password,
      port: 3306
    });
    await Fanhy_conn.query('SELECT 1 AS ok');
    return { ok: true, msg: '数据库连接成功' };
  } catch (err) {
    return { ok: false, msg: '数据库连接失败：' + err.message };
  } finally {
    if (Fanhy_conn) { try { await Fanhy_conn.end(); } catch (e) {} }
  }
}

module.exports = { Fanhy_initDb, Fanhy_getPool, Fanhy_testConnection, Fanhy_dbConfig };
