/**
 * 姓名：樊宏宇 | 学号：24001010618 | 时间：2026-11-19 | 大模型：Tencent Hunyuan Hy
 * 科技新闻控制器
 */
const { Fanhy_findAllNews } = require('../models/Fanhy_newsModel');
const { Fanhy_ok, Fanhy_fail } = require('../utils/Fanhy_response');

async function Fanhy_getNews(Fanhy_req, Fanhy_res) {
  try {
    const Fanhy_list = await Fanhy_findAllNews();
    console.log('[Fanhy API] /api/news 返回数据条数：' + Fanhy_list.length);
    return Fanhy_ok(Fanhy_res, { list: Fanhy_list, total: Fanhy_list.length }, '科技新闻列表获取成功');
  } catch (Fanhy_err) {
    console.error('[Fanhy API] /api/news 错误：', Fanhy_err);
    return Fanhy_fail(Fanhy_res, '科技新闻列表获取失败：' + Fanhy_err.message);
  }
}

module.exports = { Fanhy_getNews };
