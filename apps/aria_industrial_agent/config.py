"""
昆仑设备知识与智能运维 Agent (KGOS Industrial Agent) 本土化配置引擎
包含：模型路由、数据脱敏网关、知识库检索参数
"""

import os
from pydantic import BaseModel, Field

class LLMProviderConfig(BaseModel):
    """大模型提供商配置"""
    default_provider: str = Field(default="deepseek", description="默认大模型：deepseek | qwen | claude | zhipu")
    deepseek_api_key: str = Field(default_factory=lambda: os.getenv("DEEPSEEK_API_KEY", "sk-masked-deepseek-key"))
    deepseek_base_url: str = Field(default="https://api.deepseek.com/v1")
    
    qwen_api_key: str = Field(default_factory=lambda: os.getenv("DASHSCOPE_API_KEY", ""))
    claude_api_key: str = Field(default_factory=lambda: os.getenv("ANTHROPIC_API_KEY", ""))

class SecurityGateConfig(BaseModel):
    """敏感数据与脱敏网关配置"""
    enable_pii_masking: bool = Field(default=True, description="开启工厂财务与客户隐私脱敏")
    masked_keywords: list[str] = Field(default_factory=lambda: ["财务数据", "价格策略", "机密配方", "客户手机号"])

class IndustrialKGOSConfig(BaseModel):
    """系统总配置"""
    app_name: str = "昆仑设备知识与智能运维系统 (KGOS Industrial Agent)"
    version: str = "V1.0.0-Beta"
    llm: LLMProviderConfig = LLMProviderConfig()
    security: SecurityGateConfig = SecurityGateConfig()
    knowledge_base_dir: str = Field(default_factory=lambda: os.path.join(os.path.dirname(__file__), "chinese_knowledge_base"))

# 实例化全局单例配置
config = IndustrialKGOSConfig()

if __name__ == "__main__":
    print(f"✅ {config.app_name} 本土化配置加载成功！")
    print(f"当前大模型提供商: {config.llm.default_provider}")
    print(f"数据安全防护网关状态: {'已开启' if config.security.enable_pii_masking else '已关闭'}")
