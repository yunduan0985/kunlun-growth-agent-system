import { NextResponse } from 'next/server';

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || 'sk-5d6e675e074b4ed481374fcafd2b7821';

export async function POST(request: Request) {
  try {
    const { message } = await request.json().catch(() => ({}));
    const userQuery = message || '怎么用这个中台组卷？';

    let reply = '依据《教师AI课》SOP 流程：1. 选中考点；2. 选择【难度-1】变式；3. 点击【一键生成试卷 (PDF)】即可。';

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
          messages: [
            { role: 'system', content: '你是一位特级教师AI备课助教，请简短回答。' },
            { role: 'user', content: userQuery }
          ],
          temperature: 0.5
        }),
        signal: controller.signal
      });
      clearTimeout(timer);

      if (response.ok) {
        const data = await response.json();
        reply = data.choices[0]?.message?.content || reply;
      }
    } catch (e) {
      clearTimeout(timer);
    }

    return NextResponse.json({ success: true, reply });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
