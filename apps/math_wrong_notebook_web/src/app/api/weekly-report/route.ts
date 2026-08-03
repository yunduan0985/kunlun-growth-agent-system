import { NextResponse } from 'next/server';
import { sendFeishuWebhook, sendWeComWebhook } from '@/services/notification';

export async function POST(request: Request) {
  try {
    const { studentName, className, webhookUrl, channel } = await request.json();

    const reportData = {
      studentName: studentName || '张乐怡',
      className: className || '初三数学 A 班',
      weekStart: '2026-07-27',
      weekEnd: '2026-08-01',
      totalWrong: 18,
      resolved: 11,
      aiDiagnosis: '张乐怡同学在《圆的切线性质与相交弦》考点中有 5 道错题。逻辑推导能力较强，但在辅助线构建方面尚有欠缺。建议优先完成包含【难度-1】降级变式的巩固练习。'
    };

    if (webhookUrl && webhookUrl.startsWith('http')) {
      if (channel === 'wecom') {
        await sendWeComWebhook(webhookUrl, reportData);
      } else {
        await sendFeishuWebhook(webhookUrl, reportData);
      }
    }

    return NextResponse.json({
      success: true,
      message: `家长学情周报已通过 ${channel === 'wecom' ? '企业微信' : '飞书'} 卡片成功推送！`,
      data: reportData
    });

  } catch (error: any) {
    console.error('周报推送 API 异常:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
