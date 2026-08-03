"""
YouTube “财经人生故事” 自动化工作流 Agent 引擎
原飞书文档：https://gi52wyhtwc.feishu.cn/wiki/Otrhwi9hSi6ekEkoRvrcNSd5nAh
用途：供大帅与 Agent 以后随时一键调用，自动套用全套 Prompt 引擎
"""

import json

PROMPT_TTS_ANALYSIS = """你是一名专业的音频风格分析师，擅长分析 YouTube 视频中的配音特征。
我会给你一个视频，请你从“声音”的角度做拆解，不需要分析内容，只分析配音本身。
请你输出以下内容：
1. 配音类型（真人 / AI / 合成感强弱判断） 
2. 声音性别与大致年龄感（例如：中年男性 / 年轻女性等） 
3. 语气特征（平静 / 克制 / 情绪化 / 叙事感 / 教学感等） 
4. 语速（慢 / 中 / 快，是否有明显停顿或节奏控制） 
5. 情绪曲线（是否有起伏，还是整体平稳） 
6. 声音质感（温暖 / 冷静 / 压低 / 轻快 / 带磁性等） 
然后，请基于以上分析，给出：
- 如果使用 ElevenLabs，推荐的音色类型或接近的 voice 风格
- 如果使用 Google AI Studio TTS，推荐的 voice 类型或参数方向
要求：不要泛泛而谈，要具体、可执行；尽量贴近“实际可选的音色”，而不是抽象描述。
"""

PROMPT_STYLE_DECONSTRUCTION = """你是一位 AI 视觉风格分析师。
我会给你一张参考图片，请你不要分析剧情，只分析它的画风。
请帮我拆出这张图的：
1. 整体风格类型（写实 / 电影感 / Pixar / 插画风等） 
2. 色彩特点（冷暖、饱和度、明暗关系） 
3. 光影特点（柔光 / 暗调 / 逆光 / 高对比等） 
4. 构图特点（近景 / 中景 / 远景，镜头视角，主体位置） 
5. 人物与场景的质感特点 
6. 这张图最关键的 5 个风格关键词 
最后，请基于以上分析，输出：
- 一段可直接用于 AI 生图的英文风格 Prompt 
- 一段对应的中文版本 
要求：只聚焦“画风”，不要展开讲故事，不要写太泛。
"""

PROMPT_SCRIPT_TO_VISUAL = """你是一位经验丰富的 AI 视觉分析与生成专家，擅长将脚本内容转化为统一风格的视觉画面，并确保角色、风格和叙事的一致性。
我会提供一段视频脚本，以及一个主角角色设定。
你的任务是：基于脚本内容，为每一句生成对应的视觉画面提示词（图片 + 视频），并保持整体风格统一、角色一致。

重要风格规则：
- 刻意简单
- 刻意低细节
- 不要精致 / 不要电影感 / 不要流畅动画 / 不要皮克斯风格 / 不要动漫风格
"""

def generate_full_youtube_workflow(topic: str, main_character: str):
    """
    根据传入的选题与主角名，生成全套 4 步制作流程与 Prompt 任务串
    """
    return {
        "topic": topic,
        "character": main_character,
        "step_1_benchmarking": f"寻找在 cartel / crime / dark stories / finance 赛道中播放量超 50 万的爆款选题 ({topic})",
        "step_2_script_prompts": PROMPT_SCRIPT_TO_VISUAL,
        "step_3_audio_prompt": PROMPT_TTS_ANALYSIS,
        "step_4_visual_prompt": PROMPT_STYLE_DECONSTRUCTION,
        "recommended_tools": {
            "automation_platform": "https://autojourney.ai/zh (优惠码: Lizi666)",
            "benchmark_channel": "https://www.youtube.com/@Willie_Finance/videos",
            "tts_engine": "ElevenLabs / Google AI Studio TTS",
            "image_gen": "Midjourney / FLUX.1 (设置低细节、大颗粒故事感)"
        }
    }

if __name__ == "__main__":
    demo = generate_full_youtube_workflow("硅谷高管贪腐隐秘内幕", "Arthur (40岁中年男主)")
    print("🚀 YouTube 财经人生故事工作流测试成功！已生成任务串：")
    print(json.dumps(demo, ensure_ascii=False, indent=2))
