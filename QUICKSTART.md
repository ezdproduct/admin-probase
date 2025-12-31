# 🎯 QUICK START - Deploy to Vercel

## TL;DR - Nhanh nhất

### Windows:
```powershell
.\deploy.ps1
```

### Linux/Mac:
```bash
chmod +x deploy.sh
./deploy.sh
```

---

## Manual Steps (Nếu không dùng script)

### 1️⃣ Setup Environment Variables (2 phút)

```bash
# Copy template
cp .env.example .env.local

# Edit .env.local và thêm:
# NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 2️⃣ Test Build Locally (3 phút)

```bash
# Install dependencies
npm install

# Type check
npm run type-check

# Build
npm run build

# Test production build
npm run start
```

### 3️⃣ Push to GitHub (1 phút)

```bash
git add .
git commit -m "Production ready - optimized for Vercel"
git push origin main
```

### 4️⃣ Deploy to Vercel (5 phút)

**Option A: Via Dashboard (Recommended)**

1. Go to [Vercel Dashboard](https://vercel.com/new)
2. Click **"Add New..."** → **"Project"**
3. Import: `git@github.com:ezdproduct/admin-probase.git`
4. Framework: Next.js (auto-detected)
5. Add Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Click **"Deploy"**
7. ✅ Done!

**Option B: Via CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

---

## 📋 Checklist nhanh

- [ ] `.env.local` đã được tạo và config
- [ ] `npm run build` thành công
- [ ] Code đã push lên GitHub
- [ ] Environment variables đã add trong Vercel
- [ ] Deploy thành công
- [ ] Test production URL

---

## 🆘 Troubleshooting

### Build failed?
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Environment variables không work?
- Đảm bảo bắt đầu với `NEXT_PUBLIC_`
- Redeploy sau khi add env vars

### Supabase connection error?
- Check URL và anon key
- Verify Supabase project đang active

---

## 📚 Full Documentation

- **README.md** - Tổng quan project
- **DEPLOYMENT.md** - Hướng dẫn chi tiết (Vietnamese)
- **CHECKLIST.md** - Checklist đầy đủ
- **OPTIMIZATION_SUMMARY.md** - Tổng hợp tối ưu hóa

---

## ⚡ Performance Tips

✅ Region: Singapore (sin1) - optimal cho Vietnam
✅ Image optimization: AVIF/WebP
✅ Security headers: Enabled
✅ Compression: Enabled
✅ Build mode: Standalone

---

## 🎉 That's it!

Total time: ~10-15 phút

**Repository**: git@github.com:ezdproduct/admin-probase.git

**Status**: ✅ READY TO DEPLOY
