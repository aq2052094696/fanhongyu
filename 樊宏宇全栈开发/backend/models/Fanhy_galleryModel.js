/**
 * 姓名：樊宏宇 | 学号：24001010618 | 时间：2026-11-19 | 大模型：Tencent Hunyuan Hy
 * 图文列表数据模型
 */
const { Fanhy_getPool } = require('../utils/Fanhy_db');
const { Fanhy_galleryList } = require('../utils/Fanhy_fallbackData');

async function Fanhy_findAllGallery() {
  const Fanhy_pool = Fanhy_getPool();
  if (!Fanhy_pool) {
    return Fanhy_galleryList;
  }
  const [Fanhy_rows] = await Fanhy_pool.query('SELECT * FROM Fanhy_gallery ORDER BY Fanhy_createTime DESC');
  return Fanhy_rows;
}

module.exports = { Fanhy_findAllGallery };
