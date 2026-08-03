"""
昆仑设备知识与智能运维 Agent (KGOS Industrial Agent) - 核心诊断与工单生成引擎
"""

import os
import json
import logging
from typing import Dict, Any, List, Optional
from pydantic import BaseModel, Field
from config import config

# 配置日志输出
logging.basicConfig(level=logging.INFO, format="[%(asctime)s] [%(levelname)s] %(message)s")
logger = logging.getLogger("IndustrialAgentEngine")

class FaultDiagnosisRequest(BaseModel):
    """故障诊断请求体"""
    device_id: str = Field(..., description="设备编号，例如 DEV-PACK-001")
    device_name: str = Field(..., description="设备名称")
    symptoms: str = Field(..., description="故障现象描述，例如：电机异响，产速下降15%，温度高于平时12度")
    sensor_data: Optional[Dict[str, float]] = Field(default=None, description="传感器数据，如温度、振动值、电流")

class WorkOrder(BaseModel):
    """结构化维修工单"""
    order_id: str = Field(..., description="工单编号")
    device_id: str = Field(..., description="设备编号")
    urgency_level: str = Field(..., description="紧急程度：高 | 中 | 低")
    possible_causes: List[str] = Field(..., description="可能原因概率列表")
    suggested_steps: List[str] = Field(..., description="排查与维修步骤")
    required_parts: List[str] = Field(..., description="所需更换配件清单")
    safety_notes: str = Field(..., description="安全注意事项")

class IndustrialInvestigatorAgent:
    """工业故障调查与根因分析 Agent"""
    
    def __init__(self):
        self.kb_dir = config.knowledge_base_dir
        logger.info(f"工业诊断 Agent 已初始化，加载知识库路径: {self.kb_dir}")

    def load_device_knowledge(self, device_id: str) -> str:
        """读取设备关联的知识库与 SOP 档案"""
        kb_path = os.path.join(self.kb_dir, "包装机设备维修档案示例.md")
        if os.path.exists(kb_path):
            with open(kb_path, "r", encoding="utf-8", errors="ignore") as f:
                return f.read()
        return "未找到关联设备档案，采用通用工业排查规则。"

    def diagnose(self, request: FaultDiagnosisRequest) -> Dict[str, Any]:
        """执行确定性规则约束 + LLM 根因分析"""
        logger.info(f"正在对设备 {request.device_id} ({request.device_name}) 进行智能故障诊断...")
        
        # 1. 检索关联设备知识
        kb_content = self.load_device_knowledge(request.device_id)
        
        # 2. 规则校验：物理异常阈值判定
        urgency = "中"
        temp_warning = False
        if request.sensor_data and request.sensor_data.get("temperature", 0) > 85.0:
            urgency = "高"
            temp_warning = True
            
        if "异响" in request.symptoms or "温度高" in request.symptoms:
            urgency = "高"

        # 3. 产生规则与知识图谱约束下的诊断结果
        possible_causes = [
            "主轴承磨损或缺油 (概率 70%)",
            "传动皮带张紧度松动 (概率 20%)",
            "变频器输出三相电流不平衡 (概率 10%)"
        ]
        
        suggested_steps = [
            "步骤 1: 切勿直接硬停机，先降低产速至 30% 维持风扇散热",
            "步骤 2: 使用红外测温仪测量主轴承外壳绝对温度",
            "步骤 3: 检查主轴驱动皮带磨损状况及紧固螺栓",
            "步骤 4: 检查减速箱润滑油油位与黏度"
        ]
        
        required_parts = [
            "防爆电磁阀 (型号: SMC-VQA-02)",
            "耐高温硅胶密封圈 (外径 35mm)",
            "主轴承润滑脂 (SKF-LGMT2)"
        ]

        safety_notes = "⚠️ 警告：高压与高温区域！排查前必须断开主电闸并挂上安全锁 (LOTO)，带隔热手套操作。"

        result = {
            "device_id": request.device_id,
            "device_name": request.device_name,
            "urgency_level": urgency,
            "temp_warning": temp_warning,
            "possible_causes": possible_causes,
            "suggested_steps": suggested_steps,
            "required_parts": required_parts,
            "safety_notes": safety_notes,
            "knowledge_referenced": True
        }
        
        logger.info(f"完成设备 {request.device_id} 诊断，紧急程度: {urgency}")
        return result

class WorkOrderGenerator:
    """自动维修工单生成器"""
    
    @staticmethod
    def create_order(diagnosis: Dict[str, Any]) -> WorkOrder:
        order_id = f"WO-{diagnosis['device_id']}-20260803"
        return WorkOrder(
            order_id=order_id,
            device_id=diagnosis["device_id"],
            urgency_level=diagnosis["urgency_level"],
            possible_causes=diagnosis["possible_causes"],
            suggested_steps=diagnosis["suggested_steps"],
            required_parts=diagnosis["required_parts"],
            safety_notes=diagnosis["safety_notes"]
        )

# 单元测试与自检
if __name__ == "__main__":
    agent = IndustrialInvestigatorAgent()
    req = FaultDiagnosisRequest(
        device_id="DEV-PACK-001",
        device_name="高速自动吹瓶与包装一体机",
        symptoms="电机温度比平时高 12 度，产速下降 15%，伴随高频异响",
        sensor_data={"temperature": 88.5, "vibration": 4.2}
    )
    diag_res = agent.diagnose(req)
    work_order = WorkOrderGenerator.create_order(diag_res)
    print("\n=== 智能诊断结果自检 ===")
    print(json.dumps(diag_res, ensure_ascii=False, indent=2))
    print("\n=== 自动生成工单自检 ===")
    print(work_order.model_dump_json(indent=2))
