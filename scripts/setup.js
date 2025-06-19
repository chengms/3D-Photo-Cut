#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 开始初始化 3D照片风格化平台项目...\n');

// 1. 安装依赖
console.log('📦 安装项目依赖...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ 依赖安装完成\n');
} catch (error) {
  console.error('❌ 依赖安装失败:', error.message);
  process.exit(1);
}

// 2. 创建必要的目录结构
console.log('📁 创建目录结构...');
const directories = [
  'src/app/(auth)',
  'src/app/(dashboard)',
  'src/app/api/auth',
  'src/app/api/templates',
  'src/app/api/upload',
  'src/app/api/process',
  'src/components/ui',
  'src/components/layout',
  'src/components/sections',
  'src/components/templates',
  'src/components/upload',
  'src/components/processing',
  'src/lib',
  'src/store',
  'src/types',
  'public/images',
  'public/templates'
];

directories.forEach(dir => {
  const fullPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✅ 创建目录: ${dir}`);
  }
});

// 3. 创建环境变量文件
console.log('\n🔧 创建环境配置文件...');
const envContent = `# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-key

# Cloudflare R2
R2_ACCESS_KEY_ID=your-r2-access-key
R2_SECRET_ACCESS_KEY=your-r2-secret-key
R2_BUCKET_NAME=photo-style-images
R2_ENDPOINT=https://your-account-id.r2.cloudflarestorage.com
R2_PUBLIC_URL=https://your-bucket.r2.dev

# AI服务
REPLICATE_API_TOKEN=your-replicate-token
HUGGINGFACE_API_TOKEN=your-hf-token

# 支付
STRIPE_SECRET_KEY=sk_test_your-stripe-secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-public
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret

# 认证
NEXTAUTH_SECRET=your-auth-secret
NEXTAUTH_URL=http://localhost:3000

# 监控
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn

# 其他
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
`;

if (!fs.existsSync('.env.local')) {
  fs.writeFileSync('.env.local', envContent);
  console.log('✅ 创建 .env.local 文件');
}

// 4. 创建PostCSS配置
console.log('\n🎨 创建样式配置...');
const postcssConfig = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`;

if (!fs.existsSync('postcss.config.js')) {
  fs.writeFileSync('postcss.config.js', postcssConfig);
  console.log('✅ 创建 postcss.config.js');
}

// 5. 创建 .gitignore
const gitignoreContent = `# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Next.js
.next/
out/

# Production
build/
dist/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Temporary files
tmp/
temp/
`;

if (!fs.existsSync('.gitignore')) {
  fs.writeFileSync('.gitignore', gitignoreContent);
  console.log('✅ 创建 .gitignore');
}

console.log('\n🎉 项目初始化完成！');
console.log('\n📋 下一步操作:');
console.log('1. 编辑 .env.local 文件，填入您的 API 密钥');
console.log('2. 运行 npm run dev 启动开发服务器');
console.log('3. 访问 http://localhost:3000 查看应用');
console.log('\n📚 查看文档:');
console.log('- REQUIREMENTS.md - 产品需求文档');
console.log('- TECHNICAL_ARCHITECTURE.md - 技术架构');
console.log('- IMPLEMENTATION_GUIDE.md - 实施指南');
console.log('- README.md - 项目说明'); 