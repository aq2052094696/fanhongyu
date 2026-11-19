/**
 * 姓名：樊宏宇 | 学号：24001010618 | 时间：2026-11-19 | 大模型：Tencent Hunyuan Hy
 * 统一 JSON 响应格式：{ code:0, msg:'提示信息', data:{...} }
 */
function Fanhy_ok(Fanhy_res, Fanhy_data, Fanhy_msg) {
  return Fanhy_res.json({
    code: 0,
    msg: Fanhy_msg || '操作成功',
    data: Fanhy_data === undefined ? {} : Fanhy_data
  });
}

function Fanhy_fail(Fanhy_res, Fanhy_msg, Fanhy_code) {
  return Fanhy_res.json({
    code: Fanhy_code || 1,
    msg: Fanhy_msg || '操作失败',
    data: {}
  });
}

module.exports = { Fanhy_ok, Fanhy_fail };
