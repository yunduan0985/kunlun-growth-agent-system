import { NextResponse } from 'next/server';

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || 'sk-5d6e675e074b4ed481374fcafd2b7821';

export async function POST(request: Request) {
  try {
    const { question } = await request.json().catch(() => ({}));
    const baseQ = question || '2x^2 + 5x - 12 = 0';

    let variantData = {
      variantMinus: 'x^2 + 5x + 6 = 0',
      variantPlus: 'x_1^2 + x_2^2',
      knowledgePoint: '一元二次方程韦达定理与十字相乘法'
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
          messages: [{ role: 'user', content: `题目【${baseQ}】，生成变式题JSON。` }],
          temperature: 0.7
        }),
        signal: controller.signal
      });
      clearTimeout(timer);

      if (response.ok) {
        const resData = await response.json();
        const content = resData.choices[0]?.message?.content || '';
        const match = content.match(/\{[\s\S]*\}/);
        if (match) {
          variantData = JSON.parse(match[0]);
        }
      }
    } catch (e) {
      clearTimeout(timer);
    }

    return NextResponse.json({
      success: true,
      baseQuestion: baseQ,
      data: variantData
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
