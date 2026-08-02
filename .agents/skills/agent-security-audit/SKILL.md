---
name: agent-security-audit
description: "一键分析并审计本地 Agent 系统的企业合规性、本地隐私安全、漏洞防护与源码混淆强度。"
---

# 🛡️ 昆仑增长 Agent OS 企业级合规与安全审计工具

此技能通过执行静态漏洞检查，协助您快速生成符合企业客户（特别是金融、外企、政府）隐私与安全合规标准要求的技术审计报告。

## 🎯 核心工作流 (Workflow)

当用户输入或触发审计请求时，可直接通过 Python 3 解释器一键拉取并运行本地静态扫描助手：

```bash
python3 .agents/skills/agent-security-audit/scripts/audit_scanner.py
```

### 📋 审计核心检查清单 (Auditing Checklist)

1. **凭证防泄露度**:
   - 自动扫描所有源文件，物理拦截硬编码的 Anthropic API 密钥、飞书 AppID/Secret 等敏感 Credential；
2. **敏感接口垂直越权风险 (RBAC)**:
   - 核查 `/api/system/` 下的 Express 路由，确保所有控制台物理修改和系统配置接口都被 JWT 和 Role='admin' 严格守护；
3. **商业代码逆向防范 (Obfuscation)**:
   - 审查 `package.json` 及打包发布脚本，确认交付安装包时，源码是否已受到控制流平坦化 (Control Flow Flattening) 以及自卫反调试器 (Debug Protection) 的强有力混淆；
4. **本地数据物理隔离 (.gitignore Check)**:
   - 确保包含真实物理数据的 `.env`、解密的微信数据库 `wx_decrypted.db` 等文件处于 Git 排除区，绝不上云。
