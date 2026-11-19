/**
 * 姓名：樊宏宇 | 学号：24001010618 | 时间：2026-11-19 | 大模型：Tencent Hunyuan Hy
 * 内置降级数据：与 Fanhy_database.md 中的 16 条测试数据完全一致。
 * 当本机 MySQL 不可用时，后端自动改用本数据，保证页面与接口完整可演示。
 */

const Fanhy_newsList = [
  { Fanhy_id: 1, Fanhy_title: 'OpenAI 发布 GPT-5 多模态大模型', Fanhy_summary: '新一代模型在推理、代码与多模态理解上全面升级，长上下文能力显著增强。', Fanhy_source: '科技前沿', Fanhy_publishTime: '2026-11-18 09:30:00', Fanhy_imageUrl: 'images/news-ai.svg', Fanhy_category: '人工智能', Fanhy_views: 15820 },
  { Fanhy_id: 2, Fanhy_title: '国产芯片实现 3nm 工艺量产突破', Fanhy_summary: '国内晶圆厂宣布 3nm 制程良率达到商用标准，自主 IP 核加速落地。', Fanhy_source: '芯观察', Fanhy_publishTime: '2026-11-17 14:20:00', Fanhy_imageUrl: 'images/news-chip.svg', Fanhy_category: '半导体', Fanhy_views: 24310 },
  { Fanhy_id: 3, Fanhy_title: '量子计算新纪录：1000 量子比特纠错', Fanhy_summary: '研究团队实现千比特级别逻辑量子比特纠错，错误率降至新低。', Fanhy_source: '量子日报', Fanhy_publishTime: '2026-11-16 10:05:00', Fanhy_imageUrl: 'images/news-quantum.svg', Fanhy_category: '前沿科技', Fanhy_views: 9870 },
  { Fanhy_id: 4, Fanhy_title: 'SpaceX 星舰完成第 12 次轨道试飞', Fanhy_summary: '星舰成功完成在轨燃料转移与再入着陆，为登月计划奠定基础。', Fanhy_source: '航天视界', Fanhy_publishTime: '2026-11-15 08:45:00', Fanhy_imageUrl: 'images/news-space.svg', Fanhy_category: '航天航空', Fanhy_views: 31250 },
  { Fanhy_id: 5, Fanhy_title: '华为发布鸿蒙 NEXT 正式版', Fanhy_summary: '全新分布式架构带来流畅体验，原生应用生态突破一万款。', Fanhy_source: '数码之家', Fanhy_publishTime: '2026-11-14 16:10:00', Fanhy_imageUrl: 'images/news-harmony.svg', Fanhy_category: '操作系统', Fanhy_views: 18960 },
  { Fanhy_id: 6, Fanhy_title: '特斯拉 FSD 自动驾驶获准商业化运营', Fanhy_summary: '监管机构批准完全自动驾驶在城市道路的商业化运营许可。', Fanhy_source: '智能汽车', Fanhy_publishTime: '2026-11-13 11:00:00', Fanhy_imageUrl: 'images/news-car.svg', Fanhy_category: '自动驾驶', Fanhy_views: 27540 },
  { Fanhy_id: 7, Fanhy_title: '全球首个 6G 试验网在沪开通', Fanhy_summary: '6G 试验网实现太赫兹通信与空天地一体化组网的初步验证。', Fanhy_source: '通信世界', Fanhy_publishTime: '2026-11-12 13:25:00', Fanhy_imageUrl: 'images/news-6g.svg', Fanhy_category: '通信', Fanhy_views: 14320 },
  { Fanhy_id: 8, Fanhy_title: '元宇宙教育平台上线沉浸式课堂', Fanhy_summary: '基于 VR 的沉浸式教学平台上线，支持多人实时协同实验。', Fanhy_source: '教育科技', Fanhy_publishTime: '2026-11-11 09:15:00', Fanhy_imageUrl: 'images/news-vr.svg', Fanhy_category: '元宇宙', Fanhy_views: 8650 }
];

const Fanhy_galleryList = [
  { Fanhy_id: 1, Fanhy_title: '极光下的冰岛公路', Fanhy_imageUrl: 'images/gallery-aurora.svg', Fanhy_description: '在冰岛南岸的夜色中，极光如绸缎般铺展，公路延伸向远方。', Fanhy_category: '风光摄影', Fanhy_author: '林知远', Fanhy_createTime: '2026-11-10 20:30:00', Fanhy_likes: 3200 },
  { Fanhy_id: 2, Fanhy_title: '京都暮秋的枫叶', Fanhy_imageUrl: 'images/gallery-kyoto.svg', Fanhy_description: '岚山竹林之外的古寺，红枫与石阶构成秋日最温柔的配色。', Fanhy_category: '人文旅行', Fanhy_author: '苏念', Fanhy_createTime: '2026-11-09 15:20:00', Fanhy_likes: 2180 },
  { Fanhy_id: 3, Fanhy_title: '深海蓝洞的神秘光束', Fanhy_imageUrl: 'images/gallery-ocean.svg', Fanhy_description: '潜水员在伯利兹蓝洞拍摄到穿透水层的丁达尔光束。', Fanhy_category: '自然探索', Fanhy_author: '陈屿', Fanhy_createTime: '2026-11-08 11:40:00', Fanhy_likes: 4560 },
  { Fanhy_id: 4, Fanhy_title: '撒哈拉的星空营地', Fanhy_imageUrl: 'images/gallery-desert.svg', Fanhy_description: '无光害的沙漠腹地，银河清晰得仿佛触手可及。', Fanhy_category: '星空摄影', Fanhy_author: '周野', Fanhy_createTime: '2026-11-07 23:10:00', Fanhy_likes: 3890 },
  { Fanhy_id: 5, Fanhy_title: '挪威峡湾的清晨', Fanhy_imageUrl: 'images/gallery-fjord.svg', Fanhy_description: '薄雾缭绕的峡湾与红色木屋，构成北欧最经典的画面。', Fanhy_category: '风光摄影', Fanhy_author: '林知远', Fanhy_createTime: '2026-11-06 07:25:00', Fanhy_likes: 2740 },
  { Fanhy_id: 6, Fanhy_title: '重庆洪崖洞夜色', Fanhy_imageUrl: 'images/gallery-chongqing.svg', Fanhy_description: '依山而建的吊脚楼灯火辉煌，现实版的千与千寻。', Fanhy_category: '城市印象', Fanhy_author: '李Follow', Fanhy_createTime: '2026-11-05 19:50:00', Fanhy_likes: 5120 },
  { Fanhy_id: 7, Fanhy_title: '阿尔卑斯山的花海', Fanhy_imageUrl: 'images/gallery-alps.svg', Fanhy_description: '夏季的高山草甸开满野花，远处雪山巍峨。', Fanhy_category: '自然探索', Fanhy_author: '苏念', Fanhy_createTime: '2026-11-04 10:15:00', Fanhy_likes: 1980 },
  { Fanhy_id: 8, Fanhy_title: '江南水乡的乌篷船', Fanhy_imageUrl: 'images/gallery-jiangnan.svg', Fanhy_description: '烟雨朦胧的乌镇水巷，乌篷船划过青石桥的倒影。', Fanhy_category: '人文旅行', Fanhy_author: '陈屿', Fanhy_createTime: '2026-11-03 14:35:00', Fanhy_likes: 2650 }
];

module.exports = { Fanhy_newsList, Fanhy_galleryList };
