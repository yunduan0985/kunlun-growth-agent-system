           ctx.font = "normal bold 22px sans-serif";
          ctx.fillStyle = "#82535F";
          this.drawTextLine(ctx, "🔥 扫码自诊志愿梯度，规避高分滑档风险", 62, 848, 470);
        }
 
        // 5. 绘制底部引导扫码关注区
        ctx.fillStyle = "#F8F7F2";
        this.roundRect(ctx, 36, 888, 528, 156, 24);
        ctx.fill();
 
        ctx.strokeStyle = "#E3DACB";
        ctx.lineWidth = 2;
        ctx.stroke();
 
        ctx.fillStyle = "#32299D";
        ctx.font = "normal bold 28px sans-serif";
        ctx.fillText("长按扫码自诊志愿梯度", 62, 946);
 
        ctx.font = "normal bold 22px sans-serif";
        ctx.fillStyle = "#B68E45";
        ctx.fillText("加微信 MarshallPD 免费领", 62, 990);
        ctx.fillText("《2026年上海中考升学路径图》", 62, 1020);

        ctx.fillStyle = "#756B7B";
        ctx.font = "normal normal 14px sans-serif";
        ctx.fillText("数据源于2025/2026公开招生文件，仅供参考，不作录取承诺。实际需以官方发布为准。", 62, 1055);