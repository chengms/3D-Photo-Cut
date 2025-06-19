# 🚀 快速启动指南

本指南将帮助您在几分钟内启动并运行3D照片风格化平台。

## 📋 前置要求

- Node.js 18+ 
- npm 或 pnpm
- Git
- 代码编辑器 (推荐 VS Code)

## 🛠️ 快速安装

### 方法一：自动化安装（推荐）

```bash
# 1. 克隆项目
git clone <repository-url>
cd 3d-photo-cut

# 2. 运行自动化安装脚本
npm run setup
```

### 方法二：手动安装

```bash
# 1. 克隆项目
git clone <repository-url>
cd 3d-photo-cut

# 2. 安装依赖
npm install

# 3. 复制环境变量文件
cp .env.example .env.local

# 4. 创建必要的目录
mkdir -p src/app/{auth,dashboard,api/{auth,templates,upload,process}}
mkdir -p src/components/{ui,layout,sections,templates,upload,processing}
mkdir -p src/{lib,store,types}
mkdir -p public/{images,templates}
```

## 🔧 环境配置

编辑 `.env.local` 文件，填入您的 API 密钥：

### 必需配置

```bash
# Supabase（必需）
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-key

# Replicate AI（必需）
REPLICATE_API_TOKEN=your-replicate-token
```

### 可选配置

```bash
# Cloudflare R2（用于文件存储）
R2_ACCESS_KEY_ID=your-r2-access-key
R2_SECRET_ACCESS_KEY=your-r2-secret-key
R2_BUCKET_NAME=photo-style-images

# Stripe（用于支付）
STRIPE_SECRET_KEY=sk_test_your-stripe-secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-public
```

## 🗄️ 数据库设置

### 1. 创建 Supabase 项目

1. 访问 [Supabase Dashboard](https://supabase.com/dashboard)
2. 创建新项目
3. 获取项目 URL 和 API 密钥

### 2. 执行数据库迁移

在 Supabase SQL 编辑器中执行以下 SQL：

```sql
-- 用户表
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100),
  avatar_url TEXT,
  subscription_type VARCHAR(20) DEFAULT 'free',
  daily_quota INTEGER DEFAULT 3,
  used_quota INTEGER DEFAULT 0,
  quota_reset_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 模板表
CREATE TABLE templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  style_type VARCHAR(50) NOT NULL,
  preview_image_url TEXT NOT NULL,
  style_prompt TEXT NOT NULL,
  required_images INTEGER DEFAULT 1,
  is_premium BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 处理任务表
CREATE TABLE processing_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  template_id UUID REFERENCES templates(id),
  status VARCHAR(20) DEFAULT 'queued',
  input_images JSONB NOT NULL,
  output_images JSONB,
  error_message TEXT,
  processing_started_at TIMESTAMP WITH TIME ZONE,
  processing_completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 用户作品表
CREATE TABLE user_artworks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  task_id UUID REFERENCES processing_tasks(id),
  title VARCHAR(200),
  thumbnail_url TEXT NOT NULL,
  full_image_url TEXT NOT NULL,
  template_id UUID REFERENCES templates(id),
  is_public BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_processing_tasks_user_id ON processing_tasks(user_id);
CREATE INDEX idx_processing_tasks_status ON processing_tasks(status);
CREATE INDEX idx_user_artworks_user_id ON user_artworks(user_id);
CREATE INDEX idx_user_artworks_public ON user_artworks(is_public) WHERE is_public = true;
```

### 3. 插入示例模板数据

```sql
INSERT INTO templates (name, description, style_type, preview_image_url, style_prompt, sort_order) VALUES
('动漫风格', '将您的照片转换为精美的动漫插画风格', 'anime', '/templates/anime-preview.jpg', 'anime style, detailed illustration, vibrant colors, clean lines', 1),
('油画风格', '经典油画艺术风格，充满艺术气息', 'artistic', '/templates/oil-preview.jpg', 'oil painting style, classical art, rich textures, masterpiece', 2),
('水彩风格', '清新淡雅的水彩画风格', 'artistic', '/templates/watercolor-preview.jpg', 'watercolor painting, soft colors, artistic, elegant', 3),
('写实肖像', '高质量写实肖像风格', 'realistic', '/templates/portrait-preview.jpg', 'professional portrait, high quality, realistic, detailed', 4);
```

## 🎨 Replicate AI 配置

### 1. 获取 API Token

1. 访问 [Replicate](https://replicate.com)
2. 注册并获取 API Token
3. 将 Token 添加到 `.env.local`

### 2. 测试 API 连接

```bash
# 测试连接（可选）
curl -H "Authorization: Token $REPLICATE_API_TOKEN" https://api.replicate.com/v1/predictions
```

## 🚀 启动开发服务器

```bash
npm run dev
```

打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 📁 项目结构说明

```
3D-Photo-Cut/
├── src/
│   ├── app/                     # Next.js App Router 页面
│   │   ├── (auth)/             # 认证相关页面
│   │   ├── (dashboard)/        # 用户仪表板
│   │   ├── api/                # API 路由
│   │   ├── layout.tsx          # 根布局
│   │   └── page.tsx            # 首页
│   ├── components/             # React 组件
│   │   ├── ui/                 # 基础 UI 组件
│   │   ├── layout/             # 布局组件
│   │   ├── sections/           # 页面区块组件
│   │   ├── templates/          # 模板相关组件
│   │   ├── upload/             # 上传组件
│   │   └── processing/         # 处理状态组件
│   ├── lib/                    # 工具库和配置
│   ├── store/                  # 状态管理
│   └── types/                  # TypeScript 类型定义
├── public/                     # 静态资源
├── docs/                       # 项目文档
└── scripts/                    # 脚本文件
```

## 🔧 开发命令

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 代码检查
npm run lint

# 类型检查
npm run type-check

# 生成数据库类型
npm run db:generate
```

## 🐛 常见问题

### 1. 依赖安装失败

```bash
# 清理缓存重新安装
rm -rf node_modules package-lock.json
npm install
```

### 2. TypeScript 错误

- 确保安装了所有依赖
- 运行 `npm run type-check` 检查类型错误

### 3. Supabase 连接问题

- 检查 `.env.local` 中的 Supabase 配置
- 确保 API 密钥正确
- 检查数据库表是否已创建

### 4. 图片上传失败

- 检查 Cloudflare R2 配置
- 确保存储桶权限正确设置

## 📚 下一步

1. 阅读 [REQUIREMENTS.md](./REQUIREMENTS.md) 了解完整功能需求
2. 查看 [TECHNICAL_ARCHITECTURE.md](./TECHNICAL_ARCHITECTURE.md) 了解系统架构
3. 参考 [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) 进行功能开发

## 🤝 获取帮助

- 查看项目文档
- 提交 GitHub Issues
- 加入开发者社区

---

🎉 恭喜！您已成功设置好开发环境，可以开始开发了！ 