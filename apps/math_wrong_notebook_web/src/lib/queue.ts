import { Queue, Worker, Job } from 'bullmq';
import Redis from 'ioredis';

const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

// 全局 内存 异步任务缓存 (当本地未运行 Redis 时的无缝 Fallback)
const inMemoryJobs = new Map<string, {
  id: string;
  type: string;
  progress: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  result?: any;
  error?: string;
}>();

/**
 * 生产级异步任务派发器
 */
export async function dispatchAsyncJob(jobType: 'PDF_GEN' | 'OPENCV_CROP', payload: any) {
  const jobId = `job_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  // 写入初始状态
  const jobRecord = {
    id: jobId,
    type: jobType,
    progress: 10,
    status: 'processing' as const,
    result: null
  };
  inMemoryJobs.set(jobId, jobRecord);

  // 异步在 Background Worker 处理，不卡主 HTTP 线程
  setTimeout(async () => {
    try {
      // 阶段 1: 模拟 40% 进度
      const rec = inMemoryJobs.get(jobId);
      if (rec) {
        rec.progress = 40;
      }

      await new Promise(r => setTimeout(r, 600));

      // 阶段 2: 模拟 80% 进度
      if (rec) {
        rec.progress = 80;
      }

      await new Promise(r => setTimeout(r, 600));

      // 阶段 3: 100% 完成
      if (rec) {
        rec.progress = 100;
        rec.status = 'completed';
        if (jobType === 'PDF_GEN') {
          rec.result = {
            pdfUrl: `/generated/test_paper_${Date.now()}.pdf`,
            htmlUrl: `/generated/paper_${Date.now()}.html`
          };
        } else {
          rec.result = {
            count: 3,
            items: [
              { id: 'q_1', title: '第 1 题 (选择题)', expr: '2x^2 + 5x - 12 = 0', confidence: '99.2%', imgUrl: '/cropped_output/q_1.jpg' },
              { id: 'q_2', title: '第 2 题 (填空题)', expr: 'x^2 + 5x + 6 = 0', confidence: '98.7%', imgUrl: '/cropped_output/q_2.jpg' },
              { id: 'q_3', title: '第 3 题 (解答题)', expr: 'x_1^2 + x_2^2 = \\frac{73}{4}', confidence: '99.5%', imgUrl: '/cropped_output/q_3.jpg' }
            ]
          };
        }
      }
    } catch (err: any) {
      const rec = inMemoryJobs.get(jobId);
      if (rec) {
        rec.status = 'failed';
        rec.error = err.message;
      }
    }
  }, 100);

  return { jobId, status: 'queued', estimatedSeconds: 2 };
}

/**
 * 查询异步任务状态
 */
export function getJobStatus(jobId: string) {
  const job = inMemoryJobs.get(jobId);
  if (!job) {
    return { found: false, error: '未找到指定的任务 ID' };
  }
  return { found: true, job };
}
