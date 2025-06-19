# 3D照片风格化平台 - 技术架构与实现方案

## 1. 技术架构概览

### 1.1 整体架构设计

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   前端应用      │    │   CDN/边缘缓存   │    │   用户设备      │
│   Next.js       │◄───┤   Cloudflare    │◄───┤   浏览器/移动端  │
│   React         │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │
         ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   API网关       │    │   负载均衡      │    │   Web服务器     │
│   Cloudflare    │◄───┤   Workers       │◄───┤   Vercel        │
│   Workers       │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │
         ▼
┌─────────────────┬─────────────────┬─────────────────┬─────────────────┐
│   用户服务      │   文件存储      │   AI处理服务    │   支付服务      │
│   Supabase      │   R2/S3         │   Replicate     │   Stripe        │
│   PostgreSQL    │   Cloudflare    │   Hugging Face  │                 │
└─────────────────┴─────────────────┴─────────────────┴─────────────────┘
         │                 │                 │                 │
         ▼                 ▼                 ▼                 ▼
┌─────────────────┬─────────────────┬─────────────────┬─────────────────┐
│   数据分析      │   监控告警      │   日志系统      │   备份存储      │
│   Vercel        │   Sentry        │   Vercel        │   AWS S3        │
│   Analytics     │   Uptime Robot  │   Insights      │                 │
└─────────────────┴─────────────────┴─────────────────┴─────────────────┘
```

### 1.2 技术栈选择

#### 前端技术栈
- **框架**: Next.js 14 (App Router)
- **UI库**: React + TypeScript
- **样式**: Tailwind CSS + Shadcn/ui
- **状态管理**: Zustand + React Query
- **图片处理**: Canvas API + WebGL
- **上传组件**: react-dropzone
- **动画**: Framer Motion

#### 后端技术栈
- **运行时**: Cloudflare Workers / Vercel Edge Functions
- **API框架**: Hono.js (轻量级，适合边缘计算)
- **数据库**: Supabase (PostgreSQL + 实时功能)
- **文件存储**: Cloudflare R2 / AWS S3
- **认证**: Supabase Auth
- **缓存**: Cloudflare KV

#### AI处理服务
- **抠图模型**: REMBG + U²-Net
- **风格化**: Stable Diffusion + ControlNet
- **人脸美化**: FaceSwapper + Enhancement模型
- **部署平台**: Replicate / Hugging Face Inference API

## 2. 详细技术实现方案

### 2.1 前端实现

#### 2.1.1 项目结构
```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                  # 认证相关页面
│   ├── (dashboard)/             # 用户仪表板
│   ├── gallery/                 # 作品展示
│   ├── process/                 # 图片处理流程
│   └── api/                     # API路由
├── components/                   # 可复用组件
│   ├── ui/                      # 基础UI组件
│   ├── upload/                  # 上传相关组件
│   ├── templates/               # 模板相关组件
│   └── processing/              # 处理状态组件
├── lib/                         # 工具库
│   ├── api/                     # API客户端
│   ├── auth/                    # 认证工具
│   ├── upload/                  # 上传工具
│   └── utils/                   # 通用工具
├── store/                       # 状态管理
├── types/                       # TypeScript类型定义
└── styles/                      # 样式文件
```

#### 2.1.2 核心组件实现

**模板选择组件**
```typescript
// components/templates/TemplateSelector.tsx
interface Template {
  id: string;
  name: string;
  style: 'anime' | 'realistic' | 'artistic';
  preview: string;
  description: string;
  requiredImages: number;
}

export function TemplateSelector({ onSelect }: { onSelect: (template: Template) => void }) {
  const { data: templates, isLoading } = useQuery({
    queryKey: ['templates'],
    queryFn: () => api.templates.getAll()
  });

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {templates?.map((template) => (
        <TemplateCard 
          key={template.id} 
          template={template} 
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
```

**图片上传组件**
```typescript
// components/upload/ImageUploader.tsx
export function ImageUploader({ maxFiles, onUpload }: UploadProps) {
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    maxFiles,
    maxSize: 10 * 1024 * 1024, // 10MB
    onDrop: handleUpload
  });

  const handleUpload = async (files: File[]) => {
    const uploadPromises = files.map(async (file) => {
      const compressedFile = await compressImage(file);
      return uploadToStorage(compressedFile);
    });
    
    const urls = await Promise.all(uploadPromises);
    onUpload(urls);
  };

  return (
    <div {...getRootProps()} className="upload-zone">
      <input {...getInputProps()} />
      {/* Upload UI */}
    </div>
  );
}
```

#### 2.1.3 状态管理
```typescript
// store/processing.ts
interface ProcessingState {
  currentStep: 'template' | 'upload' | 'processing' | 'result';
  selectedTemplate: Template | null;
  uploadedImages: string[];
  processingStatus: 'idle' | 'uploading' | 'processing' | 'completed' | 'error';
  results: ProcessedImage[];
}

export const useProcessingStore = create<ProcessingState>((set) => ({
  currentStep: 'template',
  selectedTemplate: null,
  uploadedImages: [],
  processingStatus: 'idle',
  results: [],
  // actions...
}));
```

### 2.2 后端API实现

#### 2.2.1 Cloudflare Workers API结构
```typescript
// src/api/index.ts
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { jwt } from 'hono/jwt';

const app = new Hono();

app.use('*', cors());
app.use('/api/protected/*', jwt({ secret: env.JWT_SECRET }));

// 路由定义
app.route('/api/auth', authRouter);
app.route('/api/templates', templatesRouter);
app.route('/api/upload', uploadRouter);
app.route('/api/process', processRouter);
app.route('/api/user', userRouter);

export default app;
```

#### 2.2.2 图片处理API
```typescript
// src/api/process.ts
export const processRouter = new Hono()
  .post('/start', async (c) => {
    const { templateId, imageUrls } = await c.req.json();
    
    // 1. 验证用户权限和额度
    const user = c.get('user');
    await checkUserQuota(user.id);
    
    // 2. 创建处理任务
    const task = await createProcessingTask({
      userId: user.id,
      templateId,
      imageUrls,
      status: 'queued'
    });
    
    // 3. 异步启动处理流程
    await triggerProcessing(task.id);
    
    return c.json({ taskId: task.id });
  })
  .get('/status/:taskId', async (c) => {
    const taskId = c.req.param('taskId');
    const task = await getProcessingTask(taskId);
    return c.json(task);
  });
```

#### 2.2.3 AI处理服务集成
```typescript
// src/services/ai-processing.ts
export class AIProcessingService {
  async processImages(task: ProcessingTask): Promise<ProcessedImage[]> {
    const results: ProcessedImage[] = [];
    
    for (const imageUrl of task.imageUrls) {
      // 1. 抠图处理
      const removedBgUrl = await this.removeBackground(imageUrl);
      
      // 2. 人脸检测和美化
      const enhancedUrl = await this.enhanceFace(removedBgUrl);
      
      // 3. 风格化处理
      const stylizedUrl = await this.applyStyle(enhancedUrl, task.templateId);
      
      results.push({
        originalUrl: imageUrl,
        processedUrl: stylizedUrl,
        steps: {
          removedBackground: removedBgUrl,
          enhanced: enhancedUrl,
          stylized: stylizedUrl
        }
      });
    }
    
    return results;
  }

  private async removeBackground(imageUrl: string): Promise<string> {
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${env.REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: "fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec5c003",
        input: { image: imageUrl }
      }),
    });
    
    const prediction = await response.json();
    return await this.waitForCompletion(prediction.id);
  }

  private async applyStyle(imageUrl: string, templateId: string): Promise<string> {
    const template = await getTemplate(templateId);
    
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${env.REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: "stability-ai/stable-diffusion:27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478",
        input: {
          image: imageUrl,
          prompt: template.stylePrompt,
          controlnet_conditioning_scale: 0.8,
          num_inference_steps: 20
        }
      }),
    });
    
    const prediction = await response.json();
    return await this.waitForCompletion(prediction.id);
  }
}
```

### 2.3 数据库设计

#### 2.3.1 数据库表结构
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

-- 索引
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_processing_tasks_user_id ON processing_tasks(user_id);
CREATE INDEX idx_processing_tasks_status ON processing_tasks(status);
CREATE INDEX idx_user_artworks_user_id ON user_artworks(user_id);
CREATE INDEX idx_user_artworks_public ON user_artworks(is_public) WHERE is_public = true;
```

### 2.4 文件存储方案

#### 2.4.1 Cloudflare R2配置
```typescript
// src/lib/storage.ts
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export class StorageService {
  private s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      region: 'auto',
      endpoint: `https://${env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: env.R2_ACCESS_KEY_ID,
        secretAccessKey: env.R2_SECRET_ACCESS_KEY,
      },
    });
  }

  async uploadImage(file: File, path: string): Promise<string> {
    const key = `${path}/${Date.now()}-${file.name}`;
    
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: env.R2_BUCKET_NAME,
        Key: key,
        Body: file.stream(),
        ContentType: file.type,
        Metadata: {
          'uploaded-by': 'photo-style-app',
          'upload-date': new Date().toISOString(),
        },
      })
    );

    return `${env.R2_PUBLIC_URL}/${key}`;
  }

  async deleteImage(url: string): Promise<void> {
    const key = url.replace(`${env.R2_PUBLIC_URL}/`, '');
    await this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: env.R2_BUCKET_NAME,
        Key: key,
      })
    );
  }
}
```

### 2.5 部署和运维

#### 2.5.1 Vercel部署配置
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["hnd1", "sfo1", "fra1"],
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "@supabase-url",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@supabase-anon-key",
    "SUPABASE_SERVICE_ROLE_KEY": "@supabase-service-key",
    "REPLICATE_API_TOKEN": "@replicate-token",
    "R2_ACCESS_KEY_ID": "@r2-access-key",
    "R2_SECRET_ACCESS_KEY": "@r2-secret-key"
  },
  "functions": {
    "src/api/process/*.ts": {
      "maxDuration": 300
    }
  }
}
```

#### 2.5.2 Cloudflare Workers部署
```toml
# wrangler.toml
name = "photo-style-api"
main = "src/worker.ts"
compatibility_date = "2024-01-01"

[env.production]
vars = { ENVIRONMENT = "production" }

[[env.production.kv_namespaces]]
binding = "CACHE"
id = "your-kv-namespace-id"

[env.production.r2_buckets]
binding = "IMAGES"
bucket_name = "photo-style-images"
```

#### 2.5.3 监控和日志
```typescript
// src/lib/monitoring.ts
import * as Sentry from '@sentry/node';

export class MonitoringService {
  static init() {
    Sentry.init({
      dsn: env.SENTRY_DSN,
      environment: env.NODE_ENV,
      tracesSampleRate: 1.0,
    });
  }

  static async logProcessingEvent(
    eventType: string,
    taskId: string,
    metadata: any
  ) {
    // 发送到分析服务
    await fetch(`${env.ANALYTICS_API_URL}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: eventType,
        taskId,
        timestamp: new Date().toISOString(),
        metadata
      })
    });
  }

  static trackError(error: Error, context: any) {
    Sentry.captureException(error, { extra: context });
  }
}
```

## 3. 成本估算和扩展计划

### 3.1 MVP阶段成本预估（月）
- **Vercel Pro**: $20
- **Supabase Pro**: $25  
- **Cloudflare R2**: $15 (1TB存储 + 请求费用)
- **Replicate API**: $100-300 (基于使用量)
- **其他服务**: $40 (域名、监控等)
- **总计**: ~$200-400/月

### 3.2 扩展阶段优化
- **自托管AI模型**: 减少API调用成本
- **CDN优化**: 提升全球访问速度
- **数据库分片**: 支持更大用户量
- **微服务拆分**: 独立的处理服务

这个技术方案既能满足初期快速上线的需求，又为后续扩展预留了足够的空间。通过使用现代化的云原生技术栈，可以确保系统的高可用性和可扩展性。 