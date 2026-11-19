/**
 * 姓名：樊宏宇 | 学号：24001010618 | 时间：2026-11-19 | 大模型：Tencent Hunyuan Hy
 * 科技新闻数据模型
 */
const { Fanhy_getPool } = require('../utils/Fanhy_db');
const { Fanhy_newsList } = require('../utils/Fanhy_fallbackData');

async function Fanhy_findAllNews() {
  const Fanhy_pool = Fanhy_getPool();
  if (!Fanhy_pool) {
    return Fanhy_newsList;
  }
  const [Fanhy_rows] = await Fanhy_pool.query('SELECT * FROM Fanhy_news ORDER BY Fanhy_publishTime DESC');
  return Fanhy_rows;
}

module.exports = { Fanhy_findAllNews };
