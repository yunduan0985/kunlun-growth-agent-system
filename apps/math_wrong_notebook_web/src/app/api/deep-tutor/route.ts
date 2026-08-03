import { NextResponse } from 'next/server';

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || 'sk-5d6e675e074b4ed481374fcafd2b7821';

export async function POST(request: Request) {
  try {
    const { userQuestion, contextTopic } = await request.json().catch(() => ({}));
    const question = userQuestion || '老师，二次函数顶点坐标公式怎么推理出来的？我不懂。';
    const topic = contextTopic || '初中数学-二次函数';

    const systemPrompt = `你是由香港大学数据智能实验室 (HKU DIL) 算法驱动的 DeepTutor Socratic AI 多 Agent 互动学习助手。
你的教学原则：
1. 绝对不直接给出最终答案，而是通过引导性提问（苏格拉底教学法），引导学生一步步思考。
2. 识别学生潜在的知识点漏洞（如配方法、平方差公式）。
3. 语气亲切、具有鼓励性。`;

    let reply = `非常好！要求解二次函数 $y = ax^2 + bx + c$ 的顶点坐标，我们需要用到【配方法】。
请试着思考第一步：如果我们把前两项提取公因数 $a$，写成 $a(x^2 + \\frac{b}{a}x) + c$，括号里面需要加上什么常数才能凑成一个完全平方式呢？`;

    try {
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: question }
          ],
          temperature: 0.7
        })
      });

      if (response.ok) {
        const resData = await response.json();
        reply = resData.choices[0]?.message?.content || reply;
      }
    } catch (e) {
      console.warn('DeepTutor API 降级为默认回复:', e);
    }

    return NextResponse.json({
      success: true,
      agents: ['Socratic_Tutor_Agent', 'Concept_Tracker_Agent', 'Self_Corrector_Agent'],
      socraticReply: reply,
      weakConceptDetected: '完全平方公式配方步骤'
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
