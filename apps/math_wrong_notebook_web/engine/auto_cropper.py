#!/usr/bin/env python3
"""
auto_cropper.py
基于 OpenCV 的高拍仪卷面智能切题算法。
用于批量识别 A4 试卷/作业上的单独题目并进行智能裁剪。
"""

import cv2
import numpy as np
import os
import sys

def process_image(image_path: str, output_dir: str):
    """
    处理高拍仪扫描的试卷图像，提取单题切片
    """
    print(f"[*] 开始处理图片: {image_path}")
    
    if not os.path.exists(image_path):
        print(f"[!] File not found: {image_path}")
        return
        
    os.makedirs(output_dir, exist_ok=True)
    
    # 1. 读取原图
    image = cv2.imread(image_path)
    if image is None:
        print("[!] Failed to load image.")
        return
        
    original = image.copy()
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # 2. 图像预处理 (去噪与二值化)
    # 高斯模糊去噪
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    # 自适应二值化 (适应高拍仪光照不均)
    thresh = cv2.adaptiveThreshold(
        blurred, 255, 
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C, 
        cv2.THRESH_BINARY_INV, 11, 2
    )
    
    # 3. 形态学操作连接相邻的文字行成一个区块
    # 使用一个较宽的水平核，把同一题的文字连在一起
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (40, 10))
    dilated = cv2.dilate(thresh, kernel, iterations=2)
    
    # 4. 轮廓提取
    contours, _ = cv2.findContours(dilated, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    min_area = 5000  # 过滤掉太小的噪点
    count = 0
    
    # 5. 遍历轮廓并裁剪
    # 按 Y 坐标排序，确保切出来的题目按从上到下顺序
    bounding_boxes = [cv2.boundingRect(c) for c in contours]
    bounding_boxes = sorted(bounding_boxes, key=lambda b: b[1])
    
    for x, y, w, h in bounding_boxes:
        if w * h > min_area:
            count += 1
            # 适当向外扩张一点边界
            padding = 10
            x1 = max(0, x - padding)
            y1 = max(0, y - padding)
            x2 = min(image.shape[1], x + w + padding)
            y2 = min(image.shape[0], y + h + padding)
            
            roi = original[y1:y2, x1:x2]
            
            out_path = os.path.join(output_dir, f"q_{count}.jpg")
            cv2.imwrite(out_path, roi)
            print(f"  [+] 提取题目切片 {count}: {out_path}")
            
    print(f"[*] 共提取 {count} 道题目切片。")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python auto_cropper.py <input_image> <output_dir>")
        sys.exit(1)
        
    process_image(sys.argv[1], sys.argv[2])
