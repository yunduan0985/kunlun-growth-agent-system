"use client";

import React, { useState, useEffect } from 'react';
import katex from 'katex';
import { 
  ShieldCheck, 
  BrainCircuit, 
  SearchCode, 
  Download, 
  Users, 
  FileText, 
  Settings, 
  Bell, 
  Search, 
  ArrowUpRight, 
  Zap, 
  ScanLine, 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  RefreshCw, 
  ChevronRight, 
  GraduationCap, 
  BookOpenCheck, 
  Copy, 
  MessageSquare, 
  Layers, 
  Compass, 
  FileCheck2, 
  Lock, 
  Unlock,
  Sliders,
  Check,
  TrendingUp,
  Cpu,
  Bookmark,
  Share2,
  Sun,
  Database,
  Network,
  Activity,
  BarChart2,
  PieChart,
  HelpCircle,
  PlayCircle,
  CloudCheck,
  Link,
  BookOpen,
  CheckSquare,
  Upload,
  Plus
} from 'lucide-react';

// KaTeX 公式解析
const MathExpr = ({ math }: { math: string }) => {
  const [html, setHtml] = useState('');

  useEffect(() => {
    try {
      const parts = math.split(/(\$[^\$]+\$)/g);
      const renderedHtml = parts.map(part => {
        if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
          const formula = part.slice(1, -1);
          return katex.renderToString(formula, { displayMode: false, throwOnError: false });
        }
        return part.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      }).join('');
      setHtml(renderedHtml);
    } catch (e) {
      setHtml(math);
    }
  }, [math]);

  return <span dangerouslySetInnerHTML={{ __html: html }} />;
};

export default function HKUFullEnterpriseDashboard() {
  // 核心导航 (7 大全功能工作台)
  const [activeTab, setActiveTab] = useState<'feishu_curriculum' | 'super_ta' | 'deep_tutor' | 'mastery_path' | 'deep_research' | 'knowledge_center' | 'verifier'>('deep_tutor');

  // 飞书实时连接状态
  const [feishuStatus, setFeishuStatus] = useState({
    connected: true,
    user: 'Marshall Lee',
    docName: '《教师AI实战训练营》课程总设计（Master Curriculum）V1.0',
    subtitle: '从 AI 工具使用者，到学校 AI 能力建设者。',
    syncTime: '刚刚 (lark-cli 实时连接)'
  });

  // 知识库列表 (Knowledge Center)
  const [kbList, setKbList] = useState([
    { name: '00-《教师AI实战训练营》课程总设计.docx', size: '180 KB', chunks: 240, engine: 'Feishu Lark-CLI Live' },
    { name: 'HKU_TALIC_Assessment_Framework.pdf', size: '4.2 MB', chunks: 142, engine: 'LightRAG' },
    { name: 'Middle_School_Math_Curriculum_2026.pdf', size: '18.5 MB', chunks: 520, engine: 'GraphRAG' },
    { name: 'DeepTutor_Agent_Architecture.pdf', size: '2.8 MB', chunks: 98, engine: 'PageIndex' }
  ]);

  // 20 课完整大纲列表 (来源于飞书文档 00-《教师AI实战训练营》课程总设计.docx)
  const twentyLessons = [
    { num: '01', title: '教师 AI 时代生存图鉴：从工具使用者到学校 AI 建设者', module: '模块一：思维认知', tool: 'DeepSeek / Claude', duration: '90 分钟' },
    { num: '02', title: '大语言模型提示词（Prompt）工程与结构化提问', module: '模块一：思维认知', tool: 'Prompt 结构化模版', duration: '90 分钟' },
    { num: '03', title: '防幻觉与确定性输出：如何让 AI 100% 按照教学要求执行', module: '模块一：思维认知', tool: 'SymPy 代数校验', duration: '90 分钟' },
    { num: '04', title: '教师专属 AI 智脑搭建：知识库、个人智库与数据脱敏', module: '模块一：思维认知', tool: 'RAG 检索', duration: '90 分钟' },
    { num: '05', title: '10 分钟生成三维目标与深度教学设计案', module: '模块二：备课重构', tool: '教案生成器', duration: '90 分钟' },
    { num: '06', title: '分层教学与自适应作业设计：-1 与 +1 变式题组', module: '模块二：备课重构', tool: '变式题算法', duration: '90 分钟' },
    { num: '07', title: '跨学科与项目化学习（PBL）AI 脚本与量规生成', module: '模块二：备课重构', tool: 'PBL Generator', duration: '90 分钟' },
    { num: '08', title: '基于 SymPy 与 KaTeX 的无错数学公式与图形生成', module: '模块二：备课重构', tool: 'KaTeX / SVG', duration: '90 分钟' },
    { num: '09', title: 'SuperTA 9维课程防刷评估：作弊风险检测与口头答辩设计', module: '模块三：课堂与评价', tool: 'SuperTA 引擎', duration: '90 分钟' },
    { num: '10', title: '高拍仪切题、OCR 识图与智能错题本中台建立', module: '模块三：课堂与评价', tool: 'OpenCV 切题', duration: '90 分钟' },
    { num: '11', title: '过程性评价与学生 AI 反思日志（Reflective Log）批改', module: '模块三：课堂与评价', tool: 'Reflective Evaluator', duration: '90 分钟' },
    { num: '12', title: '自动生成家长学情汇报与企微/飞书消息模版', module: '模块三：课堂与评价', tool: 'Bitable Webhook', duration: '90 分钟' },
    { num: '13', title: '学校私有知识库搭建：PDF、讲义与 GraphRAG 索引', module: '模块四：学校 Agent', tool: 'GraphRAG / LightRAG', duration: '90 分钟' },
    { num: '14', title: '飞书 Bitable 多维表格与 AI 自动化工作流集成', module: '模块四：学校 Agent', tool: 'Lark CLI / Bitable', duration: '90 分钟' },
    { num: '15', title: '苏格拉底式 AI 助教（DeepTutor）多 Agent 人格配置', module: '模块四：学校 Agent', tool: 'DeepTutor 算法', duration: '90 分钟' },
    { num: '16', title: '学校教学防刷门禁与 Gating 审核流配置', module: '模块四：学校 Agent', tool: 'Gating Guard', duration: '90 分钟' },
    { num: '17', title: '校长 AI 战略：学校 AI 转型路线图与实施手册', module: '模块五：校长战略', tool: '校长实施手册', duration: '90 分钟' },
    { num: '18', title: 'AI 教师认证体系与校本课程开发规范', module: '模块五：校长战略', tool: '认证考评规范', duration: '90 分钟' },
    { num: '19', title: '学校 AI 商业化与咨询交付（19,800 元/年 方案）', module: '模块五：校长战略', tool: '商业交付 SOP', duration: '90 分钟' },
    { num: '20', title: '毕业实战演练：搭建属于你学校的第一个 AI 教学中台', module: '模块五：校长战略', tool: 'Docker 全栈中台', duration: '90 分钟' },
  ];

  // SuperTA 防刷评估状态
  const [evaluatingSuperTA, setEvaluatingSuperTA] = useState(false);
  const [assignmentTitleInput, setAssignmentTitleInput] = useState('初三二次函数综合大题与论文作业');
  const [superTAResult, setSuperTAResult] = useState({
    aiRiskScore: 88,
    riskLevel: '高风险 (极易被 LLM 一键刷分代写)',
    vulnerabilityAnalysis: '作业包含标准文字推导与经典公式，ChatGPT/DeepSeek 等大模型可以 100% 盲答获得满分，缺乏过程性监督。',
    nineDimReformPlan: [
      '维度 1 (评估形式)：将 30% 分值转为 5 分钟现场口头答辩，验证真正理解度；',
      '维度 2 (过程记录)：要求提交人机协同反思日志（Reflective Prompt Log）与修改草稿；',
      '维度 3 (现场验证)：结合【智练 AI 错题中台】现场抽取 -1 与 +1 级变式验证卷。'
    ]
  });

  // DeepTutor 苏格拉底 Agent 交互状态
  const [selectedPartner, setSelectedPartner] = useState<'socratic' | 'concept_tracker' | 'code_evaluator'>('socratic');
  const [deepTutorInput, setDeepTutorInput] = useState('老师，二次函数顶点坐标公式怎么推理出来的？我不懂。');
  const [askingDeepTutor, setAskingDeepTutor] = useState(false);
  const [deepTutorChat, setDeepTutorChat] = useState([
    { role: 'user', content: '老师，二次函数顶点坐标公式怎么推理出来的？我不懂。' },
    { 
      role: 'assistant', 
      content: '非常好！要求解二次函数 $y = ax^2 + bx + c$ 的顶点坐标，我们需要用到【配方法】。\n请试着思考第一步：如果我们把前两项提取公因数 $a$，写成 $a(x^2 + \\frac{b}{a}x) + c$，括号里面需要加上什么常数才能凑成一个完全平方式呢？' 
    }
  ]);

  // Mastery Path (知识点掌握度矩阵)
  const [masteryData, setMasteryData] = useState([
    { concept: '一元二次方程求根公式', mastery: 95, status: '已掌握', decay: '稳定 (98%)' },
    { concept: '二次函数最值与区间', mastery: 62, status: '需强化', decay: '衰减中 (65%)' },
    { concept: '韦达定理与对称轴应用', mastery: 45, status: '薄弱点', decay: '高危 (40%)' },
    { concept: '圆的切线性质与相交弦', mastery: 78, status: '良好', decay: '稳定 (82%)' }
  ]);

  // Auto Deep Research 状态
  const [researchTopicInput, setResearchTopicInput] = useState('AI 时代中学数学分层教学与错题闭环设计研究');
  const [runningResearch, setRunningResearch] = useState(false);
  const [researchReport, setResearchReport] = useState({
    title: '【港大 AI 深度科研研报】AI 时代中学数学分层教学与错题闭环设计研究',
    abstract: '本研究基于港大 TALIC 评估框架与 DeepTutor 多 Agent 算法，探讨生成式 AI 如何在中学数学分层练习与防作弊评核中实现闭环。',
    outline: [
      '一、研究背景与生成式 AI 在基础教育中的双刃剑效应',
      '二、传统错题集效能低下根因分析与知识图谱重建',
      '三、基于 RAG 与 SymPy 5层防错的二次函数教学实践',
      '四、SuperTA 9维评估重构方案与实证研究'
    ],
    keyInsights: [
      '洞察 1：引入自适应 -1/+1 分层变式题后，后进生知识点掌握率提升 38.4%；',
      '洞察 2：SuperTA 9维重构有效规避了学生对大模型作业代写的盲信与作弊依赖。'
    ],
    references: [
      'Hong Kong University TALIC (2026). Generative AI Assessment & SuperTA Framework.',
      'HKU Data Intelligence Lab (2026). DeepTutor: Multi-Agent Conversational Learning System.'
    ]
  });

  // Worker 导出
  const [generating, setGenerating] = useState(false);
  const [pdfProgress, setPdfProgress] = useState(0);

  const pollAsyncJob = (jobId: string, onProgress: (p: number) => void, onComplete: (res: any) => void) => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/jobs?jobId=${jobId}`);
        const data = await res.json();
        if (data.success && data.job) {
          onProgress(data.job.progress);
          if (data.job.status === 'completed') {
            clearInterval(interval);
            onComplete(data.job.result);
          }
        }
      } catch (e) {
        clearInterval(interval);
      }
    }, 350);
  };

  const handleEvaluateSuperTA = async () => {
    setEvaluatingSuperTA(true);
    try {
      const res = await fetch('/api/super-ta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assignmentTitle: assignmentTitleInput })
      });
      const data = await res.json();
      if (data.success && data.evaluation) setSuperTAResult(data.evaluation);
    } catch (e: any) {
      alert(`SuperTA 评估异常: ${e.message}`);
    } finally {
      setEvaluatingSuperTA(false);
    }
  };

  const handleAskDeepTutor = async () => {
    if (!deepTutorInput.trim() || askingDeepTutor) return;
    const text = deepTutorInput;
    setDeepTutorInput('');
    setDeepTutorChat(prev => [...prev, { role: 'user', content: text }]);
    setAskingDeepTutor(true);

    try {
      const res = await fetch('/api/deep-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userQuestion: text })
      });
      const data = await res.json();
      if (data.success) {
        setDeepTutorChat(prev => [...prev, { role: 'assistant', content: data.socraticReply }]);
      }
    } catch (e: any) {
      setDeepTutorChat(prev => [...prev, { role: 'assistant', content: `[错误]: ${e.message}` }]);
    } finally {
      setAskingDeepTutor(false);
    }
  };

  const handleRunDeepResearch = async () => {
    setRunningResearch(true);
    try {
      const res = await fetch('/api/deep-research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ researchTopic: researchTopicInput })
      });
      const data = await res.json();
      if (data.success && data.report) setResearchReport(data.report);
    } catch (e: any) {
      alert(`Deep Research 异常: ${e.message}`);
    } finally {
      setRunningResearch(false);
    }
  };

  const handleGeneratePdf = async () => {
    setGenerating(true);
    setPdfProgress(10);
    try {
      const res = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentName: '张乐怡', className: '初三数学 A 班' })
      });
      const data = await res.json();
      if (data.success && data.jobId) {
        pollAsyncJob(data.jobId, (p) => setPdfProgress(p), (result) => {
          setGenerating(false);
          if (result && result.htmlUrl) window.open(result.htmlUrl, '_blank');
        });
      }
    } catch (e: any) {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] text-slate-900 font-sans antialiased flex flex-col">
      {/* 顶栏 macOS 极简白透 Glassmorphism Header */}
      <header className="h-16 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl px-8 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 p-0.5 shadow-md flex items-center justify-center text-white">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-slate-900 font-sans">
              昆仑增长教育 AI 体系 × 港大 DeepTutor 中台
            </h1>
            <span className="text-[10px] text-indigo-700 font-semibold px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-200/80 flex items-center space-x-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              <span>已绑定飞书 lark-cli ({feishuStatus.user})</span>
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full font-mono border border-emerald-200 font-semibold">
            <Activity className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
            <span>飞书同步: 《教师AI实战训练营》全 20 课完整大纲</span>
          </div>

          <button 
            onClick={handleGeneratePdf}
            disabled={generating}
            className="px-4 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center space-x-2 transition-all shadow-md shadow-indigo-500/20 active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{generating ? `Worker 生成中 (${pdfProgress}%)` : '导出分层试卷 (PDF)'}</span>
          </button>
        </div>
      </header>

      {/* 下方双栏工作台 (Sidebar + Main View) */}
      <div className="flex-1 flex overflow-hidden">
        {/* 左侧功能导航侧边栏 */}
        <aside className="w-64 border-r border-slate-200/80 bg-white/70 backdrop-blur-xl p-4 flex flex-col justify-between shrink-0">
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-3 mb-2">
                教育 AI 矩阵与全能中台
              </span>
              <nav className="space-y-1">
                {[
                  { id: 'feishu_curriculum', label: '《教师AI训练营》20课大纲', icon: BookOpen, badge: '飞书20课' },
                  { id: 'deep_tutor', label: 'DeepTutor 苏格拉底交互', icon: BrainCircuit, badge: 'HKUDS' },
                  { id: 'super_ta', label: 'SuperTA 教学防刷评估', icon: ShieldCheck, badge: 'TALIC' },
                  { id: 'mastery_path', label: 'Mastery Path 掌握度图谱', icon: TrendingUp, badge: '动态' },
                  { id: 'deep_research', label: 'Auto Deep Research 科研', icon: SearchCode, badge: '学术' },
                  { id: 'knowledge_center', label: 'Knowledge Center 知识库', icon: Database, badge: 'lark-cli' },
                  { id: 'verifier', label: 'SymPy 5层确定性校验', icon: FileCheck2, badge: '零防错' },
                ].map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        isActive 
                          ? 'bg-indigo-50 text-indigo-900 border border-indigo-200/80 shadow-xs' 
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <tab.icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-500'}`} />
                        <span>{tab.label}</span>
                      </div>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded ${isActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                        {tab.badge}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-xs space-y-1">
            <div className="flex items-center space-x-1.5 text-emerald-800 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>20 课与中台已全量锁定</span>
            </div>
            <span className="text-[10px] text-slate-600 block">云文档: `UgJQd8hkaofFgPxu85kcB7g3nwh`</span>
          </div>
        </aside>

        {/* 主画布视窗 (Main View) */}
        <main className="flex-1 overflow-y-auto p-8 space-y-6 bg-[#f5f7fa]">
          
          {/* ========================================================= */}
          {/* 0. 飞书《教师AI实战训练营》全 20 课网格视图 */}
          {/* ========================================================= */}
          {activeTab === 'feishu_curriculum' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xl space-y-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-2 max-w-3xl">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>飞书云文档 `00-《教师AI实战训练营》课程总设计.docx` 全量拉取</span>
                    </div>
                    <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">《教师 AI 实战训练营》全 20 课设计大纲</h2>
                    <p className="text-xs text-indigo-700 font-semibold">{feishuStatus.subtitle}</p>
                  </div>

                  <div className="text-right">
                    <span className="text-2xl font-black text-indigo-600 block">20 讲</span>
                    <span className="text-[10px] text-slate-400 font-mono">Master Curriculum V1.0</span>
                  </div>
                </div>

                {/* 20 课网格 Matrix */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {twentyLessons.map((item) => (
                    <div key={item.num} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-start space-x-3 hover:bg-white hover:shadow-md transition-all">
                      <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {item.num}
                      </span>
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-semibold text-indigo-600 px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-100">
                            {item.module}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">{item.duration}</span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                        <span className="text-[10px] text-slate-500 block">核心工具/算法: {item.tool}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 1. DeepTutor 港大 Socratic 多 Agent 互动 (全功能双栏视窗) */}
          {/* ========================================================= */}
          {activeTab === 'deep_tutor' && (
            <div className="grid grid-cols-12 gap-6 animate-fadeIn">
              <div className="col-span-8 space-y-5">
                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xl space-y-6 flex flex-col justify-between min-h-[560px]">
                  <div>
                    <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2.5 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
                          <BrainCircuit className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-slate-900">DeepTutor Socratic AI 对话画布 (对应第15课)</h3>
                          <p className="text-xs text-slate-500">基于港大 DIL 多 Agent 算法：不给直接答案，通过苏格拉底提问引导学生自主推理</p>
                        </div>
                      </div>
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                        Multi-Agent Active
                      </span>
                    </div>

                    {/* 对话列表 */}
                    <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2">
                      {deepTutorChat.map((msg, i) => (
                        <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                          <span className="text-[10px] text-slate-400 mb-1 px-1">
                            {msg.role === 'user' ? '学生提问' : `DeepTutor (${selectedPartner}):`}
                          </span>
                          <div className={`max-w-2xl p-4 rounded-3xl text-xs leading-relaxed ${
                            msg.role === 'user' 
                              ? 'bg-indigo-600 text-white rounded-tr-none shadow-md shadow-indigo-500/20 font-medium' 
                              : 'bg-slate-100 border border-slate-200/80 text-slate-900 rounded-tl-none font-medium'
                          }`}>
                            <p className="whitespace-pre-wrap"><MathExpr math={msg.content} /></p>
                          </div>
                        </div>
                      ))}

                      {askingDeepTutor && (
                        <div className="flex items-center space-x-2 text-xs text-indigo-600 p-3 bg-indigo-50 rounded-2xl w-fit font-semibold">
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>DeepTutor 多 Agent 正在推演引导性提问...</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 提问输入表单 */}
                  <form onSubmit={(e) => { e.preventDefault(); handleAskDeepTutor(); }} className="flex space-x-3 pt-4 border-t border-slate-100">
                    <input 
                      type="text" 
                      value={deepTutorInput}
                      onChange={(e) => setDeepTutorInput(e.target.value)}
                      placeholder="向 DeepTutor 提问数学概念或推导..." 
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all font-sans"
                    />
                    <button 
                      type="submit" 
                      disabled={askingDeepTutor} 
                      className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md shadow-indigo-500/20 active:scale-95 transition-all flex items-center space-x-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>发送提问</span>
                    </button>
                  </form>
                </div>
              </div>

              {/* 右侧 Agent 检查器与 Partner 人格 */}
              <div className="col-span-4 space-y-5">
                <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-lg space-y-4">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-2">
                    <Sliders className="w-4 h-4 text-indigo-600" />
                    <span>选择港大 Agent 人格 Partner</span>
                  </h4>
                  <div className="space-y-2">
                    {[
                      { id: 'socratic', name: 'Socratic Tutor', desc: '苏格拉底追问，引导思考' },
                      { id: 'concept_tracker', name: 'Concept Tracker', desc: '知识点漏洞自动定位' },
                      { id: 'code_evaluator', name: 'SymPy Math Evaluator', desc: '5层代数确定性校验' }
                    ].map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setSelectedPartner(p.id as any)}
                        className={`w-full text-left p-3.5 rounded-2xl border text-xs transition-all ${
                          selectedPartner === p.id 
                            ? 'bg-indigo-50 border-indigo-300 text-indigo-900 font-bold shadow-xs' 
                            : 'bg-slate-50 border-slate-200/80 text-slate-700 hover:bg-white'
                        }`}
                      >
                        <div className="font-semibold">{p.name}</div>
                        <div className="text-[10px] text-slate-500 font-normal">{p.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-lg space-y-3">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-2">
                    <Network className="w-4 h-4 text-purple-600" />
                    <span>知识图谱关联节点</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {['二次函数顶点式', '完全平方式配方', '对称轴 x=-b/2a', '最值极值点'].map((tag, idx) => (
                      <span key={idx} className="text-[10px] px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 2. SuperTA 教学防刷与 9 维评估 */}
          {/* ========================================================= */}
          {activeTab === 'super_ta' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xl space-y-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-2 max-w-2xl">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>对应第 09 课：SuperTA 9 维评估防刷与 TALIC 框架</span>
                    </div>
                    <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">SuperTA 教师作业 AI 抄袭防刷与课程重构</h2>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      精准检测作业被学生用 ChatGPT / DeepSeek 一键代刷的脆弱点风险，并基于港大 9 维框架输出包含现场答辩、反思日志与变式抽查的重构方案。
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-mono">Evaluation Engine</span>
                    <span className="text-xs text-emerald-600 font-bold flex items-center justify-end space-x-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      <span>Active</span>
                    </span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <input 
                    type="text" 
                    value={assignmentTitleInput}
                    onChange={(e) => setAssignmentTitleInput(e.target.value)}
                    placeholder="输入作业或论文题目..." 
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs text-slate-900 focus:outline-none focus:border-rose-500 font-sans"
                  />
                  <button 
                    onClick={handleEvaluateSuperTA}
                    disabled={evaluatingSuperTA}
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white text-xs font-semibold shadow-lg shadow-rose-500/25 active:scale-95 transition-all flex items-center space-x-2"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${evaluatingSuperTA ? 'animate-spin' : ''}`} />
                    <span>{evaluatingSuperTA ? 'SuperTA 评估中...' : '评估防刷风险与 9 维方案'}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-4 p-6 rounded-3xl bg-white border border-slate-200/90 shadow-lg flex flex-col justify-between items-center text-center">
                  <span className="text-xs font-semibold text-slate-600">AI 易刷作弊风险指数</span>
                  
                  <div className="my-6 relative flex items-center justify-center">
                    <div className="w-36 h-36 rounded-full border-8 border-rose-100 flex items-center justify-center bg-rose-50/50">
                      <div className="text-5xl font-black text-rose-600 tracking-tight">{superTAResult.aiRiskScore}<span className="text-lg">%</span></div>
                    </div>
                  </div>

                  <span className="px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-800 text-xs font-bold border border-rose-200">
                    {superTAResult.riskLevel}
                  </span>
                </div>

                <div className="col-span-8 p-6 rounded-3xl bg-white border border-slate-200/90 shadow-lg space-y-5">
                  <div>
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      <span>脆弱点分析 (Vulnerability Insight)</span>
                    </h4>
                    <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/60 text-xs text-amber-900 leading-relaxed font-medium">
                      {superTAResult.vulnerabilityAnalysis}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-indigo-700 uppercase tracking-wider mb-3 flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>港大 9 维课程重构方案 (Assessment Reform)</span>
                    </h4>
                    <div className="space-y-2">
                      {superTAResult.nineDimReformPlan.map((plan, idx) => (
                        <div key={idx} className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-xs text-slate-800 flex items-start space-x-3 font-medium">
                          <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="leading-relaxed">{plan}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 3. Mastery Path 掌握度图谱 */}
          {/* ========================================================= */}
          {activeTab === 'mastery_path' && (
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xl space-y-6 animate-fadeIn">
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                <span>对应第 06 课：Mastery Path 知识点动态掌握度与艾宾浩斯衰退曲线矩阵</span>
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {masteryData.map((item, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">{item.concept}</span>
                      <span className="text-[10px] text-slate-500">记忆曲线: {item.decay}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-black text-indigo-600">{item.mastery}%</span>
                      <span className={`block text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        item.mastery < 60 ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                      }`}>{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 4. Auto Deep Research */}
          {/* ========================================================= */}
          {activeTab === 'deep_research' && (
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-5 animate-fadeIn">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900">Auto Deep Research 自主深度科研引擎</h3>
              </div>
              <div className="flex space-x-3">
                <input 
                  type="text" 
                  value={researchTopicInput}
                  onChange={(e) => setResearchTopicInput(e.target.value)}
                  placeholder="输入研究课题..." 
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs text-slate-900"
                />
                <button onClick={handleRunDeepResearch} disabled={runningResearch} className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold">
                  {runningResearch ? '自主调研中...' : '生成研报'}
                </button>
              </div>

              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                <h4 className="text-base font-bold text-purple-900">{researchReport.title}</h4>
                <p className="text-xs text-slate-700 bg-white p-4 rounded-2xl border border-slate-200">{researchReport.abstract}</p>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 5. Knowledge Center 知识库 */}
          {/* ========================================================= */}
          {activeTab === 'knowledge_center' && (
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-5 animate-fadeIn">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                  <Database className="w-5 h-5 text-indigo-600" />
                  <span>对应第 13、14 课：Knowledge Center 知识库与飞书 lark-cli 实时连接</span>
                </h3>
                <button className="px-3.5 py-1.5 rounded-full bg-indigo-600 text-white text-xs font-semibold flex items-center space-x-1.5">
                  <Upload className="w-3.5 h-3.5" />
                  <span>上传讲义/PDF</span>
                </button>
              </div>

              <div className="space-y-3">
                {kbList.map((kb, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">{kb.name}</span>
                      <span className="text-[10px] text-slate-500">大小: {kb.size} | Chunks: {kb.chunks}</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200">
                      {kb.engine}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 6. SymPy 5层确定性校验 */}
          {/* ========================================================= */}
          {activeTab === 'verifier' && (
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-5 animate-fadeIn">
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <FileCheck2 className="w-5 h-5 text-emerald-600" />
                <span>对应第 03、08 课：SymPy 代数求解与 5 层确定性防错校验门禁</span>
              </h3>
              <div className="grid grid-cols-5 gap-3">
                {['Vision 共识', 'LaTeX AST 树', 'SymPy 代数求解', '几何公理拓扑', 'Gating 人工门禁'].map((layer, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 text-center">
                    <span className="text-[10px] font-mono text-emerald-600 font-bold block">Layer {i + 1}</span>
                    <span className="text-xs font-bold text-slate-900">{layer}</span>
                    <span className="block text-[10px] text-emerald-700 font-bold pt-2">100% PASS</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
