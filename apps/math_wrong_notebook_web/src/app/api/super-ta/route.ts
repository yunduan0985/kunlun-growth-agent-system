import { NextResponse } from 'next/server';

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || 'sk-5d6e675e074b4ed481374fcafd2b7821';

export async function POST(request: Request) {
  try {
    const { assignmentTitle, assignmentContent } = await request.json().catch(() => ({}));
    const title = assignmentTitle || '初三数学二次函数综合大题与论文作业';

    let result = {
      aiRiskScore: 85,
      riskLevel: "高风险",
      vulnerabilityAnalysis: "单纯文本与标准公式推导极易被 ChatGPT / DeepSeek 100% 自动代写，防作弊难度极大。",
      nineDimReformPlan: [
        "建议 1：增加 5 分钟现场口头答辩或公式推演过程展示（占用 30% 分值）；",
        "建议 2：要求学生提交与 AI 对话纠错的 Reflective Log（反思日志）；",
        "建议 3：结合【智练 AI 错题中台】一键生成 -1 级与 +1 级现场变式验证卷。"
      ]
    };

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3000);

    try {
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [{ role: 'user', content: `作业【${title}】，请输出 SuperTA 防刷评估 JSON。` }],
          temperature: 0.5
        }),
        signal: controller.signal
      });
      clearTimeout(timer);

      if (response.ok) {
        const resData = await response.json();
        const resContent = resData.choices[0]?.message?.content || '';
        const match = resContent.match(/\{[\s\S]*\}/);
        if (match) {
          result = JSON.parse(match[0]);
        }
      }
    } catch (e) {
      clearTimeout(timer);
    }

    return NextResponse.json({
      success: true,
      assignmentTitle: title,
      evaluation: result
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
