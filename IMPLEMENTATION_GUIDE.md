# 3D照片风格化平台 - 实施指南

## 1. 开发环境设置

### 1.1 必需工具和账号
```bash
# 开发工具
- Node.js 18+ 
- pnpm (推荐) 或 npm
- Git
- VS Code (推荐)

# 云服务账号
- Vercel 账号
- Supabase 账号  
- Cloudflare 账号
- Replicate 账号
- Stripe 账号 (支付功能)
```

### 1.2 项目初始化
```bash
# 1. 创建Next.js项目
npx create-next-app@latest photo-style-app --typescript --tailwind --app

# 2. 安装依赖
cd photo-style-app
pnpm add @supabase/supabase-js @supabase/auth-helpers-nextjs
pnpm add @tanstack/react-query zustand
pnpm add react-dropzone react-hook-form @hookform/resolvers/zod zod
pnpm add framer-motion lucide-react @radix-ui/react-dialog
pnpm add stripe @stripe/stripe-js
pnpm add hono @hono/node-server

# 3. 开发依赖
pnpm add -D @types/node eslint-config-next
```

### 1.3 环境变量配置
```bash
# .env.local
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-key

# Cloudflare R2
R2_ACCESS_KEY_ID=your-r2-access-key
R2_SECRET_ACCESS_KEY=your-r2-secret-key
R2_BUCKET_NAME=photo-style-images
R2_PUBLIC_URL=https://your-bucket.r2.dev

# AI服务
REPLICATE_API_TOKEN=your-replicate-token
HUGGINGFACE_API_TOKEN=your-hf-token

# 支付
STRIPE_SECRET_KEY=your-stripe-secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-public

# 其他
NEXTAUTH_SECRET=your-auth-secret
NEXTAUTH_URL=http://localhost:3000
```

## 2. 分阶段开发计划

### Phase 1: 核心功能 MVP (Week 1-4)

#### Week 1: 基础架构搭建
**目标**: 建立项目基础结构和认证系统

```bash
# 1. 设置Supabase数据库
# 在Supabase控制台执行SQL脚本创建表结构

# 2. 配置认证系统
mkdir -p src/lib src/components/auth src/app/(auth)
```

**核心文件创建**:
```typescript
// src/lib/supabase.ts
import { createClientComponentClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const createClient = () => createClientComponentClient()
export const createServerClient = () => createServerComponentClient({ cookies })

// src/lib/auth.ts
export async function getUser() {
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}
```

**主要任务**:
- [x] 项目结构搭建
- [x] Supabase集成和认证
- [x] 基础UI组件 (shadcn/ui)
- [x] 路由结构设计
- [x] 基础样式系统

#### Week 2: 模板系统开发
**目标**: 实现模板选择和管理功能

```typescript
// src/app/api/templates/route.ts
export async function GET() {
  const supabase = createServerClient()
  const { data: templates } = await supabase
    .from('templates')
    .select('*')
    .order('sort_order')
  
  return Response.json(templates)
}

// src/components/templates/TemplateGrid.tsx
export function TemplateGrid({ onSelect }: { onSelect: (template: Template) => void }) {
  const { data: templates } = useQuery({
    queryKey: ['templates'],
    queryFn: fetchTemplates
  })

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {templates?.map((template) => (
        <TemplateCard key={template.id} template={template} onSelect={onSelect} />
      ))}
    </div>
  )
}
```

**主要任务**:
- [x] 模板数据表设计
- [x] 模板展示组件
- [x] 模板选择逻辑
- [x] 模板分类和标签
- [x] 初始模板数据导入

#### Week 3: 文件上传系统
**目标**: 实现图片上传和预处理功能

```typescript
// src/components/upload/MultiImageUploader.tsx
export function MultiImageUploader({ maxFiles, onUpload }: UploadProps) {
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})
  
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    maxFiles,
    maxSize: 10 * 1024 * 1024,
    onDrop: handleFiles
  })

  const handleFiles = async (files: File[]) => {
    const uploadPromises = files.map(async (file, index) => {
      setUploadProgress(prev => ({ ...prev, [file.name]: 0 }))
      
      const compressedFile = await compressImage(file)
      const url = await uploadToR2(compressedFile, {
        onProgress: (progress) => {
          setUploadProgress(prev => ({ ...prev, [file.name]: progress }))
        }
      })
      
      return { file, url, index }
    })
    
    const results = await Promise.all(uploadPromises)
    onUpload(results)
  }

  return (
    <div className="space-y-4">
      <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          拖拽图片到这里，或点击选择文件
        </p>
      </div>
      
      {/* 上传进度显示 */}
      {Object.entries(uploadProgress).map(([fileName, progress]) => (
        <div key={fileName} className="flex items-center space-x-2">
          <span className="text-sm truncate flex-1">{fileName}</span>
          <div className="w-24 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs text-gray-500">{progress}%</span>
        </div>
      ))}
    </div>
  )
}
```

**图片压缩和处理**:
```typescript
// src/lib/image-processing.ts
export async function compressImage(file: File, quality: number = 0.8): Promise<File> {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!
  const img = await createImageBitmap(file)
  
  // 计算压缩后的尺寸
  const maxWidth = 1920
  const maxHeight = 1920
  let { width, height } = img
  
  if (width > maxWidth || height > maxHeight) {
    const ratio = Math.min(maxWidth / width, maxHeight / height)
    width *= ratio
    height *= ratio
  }
  
  canvas.width = width
  canvas.height = height
  
  ctx.drawImage(img, 0, 0, width, height)
  
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(new File([blob], file.name, { type: 'image/jpeg' }))
      }
    }, 'image/jpeg', quality)
  })
}

// R2上传函数
export async function uploadToR2(file: File, options?: { onProgress?: (progress: number) => void }): Promise<string> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('path', `uploads/${Date.now()}`)
  
  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData
  })
  
  if (!response.ok) {
    throw new Error('Upload failed')
  }
  
  const { url } = await response.json()
  return url
}
```

**主要任务**:
- [x] 拖拽上传界面
- [x] 图片压缩和预处理
- [x] R2存储集成
- [x] 上传进度显示
- [x] 错误处理和重试

#### Week 4: AI处理集成
**目标**: 集成AI抠图和风格化服务

```typescript
// src/lib/ai-services.ts
export class AIProcessingPipeline {
  private replicateClient: Replicate

  constructor() {
    this.replicateClient = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN!
    })
  }

  async processImage(imageUrl: string, templateId: string): Promise<ProcessingResult> {
    try {
      // Step 1: 背景移除
      const removeBgResult = await this.removeBackground(imageUrl)
      
      // Step 2: 人脸增强
      const enhancedResult = await this.enhanceFace(removeBgResult.output)
      
      // Step 3: 风格应用
      const styledResult = await this.applyStyle(enhancedResult.output, templateId)
      
      return {
        original: imageUrl,
        removedBackground: removeBgResult.output,
        enhanced: enhancedResult.output,
        styled: styledResult.output,
        steps: [removeBgResult, enhancedResult, styledResult]
      }
    } catch (error) {
      throw new Error(`Processing failed: ${error.message}`)
    }
  }

  private async removeBackground(imageUrl: string) {
    const prediction = await this.replicateClient.run(
      "cjwbw/rembg:fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec5c003",
      { input: { image: imageUrl } }
    )
    
    return { output: prediction, metadata: { model: 'rembg', duration: 0 } }
  }

  private async enhanceFace(imageUrl: string) {
    const prediction = await this.replicateClient.run(
      "tencentarc/gfpgan:9283608cc6b7be6b65a8e44983db012355fde4132009bf99d976b2f0896856a3",
      { 
        input: { 
          img: imageUrl,
          version: "v1.4",
          scale: 2
        } 
      }
    )
    
    return { output: prediction, metadata: { model: 'gfpgan', duration: 0 } }
  }

  private async applyStyle(imageUrl: string, templateId: string) {
    const template = await this.getTemplate(templateId)
    
    const prediction = await this.replicateClient.run(
      "stability-ai/stable-diffusion:27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478",
      {
        input: {
          image: imageUrl,
          prompt: template.stylePrompt,
          negative_prompt: "blurry, bad quality, distorted",
          num_inference_steps: 20,
          guidance_scale: 7.5,
          strength: 0.75
        }
      }
    )
    
    return { output: prediction, metadata: { model: 'stable-diffusion', template: template.name } }
  }
}
```

**任务队列系统**:
```typescript
// src/lib/task-queue.ts
export class TaskQueue {
  async enqueueProcessing(userId: string, taskData: ProcessingTaskData): Promise<string> {
    const supabase = createServerClient()
    
    const { data: task } = await supabase
      .from('processing_tasks')
      .insert({
        user_id: userId,
        template_id: taskData.templateId,
        input_images: taskData.imageUrls,
        status: 'queued'
      })
      .select()
      .single()
    
    // 触发异步处理
    await this.triggerProcessing(task.id)
    
    return task.id
  }

  private async triggerProcessing(taskId: string) {
    // 使用Vercel的后台函数或者队列服务
    await fetch('/api/process/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taskId })
    })
  }
}
```

**主要任务**:
- [x] Replicate API集成
- [x] 抠图模型调用
- [x] 风格化处理
- [x] 任务队列系统
- [x] 处理状态跟踪

### Phase 2: 完整功能开发 (Week 5-8)

#### Week 5: 用户系统完善
**目标**: 实现用户管理、额度系统和作品管理

```typescript
// src/lib/quota.ts
export class QuotaManager {
  async checkUserQuota(userId: string): Promise<boolean> {
    const supabase = createServerClient()
    
    const { data: user } = await supabase
      .from('users')
      .select('daily_quota, used_quota, quota_reset_date, subscription_type')
      .eq('id', userId)
      .single()
    
    // 检查是否需要重置配额
    const today = new Date().toDateString()
    if (user.quota_reset_date !== today) {
      await this.resetDailyQuota(userId)
      return true
    }
    
    return user.used_quota < user.daily_quota
  }

  async consumeQuota(userId: string): Promise<boolean> {
    const supabase = createServerClient()
    
    const { data, error } = await supabase.rpc('consume_user_quota', {
      user_id: userId
    })
    
    return !error && data
  }

  private async resetDailyQuota(userId: string) {
    const supabase = createServerClient()
    
    await supabase
      .from('users')
      .update({
        used_quota: 0,
        quota_reset_date: new Date().toDateString()
      })
      .eq('id', userId)
  }
}
```

#### Week 6: 支付系统集成
**目标**: 集成Stripe支付和订阅管理

```typescript
// src/lib/stripe.ts
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
})

export async function createCheckoutSession(userId: string, priceId: string) {
  const session = await stripe.checkout.sessions.create({
    customer: userId,
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
    metadata: {
      userId
    }
  })

  return session
}

// Webhook处理
export async function handleStripeWebhook(signature: string, body: string) {
  const event = stripe.webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!
  )

  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
      await updateUserSubscription(event.data.object)
      break
    case 'customer.subscription.deleted':
      await cancelUserSubscription(event.data.object)
      break
  }
}
```

#### Week 7: 结果展示和社交功能
**目标**: 实现作品展示、分享和个人作品集

```typescript
// src/components/gallery/ArtworkGallery.tsx
export function ArtworkGallery({ userId }: { userId: string }) {
  const { data: artworks, isLoading } = useQuery({
    queryKey: ['artworks', userId],
    queryFn: () => fetchUserArtworks(userId)
  })

  const handleShare = async (artwork: Artwork) => {
    if (navigator.share) {
      await navigator.share({
        title: artwork.title,
        text: '看看我的AI艺术作品！',
        url: `${window.location.origin}/gallery/${artwork.id}`
      })
    } else {
      await navigator.clipboard.writeText(`${window.location.origin}/gallery/${artwork.id}`)
      toast.success('链接已复制到剪贴板')
    }
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {artworks?.map((artwork) => (
        <ArtworkCard 
          key={artwork.id} 
          artwork={artwork} 
          onShare={handleShare}
        />
      ))}
    </div>
  )
}
```

#### Week 8: 性能优化和测试
**目标**: 性能优化、错误处理和全面测试

### Phase 3: 高级功能 (Week 9-12)

#### Week 9-10: 批量处理功能
#### Week 11: 管理后台开发
#### Week 12: 部署和上线准备

## 3. 部署流程

### 3.1 Vercel部署
```bash
# 1. 安装Vercel CLI
npm i -g vercel

# 2. 链接项目
vercel link

# 3. 设置环境变量
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add SUPABASE_SERVICE_ROLE_KEY
# ... 其他环境变量

# 4. 部署
vercel --prod
```

### 3.2 Cloudflare Workers部署
```bash
# 1. 安装Wrangler
npm install -g wrangler

# 2. 登录Cloudflare
wrangler login

# 3. 部署Workers
wrangler deploy
```

### 3.3 监控和维护
```typescript
// src/lib/monitoring.ts
export function setupMonitoring() {
  // 错误监控
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NODE_ENV,
  })

  // 性能监控
  if (typeof window !== 'undefined') {
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          analytics.track('page_load_time', {
            duration: entry.duration,
            page: window.location.pathname
          })
        }
      }
    }).observe({ entryTypes: ['navigation'] })
  }
}
```

## 4. 质量保证

### 4.1 测试策略
```bash
# 单元测试
pnpm add -D jest @testing-library/react @testing-library/jest-dom

# E2E测试
pnpm add -D playwright @playwright/test

# API测试
pnpm add -D supertest
```

### 4.2 代码质量
```bash
# ESLint配置
pnpm add -D eslint-config-next @typescript-eslint/eslint-plugin

# Prettier配置
pnpm add -D prettier eslint-config-prettier

# 类型检查
pnpm add -D typescript
```

### 4.3 性能优化
- 图片懒加载和压缩
- CDN缓存策略
- 代码分割和tree shaking
- Service Worker缓存
- 数据库查询优化

这个实施指南提供了从开发环境搭建到生产部署的完整流程，确保项目能够按计划高质量交付。 