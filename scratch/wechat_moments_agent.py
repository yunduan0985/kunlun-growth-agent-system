"""
AI 朋友圈与私域变现 (单月11万SOP) 自动化生成 Agent 引擎
来源飞书文档：https://my.feishu.cn/docx/Ldo2ddRvWoSRRyxTpSlcvfJ7nKb
用途：供大帅与 Agent 以后随时一键调用，自动按黄金时间段生成去 AI 味连载朋友圈
"""

import json

def generate_daily_moments_schedule(
    today_earnings: str, 
    key_accomplishment: str, 
    soft_product: str
):
    """
    根据《私域 11 个月变现 37 万 SOP》三段式时间模型生成朋友圈文案
    """
    return {
        "morning_07_09": {
            "time": "07:00 - 09:00",
            "type": "阳光自律 / 积极向上 / 绝不发广告",
            "content_draft": f"早！新的一天从 EFC 咖啡开始。今天重点推进【{key_accomplishment}】，保持专注，把每件小事做到极致！☕️"
        },
        "noon_11_14": {
            "time": "11:00 - 14:00",
            "type": "成长故事 + 产品软广植入",
            "content_draft": f"最近不少朋友问我【{soft_product}】怎么落地。其实 3 个月前我也被信息差卡过，直到真正把工作流交到跑通代码的朋友手里。顺便晒个小回执，真正有用，客户才会主动找上门。👇"
        },
        "night_21_24": {
            "time": "21:00 - 24:00",
            "type": "感性共鸣 + 今日收益 + 日复盘",
            "content_draft": f"【今日复盘】：今日变现 {today_earnings}，搞定了 {key_accomplishment}。\n反思：自媒体与 AI 真的不看年龄与背景，只看你是不是真凭实据地把结果做出来。坚持做对的事情，时间会给答案。晚安！🌙"
        },
        "core_rules": [
            "1. 昵称与头像：不用生僻英文名，AI 生成高辨识度专属形象；",
            "2. 故事连载化：把朋友圈当成个人创业连续剧来写，减少硬广排斥感；",
            "3. 频率：每天 5-8 条黄金触达，固定时间培养读者追圈习惯。"
        ]
    }

if __name__ == "__main__":
    demo = generate_daily_moments_schedule(
        today_earnings="38,000元", 
        key_accomplishment="上线大厂级 Bento 7大卡片 Live Demo", 
        soft_product="昆仑增长 Agent 数字大脑私有化部署"
    )
    print("🚀 AI 朋友圈私域变现排期引擎测试成功！生成的今日连载文案：")
    print(json.dumps(demo, ensure_ascii=False, indent=2))
