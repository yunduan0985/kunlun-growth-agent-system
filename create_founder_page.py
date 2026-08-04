import os

founder_dir = "/Volumes/MOVESPEED/下载/AIcode/Agent/apps/math_wrong_notebook_web/src/app/founder"
os.makedirs(founder_dir, exist_ok=True)

page_code = '''"use client";

import React, { useState } from 'react';
import Link from 'next.js' ? null : null; // Next.js standard
import { 
  ShieldCheck, 
  Cpu, 
  FileText, 
  Share2, 
  Layers, 
  Building, 
  GraduationCap, 
  Network, 
  TrendingUp, 
  Copy, 
  Check, 
  Sparkles, 
  ArrowLeft, 
  Send, 
  MessageSquare,
  Zap,
  Users,
  CheckCircle2,
  Lock,
  Globe
} from 'lucide-react';

export default function FounderProfilePage() {
  const [copied, setCopied] = useState(false);
  const [contactMessage, setContactMessage] = useState('');
  const [contactSent, setContactSent] = useState(false);

  const handleCopyWeChat = () => {
    navigator.clipboard.writeText('Dasean-');
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactMessage.trim()) return;
    setContactSent(true);
    setTimeout(() => {
      setContactSent(false);
      setContactMessage('');
      alert('🎉 您的合作意向已提交给大帅！微信号 [Dasean-] 随时欢迎添加好友深入交流。');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans antialiased selection:bg-indigo-500 selection:text-white flex flex-col relative overflow-hidden">
      {/* 动态氛围背景 Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-indigo-600/20 via-purple-600/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -left-48 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-48 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* 顶栏 Header */}
      <header className="h-20 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-xl px-6 md:px-12 flex items-center justify-between sticky top-0 z-50">
        <a href="/" className="flex items-center space-x-2 text-slate-400 hover:text-white transition text-xs font-semibold">
          <ArrowLeft className="w-4 h-4" />
          <span>返回昆仑增长主控制台</span>
        </a>

        <div className="flex items-center space-x-3">
          <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>生财有术圈友专属通道</span>
          </span>
          <button 
            onClick={handleCopyWeChat}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition shadow-lg flex items-center space-x-1.5 active:scale-95"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? '微信已复制 (Dasean-)' : '复制大帅微信号'}</span>
          </button>
        </div>
      </header>

      {/* 主体 Body */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-12 relative z-10">
        
        {/* 个人 IP 核心 Banner */}
        <div className="bg-slate-900/90 rounded-3xl p-8 md:p-12 border border-slate-800 shadow-2xl relative overflow-hidden mb-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-1 shadow-2xl shrink-0">
                <div className="w-full h-full bg-slate-950 rounded-[20px] flex items-center justify-center font-black text-4xl text-indigo-400 border border-indigo-400/30">
                  帅
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-3 flex-wrap gap-y-2">
                  <h1 className="text-3xl font-black tracking-tight text-white">大帅 (Marshall)</h1>
                  <span className="px-3 py-1 text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
                    📍 杭州
                  </span>
                  <span className="px-3 py-1 text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40 rounded-full">
                    生财有术圈友
                  </span>
                </div>
                <p className="text-base text-slate-200 font-bold mt-2">
                  昆仑增长创始人  |  AI 全栈架构师  |  AI 开发者
                </p>
                <p className="text-xs text-indigo-300/90 font-mono mt-1">
                  专注企业 AI Agent、企业 AI 落地与私有化部署
                </p>
              </div>
            </div>

            {/* 快速联系卡片 */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 w-full md:w-auto shrink-0 shadow-inner flex flex-col justify-between">
              <div>
                <span className="text-xs text-slate-400 block font-medium">官方微信 (随时交流)</span>
                <span className="text-xl font-mono font-black text-indigo-300 mt-1 block">Dasean-</span>
              </div>
              <button 
                onClick={handleCopyWeChat}
                className="mt-4 w-full py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-bold transition shadow-lg flex items-center justify-center space-x-2 active:scale-95"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? '已成功复制 Dasean-' : '一键复制大帅微信号'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* 核心双栏资源匹配矩阵 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* 左栏：【提供资源 📦】 */}
          <div className="bg-slate-900/60 rounded-3xl p-8 border border-slate-800/90 shadow-xl hover:border-indigo-500/40 transition">
            <div className="flex items-center space-x-3 text-indigo-400 mb-6">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">【提供资源 📦】</h2>
                <p className="text-xs text-slate-400 mt-0.5">硬核技术交付与企业级 AI 解决方案</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-950/80 p-4.5 rounded-2xl border border-slate-800/80 flex items-start space-x-3.5">
                <ShieldCheck className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-white">AI Agent 私有化部署</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    企业专属数据隔离、LLM 局域网/轻量云私有化部署，确保商业机密 100% 本地安全。
                  </p>
                </div>
              </div>

              <div className="bg-slate-950/80 p-4.5 rounded-2xl border border-slate-800/80 flex items-start space-x-3.5">
                <Cpu className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-white">企业 AI 数字员工</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    客服、质检、多维表格与自动化工作流 24 小时替代，大幅降低人力成本。
                  </p>
                </div>
              </div>

              <div className="bg-slate-950/80 p-4.5 rounded-2xl border border-slate-800/80 flex items-start space-x-3.5">
                <FileText className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-white">软著 / 专利材料自动生成</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    通过 RAG 算法 10 分钟自动包装合规专利与软著源码，助力高新技术企业申报。
                  </p>
                </div>
              </div>

              <div className="bg-slate-950/80 p-4.5 rounded-2xl border border-slate-800/80 flex items-start space-x-3.5">
                <Share2 className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-white">公众号矩阵自动化</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    “写了就发” Agent、去 AI 味三段式爆款改写与飞书群/微信卡片自动群发。
                  </p>
                </div>
              </div>

              <div className="bg-slate-950/80 p-4.5 rounded-2xl border border-slate-800/80 flex items-start space-x-3.5">
                <Layers className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-white">Web / App / 小程序定制开发</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    全栈工业级架构交付，包含后端 Node/Python 与前端 React，快速实现产品上线。
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 右栏：【需要资源 🤝】 */}
          <div className="bg-slate-900/60 rounded-3xl p-8 border border-slate-800/90 shadow-xl hover:border-purple-500/40 transition">
            <div className="flex items-center space-x-3 text-purple-400 mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">【需要资源 🤝】</h2>
                <p className="text-xs text-slate-400 mt-0.5">寻求优质商业伙伴与落地共建</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-950/80 p-4.5 rounded-2xl border border-slate-800/80 flex items-start space-x-3.5">
                <Building className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-white">企业 AI 落地合作</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    对接有 AI 智能化转型需求的中大型企业与垂直行业客户。
                  </p>
                </div>
              </div>

              <div className="bg-slate-950/80 p-4.5 rounded-2xl border border-slate-800/80 flex items-start space-x-3.5">
                <GraduationCap className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-white">AI 培训与企业内训</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    20 讲教师 AI 训练营、高管 AI 战略决策与员工效能提升实操演练。
                  </p>
                </div>
              </div>

              <div className="bg-slate-950/80 p-4.5 rounded-2xl border border-slate-800/80 flex items-start space-x-3.5">
                <Network className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-white">渠道合作 & 资源互推</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    与生财圈友、AI 社群主、咨询机构联合推广，实现互利共赢与生态共建。
                  </p>
                </div>
              </div>

              <div className="bg-slate-950/80 p-4.5 rounded-2xl border border-slate-800/80 flex items-start space-x-3.5">
                <TrendingUp className="w-5 h-5 text-rose-400 mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-white">企业客户与项目合作</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    欢迎带具体项目/需求落地交流，支持 1 对 1 私有化交付与落地把控。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 快速留言与合作预定板块 */}
        <div className="bg-gradient-to-r from-indigo-950/80 via-slate-900 to-purple-950/80 rounded-3xl p-8 md:p-10 border border-indigo-500/30 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-black text-white">🤝 开启您的企业 AI 落地合作</h2>
            <p className="text-xs text-slate-300 mt-2">
              填写您的合作需求或想要沟通的项目细节，大帅会第一时间与您取得联系。
            </p>

            <form onSubmit={handleQuickSubmit} className="mt-6 flex flex-col md:flex-row items-center gap-3">
              <input
                type="text"
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder="例如：杭州某电商公司，想在公司内部部署AI客服与软著生成..."
                className="w-full px-5 py-3.5 bg-slate-950/90 border border-slate-700/80 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
              />
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-xs font-bold transition shadow-lg shrink-0 flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>提交意向</span>
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* 页脚 Footer */}
      <footer className="py-8 border-t border-slate-900 text-center text-xs text-slate-500">
        <p>© 2026 昆仑增长 KunlunGrowth. 大帅 (Marshall) 个人与企业落地专属对接台.</p>
      </footer>
    </div>
  );
}
'''

target_file = os.path.join(founder_dir, "page.tsx")
with open(target_file, "w", encoding="utf-8") as f:
    f.write(page_code)

print(f"🎉 成功生成独立 Profile 页面: {target_file}")
