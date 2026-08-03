# 🎬 YouTube“财经人生故事”赛道全自动化工作流与提示词 SOP

> **原文档来源**：飞书云文档 (`栗子Lizi聊AI`)  
> **知识沉淀时间**：2026-08-03  
> **适用场景**：YouTube / B站 / 小红书 自动化大流量财经人生故事视频制作、提示词全公开、画面与配音自动化工作流

---

heading2 7192562118578470940 author *0+6 Demo样片 auto

heading3 7192562118578470940 author *0+e 第二稿：原创性和平台合规检查 auto

code 7192562118578470940 author *0|h+c5*0+7 你是一名专业的音频风格分析师，擅长分析 YouTube 视频中的配音特征。
我会给你一个视频，请你从“声音”的角度做拆解，不需要分析内容，只分析配音本身。
请你输出以下内容：
 配音类型（真人 / AI / 合成感强弱判断） 
 声音性别与大致年龄感（例如：中年男性 / 年轻女性等） 
 语气特征（平静 / 克制 / 情绪化 / 叙事感 / 教学感等） 
 语速（慢 / 中 / 快，是否有明显停顿或节奏控制） 
 情绪曲线（是否有起伏，还是整体平稳） 
 声音质感（温暖 / 冷静 / 压低 / 轻快 / 带磁性等） 
然后，请基于以上分析，给出：
如果使用 ElevenLabs，推荐的音色类型或接近的 voice 风格
 如果使用 Google AI Studio TTS，推荐的 voice 类型或参数方向
要求：
 不要泛泛而谈，要具体、可执行 
 尽量贴近“实际可选的音色”，而不是抽象描述 
 输出结果要让我可以直接去选声音使用 
视频链接 / 音频如下：
 【粘贴视频】 Plain Text |1+9 音色Prompt

heading2 7192562118578470940 author *0+6 拆解对标视频 auto

bullet 7192562118578470940 author *0+c 发色（比如紫色头发）

heading3 7192562118578470940 author *0+4 视觉标准

bullet 7192562118578470940 author *0+4 穿着

ordered 7192562118578470940 author *0+1n 在 cartel / crime / dark stories 这类题材里，找到一个播放量超过 50 万的视频格式 1

code 7192562118578470940 author bold true *0|1+h*0+p*0*1+2*0|e+6v*0+7 你是一位 AI 视觉风格分析师。
我会给你一张参考图片，请你不要分析剧情，只分析它的画风。
请帮我拆出这张图的：
 整体风格类型（写实 / 电影感 / Pixar / 插画风等） 
 色彩特点（冷暖、饱和度、明暗关系） 
 光影特点（柔光 / 暗调 / 逆光 / 高对比等） 
 构图特点（近景 / 中景 / 远景，镜头视角，主体位置） 
 人物与场景的质感特点 
 这张图最关键的 5 个风格关键词 
最后，请基于以上分析，输出：
 一段可直接用于 AI 生图的英文风格 Prompt 
 一段对应的中文版本 
要求：
 只聚焦“画风”，不要展开讲故事，不要写太泛。
参考图片：
 【粘贴图片】 Plain Text |1+e 视觉风格拆解 Prompt

heading3 7192562118578470940 author *0+e 第三步：按脚本生成画面和动画

heading2 7192562118578470940 author *0+2 视觉 auto

heading2 7192562118578470940 author *0+3 小彩蛋 auto

code 7192562118578470940 author bold true textHighlightBackground rgb(247,105,100) *0|6+3y*0+1*0*1+7*0|l+4z*0*1+3*0|2+1q*0*1+3*0|a+25*0*1+5*0|e+3z*0*1+b*0|2+15*0*1+f*0|2+1h*0*1+f*0|h+7z*0+1*0*2+a*0|2+7*0+1*0*2+6 你是一位经验丰富的 AI 视觉分析与生成专家，擅长将脚本内容转化为统一风格的视觉画面，并确保角色、风格和叙事的一致性。
我会提供一段视频脚本，以及一个主角角色设定。
你的任务是：
基于脚本内容，为每一句生成对应的视觉画面提示词（图片 + 视频），并保持整体风格统一、角色一致。

 
 重要风格规则：
刻意简单
刻意低细节
不要精致
不要电影感
不要流畅动画
不要皮克斯风格
不要动漫风格
不要电影级质量
不要高端动态图形
粗糙的 YouTube 解释类动画美学
动态缩略图风格
简单木偶式动作
大多是静态插画场景
粗黑描边
扁平颜色
最少阴影
夸张但有点笨拙的面部表情
简单背景
看起来便宜，但要是“好看的便宜感”
感觉像一个快速制作出来的无露脸财经频道
角色：
年轻男性财经角色，凌乱的棕色头发，大而简单的眼睛，白衬衫，松散的红色领带，海军蓝西装外套，瘦削身材，表情略显压力和焦虑。
场景：
坐在凌乱的书桌前
到处散落着未支付的账单
查看很低的银行余额
桌上有计算器
桌上有泡面
深蓝色公寓灯光
疲惫的表情
盯着笔记本电脑屏幕
生存模式的氛围
动画风格：
动作有限
轻微眨眼
缓慢推近镜头
简单手臂动作
分镜式节奏
大多是静止画面，只带一点点小动作
应该像动态版 YouTube 缩略图

输出要求（必须严格执行）
请对脚本进行逐句拆分，并对每一句输出：
1）图片生成 Prompt（英文 + 中文）
用于NanoBanana
必须包含：
主体（Subject）
 明确描述主角（必须带入主角设定）、动作、表情、情绪，以及所在场景与环境细节 
构图（Composition）
 镜头类型（特写 / 中景 / 远景）、视角（正面 / 侧面 / 俯视等）、主体位置、空间层次与景深 
艺术风格（Art Style）
 风格类型（写实 / 电影感 / Pixar等）、光影（柔光 / 暗调 / 逆光等）、色彩（冷暖 / 饱和度）、整体氛围（孤独 / 压抑 / 温暖等） 
 
2）视频生成 Prompt（英文）
必须包含：
 角色动作（动态行为） 
 镜头运动（推进 / 拉远 / 平移等） 
 情绪变化（如果有） 
 场景连续性（与上一镜头保持一致） 
全局约束（非常重要）
 所有画面必须使用同一个主角（严格一致） 
 风格必须统一（不可每张图风格变化） 
 每一句脚本 → 对应一个画面 
 不允许泛泛描述，必须具体、可执行 
 输出结果必须可以直接用于生成 
输入内容
主角设定：
 【粘贴主角IP设定】
脚本内容：
 【粘贴脚本】 Plain Text |1+c 画面生成 Prompt

heading3 7192562118578470940 author *0+2 剪辑

code 7192562118578470940 author bold true *0*1+16*0|1+1*0*1+y*0|8+tf*0*1+n*0|3+b*0*1+q*0|3+tn*0*1+k*0|3+9s*0*1+q*0|5+gm*0*1+n*0|3+h*0*1+q*0|3+s9*0*1+k*0|3+94*0*1+q*0|5+fv*0*1+n*0|3+1o*0*1+q*0|3+s0*0*1+k*0|3+8x*0*1+q*0|2+fr # Full Sentence-by-Sentence Visual Prompts
## Global Character and Style Lock
- Character continuity: the same young male finance character, messy brown hair, large simple eyes, white shirt, loose red tie, navy blue suit jacket, slim body, stressed and slightly anxious expression.
- 角色一致性：同一个年轻男性财经角色：凌乱的棕色头发、大而简单的眼睛、白衬衫、松散红色领带、海军蓝西装外套、瘦削身材、略显压力和焦虑的表情。
- Global style: intentionally simple, low-detail rough YouTube finance explainer animation, cheap but good-looking dynamic thumbnail style, thick black outlines, flat colors, minimal shadows, awkward exaggerated facial expression, simple background, mostly static illustration, not cinematic, not Pixar, not anime, not realistic, no glossy high-end motion graphics.
- 全局风格：刻意简单、低细节、粗糙的 YouTube 财经解释类动画风格，好看的便宜感，动态缩略图风格，粗黑描边，扁平颜色，最少阴影，夸张但笨拙的表情，简单背景，大多像静态插画，不要电影感，不要 Pixar，不要动漫，不要写实，不要高端动态图形。
- Motion rule: limited movement only, slight blinking, small arm gestures, slow push-in or tiny pan, storyboard pacing, mostly static frames.
- Negative style lock: no cinematic composition, no Pixar, no anime, no realistic detail, no smooth animation, no polished high-end graphic design.

## 001. Script Sentence
Level 1.

### Image Prompt — English
Subject: the same young male finance character, messy brown hair, large simple eyes, white shirt, loose red tie, navy blue suit jacket, slim body, stressed and slightly anxious expression, sitting at the same messy desk while a big crude paper sign reading LEVEL 1 hangs above the laptop. Expression and emotion: anxious but ready to begin the next stage. Environment: simple low-detail finance story setting, deep blue apartment or matching simple story location, scattered unpaid bills, calculator, instant ramen, laptop or phone props whenever relevant. Composition: wide front shot, character small in the center, oversized LEVEL sign at the top, desk clutter in the lower third, flat simple layers. Art Style: intentionally simple, low-detail rough YouTube finance explainer animation, cheap but good-looking dynamic thumbnail style, thick black outlines, flat colors, minimal shadows, awkward exaggerated facial expression, simple background, mostly static illustration, not cinematic, not Pixar, not anime, not realistic, no glossy high-end motion graphics.

### 图片生成 Prompt — 中文
主体：同一个年轻男性财经角色：凌乱的棕色头发、大而简单的眼睛、白衬衫、松散红色领带、海军蓝西装外套、瘦削身材、略显压力和焦虑的表情，坐在同一个凌乱书桌前，笔记本上方挂着一张粗糙纸牌，写着 LEVEL 1。表情与情绪：焦虑但准备进入下一阶段。环境：简单低细节的财经故事场景，深蓝色公寓或同风格的简单叙事地点，按画面需要出现未付账单、计算器、泡面、笔记本电脑或手机。构图：正面远景，主角在中间偏小，LEVEL 标牌占上方，桌面杂物在下三分之一，扁平简单层次。艺术风格：刻意简单、低细节、粗糙的 YouTube 财经解释类动画风格，好看的便宜感，动态缩略图风格，粗黑描边，扁平颜色，最少阴影，夸张但笨拙的表情，简单背景，大多像静态插画，不要电影感，不要 Pixar，不要动漫，不要写实，不要高端动态图形。

### Video Prompt — English
Continue from the previous shot with the same character design and the same rough low-detail YouTube finance explainer style. The character sitting at the same messy desk while a big crude paper sign reading LEVEL 1 hangs above the laptop; use only limited puppet-like motion: slight blink, tiny head tilt, small hand movement, or one simple icon movement. Camera movement: slow subtle push-in or tiny horizontal pan, no smooth cinematic animation. Emotion shifts toward anxious but ready to begin the next stage while keeping the scene mostly static and consistent with the previous frame.

---

## 002. Script Sentence
You have $500.

### Image Prompt — English
Subject: the same young male finance character, messy brown hair, large simple eyes, white shirt, loose red tie, navy blue suit jacket, slim body, stressed and slightly anxious expression, pointing at a laptop screen showing a tiny bank balance of $500, unpaid bills crowding the desk. Expression and emotion: worried but alert. Environment: simple low-detail finance story setting, deep blue apartment or matching simple story location, scattered unpaid bills, calculator, instant ramen, laptop or phone props whenever relevant. Composition: close medium shot from the front, $500 screen large in foreground, character behind it with hunched shoulders. Art Style: intentionally simple, low-detail rough YouTube finance explainer animation, cheap but good-looking dynamic thumbnail style, thick black outlines, flat colors, minimal shadows, awkward exaggerated facial expression, simple background, mostly static illustration, not cinematic, not Pixar, not anime, not realistic, no glossy high-end motion graphics.

### 图片生成 Prompt — 中文
主体：同一个年轻男性财经角色：凌乱的棕色头发、大而简单的眼睛、白衬衫、松散红色领带、海军蓝西装外套、瘦削身材、略显压力和焦虑的表情，指着笔记本屏幕上小小的 $500 银行余额，桌面被未付账单挤满。表情与情绪：担心但清醒。环境：简单低细节的财经故事场景，深蓝色公寓或同风格的简单叙事地点，按画面需要出现未付账单、计算器、泡面、笔记本电脑或手机。构图：正面近中景，$500 屏幕在前景放大，主角弓着肩坐在后方。艺术风格：刻意简单、低细节、粗糙的 YouTube 财经解释类动画风格，好看的便宜感，动态缩略图风格，粗黑描边，扁平颜色，最少阴影，夸张但笨拙的表情，简单背景，大多像静态插画，不要电影感，不要 Pixar，不要动漫，不要写实，不要高端动态图形。

### Video Prompt — English
Continue from the previous shot with the same character design and the same rough low-detail YouTube finance explainer style. The character pointing at a laptop screen showing a tiny bank balance of $500, unpaid bills crowding the desk; use only limited puppet-like motion: slight blink, tiny head tilt, small hand movement, or one simple icon movement. Camera movement: slow subtle push-in or tiny horizontal pan, no smooth cinematic animation. Emotion shifts toward worried but alert while keeping the scene mostly static and consistent with the previous frame.

---

## 003. Script Sentence
It's sitting in a checking account that pays you nothing.

### Image Prompt — English
Subject: the same young male finance character, messy brown hair, large simple eyes, white shirt, loose red tie, navy blue suit jacket, slim body, stressed and slightly anxious expression, looking at a dull checking account page that shows zero interest, with a gray empty progress bar. Expression and emotion: bored and defeated. Environment: simple low-detail finance story setting, deep blue apartment or matching simple story location, scattered unpaid bills, calculator, instant ramen, laptop or phone props whenever relevant. Composition: over-the-shoulder shot, laptop screen dominates, character head and messy hair visible from behind. Art Style: intentionally simple, low-detail rough YouTube finance explainer animation, cheap but good-looking dynamic thumbnail style, thick black outlines, flat colors, minimal shadows, awkward exaggerated facial expression, simple background, mostly static illustration, not cinematic, not Pixar, not anime, not realistic, no glossy high-end motion graphics.

### 图片生成 Prompt — 中文
主体：同一个年轻男性财经角色：凌乱的棕色头发、大而简单的眼睛、白衬衫、松散红色领带、海军蓝西装外套、瘦削身材、略显压力和焦虑的表情，看着一个毫无利息的支票账户页面，旁边有灰色空进度条。表情与情绪：无聊又泄气。环境：简单低细节的财经故事场景，深蓝色公寓或同风格的简单叙事地点，按画面需要出现未付账单、计算器、泡面、笔记本电脑或手机。构图：越肩镜头，笔记本屏幕占主要画面，后方露出主角头发和肩膀。艺术风格：刻意简单、低细节、粗糙的 YouTube 财经解释类动画风格，好看的便宜感，动态缩略图风格，粗黑描边，扁平颜色，最少阴影，夸张但笨拙的表情，简单背景，大多像静态插画，不要电影感，不要 Pixar，不要动漫，不要写实，不要高端动态图形。

### Video Prompt — English
Continue from the previous shot with the same character design and the same rough low-detail YouTube finance explainer style. The character looking at a dull checking account page that shows zero interest, with a gray empty progress bar; use only limited puppet-like motion: slight blink, tiny head tilt, small hand movement, or one simple icon movement. Camera movement: slow subtle push-in or tiny horizontal pan, no smooth cinematic animation. Emotion shifts toward bored and defeated while keeping the scene mostly static and consistent with the previous frame. YAML |1+1

code 7192562118578470940 author *0|42+4jz*0+2l 1. 你在每个财富阶段的人生
你在每个净资产阶段的人生：从欠债 $5,000 到拥有 $1,000,000
Your Life at Every Net Worth Level: From -$5,000 to $1,000,000
你在每个存款阶段的人生：$0、$10,000、$100,000、$1,000,000
Your Life at Every Savings Level: $0, $10K, $100K, $1M
你在每个收入阶段的人生：从最低工资到年薪 $500,000
Your Life at Every Income Level: From Minimum Wage to $500K a Year
每个投资者等级的人生：从第一次买入到靠资产生活
Every Level of Investor: From First Buy to Living Off Assets
你在每个负债阶段的人生：从信用卡账单到财务崩盘
Your Life at Every Debt Level: From Credit Card Bills to Financial Collapse
每个房地产投资者等级：从租房打工人到拥有 20 套房
Every Level of Real Estate Investor: From Renter to 20 Properties
你在每个现金流阶段的人生：从月底清零到钱自动进来
Your Life at Every Cash Flow Level: From Broke Every Month to Money Coming In
每个财务自由等级：从不敢请假到永远不用上班
Every Level of Financial Freedom: From Afraid to Take a Day Off to Never Working Again
你在每个职业阶层的人生：从实习生到不用看老板脸色
Your Life at Every Career Level: From Intern to Answering to No One
你在每个财富关卡的人生：从生存、稳定、中产到真正自由
Your Life at Every Wealth Stage: Survival, Stability, Middle Class, Freedom
2. 如果你……你的人生会怎样
如果你 20 多岁拼命存钱，而朋友都在享受人生
Your Life If You Save Hard in Your 20s While Everyone Else Enjoys Life
如果你 25 岁买房，而不是把钱投进资产
Your Life If You Buy a House at 25 Instead of Building Assets
如果你 30 岁才开始投资，你的人生会怎样
Your Life If You Don’t Start Investing Until 30
如果你一直听父母的金钱建议，到 40 岁会怎样
Your Life If You Follow Your Parents’ Money Advice Until 40
如果你用 10 年追求面子，而不是现金流
Your Life If You Spend 10 Years Chasing Status Instead of Cash Flow
如果你年薪翻倍后，也把生活成本翻倍
Your Life If Your Income Doubles and Your Lifestyle Doubles Too
如果你 22 岁开始买资产，而不是买奢侈品
Your Life If You Buy Assets at 22 Instead of Luxury
如果你选择稳定工作，而朋友选择高风险机会
Your Life If You Choose Stability While Your Friend Takes Big Risks
如果你贷款买豪车，而不是买下第一笔资产
Your Life If You Finance a Dream Car Instead of Your First Asset
如果你 10 年都只存钱，从来不理解通胀
Your Life If You Save for 10 Years and Never Understand Inflation
3. POV：你……
POV：你 30 岁了，账户里只有 $800
POV: You’re 30 Years Old With Only $800 in Your Account
POV：你 25 岁买了梦寐以求的车，30 岁开始后悔
POV: You Buy Your Dream Car at 25 and Regret It at 30
POV：你成了家族第一个赚到 $1,000,000 的人
POV: You Become the First Person in Your Family to Make $1,000,000
POV：你年薪 $200,000，却不敢辞职一天
POV: You Make $200K a Year and Still Can’t Quit for One Day
POV：你发现自己不是中产，只是账单比较高级
POV: You Realize You’re Not Middle Class, Just Living With More Expensive Bills
POV：你终于明白，银行一直在用你的收入困住你
POV: You Finally Realize the Bank Has Been Using Your Income to Trap You
POV：你以为存款在保护你，结果它正在让你变穷
POV: You Think Your Savings Are Protecting You, But They’re Making You Poorer
POV：你被信用卡困住 7 年，才发现问题不是消费
POV: You’re Trapped by Credit Cards for 7 Years Before Realizing Spending Wasn’t the Real Problem
POV：你第一次进入富人圈，才发现他们从不聊省钱
POV: You Enter a Rich Circle for the First Time and Realize They Never Talk About Saving Money
POV：你 35 岁看起来成功，其实每个月都在崩溃边缘
POV: You Look Successful at 35 But Live One Month Away From Collapse
4. 你……然后……
你继承 $1,000,000，然后 3 年后重新变穷
You Inherit $1,000,000 and Become Broke Again in 3 Years
你年薪 $250,000，然后发现自己比以前更不自由
You Make $250K a Year and Realize You’re Less Free Than Before
你 28 岁赚到第一桶金，然后失去了所有朋友
You Make Your First Fortune at 28 and Lose All Your Friends
你买下梦想大房子，然后被账单慢慢拖垮
You Buy Your Dream House and Slowly Get Crushed by the Bills
你创业成功，然后每天都比打工时更焦虑
You Build a Successful Business and Become More Anxious Than When You Had a Job
你提前退休，然后发现自己犯了一个昂贵错误
You Retire Early and Realize You Made an Expensive Mistake
你收入翻倍，然后现金流反而变差
You Double Your Income and Somehow Have Worse Cash Flow
你 19 岁退学，然后 29 岁身家 $3,000,000
You Drop Out at 19 and Become Worth $3,000,000 by 29
你以为自己变富了，然后发现只是负债变大了
You Think You Got Rich and Realize Your Debt Just Got Bigger
你搬进富人区，然后发现自己买的是压力
You Move Into a Rich Neighborhood and Realize You Bought Pressure
5. 每个阶段的……
每个财富阶段的人，周日都在做什么
What Every Wealth Level Does on Sunday
每个收入等级的人，钱都流向哪里
Where Money Goes at Every Income Level
每个投资阶段的人，怎样做同一个决定
How Every Investor Level Makes the Same Decision
每个职场阶层的人，怎样被系统控制
How Every Corporate Level Gets Controlled by the System
每个房产投资阶段：从怕贷款到靠租金生活
Every Real Estate Stage: From Fearing Debt to Living on Rent
每个债务阶段：从最低还款到人生失控
Every Debt Stage: From Minimum Payments to Losing Control
每个财务自由阶段：从请假焦虑到时间属于自己
Every Financial Freedom Stage: From Vacation Anxiety to Owning Your Time
每个富人阶层的隐藏规则：新钱、老钱、家族钱
Every Hidden Rule of Wealth: New Money, Old Money, Family Money
每个现金流等级的人生差别
Every Cash Flow Level Explained by Your Daily Life
每个中产阶段：从安全感到被房贷困住
Every Middle-Class Stage: From Feeling Safe to Being Trapped by a Mortgage
6. 隐藏金钱规则 / 系统真相
银行不会告诉你的收入陷阱
The Income Trap Banks Won’t Tell You About
高薪不是自由，是更贵的牢笼
High Income Isn’t Freedom. It’s a More Expensive Cage
中产最容易被困住
The Middle Class Gets Trapped the Easiest
你以为是资产，其实是负担
You Think It’s an Asset. It’s Actually a Burden
真正让你变穷的不是低收入
Low Income Isn’t What Really Keeps You Poor
储蓄账户正在偷走你的未来
Your Savings Account Is Stealing Your Future
信用评分不是奖励，是控制系统
Your Credit Score Isn’t a Reward. It’s a Control System
公司阶梯不是上升，是交换
The Corporate Ladder Isn’t Progress. It’s a Trade
消费贷款让你看起来更富，实际上更穷
Consumer Debt Makes You Look Richer and Live Poorer
钱的数学很残酷
The Math of Money Is Brutal
7. 家庭财富 / 阶层跃迁
POV：你成为家族第一个真正有钱的人
POV: You Become the First Truly Wealthy Person in Your Family
POV：你是家里最后一个穷人
POV: You’re the Last Poor Person in Your Family
每个代际财富阶段：从月光家庭到家族资产
Every Level of Generational Wealth: From Paycheck Family to Family Assets
你继承了父母的金钱恐惧，然后用了 10 年摆脱它
You Inherit Your Parents’ Money Fear and Spend 10 Years Escaping It
你发现家族贫穷不是偶然，而是一套系统
You Realize Family Poverty Wasn’t Random. It Was a System
你用 10 年改变家族命运，但没人理解你
You Spend 10 Years Changing Your Family’s Future and No One Understands You
你进入富人圈后，才发现他们从小被教了另一套规则
You Enter a Rich Circle and Realize They Were Taught Different Rules From Childhood
你发现父母给你的安全建议，正在毁掉你的财富
You Realize Your Parents’ Safe Advice Is Destroying Your Wealth
你从普通家庭走出来，却不知道怎么和有钱人相处
You Come From an Ordinary Family and Don’t Know How to Act Around Wealthy People
你想让下一代变富，第一步却是背叛上一代的观念
You Want the Next Generation to Be Rich, But First You Must Break the Last Generation’s Rules SQL |1+3 选题

bullet 7192562118578470940 author link-id 89fdd7d3-5bd6-47ee-b088-9feb33e15aaa *0+z*0*1+17*0+g Google AI Studio（Text-to-Speech）  https://aistudio.google.com/generate-speech   --免费，但是有时间限制。

ordered 7192562118578470940 author *0+t 用原来的结构节奏，写出一个全新的标题——赚取 RPM 套利 auto

callout 7192562118578470940 doxcnlEsi08Uw5a0aNpQeJVropd doxcn6HDmz9NULU5NLkRaInV2Bd rgb(255,245,235) rgb(254,212,164) left pushpin 1f4cd

heading2 7192562118578470940 author *0+v 我们按照拆解对标 -> 选题 -> 脚本制作 -> 视觉制作

bullet 7192562118578470940 author *0+v ElevenLabs  --每个月一个邮箱给1万字符免费额度

heading2 7192562118578470940 author *0+2 配音 auto

code 7192562118578470940 author *0|k+fs*0+e 你是一位擅长拆解爆款长视频的内容分析师，同时具备成熟的脚本创作经验，尤其精通口播型内容的结构设计与留存机制。你能够从内容中快速提炼出“为什么会爆”的核心逻辑，并转化为可复用的方法。我会提供一个 YouTube 长视频，请你在完整理解后，用一段话做出深入但清晰的分析，不要复述内容，而是拆解背后的机制。

重点分析：
 这个视频的选题为什么成立，它切中了观众什么情绪、欲望或认知需求；
 前 30 秒是如何建立吸引力的，例如是否通过结果前置、冲突、提问或信息缺口来抓住注意力；
 整支视频的文案结构如何层层推进，是否存在节奏变化、重复强化、转折或关键爆点；
 画面与剪辑是否在关键节点辅助理解或增强情绪。
 
同时，你需要从频道层面进行归纳：
 这个频道的爆款选题方向是什么；
 它的目标受众是谁，他们真正想获得什么；
 长期反复出现的内容主题有哪些（3–6 个）；
 常见的开头钩子模式有哪些（总结 7 种并用自己的话举例）；
 视频的典型结构流程是什么；
 留存机制是什么；
 语气与写作规则是什么；
 标题与封面的常见模式是什么；
 CTA 通常放在什么位置，怎么表达。
 
最后，请结合参考视频，给出可执行的内容模仿建议，方向围绕【你的赛道】，并自然总结出最值得复用的几个关键点，让人看完后能直接知道下一支视频该如何设计与落地。
分析视频链接：【在这里粘贴】 Plain Text |1+e 对标视频拆解 Prompt

code 7192562118578470940 author *0|3+1m*0+h 我的字数有点少，帮我添加 500 字左右。
 不要新的故事，不要说教。
 主要增加一些描述，让整体内容更丰满一些。
 如果有新增内容，请帮我标记出来。 Plain Text |1+b 补字数 Prompt

grid 7192562118578470940 doxcn1RLHThUEMWlGsDdf0dcxze doxcnLfFjmlHakUAT53PKoIdiSg

bullet 7192562118578470940 author *0+a 是否有轻改写风险

heading3 7192562118578470940

bullet 7192562118578470940 author *0+h 1200 字左右，约 9 分钟

bullet 7192562118578470940 author *0+a 是否表达过于通用

heading3 7192562118578470940 author *0+8 第一步：先定风格

bullet 7192562118578470940 author *0+h 哪些地方可以再改得更有个人风格

bullet 7192562118578470940 author *0+a 是否太像常见模板

grid 7192562118578470940 doxcnemhgCpVi1QK4SGPrtZpHce doxcnI0k1Pwr2xQdweB3XmdnkKh

heading3 7192562118578470940 author *0+4 视频生成

bullet 7192562118578470940 author *0+o 1900 字左右，约 14 分钟（1 倍速）

heading2 7192562118578470940 author *0+8 这个打法（4步）

ordered 7192562118578470940 author *0+w 选择一个你已经理解的高 CPM 主题，比如财富、金融、科技、商业 auto

heading3 7192562118578470940 author *0+b 第二步：定一个主角IP

ordered 7192562118578470940 author *0+u 提取它的结构节奏，比如阶层晋升、坠落崩盘，或者 POV 视角 auto

heading2 7192562118578470940 author *0+4 脚本制作 auto

code 7192562118578470940 author bold true *0|6+71*0*1+7*0|2+2*0*1+3*0|6+2r*0*1+5*0|4+u*0*1+a*0|4+29*0*1+5*0|3+k*0+e 我们正在为一个无露脸叙事类 YouTube 频道生成高度独特、非泛滥化的视频选题，频道内容基于xxx格式，例如：xxx。

目标是创造新鲜、以好奇心驱动或神秘感的选题，这些选题需要具备强病毒传播潜力，并且不能是 YouTube 上已经高度饱和的内容。
你是一位病毒内容策略专家，深度擅长 YouTube 增长、故事叙事心理学和细分赛道研究。你专门寻找尚未被充分开发的创意，这些创意需要感觉原创、有吸引力、令人好奇，并且非常适合点击。
请根据不同格式风格，将视频选题分成清晰独立的板块。
需要包含以下板块：
xxxxx。 

规则：
选题不能是 YouTube 上已经被大量使用或过度泛滥的常见题材
避免基础化选题，除非有非常独特的切入角度
每个选题都必须感觉新鲜、具体，并且能强烈激发好奇心
标题要简短，并且具有高点击吸引力

输出格式：
清晰标注每一个板块
每个板块下面使用编号列表
不需要解释
未来使用的重要指令：
如果用户说类似：
“Give more topics in [section name]”
那么只针对该指定板块生成 10 个全新的选题，不要重复之前的创意。
目标观众：
年龄xxx 岁
对xxx 内容感兴趣
目标是最大化点击率和观看时长 Plain Text |1+d 选题万能公式prompt

code 7192562118578470940 author textHighlightBackground rgb(247,105,100) *0|5+6p*0*1+8 请对整篇脚本进行一次原创性与平台合规性检查。
假设该内容将用于 YouTube 商业化，请评估其是否具备充分的原创性，并指出是否存在与常见内容结构或表达过于相似的部分。
如果有潜在的重复风险、表达过于通用、或可能影响变现审核的地方，请明确标出具体段落并给出修改建议。
同时，检查是否存在容易被判定为模板化、低原创度或轻度改写的问题，并提供更自然、更具个人表达风格的优化方向。
目标是确保这篇脚本在结构、表达和信息呈现上都具备独立性与辨识度，从而更安全地用于 YouTube 变现。
【这里添加脚本】 Plain Text |1+b 第三稿 Prompt

code 7192562118578470940 author *0|5c+32c*0+n 我们正在为一个无露脸财经叙事类 YouTube 频道生成高度独特、非泛滥化的视频选题。
频道风格参考以下类型：
“Your Life at Every Level of Net Worth — $0 to $100 Million”
“Your Life If You Spend Your 20s Building Wealth vs Spending It”
“POV: You Buy Your Dream Car at 25 and Regret It at 30”
“POV: You’re the First Millionaire in Your Family’s History”
“Every Level of a Real Estate Investor — $0 to Empire”
“You Inherit $1 Million and Go Broke in 3 Years”
“You Make $250,000 a Year and Still Feel Broke”
“Your Life If You Never Invest in Your 20s”
“Every Level of Investor — First $100 to First $1,000,000”
请注意：只能模仿这些标题的结构、情绪、选题逻辑和点击感，不能复制原题。
这个频道不是普通理财教学频道。
不是股票推荐频道。
不是单纯讲投资知识的频道。
不是“如何变富”的教程频道。
它是一个把金融、财富、阶层、消费、职业和人生选择包装成“沉浸式人生故事”的财经叙事频道。
选题要让观众感觉：
这可能就是我的人生
我如果选错路，未来会很惨
原来钱背后有一套隐藏规则
财富不是数字，而是人生轨迹
穷、富、中产、负债、自由，其实是不同的人生关卡
一个财务选择可能改变未来 10 年
你是一位 YouTube 病毒内容策略专家，深度擅长财经叙事、无露脸频道增长、标题心理学、财富焦虑、阶层跃迁和高 RPM 选题设计。
你的任务是生成适合中文财经频道的高点击选题。
选题必须具备以下特征：
有人生代入感
有财富等级感
有后悔感或危机感
有强烈对比
有时间跨度，比如 20岁、30岁、40岁、10年后
有阶层变化，比如从 $0 到 $100万、从打工人到投资者、从中产到破产
有画面感，适合做成无露脸动画解释视频
标题要短、有冲击力、容易理解、适合 YouTube
请根据以下格式生成选题：
1. 你在每个财富阶段的人生
生成 10 个选题。
重点模仿：
“Your Life at Every Level of Net Worth”
“Every Level of Investor”
“Every Level of Real Estate Investor”
选题方向：
净资产等级
收入等级
存款等级
负债等级
投资者等级
房地产投资等级
职业阶层等级
财务自由等级
从 $0 到 $100万
从普通人到富人
标题要体现从低到高、从穷到富、从压力到自由、从新手到高手的变化。
2. 如果你……你的人生会怎样
生成 10 个选题。
重点模仿：
“Your Life If You Spend Your 20s Building Wealth vs Spending It”
“Your Life If You Follow Old Money Rules”
“Your Life If You Buy a House in Your 20s vs Invest That Money Instead”
“Your Life If You Never Invest in Your 20s”
选题方向：
20多岁选择积累财富 vs 及时享乐
买房 vs 投资
高薪消费 vs 普通收入储蓄
听父母建议 vs 走自己的财务路线
追求面子 vs 追求现金流
早投资 vs 晚投资
过度消费 vs 极简主义
稳定工作 vs 高风险职业
贷款买豪车 vs 用钱买资产
标题要有明显的命运分叉感。
3. POV：你……
生成 10 个选题。
重点模仿：
“POV: You Buy Your Dream Car at 25 and Regret It at 30”
“POV: You’re the First Millionaire in Your Family’s History”
“POV: You’re 35 Years Old With $0 in Savings”
“POV: You Find Out Your Savings Account Is Making You Poorer”
选题方向：
你30岁发现自己没有存款
你买了梦寐以求的车，但后悔了
你成为家族第一个有钱人
你发现银行在利用你
你赚很多钱但依然很穷
你被债务困住
你以为自己是中产，其实很脆弱
你发现储蓄账户正在让你变穷
你终于理解富人为什么不炫富
标题要有第一人称代入感、压力感和故事开场感。
4. 你……然后……
生成 10 个选题。
重点模仿：
“You Inherit $1 Million and Go Broke in 3 Years”
“You Make $250,000 a Year and Still Feel Broke”
“You Drop Out of College at 19 and Are Worth $3 Million at 28”
选题方向：
你突然继承一大笔钱，然后失去它
你年薪很高，但依然没钱
你很年轻就赚到第一桶金
你看起来成功，其实现金流崩了
你买了大房子，然后被账单拖垮
你创业成功，但生活更焦虑
你提前退休，但发现自己犯了一个错误
你收入翻倍，但自由变少了
你以为自己变富了，其实只是负债变大了
标题要有强烈反差：看似成功，结果危险；看似失败，结果逆袭。
5. 每个阶段的……
生成 10 个选题。
重点模仿：
“Every Level of Wealth Explained by How You Spend Your Sunday”
“Every Level of Tax Free Wealth”
“Every Level of the Corporate Ladder — Intern to Chairman”
选题方向：
每个财富阶段的人怎么花周末
每个收入等级的人怎么花钱
每个投资阶段的人怎么做决定
每个职场阶层的人怎么被系统控制
每个房产投资者阶段
每个债务阶段
每个财务自由阶段
每个富人阶层的隐藏规则
每个现金流等级的人生差别
标题要有“等级系统”和“人生关卡”的感觉。
6. 隐藏金钱规则 / 系统真相
生成 10 个选题。
重点模仿：
“They Can’t Tell”
“The System”
“You Find Out Banks Have Been Using Your Income Against You”
“The Math Hurts”
“The Real Cost”
“Still Broke?”
选题方向：
银行不会告诉你的规则
税务系统如何奖励富人
高薪为什么不等于自由
消费贷款如何让你留在原地
储蓄为什么可能让你越来越穷
信用评分如何控制你的选择
中产为什么最容易被困住
公司阶梯为什么像一个系统
你以为是资产，其实是负担
真正让人变穷的不是低收入，而是错误结构
标题要短、有压迫感、有秘密感，适合封面大字。
7. 家庭财富 / 阶层跃迁
生成 10 个选题。
重点模仿：
“POV: You’re the First Millionaire in Your Family’s History”
“POV: You’re the Last Poor Generation in Your Family”
“Every Level of Generational Wealth — From Broke to Dynasty”
“Your Life If You Followed Your Parent’s Advice”
选题方向：
你成为家族第一个富人
你打破贫穷循环
你继承了父母的财务观念
你发现家族贫穷不是偶然
你试图让下一代变富
你从普通家庭进入富人圈
你学会富人家庭不会明说的规则
你发现父母的建议已经过时
你用10年改变家族命运
标题要有家族、阶层、代际差距和命运改变的感觉。

规则：
所有标题必须用中英文输出
不要中英混杂，除非保留 POV 这种固定格式
不要生成普通教程型标题，比如“如何理财”“如何投资”“如何省钱”
不要推荐具体股票、基金、币或金融产品
不要写成新闻标题
不要写成知识科普标题
标题必须像一个人的人生故事，而不是一篇理财文章
每个标题都要有强点击感、强画面感、强代入感
每个标题都要适合做成 12–25 分钟的无露脸动画财经视频
尽量使用数字、年龄、金额、时间跨度、阶层变化、后悔感和命运分叉
避免泛泛而谈，要具体到一个人生处境
输出格式：
清晰标注每个板块
每个板块下面使用编号列表
每个板块生成 10 个中文英文对照的标题
不需要解释
不需要分析
不需要英文翻译
未来使用的重要指令：
如果用户说：
“继续给我【某个板块】的选题”
那么只针对该指定板块生成 10 个全新的中文选题，不要重复之前的创意。
目标观众：
年龄 18–40 岁
对财富、阶层、金钱焦虑、投资心理、职业选择、房地产、家庭财富和财务自由感兴趣
喜欢沉浸式人生故事，而不是枯燥理财课
容易被后悔、对比、隐藏规则、阶层跃迁、命运分叉和金钱真相吸引
目标是最大化点击率、观看留存、RPM 和复看率 SQL |1+g 财经人生故事 选题prompt

bullet 7192562118578470940 author *0+u 1900 字左右，约 12 分 50 秒（1.1 倍速）

bullet 7192562118578470940 author *0+d 是否有可能影响变现审核

grid 7192562118578470940 doxcnBtZPgMTfcm83YQKA9qk8Fg doxcnhoITihsRC2uvOePfIolUSe

code 7192562118578470940 author textHighlightBackground rgb(247,105,100) *0+1w*0*1+f*0|5+5n*0*1+8*0|y+id 我们正在为一个无露脸叙事类 YouTube 视频创作一篇高吸引力脚本，采用类似爆款 POV 视频的“等级递进”结构。爆款结构参考如下： 【填写第一步拆解爆款时的结果】
脚本必须具有电影感、沉浸感和强烈张力，让观众感觉自己正在亲身经历一个危险或隐藏世界中的每一个阶段。
你是一位顶级 YouTube 脚本作者和故事叙事专家，专门创作高留存、病毒传播型内容。你擅长使用第二人称叙事风格，也就是用“你”来讲述故事，并使用短促、有力、具有电影感的句子。
你理解如何在多个等级之间构建紧张感、成长感和情绪投入。
请根据以下主题，写一篇完整的 12-18分钟 YouTube 脚本：
【填写视频选题】
脚本风格要求：
使用“Level 1、Level 2、Level 3……”的等级递进结构
每一个 Level 都代表成长、风险、权力，或更深层次的卷入
直接从 Level 1 开始，不要写很长的开场白
使用第二人称视角，也就是“你”
使用简短、有冲击力的句子，避免长段落
保持严肃、沉浸式的语气
它是一个把金融、财富、阶层、消费、职业和人生选择包装成“沉浸式人生故事”的财经叙事频道。
每一个 Level 的风险和代价都要逐渐升高
包含金钱、风险、后果和情绪变化
加入一些真实的小细节，让故事更有现实感，比如地点、任务、场景
结尾要用一个强有力的最终 Level，展现后果、崩塌，或反转
结构流程：
Level 1：入口阶段，低风险，简单任务
Level 2–4：成长阶段，卷入更深
Level 5–7：权力、金钱、控制感增强，但危险也在上升
最后几个 Level：后果、疑神疑鬼、崩塌，或循环继续
写作风格：
有电影感，直接有力
不要废话，不要不必要的解释
每一句都要推动故事向前
每一个 Level 都要保持观众的好奇心
输出格式：
只输出纯脚本
清晰标注每一个 Level，比如 Level 1、Level 2 等
不要使用项目符号
不要在脚本外写解释
目标观众：
年龄 18–40 岁
对财富、阶层、金钱焦虑、投资心理、职业选择、房地产、家庭财富和财务自由感兴趣
喜欢沉浸式人生故事，而不是枯燥理财课
容易被后悔、对比、隐藏规则、阶层跃迁、命运分叉和金钱真相吸引
目标是最大化点击率、观看留存、RPM 和复看率 Plain Text |1+1

bullet 7192562118578470940 author *0+4 气质

bullet 7192562118578470940 author *0+8 脸型 （方脸）