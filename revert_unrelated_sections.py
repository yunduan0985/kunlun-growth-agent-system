import re

file_path = "/Volumes/MOVESPEED/下载/AIcode/Agent/apps/kunlun_growth_official_website/index.html"

with open(file_path, "r", encoding="utf-8") as f:
    html = f.read()

# 1. 彻底删除 section#knowledge-vault
html = re.sub(r'<!-- 顶奢实战 SOP 知识库专区 \(Knowledge Base\) -->.*?</section>\s*', '', html, flags=re.DOTALL)

# 2. 彻底删除 Bento 中的 tab-yt 按钮
bento_grid_clean = """            <!-- Bento 大尺寸高奢选项卡网格 (7大企业级矩阵卡片) -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
                <button onclick="switchTab('tab-eval')" id="btn-tab-eval" class="p-4 bg-slate-800/90 border-2 border-mckinsey-blue rounded-md text-left transition-all hover:border-mckinsey-blue shadow-lg group">
                    <div class="text-xs font-bold text-mckinsey-blue uppercase mb-1 flex justify-between items-center">
                        <span>教育 Agent</span>
                        <i class="fa-solid fa-graduation-cap"></i>
                    </div>
                    <div class="font-bold text-sm text-white group-hover:text-mckinsey-blue transition-colors">👶 幼教记录 & 班主任评语</div>
                    <div class="text-[11px] text-slate-400 mt-1 font-light">分层生成保育与家园评语</div>
                </button>

                <button onclick="switchTab('tab-wrong')" id="btn-tab-wrong" class="p-4 bg-slate-800/40 border-2 border-slate-700/60 rounded-md text-left transition-all hover:border-mckinsey-blue shadow-sm group">
                    <div class="text-xs font-bold text-slate-400 uppercase mb-1 flex justify-between items-center">
                        <span>KGOS 考试引擎</span>
                        <i class="fa-solid fa-calculator"></i>
                    </div>
                    <div class="font-bold text-sm text-white group-hover:text-mckinsey-blue transition-colors">🏫 错题考点 & A/B/C变式题</div>
                    <div class="text-[11px] text-slate-400 mt-1 font-light">智能扩展同源压轴练习卷</div>
                </button>

                <button onclick="switchTab('tab-patent')" id="btn-tab-patent" class="p-4 bg-slate-800/40 border-2 border-slate-700/60 rounded-md text-left transition-all hover:border-mckinsey-blue shadow-sm group">
                    <div class="text-xs font-bold text-slate-400 uppercase mb-1 flex justify-between items-center">
                        <span>高校与科研 SKILL</span>
                        <i class="fa-solid fa-file-contract"></i>
                    </div>
                    <div class="font-bold text-sm text-white group-hover:text-mckinsey-blue transition-colors">🏛️ 课题软著 & 专利生成</div>
                    <div class="text-[11px] text-slate-400 mt-1 font-light">1秒导出版权局 .docx 标准件</div>
                </button>

                <button onclick="switchTab('tab-aria')" id="btn-tab-aria" class="p-4 bg-slate-800/40 border-2 border-slate-700/60 rounded-md text-left transition-all hover:border-mckinsey-blue shadow-sm group">
                    <div class="text-xs font-bold text-slate-400 uppercase mb-1 flex justify-between items-center">
                        <span>ARIA 工业沙箱</span>
                        <i class="fa-solid fa-gears"></i>
                    </div>
                    <div class="font-bold text-sm text-white group-hover:text-mckinsey-blue transition-colors">🏭 工业设备运维 ARIA</div>
                    <div class="text-[11px] text-slate-400 mt-1 font-light">傅里叶频域分析与 SOP 工单</div>
                </button>

                <button onclick="switchTab('tab-pii')" id="btn-tab-pii" class="p-4 bg-slate-800/40 border-2 border-slate-700/60 rounded-md text-left transition-all hover:border-mckinsey-blue shadow-sm group">
                    <div class="text-xs font-bold text-slate-400 uppercase mb-1 flex justify-between items-center">
                        <span>安全防线</span>
                        <i class="fa-solid fa-shield-halved"></i>
                    </div>
                    <div class="font-bold text-sm text-white group-hover:text-mckinsey-blue transition-colors">🛡️ 企业 PII 隐私脱敏</div>
                    <div class="text-[11px] text-slate-400 mt-1 font-light">AES-256 加密与脱敏网关</div>
                </button>

                <button onclick="switchTab('tab-matrix')" id="btn-tab-matrix" class="p-4 bg-slate-800/40 border-2 border-slate-700/60 rounded-md text-left transition-all hover:border-mckinsey-blue shadow-sm group">
                    <div class="text-xs font-bold text-slate-400 uppercase mb-1 flex justify-between items-center">
                        <span>分布式中枢</span>
                        <i class="fa-solid fa-network-wired"></i>
                    </div>
                    <div class="font-bold text-sm text-white group-hover:text-mckinsey-blue transition-colors">📢 多机公众号/矩阵文案</div>
                    <div class="text-[11px] text-slate-400 mt-1 font-light">直连 demo.kunlungrowth.cn</div>
                </button>

                <button onclick="switchTab('tab-qa')" id="btn-tab-qa" class="p-4 bg-slate-800/40 border-2 border-slate-700/60 rounded-md text-left transition-all hover:border-mckinsey-blue shadow-sm group col-span-2 md:col-span-2">
                    <div class="text-xs font-bold text-slate-400 uppercase mb-1 flex justify-between items-center">
                        <span>AI 智能电销与质检</span>
                        <i class="fa-solid fa-headset"></i>
                    </div>
                    <div class="font-bold text-sm text-white group-hover:text-mckinsey-blue transition-colors">📞 销售对话质检 & BANT 意向识别引擎</div>
                    <div class="text-[11px] text-slate-400 mt-1 font-light">自动识别 Budget/Authority/Need 意向分值</div>
                </button>
            </div>"""

html = re.sub(r'<!-- Bento 大尺寸高奢选项卡网格 \(8大矩阵卡片\) -->.*?</div>\s*</div>\s*(?=<!-- 1\. 班主任评语)', bento_grid_clean + '\n\n', html, flags=re.DOTALL)

# 3. 彻底删除 div#tab-yt 面板
html = re.sub(r'<!-- 8\. YouTube & 抖音自媒体工作流交互卡片 -->.*?</div>\s*</div>\s*', '', html, flags=re.DOTALL)

# 4. 恢复 switchTab 数组列表
html = html.replace("'tab-eval', 'tab-wrong', 'tab-patent', 'tab-yt', 'tab-aria', 'tab-pii', 'tab-matrix', 'tab-qa'", "'tab-eval', 'tab-wrong', 'tab-patent', 'tab-aria', 'tab-pii', 'tab-matrix', 'tab-qa'")
html = html.replace("'btn-tab-eval', 'btn-tab-wrong', 'btn-tab-patent', 'btn-tab-yt', 'btn-tab-aria', 'btn-tab-pii', 'btn-tab-matrix', 'btn-tab-qa'", "'btn-tab-eval', 'btn-tab-wrong', 'btn-tab-patent', 'btn-tab-aria', 'btn-tab-pii', 'btn-tab-matrix', 'btn-tab-qa'")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(html)

print("🎉 成功彻底清理不相关自媒体模块，恢复为 7 大硬核企业 AI 落地 Live Demo 矩阵！")
