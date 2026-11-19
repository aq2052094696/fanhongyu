/**
 * 姓名：樊宏宇 | 学号：24001010618 | 时间：2026-11-19 | 大模型：Tencent Hunyuan Hy
 * 数据库连接测试控制器
 */
const { Fanhy_testConnection, Fanhy_getPool } = require('../utils/Fanhy_db');
const { Fanhy_ok } = require('../utils/Fanhy_response');

async function Fanhy_testDb(Fanhy_req, Fanhy_res) {
  const Fanhy_user = Fanhy_req.body.user || 'root';
  const Fanhy_password = Fanhy_req.body.password || 'root';
  console.log('[Fanhy API] /api/db/test 测试账号：' + Fanhy_user);
  const Fanhy_result = await Fanhy_testConnection(Fanhy_user, Fanhy_password);
  console.log('[Fanhy API] /api/db/test 结果：', Fanhy_result);
  return Fanhy_ok(Fanhy_res, {
    connected: Fanhy_result.ok,
    usingPool: !!Fanhy_getPool(),
    user: Fanhy_user
  }, Fanhy_result.msg);
}

module.exports = { Fanhy_testDb };
