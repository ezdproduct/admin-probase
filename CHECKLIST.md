# ✅ Pre-Deployment Checklist

Sử dụng checklist này trước khi deploy lên Vercel để đảm bảo mọi thứ hoạt động tốt.

## 📋 Code Quality

- [ ] Code đã được format đúng
- [ ] Không có TypeScript errors
  ```bash
  npm run type-check
  ```
- [ ] Không có ESLint errors
  ```bash
  npm run lint
  ```
- [ ] Build thành công locally
  ```bash
  npm run build
  ```
- [ ] Test app ở production mode
  ```bash
  npm run start
  ```

## 🔐 Environment Variables

- [ ] File `.env.example` đã được tạo
- [ ] File `.env.local` có đầy đủ variables (không commit file này!)
- [ ] Đã chuẩn bị Supabase credentials:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 📁 Files & Configuration

- [ ] `next.config.ts` đã được tối ưu
- [ ] `vercel.json` đã được tạo
- [ ] `.vercelignore` đã được tạo
- [ ] `.gitignore` đã được cập nhật
- [ ] `package.json` có engines field
- [ ] `README.md` đã được cập nhật với hướng dẫn deployment

## 🔍 Code Review

- [ ] Không có console.log() trong production code
- [ ] Không có hardcoded secrets hoặc API keys
- [ ] Không có TODO comments quan trọng chưa xử lý
- [ ] Images đã được optimize
- [ ] Không có unused dependencies

## 🚀 Performance

- [ ] Images sử dụng Next.js Image component
- [ ] Components sử dụng dynamic imports nếu cần
- [ ] CSS đã được minify
- [ ] Không có memory leaks (check với React DevTools)

## 🔒 Security

- [ ] Authentication đang hoạt động
- [ ] Protected routes đã được implement
- [ ] CORS settings đúng trong Supabase
- [ ] Security headers đã được config trong `next.config.ts`
- [ ] Sensitive data không bị expose

## 📱 Testing

- [ ] Test trên Chrome
- [ ] Test trên Firefox
- [ ] Test trên Safari (nếu có)
- [ ] Test trên mobile devices
- [ ] Test responsive design
- [ ] Test dark mode (nếu có)

## 🗄️ Database

- [ ] Supabase project đang active
- [ ] Database schema đã được setup
- [ ] RLS (Row Level Security) policies đã được config
- [ ] Test data đã được import (nếu cần)

## 📊 Monitoring

- [ ] Đã setup Vercel Analytics (optional)
- [ ] Đã setup error tracking (optional)
- [ ] Đã có plan để monitor logs

## 🌐 Git & Version Control

- [ ] Code đã được commit
  ```bash
  git status
  git add .
  git commit -m "Ready for production"
  ```
- [ ] Code đã được push lên remote
  ```bash
  git push origin main
  ```
- [ ] Branch protection rules đã được setup (nếu cần)

## 📝 Documentation

- [ ] README.md có hướng dẫn đầy đủ
- [ ] DEPLOYMENT.md có hướng dẫn deploy
- [ ] Code comments đầy đủ cho phần phức tạp
- [ ] API documentation (nếu có)

## 🎯 Vercel Specific

- [ ] Đã có Vercel account
- [ ] Repository đã được connect với Vercel
- [ ] Build settings đúng:
  - Framework: Next.js
  - Build Command: `npm run build`
  - Output Directory: `.next`
- [ ] Environment variables đã được add trong Vercel Dashboard

## 🔄 Post-Deployment

Sau khi deploy, kiểm tra:

- [ ] Site loads successfully
- [ ] All pages accessible
- [ ] Authentication works
- [ ] Data loads from Supabase
- [ ] Images load correctly
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Performance acceptable (check Lighthouse)

## 🐛 Rollback Plan

- [ ] Biết cách rollback deployment trong Vercel
- [ ] Có backup của database (nếu cần)
- [ ] Có plan B nếu deployment fail

---

## Quick Commands

```bash
# Full check before deploy
npm run type-check && npm run lint && npm run build

# Clean install
rm -rf node_modules .next
npm install

# Test production build
npm run build && npm run start

# Deploy to Vercel
vercel --prod
```

---

**Khi tất cả đã được check ✅, bạn sẵn sàng để deploy! 🚀**
