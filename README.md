# 3D照片风格化平台

一个基于AI技术的在线照片风格化平台，用户可以选择不同的艺术风格模板，上传个人照片，系统自动进行人物抠图和风格化处理，生成具有特定艺术风格的个性化照片。

## ✨ 主要功能

- 🎨 **多种艺术风格**: 支持动漫、写实、油画等多种风格模板
- 🤖 **AI智能抠图**: 高精度人物主体识别和背景分离
- ✨ **智能美化**: 保持人物特征的前提下进行适度美化
- 📱 **响应式设计**: 完美支持桌面端和移动端
- ⚡ **快速处理**: 30秒内完成图片风格化处理
- 👤 **用户系统**: 完整的注册登录、作品管理功能
- 💳 **订阅模式**: 灵活的付费方案和配额管理

## 🏗️ 技术架构

### 前端技术栈
- **框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS + Shadcn/ui
- **状态管理**: Zustand + React Query
- **图片处理**: Canvas API + WebGL
- **动画**: Framer Motion

### 后端技术栈
- **运行时**: Cloudflare Workers / Vercel Edge Functions
- **数据库**: Supabase (PostgreSQL)
- **文件存储**: Cloudflare R2
- **认证**: Supabase Auth
- **缓存**: Cloudflare KV

### AI服务
- **抠图**: REMBG + U²-Net (via Replicate)
- **风格化**: Stable Diffusion + ControlNet
- **人脸美化**: GFPGAN Enhancement
- **部署**: Replicate / Hugging Face

## 📁 项目结构

```
3D-Photo-Cut/
├── docs/
│   ├── REQUIREMENTS.md          # 产品需求文档
│   ├── TECHNICAL_ARCHITECTURE.md # 技术架构设计
│   ├── IMPLEMENTATION_GUIDE.md   # 实施指南
│   └── TECHNOLOGY_CHOICES.md     # 技术选型对比
├── src/
│   ├── app/                     # Next.js App Router
│   ├── components/              # React组件
│   ├── lib/                     # 工具库
│   ├── store/                   # 状态管理
│   └── types/                   # TypeScript类型
├── public/                      # 静态资源
└── README.md                    # 项目说明
```

## 🚀 快速开始

### 环境要求
- Node.js 18+
- pnpm (推荐) 或 npm

### 安装步骤

1. **克隆项目**
```bash
git clone https://github.com/your-username/3d-photo-cut.git
cd 3d-photo-cut
```

2. **安装依赖**
```bash
pnpm install
```

3. **环境配置**
```bash
cp .env.example .env.local
# 编辑 .env.local 填入必要的API密钥
```

4. **数据库设置**
```bash
# 在Supabase控制台执行数据库初始化脚本
```

5. **启动开发服务器**
```bash
pnpm dev
```

访问 `http://localhost:3000` 查看应用。

### 必需的API密钥

在 `.env.local` 中配置以下环境变量：

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-key

# Cloudflare R2
R2_ACCESS_KEY_ID=your-r2-access-key
R2_SECRET_ACCESS_KEY=your-r2-secret-key
R2_BUCKET_NAME=photo-style-images

# AI服务
REPLICATE_API_TOKEN=your-replicate-token

# 支付 (可选)
STRIPE_SECRET_KEY=your-stripe-secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-public
```

## 📋 开发计划

### Phase 1: MVP版本 (4-6周)
- [x] 基础项目架构
- [x] 用户认证系统
- [x] 模板选择功能
- [x] 图片上传处理
- [x] AI抠图集成
- [x] 基础风格化功能

### Phase 2: 完整版本 (8-10周)
- [ ] 用户管理系统
- [ ] 支付集成
- [ ] 作品展示和分享
- [ ] 管理后台
- [ ] 性能优化

### Phase 3: 增强版本 (12-16周)
- [ ] 批量处理功能
- [ ] 更多艺术风格
- [ ] 社交功能
- [ ] 移动端优化

## 💰 成本估算

### MVP阶段 (月成本)
- Vercel Pro: $20
- Supabase Pro: $25
- Cloudflare R2: $15
- Replicate API: $100-300
- 其他服务: $40
- **总计**: ~$200-400/月

### 扩展阶段优化
- 自托管AI模型降低API成本
- CDN缓存优化
- 数据库分片扩展
- 微服务架构重构

## 🔧 部署

### Vercel部署
```bash
# 安装Vercel CLI
npm i -g vercel

# 部署到生产环境
vercel --prod
```

### Cloudflare Workers
```bash
# 安装Wrangler
npm install -g wrangler

# 部署Workers
wrangler deploy
```

## 📊 监控和分析

- **性能监控**: Vercel Analytics
- **错误追踪**: Sentry
- **可用性监控**: Uptime Robot
- **用户分析**: 自定义埋点系统

## 🤝 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系方式

- 项目链接: [https://github.com/your-username/3d-photo-cut](https://github.com/your-username/3d-photo-cut)
- 问题反馈: [Issues](https://github.com/your-username/3d-photo-cut/issues)

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React框架
- [Supabase](https://supabase.io/) - 后端即服务
- [Replicate](https://replicate.com/) - AI模型API
- [Cloudflare](https://cloudflare.com/) - 边缘计算和存储
- [Tailwind CSS](https://tailwindcss.com/) - CSS框架

---

⭐ 如果这个项目对你有帮助，请给它一个星标！

