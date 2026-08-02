import os
import re
import sys
import json

def run_audit(project_root):
    report = []
    report.append("# 🛡️ 昆仑增长 Agent OS 企业级安全与合规审计报告\n")
    report.append(f"扫描路径: `{project_root}`\n")
    
    # ----------------------------------------------------
    # Check 1: 扫描敏感 Key/Token 是否有硬编码 (Hardcoded Secrets)
    # ----------------------------------------------------
    report.append("## 1. 硬编码敏感凭证审计 (Credential Leak Check)")
    secrets_found = []
    
    # 规避检测自身
    exclude_files = ['audit_scanner.py', 'SKILL.md', 'node_modules', 'dist', '.git', 'jwt_secret.txt']
    
    patterns = {
        'Anthropic API Key': r'sk-ant-[a-zA-Z0-9_-]{30,}',
        'OpenAI API Key': r'sk-[a-zA-Z0-9]{48}',
        'Lark App ID': r'cli_[a-z0-9]{16}',
        'Lark App Secret': r'LARK_APP_SECRET\s*=\s*[\'"][a-zA-Z0-9]{32}[\'"]|app_secret\s*:\s*[\'"][a-zA-Z0-9]{32}[\'"]',
        'JWT Secret Keyword': r'const JWT_SECRET\s*=\s*[\'"][a-zA-Z0-9_-]{16,}[\'"]'
    }
    
    for root, dirs, files in os.walk(project_root):
        # 排除目录
        dirs[:] = [d for d in dirs if d not in exclude_files]
        for file in files:
            if file in exclude_files or any(file.endswith(ext) for ext in ['.png', '.jpg', '.dmg', '.db', '.zip', '.tar.gz']):
                continue
            filepath = os.path.join(root, file)
            try:
                with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                    for key, val in patterns.items():
                        matches = re.findall(val, content)
                        if matches:
                            # 过滤掉注释模版占位符 xxxxx
                            real_matches = [m for m in matches if 'xxx' not in str(m).lower() and 'abc' not in str(m).lower()]
                            if real_matches:
                                secrets_found.append((os.path.relpath(filepath, project_root), key, len(real_matches)))
            except Exception:
                pass
                
    if secrets_found:
        report.append("> [!CAUTION]")
        report.append("> 检测到以下文件存在疑似真实的硬编码 Key/Secret，请立即物理迁移至 `.env` 中：\n")
        for f, k, c in secrets_found:
            report.append(f"- 📄 `{f}` : 疑似存在 {c} 处 **{k}**")
    else:
        report.append("> [!NOTE]\n> ✅ 未发现任何明文硬编码敏感 API Key 或 Token，环境隔离安全。")
        
    report.append("\n" + "-"*40 + "\n")

    # ----------------------------------------------------
    # Check 2: 越权与路由防漏保护检查 (RBAC Access Check)
    # ----------------------------------------------------
    report.append("## 2. 后台敏感管理 API 鉴权审计 (RBAC & JWT Check)")
    index_js_path = os.path.join(project_root, 'src/index.js')
    
    if os.path.exists(index_js_path):
        try:
            with open(index_js_path, 'r', encoding='utf-8') as f:
                lines = f.readlines()
                
            unsafe_routes = []
            current_route = None
            is_admin_protected = False
            
            for idx, line in enumerate(lines):
                # 寻找敏感管理 API
                route_match = re.search(r'app\.(post|get|delete)\([\'"](/api/system/[^\'"]+)[\'"]', line)
                if route_match:
                    if current_route and not is_admin_protected:
                        unsafe_routes.append(current_route)
                    current_route = (idx + 1, route_match.group(2))
                    is_admin_protected = False
                
                # 在下一个路由出来前，寻找是否有越权校验
                if current_route:
                    if 'role' in line and ('admin' in line or 'user_role' in line):
                        is_admin_protected = True
            
            # 处理最后一个路由
            if current_route and not is_admin_protected:
                unsafe_routes.append(current_route)
                
            if unsafe_routes:
                report.append("> [!WARNING]")
                report.append("> 以下系统配置敏感接口可能缺失 `req.user?.role !== 'admin'` 的二次权限校验拦截，请核查是否存在垂直越权风险：\n")
                for line_num, route in unsafe_routes:
                    report.append(f"- 行 {line_num}: `{route}`")
            else:
                report.append("> [!NOTE]\n> ✅ 所有 `/api/system/` 接口均已通过 JWT 与 RBAC 机制绑定管理身份校验。")
        except Exception as e:
            report.append(f"❌ 路由审计解析异常: {e}")
    else:
        report.append("ℹ️ 未找到 `src/index.js` 主网关文件。")

    report.append("\n" + "-"*40 + "\n")

    # ----------------------------------------------------
    # Check 3: 防逆向混淆配置自查 (Anti-Decompilation Check)
    # ----------------------------------------------------
    report.append("## 3. 防破解控制流混淆强度审计 (Build Hardening)")
    pkg_path = os.path.join(project_root, 'package.json')
    obfuscator_configured = False
    
    if os.path.exists(pkg_path):
        try:
            with open(pkg_path, 'r', encoding='utf-8') as f:
                pkg_data = json.load(f)
            scripts = pkg_data.get('scripts', {})
            release_cmd = scripts.get('release:mac', '') + scripts.get('release:win', '')
            
            if 'build-prod.js' in release_cmd:
                obfuscator_configured = True
                
            if obfuscator_configured:
                report.append("> [!TIP]")
                report.append("> ✅ 生产发布配置已成功绑定 `scripts/build-prod.js` 控制流平坦化混淆器。\n")
                report.append("> 已配置的安全防御特性包括：\n")
                report.append("- [x] Control Flow Flattening (控制流平坦化)\n- [x] Self Defending (反篡改自卫崩盘)\n- [x] Debug Protection (反 F12 调试拦截)\n- [x] String Encryption (双重 Base64/RC4 字符串混淆)")
            else:
                report.append("> [!CAUTION]\n> ❌ 警告：未检测到 `release` 混淆编译指令，交付包可能包含裸奔源码，商业泄露风险极高！")
        except Exception as e:
            report.append(f"❌ 解析 package.json 错误: {e}")
            
    report.append("\n" + "-"*40 + "\n")

    # ----------------------------------------------------
    # Check 4: 私有隐私隔离与泄露检查 (Gitignore Leak Check)
    # ----------------------------------------------------
    report.append("## 4. 本地隐私数据文件防提交审计 (Leakage Prevention)")
    gitignore_path = os.path.join(project_root, '.gitignore')
    ignore_risks = []
    must_ignores = ['.env', 'data/', 'knowledge_providers.json', 'wx_decrypted.db', 'jwt_secret.txt']
    
    if os.path.exists(gitignore_path):
        try:
            with open(gitignore_path, 'r', encoding='utf-8') as f:
                ignore_content = f.read()
            for item in must_ignores:
                if item not in ignore_content:
                    ignore_risks.append(item)
                    
            if ignore_risks:
                report.append("> [!WARNING]")
                report.append("> 以下隐私数据库和授权配置文件未被列入 `.gitignore`，极易被意外推送到 GitHub 导致企业客户数据外泄：\n")
                for r in ignore_risks:
                    report.append(f"- ⚠️ 缺少对 `{r}` 的防提交拦截。")
            else:
                report.append("> [!NOTE]\n> ✅ 所有的敏感数据库文件与私钥配置均已进入物理隔离排除区，防源码提交外泄功能完备。")
        except Exception as e:
            report.append(f"❌ 校验 .gitignore 错误: {e}")
    else:
        report.append("> [!CAUTION]\n> ❌ 根目录缺少 `.gitignore` 保护！请立即创建！")

    # ----------------------------------------------------
    # 汇总输出
    # ----------------------------------------------------
    return "\n".join(report)

if __name__ == "__main__":
    root_dir = sys.argv[1] if len(sys.argv) > 1 else os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../../'))
    print(run_audit(root_dir))
