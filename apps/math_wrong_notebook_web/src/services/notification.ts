export interface ReportData {
  studentName: string;
  className: string;
  weekStart: string;
  weekEnd: string;
  totalWrong: number;
  resolved: number;
  aiDiagnosis: string;
}

/**
 * 发送飞书机器人消息 (家长学情周报)
 */
export async function sendFeishuWebhook(webhookUrl: string, data: ReportData) {
  const content = {
    msg_type: "post",
    content: {
      post: {
        zh_cn: {
          title: `📊 【AI错题本】${data.studentName} 同学学情周报`,
          content: [
            [
              { tag: "text", text: `班级: ${data.className}\n` },
              { tag: "text", text: `周期: ${data.weekStart} ~ ${data.weekEnd}\n\n` }
            ],
            [
              { tag: "text", text: `📝 本周新增错题: ${data.totalWrong} 道\n` },
              { tag: "text", text: `✅ 已订正/消灭: ${data.resolved} 道\n\n` }
            ],
            [
              { tag: "text", text: `🤖 AI 深度诊断:\n` },
              { tag: "text", text: `${data.aiDiagnosis}\n` }
            ],
            [
              { tag: "a", text: "👉 点击查看专属定制变式卷", href: "https://your-domain.com/student/report" }
            ]
          ]
        }
      }
    }
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content)
    });
    return await response.json();
  } catch (error) {
    console.error("Feishu Webhook failed:", error);
    throw error;
  }
}

/**
 * 发送企业微信机器人消息 (家长学情周报)
 */
export async function sendWeComWebhook(webhookUrl: string, data: ReportData) {
  const content = {
    msgtype: "markdown",
    markdown: {
      content: `📊 **【AI错题本】${data.studentName} 同学学情周报**
> 班级: <font color="info">${data.className}</font>
> 周期: ${data.weekStart} ~ ${data.weekEnd}

📝 本周新增错题: <font color="warning">${data.totalWrong}</font> 道
✅ 已订正/消灭: <font color="info">${data.resolved}</font> 道

🤖 **AI 深度诊断:**
${data.aiDiagnosis}

[👉 点击查看专属定制变式卷](https://your-domain.com/student/report)`
    }
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content)
    });
    return await response.json();
  } catch (error) {
    console.error("WeCom Webhook failed:", error);
    throw error;
  }
}
