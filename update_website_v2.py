import re

file_path = "/Volumes/MOVESPEED/下载/AIcode/Agent/apps/kunlun_growth_official_website/index.html"

with open(file_path, "r", encoding="utf-8") as f:
    html = f.read()

# 1. 替换 Bento 按钮导航区（增加第 8 个卡片：YouTube财经故事 & 抖音收益评估）
bento_grid_old = """            <!-- Bento 大尺寸高奢选项卡网格 (7大矩阵卡片) -->
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

bento_grid_new = """            <!-- Bento 大尺寸高奢选项卡网格 (8大矩阵卡片) -->
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

                <button onclick="switchTab('tab-yt')" id="btn-tab-yt" class="p-4 bg-slate-800/40 border-2 border-slate-700/60 rounded-md text-left transition-all hover:border-mckinsey-blue shadow-sm group">
                    <div class="text-xs font-bold text-slate-400 uppercase mb-1 flex justify-between items-center">
                        <span>自媒体 WORKFLOW</span>
                        <i class="fa-brands fa-youtube text-red-500"></i>
                    </div>
                    <div class="font-bold text-sm text-white group-hover:text-mckinsey-blue transition-colors">🎬 YouTube & 抖音变现 Agent</div>
                    <div class="text-[11px] text-slate-400 mt-1 font-light">全套 Prompt & 伙伴计划计算</div>
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

                <button onclick="switchTab('tab-qa')" id="btn-tab-qa" class="p-4 bg-slate-800/40 border-2 border-slate-700/60 rounded-md text-left transition-all hover:border-mckinsey-blue shadow-sm group">
                    <div class="text-xs font-bold text-slate-400 uppercase mb-1 flex justify-between items-center">
                        <span>AI 智能电销与质检</span>
                        <i class="fa-solid fa-headset"></i>
                    </div>
                    <div class="font-bold text-sm text-white group-hover:text-mckinsey-blue transition-colors">📞 销售质检 & BANT 识别</div>
                    <div class="text-[11px] text-slate-400 mt-1 font-light">自动识别 Budget/Authority 意向</div>
                </button>
            </div>"""

html = html.replace(bento_grid_old, bento_grid_new)

# 2. 新增 tab-yt 的面板 DOM
yt_tab_dom = """            <!-- 8. YouTube & 抖音自媒体工作流交互卡片 -->
            <div id="tab-yt" class="bg-slate-800/90 border border-slate-700 p-8 rounded-md shadow-2xl max-w-5xl mx-auto hidden transition-all backdrop-blur-lg">
                <div class="flex items-center justify-between mb-4 border-b border-slate-700/80 pb-3">
                    <span class="text-xs font-bold text-white tracking-wider uppercase font-mono"><i class="fa-brands fa-youtube text-red-500 mr-1"></i> YOUTUBE & DOUYIN MEDIA WORKFLOW AGENT</span>
                    <span class="text-[11px] text-emerald-400 font-mono font-bold">Autojourney Engine: Ready</span>
                </div>
                <div class="mb-4">
                    <label class="block text-xs font-bold text-slate-300 uppercase mb-2">输入爆款视频选题或预估播放量（用于计算收益）：</label>
                    <input type="text" id="yt-input" class="w-full p-4 bg-slate-900 border border-slate-700 rounded-sm text-xs font-mono text-white focus:outline-none focus:border-mckinsey-blue transition-all mb-4 shadow-inner" value="选题: 硅谷高管隐秘内幕 | 预估播放: 500,000次">
                </div>
                <div class="flex gap-4 mb-6">
                    <button onclick="runYtDemo()" class="flex-1 bg-mckinsey-blue text-white py-4 font-bold text-sm hover:bg-blue-600 transition-all flex items-center justify-center gap-2 rounded-sm shadow-xl">
                        <i class="fa-solid fa-play text-amber-300 animate-pulse"></i>
                        <span>🚀 运行自媒体 Agent：生成全套 Prompt 与抖音获利评估</span>
                    </button>
                    <button onclick="exportDoc('yt-output', 'YouTube财经故事工作流SOP.txt')" class="px-6 bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs rounded-sm transition-all flex items-center gap-2 border border-slate-600">
                        <i class="fa-solid fa-download text-emerald-400"></i>
                        <span>📥 导出工作流 Prompt</span>
                    </button>
                </div>
                <div class="bg-black text-slate-100 p-6 rounded-sm font-mono text-xs leading-relaxed relative min-h-[180px] shadow-2xl border border-slate-800">
                    <div class="text-[10px] text-slate-500 uppercase border-b border-slate-800 pb-2 mb-3 flex justify-between">
                        <span>Workflow Output & Monetization Diagnostic Log</span>
                        <span id="yt-status" class="text-emerald-400 font-bold">● SYSTEM IDLE</span>
                    </div>
                    <div id="yt-output" class="whitespace-pre-wrap text-emerald-300/90 font-mono">点击上方按钮，体验全套 YouTube 画风/音色 Prompt 生成与抖音独家伙伴计划收益计算...</div>
                </div>
            </div>"""

# 插入到 tab-qa 面板之后
html = html.replace('<!-- 7. 销售质检 & BANT交互卡片 -->', yt_tab_dom + '\n\n            <!-- 7. 销售质检 & BANT交互卡片 -->')

# 3. 新增【顶级实战 SOP 知识库专区】到 section#founder 前
knowledge_section = """    <!-- 顶奢实战 SOP 知识库专区 (Knowledge Base) -->
    <section id="knowledge-vault" class="py-24 bg-white border-b border-slate-200">
        <div class="max-w-6xl mx-auto px-6">
            <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-slate-200 pb-6">
                <div>
                    <div class="text-xs font-bold text-mckinsey-blue tracking-widest uppercase mb-2">KNOWLEDGE BASE & SOP VAULT</div>
                    <h2 class="font-serif text-3xl md:text-4xl font-bold text-mckinsey-navy">昆仑增长 <span class="italic font-normal text-mckinsey-blue">顶级实战 SOP 沉淀库</span></h2>
                </div>
                <p class="text-slate-500 text-sm mt-4 md:mt-0 font-light max-w-md">
                    恪守真实，用真机代码与商业成果说话。所有 SOP 已沉淀至 Obsidian 知识库与 Agent 可执行技能引擎。
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- 知识卡片 1 -->
                <div class="mckinsey-card p-6 bg-slate-50 border border-slate-200 hover:border-mckinsey-blue transition-all">
                    <div class="text-xs font-bold text-mckinsey-blue uppercase mb-2">爆款 SOP 矩阵</div>
                    <h3 class="font-bold text-base text-mckinsey-navy mb-2">🎬 YouTube 财经故事全自动化 SOP</h3>
                    <p class="text-xs text-slate-600 mb-4 font-light leading-relaxed">
                        包含音色拆解 Prompt、画风拆解 Prompt、主角 IP 一致性 Prompt 及 AutoJourney.ai 自动化出片工作流。
                    </p>
                    <div class="text-[11px] text-slate-400 font-mono">38,901 字符 | 飞书精选转化</div>
                </div>

                <!-- 知识卡片 2 -->
                <div class="mckinsey-card p-6 bg-slate-50 border border-slate-200 hover:border-mckinsey-blue transition-all">
                    <div class="text-xs font-bold text-mckinsey-blue uppercase mb-2">私域变现 SOP</div>
                    <h3 class="font-bold text-base text-mckinsey-navy mb-2">📱 AI 朋友圈 + 私域运营变现 SOP</h3>
                    <p class="text-xs text-slate-600 mb-4 font-light leading-relaxed">
                        11 个月变现 37 万实战复盘。拆解早中晚黄金时间段发布模型、个人 IP 连载故事化运营与去 AI 味文案模板。
                    </p>
                    <div class="text-[11px] text-slate-400 font-mono">31,369 字符 | 单月 11 万实操</div>
                </div>

                <!-- 知识卡片 3 -->
                <div class="mckinsey-card p-6 bg-slate-50 border border-slate-200 hover:border-mckinsey-blue transition-all">
                    <div class="text-xs font-bold text-mckinsey-blue uppercase mb-2">算法与收益 SOP</div>
                    <h3 class="font-bold text-base text-mckinsey-navy mb-2">🚀 抖音创作者伙伴计划月入10W SOP</h3>
                    <p class="text-xs text-slate-600 mb-4 font-light leading-relaxed">
                        解密 5 秒有效观看留存、推荐页流量占比与阶梯加成计算公式。包含美区睡眠故事等爆款高单价赛道指南。
                    </p>
                    <div class="text-[11px] text-slate-400 font-mono">28,364 字符 | 独家计划算力</div>
                </div>
            </div>
        </div>
    </section>"""

html = html.replace('<!-- 创始人介绍：大帅 (Marshall) -->', knowledge_section + '\n\n    <!-- 创始人介绍：大帅 (Marshall) -->')

# 4. 更新 switchTab 和 runYtDemo JS 函数
js_switch_tab_old = "['tab-eval', 'tab-wrong', 'tab-patent', 'tab-aria', 'tab-pii', 'tab-matrix', 'tab-qa'].forEach(id => {"
js_switch_tab_new = "['tab-eval', 'tab-wrong', 'tab-patent', 'tab-yt', 'tab-aria', 'tab-pii', 'tab-matrix', 'tab-qa'].forEach(id => {"
html = html.replace(js_switch_tab_old, js_switch_tab_new)

js_switch_btn_old = "['btn-tab-eval', 'btn-tab-wrong', 'btn-tab-patent', 'btn-tab-aria', 'btn-tab-pii', 'btn-tab-matrix', 'btn-tab-qa'].forEach(btnId => {"
js_switch_btn_new = "['btn-tab-eval', 'btn-tab-wrong', 'btn-tab-patent', 'btn-tab-yt', 'btn-tab-aria', 'btn-tab-pii', 'btn-tab-matrix', 'btn-tab-qa'].forEach(btnId => {"
html = html.replace(js_switch_btn_old, js_switch_btn_new)

# 添加 runYtDemo 函数
yt_js_function = """        // 8. YouTube & 抖音自媒体工作流演示
        function runYtDemo() {
            const input = document.getElementById('yt-input').value;
            const result = `【KGOS YouTube & 抖音自动化工作流诊断】\\n` +
                         `输入主题与指标：${input}\\n\\n` +
                         `[音色拆解 Prompt]：已生成专业音频分析指标（语气: 克制叙事 | 推荐: ElevenLabs Voice #42）\\n` +
                         `[画面画风 Prompt]：Prompt: "A dark narrative storytelling scene, low detail, raw story grain, 8k"\\n` +
                         `[抖音获利评估]：预估 50万 播放 (5秒留存率 65%) -> 获利有效播放 276,250 次\\n` +
                         `💰 预估独家伙伴计划收益：6,712.88 元 (含 35% 阶梯内容加成)\\n` +
                         `✅ 全套提示词 SOP 已准备完毕，可一键导出 .txt 并在 AutoJourney.ai 执行！`;
            typeWriter('yt-output', 'yt-status', result);
        }"""

html = html.replace('// 7. 销售质检 BANT 演示', yt_js_function + '\n\n        // 7. 销售质检 BANT 演示')

with open(file_path, "w", encoding="utf-8") as f:
    f.write(html)

print("🎉 官网 index.html 已全量升级至 8 大 Bento 卡片 & 顶级 SOP 知识库专区！")

