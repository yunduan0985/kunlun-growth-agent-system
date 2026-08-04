import re

page_path = "/Volumes/MOVESPEED/下载/AIcode/Agent/apps/math_wrong_notebook_web/src/app/page.tsx"

with open(page_path, "r", encoding="utf-8") as f:
    code = f.read()

# 1. 在 Lucide 图标导入中添加 Building
code = code.replace("Plus\n}", "Plus,\n  Building\n}")

# 2. 增加 activeTab 类型: 'founder_matrix'
code = code.replace(
    "const [activeTab, setActiveTab] = useState<'feishu_curriculum' | 'super_ta' | 'deep_tutor' | 'mastery_path' | 'deep_research' | 'knowledge_center' | 'verifier'>('deep_tutor');",
    "const [activeTab, setActiveTab] = useState<'founder_matrix' | 'feishu_curriculum' | 'super_ta' | 'deep_tutor' | 'mastery_path' | 'deep_research' | 'knowledge_center' | 'verifier'>('founder_matrix');"
)

# 3. 在导航 Tab 栏前注入【🤝 创始人大帅·生财资源对接】按钮
nav_tab_old = "{/* 7 大核心选项卡导航 */}"
nav_tab_new = """{/* 8 大核心选项卡导航 */}
        <div className="mb-6 flex items-center justify-between flex-wrap gap-3 border-b border-slate-200 pb-3">
          <div className="flex items-center space-x-2 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveTab('founder_matrix')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-2 shadow-sm ${
                activeTab === 'founder_matrix' 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-indigo-200' 
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
              <span>🤝 创始人大帅 · 资源对接</span>
            </button>"""

code = code.replace("<div className=\"mb-6 flex items-center justify-between flex-wrap gap-3 border-b border-slate-200 pb-3\">\n          <div className=\"flex items-center space-x-2 overflow-x-auto pb-1\">", nav_tab_new)

# 4. 插入【创始人大帅与生财圈友资源匹配卡片】内容
founder_section = """
      {/* 0. 创始人大帅与生财圈友资源匹配矩阵 */}
      {activeTab === 'founder_matrix' && (
        <div className="bg-slate-950 text-white rounded-3xl p-8 shadow-2xl border border-indigo-500/30 relative overflow-hidden mb-8">
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* 名片 Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-8 border-b border-slate-800 gap-6 relative z-10">
            <div className="flex items-center space-x-5">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-1 shadow-xl shrink-0">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-black text-3xl text-indigo-400 border border-indigo-400/30">
                  帅
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-3 flex-wrap gap-y-2">
                  <h2 className="text-2xl font-black tracking-tight text-white">大帅 (Marshall)</h2>
                  <span className="px-3 py-1 text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
                    📍 杭州
                  </span>
                  <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>生财有术圈友专属对接卡片</span>
                  </span>
                </div>
                <p className="text-sm text-slate-300 mt-2 font-medium">
                  昆仑增长创始人 | AI 全栈架构师 | AI 开发者
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  专注企业 AI Agent、企业 AI 落地与私有化部署
                </p>
              </div>
            </div>

            {/* 微信号 */}
            <div className="flex items-center space-x-3 bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800 shadow-inner">
              <div className="text-right pr-2">
                <span className="text-[11px] text-slate-400 block font-medium">微信直接联系</span>
                <span className="text-base font-mono font-bold text-indigo-300">Dasean-</span>
              </div>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText('Dasean-');
                  alert('🎉 微信号 [Dasean-] 已成功复制到剪贴板！');
                }}
                className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-bold transition shadow-lg flex items-center space-x-1.5 active:scale-95"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>复制微信号</span>
              </button>
            </div>
          </div>

          {/* 双栏资源匹配矩阵 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 relative z-10">
            {/* 左栏：提供资源 */}
            <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 hover:border-indigo-500/40 transition">
              <div className="flex items-center space-x-2 text-indigo-400 mb-5">
                <Zap className="w-5 h-5" />
                <h3 className="text-base font-bold text-white tracking-wide">【提供资源 📦】</h3>
              </div>
              <ul className="space-y-3.5">
                <li className="flex items-start space-x-3 text-xs text-slate-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white font-semibold">AI Agent 私有化部署：</strong>
                    <span className="text-slate-400">企业专属数据隔离、LLM 局域网/轻量云私有化部署。</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3 text-xs text-slate-200">
                  <Cpu className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white font-semibold">企业 AI 数字员工：</strong>
                    <span className="text-slate-400">客服、质检、多维表格与自动化工作流 24 小时替代。</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3 text-xs text-slate-200">
                  <FileText className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white font-semibold">软著/专利材料自动生成：</strong>
                    <span className="text-slate-400">通过 RAG 算法 10 分钟自动包装合规专利与软著源码。</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3 text-xs text-slate-200">
                  <Share2 className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white font-semibold">公众号矩阵自动化：</strong>
                    <span className="text-slate-400">写了就发 Agent、三段式爆款改写与飞书群自动发卡片。</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3 text-xs text-slate-200">
                  <Layers className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white font-semibold">Web / App / 小程序定制开发：</strong>
                    <span className="text-slate-400">全栈工业级架构交付，包含后端 Node/Python 与前端 React。</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* 右栏：需要资源 */}
            <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 hover:border-purple-500/40 transition">
              <div className="flex items-center space-x-2 text-purple-400 mb-5">
                <Users className="w-5 h-5" />
                <h3 className="text-base font-bold text-white tracking-wide">【需要资源 🤝】</h3>
              </div>
              <ul className="space-y-3.5">
                <li className="flex items-start space-x-3 text-xs text-slate-200">
                  <Building className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white font-semibold">企业 AI 落地合作：</strong>
                    <span className="text-slate-400">对接有 AI 转型需求的中大型企业与垂直行业客户。</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3 text-xs text-slate-200">
                  <GraduationCap className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white font-semibold">AI 培训与企业内训：</strong>
                    <span className="text-slate-400">20 讲教师 AI 训练营、高管 AI 战略与员工效能提升。</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3 text-xs text-slate-200">
                  <Network className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white font-semibold">渠道合作 & 资源互推：</strong>
                    <span className="text-slate-400">与生财圈友、AI 社群主、咨询机构联合推广与共建。</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3 text-xs text-slate-200">
                  <TrendingUp className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white font-semibold">企业客户与项目合作：</strong>
                    <span className="text-slate-400">欢迎带项目/需求落地交流，支持 1 对 1 私有化交付。</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
"""

code = code.replace("{/* 1. 飞书 20 课完整教学大纲 */}", founder_section + "\n      {/* 1. 飞书 20 课完整教学大纲 */}")

with open(page_path, "w", encoding="utf-8") as f:
    f.write(code)

print("🎉 已成功在 page.tsx 注入生财圈友专属创始人矩阵卡片！")
