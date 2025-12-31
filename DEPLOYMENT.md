# 🚀 Hướng dẫn Deploy lên Vercel

## Chuẩn bị trước khi deploy

### 1. Kiểm tra code
```bash
# Type check
npm run type-check

# Lint check
npm run lint

# Build locally để test
npm run build
```

### 2. Đảm bảo environment variables
Kiểm tra file `.env.local` có đầy đủ:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Phương pháp 1: Deploy qua Vercel Dashboard (Khuyến nghị)

### Bước 1: Push code lên Git
```bash
git add .
git commit -m "Ready for production deployment"
git push origin main
```

### Bước 2: Import vào Vercel
1. Truy cập [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import repository của bạn
4. Vercel sẽ tự động detect Next.js

### Bước 3: Configure Project
- **Framework Preset**: Next.js (auto-detected)
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `.next` (auto-detected)

### Bước 4: Thêm Environment Variables
Trong phần **Environment Variables**, thêm:

| Key | Value | Environment |
|-----|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://your-project.supabase.co` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `your-anon-key` | Production, Preview, Development |

### Bước 5: Deploy
Click **"Deploy"** và đợi vài phút!

## Phương pháp 2: Deploy qua Vercel CLI

### Bước 1: Install Vercel CLI
```bash
npm i -g vercel
```

### Bước 2: Login
```bash
vercel login
```

### Bước 3: Deploy
```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Bước 4: Set Environment Variables qua CLI
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
```

## Sau khi deploy

### 1. Kiểm tra deployment
- Mở URL được cung cấp bởi Vercel
- Test các chức năng chính:
  - [ ] Login
  - [ ] Load data từ Supabase
  - [ ] Navigation giữa các pages
  - [ ] Responsive design

### 2. Setup Custom Domain (Optional)
1. Vào **Settings** → **Domains**
2. Add domain của bạn
3. Configure DNS theo hướng dẫn

### 3. Monitor Performance
- Vào **Analytics** tab để xem performance metrics
- Check **Logs** nếu có lỗi

## Tối ưu hóa đã được áp dụng

✅ **Build Optimizations**
- Standalone output mode
- SWC compiler (default trong Next.js 16)
- CSS optimization
- Tree shaking

✅ **Image Optimizations**
- AVIF/WebP format support
- Responsive image sizes
- Lazy loading
- Cache TTL: 60s

✅ **Security Headers**
- HSTS (HTTP Strict Transport Security)
- X-Frame-Options
- X-Content-Type-Options
- XSS Protection
- Referrer Policy

✅ **Performance**
- Compression enabled
- DNS prefetch
- Region: Singapore (sin1) - tối ưu cho SEA

## Troubleshooting

### Build failed
```bash
# Clear cache và rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Environment variables không hoạt động
- Đảm bảo variables bắt đầu với `NEXT_PUBLIC_`
- Redeploy sau khi thêm env vars
- Check trong Vercel Dashboard → Settings → Environment Variables

### Supabase connection error
- Verify Supabase URL và anon key
- Check Supabase project status
- Kiểm tra CORS settings trong Supabase

### 404 errors
- Đảm bảo routing đúng trong Next.js App Router
- Check file structure trong `src/app/`

## Rollback deployment

Nếu có vấn đề với deployment mới:

1. Vào **Deployments** tab
2. Tìm deployment trước đó hoạt động tốt
3. Click **"..."** → **"Promote to Production"**

## Auto-deployment

Vercel tự động deploy khi:
- Push code lên branch `main` → Production
- Push code lên branch khác → Preview deployment
- Tạo Pull Request → Preview deployment với comment

Để tắt auto-deployment cho một commit:
```bash
git commit -m "your message [skip ci]"
```

## Monitoring & Analytics

### Vercel Analytics
- Vào **Analytics** để xem:
  - Page views
  - Unique visitors
  - Top pages
  - Performance metrics

### Vercel Speed Insights
- Real User Monitoring (RUM)
- Core Web Vitals
- Performance scores

## Best Practices

1. **Always test locally trước khi deploy**
   ```bash
   npm run build
   npm run start
   ```

2. **Use Preview Deployments**
   - Test features trên preview URL trước khi merge vào main

3. **Monitor logs**
   - Check Vercel logs thường xuyên
   - Setup notifications cho errors

4. **Keep dependencies updated**
   ```bash
   npm outdated
   npm update
   ```

5. **Security**
   - Không commit `.env.local`
   - Rotate API keys định kỳ
   - Review Vercel security recommendations

## Chi phí

- **Hobby Plan** (Free):
  - Unlimited deployments
  - 100GB bandwidth/month
  - Serverless Functions: 100GB-Hrs

- **Pro Plan** ($20/month):
  - 1TB bandwidth
  - Advanced analytics
  - Team collaboration

## Liên hệ & Support

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Support](https://vercel.com/support)
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)

---

**Chúc bạn deploy thành công! 🎉**
