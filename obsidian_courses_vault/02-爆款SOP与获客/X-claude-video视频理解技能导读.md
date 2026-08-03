---
type: tool-skill
domain: ai-agents, video, multimodal
title: claude-video（/watch）视频理解技能导读
source: https://github.com/bradautomates/claude-video
author: Brad Bonanno（Solaris Automation）
captured: 2026-08-03
full_repo: ~/.hermes/profiles/yiren/knowledge/claude-video/
installed: ~/.hermes/profiles/yiren/skills/media/watch/
tags: [视频理解, yt-dlp, ffmpeg, whisper, 字幕转录, 爆款拆解]
related: [[youtube-content]]
---

# claude-video（/watch 技能）导读

> 一句话：`/watch <视频URL或路径> [问题]` 下载→抽帧→字幕/Whisper转写→把帧图+时间戳字幕喂给 Claude，让它"看过视频+听过音频"再回答。13.6K★, MIT，Python 纯 stdlib。已装进 Hermes skills/media/watch/，依赖 ffmpeg+yt-dlp（系统已有）。

## 五大场景
1. 拆别人爆款：hook/结构/开场字幕
2. 诊断录屏 bug：找问题出现的帧
3. 总结长视频：结构+关键节点+实际内容
4. 去水分看更新：剥离 hype 只留实质
5. 播放列表转笔记：课程/频道变可检索笔记库

## 工作流
URL/路径 → yt-dlp 先查字幕(免费不下载) → ffmpeg 按档抽帧 → 字幕=原生(免费)或Whisper(Groq优先/OpenAI备选) → 帧+字幕给Claude并行Read → 基于事实回答 → 清理。

## 档位（--detail）
- transcript：只要字幕，0帧，~4.5s
- efficient：关键帧，上限50，~0.5s
- balanced(默认)：场景切变，上限100，~20.9s
- token-burner：场景切变，不设限，完整覆盖长视频
- 帧是 token 大头(~197/帧)；--start/--end 分段聚焦更省；默认自动去重。

## 与 YIREN 联动
- 爆款视频拆解（海外爆款/竞品/课程逐字稿）可帧级+字幕级双通道，比纯字幕强。
- 与 youtube-content(纯转录) 互补：它拿文本，watch 拿"画面+声音"。
- 录屏/演示类素材做教程时辅助诊断提炼。

## 说明
- 字幕类（绝大多数公开视频）零 key 免费可用；仅无字幕视频需 Whisper key（未配，可选增强）。
