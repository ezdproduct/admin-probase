This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, copy the environment variables template:

```bash
cp .env.example .env.local
```

Update `.env.local` with your Supabase credentials:
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

Finally, run the development server:

```bash
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) with your browser to see the result.

## Project Structure

```
probase-admin/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── admins/       # Admin management
│   │   ├── agencies/     # Agency management
│   │   ├── apps/         # App management
│   │   ├── models/       # Model management
│   │   ├── users/        # User management
│   │   └── login/        # Authentication
│   ├── components/       # Reusable React components
│   └── lib/             # Utility functions and configurations
├── public/              # Static assets
└── scripts/             # Database import scripts
```

## Features

- 🔐 **Authentication**: Secure login with Supabase Auth
- 👥 **User Management**: Manage users, admins, and agencies
- 📱 **App Management**: Control applications and models
- 🎨 **Modern UI**: Built with Tailwind CSS and Radix UI
- 🚀 **Performance**: Optimized for production deployment

## Deploy on Vercel

### Quick Deploy

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ezdproduct/admin-probase)


### Manual Deployment Steps

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Connect to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

### Environment Variables on Vercel

After deploying, add these environment variables in your Vercel project settings:

1. Go to your project on [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

4. Redeploy to apply the changes:
   ```bash
   vercel --prod
   ```

### Production Optimizations

This project includes several production optimizations:

- ✅ **Standalone Output**: Minimal Docker-ready build
- ✅ **Image Optimization**: AVIF/WebP format support
- ✅ **Security Headers**: HSTS, CSP, and XSS protection
- ✅ **Compression**: Gzip/Brotli enabled
- ✅ **CSS Optimization**: Experimental CSS optimization
- ✅ **React Strict Mode**: Better error detection

### Performance Tips

1. **Region Selection**: The app is configured for Singapore region (`sin1`) for optimal performance in Southeast Asia. Change in `vercel.json` if needed.

2. **Caching**: Images are cached for 60 seconds minimum. Adjust in `next.config.ts` if needed.

3. **Build Optimization**: The project uses standalone output mode for faster cold starts.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Vercel Documentation](https://vercel.com/docs) - learn about Vercel deployment.
- [Supabase Documentation](https://supabase.com/docs) - learn about Supabase features.

## Troubleshooting

### Build Errors

If you encounter build errors:

1. Clear the build cache:
   ```bash
   rm -rf .next
   npm run build
   ```

2. Check environment variables are set correctly

3. Ensure all dependencies are installed:
   ```bash
   npm ci
   ```

### Runtime Errors

- Check browser console for errors
- Verify Supabase connection in Network tab
- Ensure environment variables are accessible (they should start with `NEXT_PUBLIC_`)

## License

This project is private and proprietary.

