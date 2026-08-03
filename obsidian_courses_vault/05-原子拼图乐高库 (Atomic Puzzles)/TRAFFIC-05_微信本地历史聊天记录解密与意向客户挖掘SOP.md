---
title: 【原子拼图】微信本地历史聊天记录解密与意向客户挖掘SOP
tags:
  - 原子拼图/获客
  - 微信聊天解密
  - 需求挖掘
  - 意向提取
updated_at: 2026-08-02T21:45:00Z
---

# 🧩 [TRAFFIC-05] 微信本地历史聊天记录解密与意向客户挖掘 SOP

> 本 SOP 提炼自石老师生财大课实战拆解，通过安全只读读取本机微信数据库，自动挖掘客户真实提问、痛苦卡点与高客单意向信号。

---

## 🔒 1. 微信数据解密三大安全铁律

```
1. 绝对不发送、不修改、不删除任何微信消息；
2. 绝对不上传密钥、salt、wxid 或完整明文数据库至外网；
3. 必须在本地使用只读增量模式 (incremental) 刷新。
```

---

## 🛠️ 2. 命令解密与限定范围提取 SOP

```bash
# 第一步：只读检查状态与版本
~/.codex/skills/yichen-wechat-local-vault/.venv/bin/python \
~/.codex/skills/yichen-wechat-local-vault/scripts/vault_cli.py status --format text

# 第二步：本地私密数据库增量刷新
~/.codex/skills/yichen-wechat-local-vault/.venv/bin/python \
~/.codex/skills/yichen-wechat-local-vault/scripts/decrypt_all_dbs.py --mode incremental
```

### Prompt 指令示例（限范捕获）：
> “请从本地微信 Vault 中只读查询【联系人或群聊名称】最近【7天】提到【关键词：多少钱/怎么学/想做AI】的记录，最多【20条】。先给结论，只引用必要短句，不显示完整聊天原文。”

---

## 🎯 3. 意向客户信号分级与处置

| 信号级别 | 命中关键词示例 | 含义 | 下一步动作 |
|---|---|---|---|
| **高客单意向 (S级)** | “你们能帮我们企业做私有化吗”、“想找你们做交付” | 强烈 ToB 采购意向 | 立即调出 39,800 元私有化部署 SOP，安排 1V1 诊断 |
| **课程意向 (A级)** | “这个课程怎么报名”、“个人怎么学” | C端/超级个体学习意向 | 发送 3,980 ~ 6,980 元大爆破营课程 Master Curriculum |
| **痛点信号 (B级)** | “搞不懂这个节点”、“太复杂了” | 选题与内容素材 | 提炼为《四路搜索》选题，写入 `01-选题库` |

---

## 🔗 双向链接
- [[【飞书原文】IMA收-Obsidian炼-飞书享-Codex调-微信本地数据库与AI工作流-石老师]]
- [[TRAFFIC-04_小红书四路搜索取证与爆款选题挖掘SOP]]
- [[01-把自己在用的Agent系统卖给客户的商业落地SOP]]
