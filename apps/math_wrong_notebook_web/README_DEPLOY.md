# 🚀 港大 DeepTutor x 昆仑教育 AI 体系：云服务器极简部署指南

只要您拥有一台阿里云、腾讯云、华为云或 Baidu 随心选的 Linux 服务器（推荐配置：2核 4G 或以上，Ubuntu 22.04 / CentOS 7+），**只需 3 步，5 分钟即可公网上线！**

---

## 📌 部署前准备
已为您在后台预置好 DeepSeek 账户 API Key (`sk-5d6e675e074b4ed481374fcafd2b7821`)，**访问体验的用户无需准备 API Key**。

---

## 🛠️ 第一步：把代码复制到服务器
通过 SFTP / Git 或直接在服务器终端上执行：
```bash
# 1. 登录云服务器
ssh root@你的服务器公网IP

# 2. 进入 /opt 目录并下载/上传工程
cd /opt
git clone <你的项目仓库地址> hku_ai_platform
cd hku_ai_platform/apps/math_wrong_notebook_web
```

---

## 🚀 第二步：一键运行部署脚本
我们在工程根目录下内置了自动化脚本 `start_production.sh`：
```bash
# 给予脚本执行权限并运行
chmod +x start_production.sh
./start_production.sh
```
> 脚本会自动检测环境、拉起 Docker 容器（包含 Next.js Web、Redis 7.0 缓存队列与 Nginx 网关），并一键初始化数据库！

---

## 🌐 第三步：开放服务器 3000 端口并访问
1. 登录阿里云/腾讯云后台，打开 **“安全组”** 或 **“防火墙”**。
2. 添加一条放行规则：**开放 3000 端口 (TCP)**。
3. 打开浏览器，直接访问：
   👉 `http://你的服务器IP:3000`

此时，包含 **《教师AI训练营》20课大纲**、**SuperTA 9维防刷评估** 和 **DeepTutor 苏格拉底追问** 的港大 AI 教学中台就正式在公网上线了！

---

## 🔒 进阶配置：绑定自己的域名与 HTTPS (可选)
如果您希望绑定自己的域名（如 `https://ai.yourdomain.com`）：
1. 在域名服务商处将域名 A 记录解析到服务器公网 IP。
2. 运行免费 SSL 证书申请指令：
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d ai.yourdomain.com
   ```
3. 域名自动部署 HTTPS 完成！
