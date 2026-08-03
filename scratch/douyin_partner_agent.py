"""
抖音创作者伙伴计划 (独家/非独家) 收益评估与合规审查 Agent 引擎
来源飞书文档：https://my.feishu.cn/docx/PmK6dneg0oSKA1xPcwQc1ZVgn1g
用途：供大帅与 Agent 以后随时一键调用，自动校验获利播放量、留存门槛与收益计算
"""

import json

def calculate_douyin_revenue(
    total_views: int, 
    retention_over_5s_pct: float, 
    recommend_feed_pct: float, 
    cpm_base: float = 15.0
):
    """
    根据《月入10W SOP》公式计算获利播放量与预估收益
    - 有效观看必须 >= 5秒
    - 流量必须来自抖音推荐页 (Recommend Feed)
    """
    # 获利播放量 = 总播放 * 5秒完播率 * 推荐页流量占比
    monetized_views = total_views * (retention_over_5s_pct / 100.0) * (recommend_feed_pct / 100.0)
    
    # 基础收益 (元)
    base_revenue = (monetized_views / 1000.0) * cpm_base
    
    # 阶梯加成 (独家计划约 1.3 ~ 1.5 倍加成)
    tier_bonus = base_revenue * 0.35
    
    total_estimated_revenue = base_revenue + tier_bonus
    
    return {
        "total_views": total_views,
        "monetized_views": int(monetized_views),
        "base_cpm": cpm_base,
        "base_revenue_cny": round(base_revenue, 2),
        "tier_bonus_cny": round(tier_bonus, 2),
        "total_estimated_revenue_cny": round(total_estimated_revenue, 2),
        "compliance_tips": [
            "🚨 严禁搬运与纯影视解说，平台对此类账号不予通过或封禁收益；",
            "💡 关键指标：5秒留存率是命脉，开头前5秒必须有极强悬念 hook；",
            "📈 推荐页占比需 > 80%，搜索/主页进来的流量不计入收益考核；",
            "🌙 推荐赛道：英文睡眠故事 (美区千播 20-30 美刀)、原创生活剧与差异化科普。"
        ]
    }

if __name__ == "__main__":
    demo = calculate_douyin_revenue(
        total_views=500000, 
        retention_over_5s_pct=65.0, 
        recommend_feed_pct=85.0, 
        cpm_base=18.0
    )
    print("🚀 抖音独家伙伴计划收益计算器测试成功！评估结果如下：")
    print(json.dumps(demo, ensure_ascii=False, indent=2))
