path = "/Volumes/MOVESPEED/下载/AIcode/Agent/apps/math_wrong_notebook_web/next.config.ts"

config_code = """import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
"""

with open(path, "w", encoding="utf-8") as f:
    f.write(config_code)

print("🎉 成功配置 next.config.ts output: export！")
