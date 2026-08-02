const http = require('http');
const https = require('https');
const { URL } = require('url');

// 任务句柄内存缓存
const scrapingTasks = new Map();

/**
 * 原生通用 HTML/Text 自动化无头网页采集器
 * @param {string} targetUrl 目标 URL
 * @param {object} options 配置选项 (user_agent, timeout, max_depth)
 */
async function scrapeWebPage(targetUrl, options = {}) {
  const taskId = 'task_scrape_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
  const taskRecord = {
    taskId,
    targetUrl,
    status: 'RUNNING',
    startTime: new Date().toISOString(),
    result: null,
    error: null
  };
  scrapingTasks.set(taskId, taskRecord);

  try {
    const parsedUrl = new URL(targetUrl);
    const client = parsedUrl.protocol === 'https:' ? https : http;
    const reqOptions = {
      headers: {
        'User-Agent': options.userAgent || 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 AgentOS/2.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8'
      },
      timeout: options.timeout || 15000
    };

    const htmlContent = await new Promise((resolve, reject) => {
      const req = client.get(targetUrl, reqOptions, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          // 处理 301/302 重定向
          const redirectUrl = new URL(res.headers.location, targetUrl).toString();
          return scrapeWebPage(redirectUrl, options).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP Response Status Code: ${res.statusCode}`));
        }

        let body = '';
        res.setEncoding('utf-8');
        res.on('data', chunk => body += chunk);
        res.on('end', () => resolve(body));
      });

      req.on('error', err => reject(err));
      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Page request timed out after 15s'));
      });
    });

    // 基础 DOM & 文本清洗
    const titleMatch = htmlContent.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : parsedUrl.hostname;

    // 清理 script、style 标签
    const cleanText = htmlContent
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    const scrapedData = {
      title,
      url: targetUrl,
      rawLength: htmlContent.length,
      textContent: cleanText.substring(0, 5000), // 前 5000 字符
      excerpt: cleanText.substring(0, 300) + '...'
    };

    taskRecord.status = 'SUCCESS';
    taskRecord.result = scrapedData;
    taskRecord.endTime = new Date().toISOString();
    return scrapedData;

  } catch (err) {
    console.error(`❌ [Browser-Use Scraper] Task failed for ${targetUrl}:`, err.message);
    taskRecord.status = 'FAILED';
    taskRecord.error = err.message;
    taskRecord.endTime = new Date().toISOString();
    throw err;
  }
}

// 获取某个采料任务的状态
function getScrapeTaskStatus(taskId) {
  return scrapingTasks.get(taskId) || null;
}

// 列出近期的所有采料任务
function listScrapeTasks() {
  return Array.from(scrapingTasks.values()).slice(-20);
}

module.exports = {
  scrapeWebPage,
  getScrapeTaskStatus,
  listScrapeTasks
};
