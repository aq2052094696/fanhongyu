<!-- 姓名：樊宏宇 | 学号：24001010618 | 时间：2026-11-19 | 大模型：Tencent Hunyuan Hy -->
# Fanhy 数据库重建记录（按执行顺序，仅凭本文件即可在新机器完整重建）

> 约定：命名一律以 `Fanhy_` 开头；字符集 utf8mb4；每张表至少 8 条真实业务测试数据。

## 1. 创建数据库

```sql
CREATE DATABASE IF NOT EXISTS fanhy_fullstack DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE fanhy_fullstack;
```

## 2. 科技新闻表 Fanhy_news（建表 + 8 条测试数据）

```sql
CREATE TABLE IF NOT EXISTS Fanhy_news (
  Fanhy_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '主键',
  Fanhy_title VARCHAR(200) NOT NULL COMMENT '新闻标题',
  Fanhy_summary VARCHAR(500) NOT NULL COMMENT '新闻摘要',
  Fanhy_source VARCHAR(100) NOT NULL COMMENT '新闻来源',
  Fanhy_publishTime DATETIME NOT NULL COMMENT '发布时间',
  Fanhy_imageUrl VARCHAR(300) COMMENT '封面图地址',
  Fanhy_category VARCHAR(50) COMMENT '分类',
  Fanhy_views INT DEFAULT 0 COMMENT '浏览量',
  Fanhy_createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='科技新闻表';

INSERT INTO Fanhy_news (Fanhy_title, Fanhy_summary, Fanhy_source, Fanhy_publishTime, Fanhy_imageUrl, Fanhy_category, Fanhy_views) VALUES
('OpenAI 发布 GPT-5 多模态大模型', '新一代模型在推理、代码与多模态理解上全面升级，长上下文能力显著增强。', '科技前沿', '2026-11-18 09:30:00', 'images/news-ai.svg', '人工智能', 15820),
('国产芯片实现 3nm 工艺量产突破', '国内晶圆厂宣布 3nm 制程良率达到商用标准， polypeptide 自主 IP 核加速落地。', '芯观察', '2026-11-17 14:20:00', 'images/news-chip.svg', '半导体', 24310),
('量子计算新纪录：1000 量子比特纠错', '研究团队实现千比特级别逻辑量子比特纠错，错误率降至新低。', '量子日报', '2026-11-16 10:05:00', 'images/news-quantum.svg', '前沿科技', 9870),
('SpaceX 星舰完成第 12 次轨道试飞', '星舰成功完成在轨燃料转移与再入着陆，为登月计划奠定基础。', '航天视界', '2026-11-15 08:45:00', 'images/news-space.svg', '航天航空', 31250),
('华为发布鸿蒙 NEXT 正式版', '全新分布式架构带来流畅体验，原生应用生态突破一万款。', '数码之家', '2026-11-14 16:10:00', 'images/news-harmony.svg', '操作系统', 18960),
('特斯拉 FSD 自动驾驶获准商业化运营', '监管机构批准完全自动驾驶在城市道路的商业化运营许可。', '智能汽车', '2026-11-13 11:00:00', 'images/news-car.svg', '自动驾驶', 27540),
('全球首个 6G 试验网在沪开通', '6G 试验网实现太赫兹通信与空天地一体化组网的初步验证。', '通信世界', '2026-11-12 13:25:00', 'images/news-6g.svg', '通信', 14320),
('元宇宙教育平台上线沉浸式课堂', '基于 VR 的沉浸式教学平台上线，支持多人实时协同实验。', '教育科技', '2026-11-11 09:15:00', 'images/news-vr.svg', '元宇宙', 8650);
```

## 3. 图文列表表 Fanhy_gallery（建表 + 8 条测试数据）

```sql
CREATE TABLE IF NOT EXISTS Fanhy_gallery (
  Fanhy_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '主键',
  Fanhy_title VARCHAR(200) NOT NULL COMMENT '图文标题',
  Fanhy_imageUrl VARCHAR(300) NOT NULL COMMENT '图片地址',
  Fanhy_description VARCHAR(500) COMMENT '图文简介',
  Fanhy_category VARCHAR(50) COMMENT '分类标签',
  Fanhy_author VARCHAR(50) COMMENT '作者',
  Fanhy_createTime DATETIME NOT NULL COMMENT '创建时间',
  Fanhy_likes INT DEFAULT 0 COMMENT '点赞数'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='图文列表表';

INSERT INTO Fanhy_gallery (Fanhy_title, Fanhy_imageUrl, Fanhy_description, Fanhy_category, Fanhy_author, Fanhy_createTime, Fanhy_likes) VALUES
('极光下的冰岛公路', 'images/gallery-aurora.svg', '在冰岛南岸的夜色中，极光如绸缎般铺展，公路延伸向远方。', '风光摄影', '林知远', '2026-11-10 20:30:00', 3200),
('京都暮秋的枫叶', 'images/gallery-kyoto.svg', '岚山竹林之外的古寺，红枫与石阶构成秋日最温柔的配色。', '人文旅行', '苏念', '2026-11-09 15:20:00', 2180),
('深海蓝洞的神秘光束', 'images/gallery-ocean.svg', '潜水员在伯利兹蓝洞拍摄到穿透水层的丁达尔光束。', '自然探索', '陈屿', '2026-11-08 11:40:00', 4560),
('撒哈拉的星空营地', 'images/gallery-desert.svg', '无光害的沙漠腹地，银河清晰得仿佛触手可及。', '星空摄影', '周野', '2026-11-07 23:10:00', 3890),
('挪威峡湾的清晨', 'images/gallery-fjord.svg', '薄雾缭绕的峡湾与红色木屋，构成北欧最经典的画面。', '风光摄影', '林知远', '2026-11-06 07:25:00', 2740),
('重庆洪崖洞夜色', 'images/gallery-chongqing.svg', '依山而建的吊脚楼灯火辉煌，现实版的千与千寻。', '城市印象', '李Follow', '2026-11-05 19:50:00', 5120),
('阿尔卑斯山的花海', 'images/gallery-alps.svg', '夏季的高山草甸开满野花，远处雪山巍峨。', '自然探索', '苏念', '2026-11-04 10:15:00', 1980),
('江南水乡的乌篷船', 'images/gallery-jiangnan.svg', '烟雨朦胧的乌镇水巷，乌篷船划过青石桥的倒影。', '人文旅行', '陈屿', '2026-11-03 14:35:00', 2650);
```

> 说明：本项目运行时若本机 MySQL 不可用，后端会自动使用与以上数据一致的**内置降级数据**，
> 保证前端页面与接口仍可完整演示；在已配置 MySQL 的机器上则自动读取真实数据库。
