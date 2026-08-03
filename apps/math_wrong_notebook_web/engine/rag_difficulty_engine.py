#!/usr/bin/env python3
"""
rag_difficulty_engine.py
自有题库 RAG + 变式难度控级引擎。
当学生错题后，通过本地 RAG 题库向量检索匹配知识点，并调用 DeepSeek API 生成降级/拔高题。
"""

import os
import json
import requests

DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY", "")
DEEPSEEK_URL = "https://api.deepseek.com/v1/chat/completions"

def retrieve_similar_knowledge(query_text: str):
    """
    (模拟) 从本地 Github Sync 的 RAG 知识库中检索相似知识点。
    实际实施中，应调用 ChromaDB / FAISS 进行 top-k 检索。
    """
    print(f"[*] 正在检索本地知识库: {query_text}")
    # mock 返回知识点
    return "知识点：一元二次方程求根公式与十字相乘法"

def generate_variant(base_question: str, difficulty_delta: int):
    """
    调用 DeepSeek API 生成变式题。
    difficulty_delta: -1 降低难度, 1 增加难度
    """
    knowledge_context = retrieve_similar_knowledge(base_question)
    
    direction = "降低难度（更基础，侧重单步计算或概念强化）" if difficulty_delta < 0 else "增加难度（更复杂，侧重综合应用或多步推理）"
    
    prompt = f"""
你是一位资深的特级数学教师。学生做错了以下题目：
【原题】：{base_question}

相关的教学知识点是：{knowledge_context}

请基于“举一反三”的教育理念，为该学生生成一道变式题。
要求：
1. 变式方向：{direction}
2. 题目要严谨且具有确定性答案。
3. 仅输出题目内容，不要输出解题过程。
    """
    
    headers = {
        "Authorization": f"Bearer {DEEPSEEK_API_KEY}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": "deepseek-chat",
        "messages": [
            {"role": "system", "content": "You are a professional math teacher assistant."},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.7
    }
    
    print(f"[*] 正在调用 DeepSeek API 生成变式题 (delta={difficulty_delta})...")
    
    try:
        response = requests.post(DEEPSEEK_URL, headers=headers, json=payload, timeout=15)
        response.raise_for_status()
        data = response.json()
        return data["choices"][0]["message"]["content"].strip()
    except Exception as e:
        print(f"[!] 生成变式题失败: {e}")
        return "无法生成变式题，请重试。"

if __name__ == "__main__":
    test_q = "Solve for x: 2x^2 + 5x - 12 = 0"
    print(f"=== 测试变式引擎 ===")
    print(f"原错题: {test_q}\n")
    
    print("【-1 难度变式（基础巩固）】:")
    print(generate_variant(test_q, -1))
    print("\n----------------\n")
    print("【+1 难度变式（拔高挑战）】:")
    print(generate_variant(test_q, 1))
