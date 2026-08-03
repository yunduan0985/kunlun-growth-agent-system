"""
昆仑设备知识与智能运维 Agent (KGOS Industrial Agent) - FastAPI 生产级接口服务
"""

import uvicorn
from fastapi import FastAPI, HTTPException
from starlette import status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any

from config import config
from agent_engine import IndustrialInvestigatorAgent, FaultDiagnosisRequest, WorkOrderGenerator

app = FastAPI(
    title=config.app_name,
    version=config.version,
    description="昆仑增长企业级工业设备知识库、智能诊断与自动工单 API 服务"
)

# 跨域中间件配置
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

agent = IndustrialInvestigatorAgent()

@app.get("/health")
def health_check():
    """健康检查接口"""
    return {
        "status": "healthy",
        "app": config.app_name,
        "version": config.version,
        "llm_provider": config.llm.default_provider,
        "pii_gate": "enabled" if config.security.enable_pii_masking else "disabled"
    }

@app.post("/api/v1/diagnose", status_code=status.HTTP_200_OK)
def diagnose_device(req: FaultDiagnosisRequest) -> Dict[str, Any]:
    """智能故障诊断接口"""
    try:
        diagnosis = agent.diagnose(req)
        return {
            "code": 200,
            "message": "诊断完成",
            "data": diagnosis
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"故障诊断失败: {str(e)}")

@app.post("/api/v1/work_order/create", status_code=status.HTTP_201_CREATED)
def create_work_order(req: FaultDiagnosisRequest) -> Dict[str, Any]:
    """一键生成结构化维修工单接口"""
    try:
        diagnosis = agent.diagnose(req)
        work_order = WorkOrderGenerator.create_order(diagnosis)
        return {
            "code": 201,
            "message": "工单创建成功",
            "data": work_order.model_dump()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"工单创建失败: {str(e)}")

if __name__ == "__main__":
    print(f"🚀 {config.app_name} 正在启动 RESTful API 服务...")
    print("服务地址: http://127.0.0.1:8088")
    print("API 文档: http://127.0.0.1:8088/docs")
    uvicorn.run(app, host="127.0.0.1", port=8088)
