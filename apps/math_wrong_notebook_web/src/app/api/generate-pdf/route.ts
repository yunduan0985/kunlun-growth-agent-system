import { NextResponse } from 'next/server';
import { dispatchAsyncJob } from '@/lib/queue';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const studentName = body.studentName || '张乐怡';
    const className = body.className || '初三数学 A 班';

    // 派发到后台 Worker 队列中（立即返回，响应时间 < 30ms）
    const jobInfo = await dispatchAsyncJob('PDF_GEN', { studentName, className });

    return NextResponse.json({
      success: true,
      async: true,
      message: '组卷任务已成功派发至后台 Worker 队列！',
      jobId: jobInfo.jobId,
      estimatedSeconds: jobInfo.estimatedSeconds
    });

  } catch (error: any) {
    console.error('PDF 生成派发失败:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
