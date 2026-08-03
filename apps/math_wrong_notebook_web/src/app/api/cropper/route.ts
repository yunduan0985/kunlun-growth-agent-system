import { NextResponse } from 'next/server';
import { dispatchAsyncJob } from '@/lib/queue';

export async function POST(request: Request) {
  try {
    // 派发切题到后台 Worker 队列中（响应时间 < 30ms）
    const jobInfo = await dispatchAsyncJob('OPENCV_CROP', {});

    return NextResponse.json({
      success: true,
      async: true,
      message: '高拍仪切题任务已派发至后台 OpenCV Worker 队列！',
      jobId: jobInfo.jobId,
      estimatedSeconds: jobInfo.estimatedSeconds
    });

  } catch (error: any) {
    console.error('Cropper API 派发失败:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
