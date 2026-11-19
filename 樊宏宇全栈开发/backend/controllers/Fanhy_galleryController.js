/**
 * 姓名：樊宏宇 | 学号：24001010618 | 时间：2026-11-19 | 大模型：Tencent Hunyuan Hy
 * 图文列表控制器
 */
const { Fanhy_findAllGallery } = require('../models/Fanhy_galleryModel');
const { Fanhy_ok, Fanhy_fail } = require('../utils/Fanhy_response');

async function Fanhy_getGallery(Fanhy_req, Fanhy_res) {
  try {
    const Fanhy_list = await Fanhy_findAllGallery();
    console.log('[Fanhy API] /api/gallery 返回数据条数：' + Fanhy_list.length);
    return Fanhy_ok(Fanhy_res, { list: Fanhy_list, total: Fanhy_list.length }, '图文列表获取成功');
  } catch (Fanhy_err) {
    console.error('[Fanhy API] /api/gallery 错误：', Fanhy_err);
    return Fanhy_fail(Fanhy_res, '图文列表获取失败：' + Fanhy_err.message);
  }
}

module.exports = { Fanhy_getGallery };
