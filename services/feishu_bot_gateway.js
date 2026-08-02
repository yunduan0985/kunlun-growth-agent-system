const express = require('express');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const app = express();
app.use(express.json());

const PORT = process.env.FEISHU_GATEWAY_PORT || 8090;
const AGENT_DATA_PATH = path.join(__dirname, '..', 'data', 'feishu_36_agents_bitable_export.json');
const MOMENTS_PROMPT_PATH = path.join(__dirname, '..', 'agents', '03_content_group', 'wechat_moments_master', 'system_prompt.md');
const DEEPSEEK_KEY = process.env.DEEPSEEK_API_KEY || 'sk-5d6e675e074b4ed481374fcafd2b7821';

// 载入【朋友圈去 AI 味高转化文案官】Prompt
let momentsPrompt = '';
if (fs.existsSync(MOMENTS_PROMPT_PATH)) {
  momentsPrompt = fs.readFileSync(MOMENTS_PROMPT_PATH, 'utf-8');
}

// 结合【亦仁 × AI帅总】与【朋友圈去AI味爆款官】的全局主 Agent
const MASTER_SYSTEM_PROMPT = `
# Role: 亦仁 × AI帅总 (双星联合总控主 Agent / 朋友圈去AI味爆款大师)

## 1. 角色定位
您是昆仑增长帝国的【总控主 Agent】。您不仅融合了亦仁导师的生财破局洞察与 AI 帅总的闭环执行大脑，更深度掌握了《朋友圈高转化去 AI 味文案 SOP》！

## 2. 特殊指令：朋友圈文案生成规范 (用户要求发朋友圈时强制触发)
当用户要求“写一条朋友圈”、“生成朋友圈文案”、“帮我发朋友圈”时，您必须严格遵守以下法则输出：

1. **第一段只留一句话（单句爆款破折叠）**：用带悬念、数字、强烈冲突的口语短句开头！
2. **拒绝任何文艺假大空**：彻底删掉“幸福真谛”、“生活轨迹”、“重新审视”等论文词，用初中生都能听懂的口语大白话！
3. **带强烈对比**：必须包含收入对比、认知对比或前后对比（如“以前...现在...”），激发读者渴望！
4. **格式极致干净**：直接输出【可直接复制粘贴发送】的内容，分段清晰，不带 Markdown 复杂符号！
`;

app.post('/webhook/feishu', async (req, res) => {
  const { challenge, event } = req.body;

  if (challenge) {
    console.log('📌 收到飞书开放平台 URL Challenge 校验请求');
    return res.json({ challenge });
  }

  if (event && event.message) {
    const messageContent = event.message.content ? JSON.parse(event.message.content) : {};
    const rawText = messageContent.text || '';
    const chatId = event.message.chat_id;
    console.log(`📩 [主 Agent 收到群消息] (${chatId}): "${rawText}"`);

    // 如果包含“朋友圈”相关，注入 wechat_moments_master 提示词
    let activePrompt = MASTER_SYSTEM_PROMPT;
    if (rawText.includes('朋友圈') || rawText.includes('文案')) {
      activePrompt = `${MASTER_SYSTEM_PROMPT}\n\n${momentsPrompt}`;
    }

    try {
      const response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DEEPSEEK_KEY}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            { role: 'system', content: activePrompt },
            { role: 'user', content: rawText }
          ]
        })
      });

      const data = await response.json();
      const replyText = data.choices && data.choices[0] ? data.choices[0].message.content : '朋友圈文案生成完成。';

      console.log(`✅ [主 Agent] 朋友圈去AI味爆款文案生成完毕，回复成功！`);
      return res.json({ success: true, masterAgent: '朋友圈去AI味大师', reply: replyText });
    } catch (e) {
      console.error('❌ 响应异常:', e.message);
      return res.json({ success: false, error: e.message });
    }
  }

  res.json({ success: true });
});

app.get('/health', (req, res) => {
  res.json({ status: 'active', masterAgent: '朋友圈去 AI 味爆款大师', feishuBridge: 'Ready' });
});

app.listen(PORT, () => {
  console.log(`==================================================================`);
  console.log(`📱 朋友圈去 AI 味高转化文案网关已启动！端口: ${PORT}`);
  console.log(`==================================================================`);
});
