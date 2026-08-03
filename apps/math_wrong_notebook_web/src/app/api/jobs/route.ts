import { NextResponse } from 'next/server';
import { getJobStatus } from '@/lib/queue';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const jobId = searchParams.get('jobId');

  if (!jobId) {
    return NextResponse.json({ success: false, error: '必须提供 jobId 参数' }, { status: 400 });
  }

  const result = getJobStatus(jobId);
  if (!result.found) {
    return NextResponse.json({ success: false, error: '未找到任务' }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    job: result.job
  });
}
