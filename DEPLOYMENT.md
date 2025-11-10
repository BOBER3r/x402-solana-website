# Deployment Guide

This guide covers deploying the x402 website to various platforms.

## Quick Deploy to Vercel (Recommended)

Vercel is the easiest and fastest way to deploy Next.js applications.

### Option 1: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
cd /Users/bober4ik/WebstormProjects/solana-x402/x402-website
vercel

# For production deployment
vercel --prod
```

### Option 2: Deploy via GitHub

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Vercel will auto-detect Next.js and configure everything
6. Click "Deploy"

Your site will be live at: `https://your-project.vercel.app`

### Custom Domain on Vercel

1. Go to your project settings on Vercel
2. Navigate to "Domains"
3. Add your custom domain (e.g., x402.dev)
4. Follow DNS configuration instructions
5. SSL certificate will be automatically provisioned

## Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Build the project
npm run build

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

Or connect your GitHub repository via Netlify's web interface.

Build settings:
- Build command: `npm run build`
- Publish directory: `.next`
- Functions directory: (leave empty)

## Deploy to Railway

1. Install Railway CLI:
```bash
npm install -g railway
```

2. Login and deploy:
```bash
railway login
railway init
railway up
```

Or use Railway's GitHub integration:
1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Railway auto-detects Next.js
5. Deploy!

## Deploy to DigitalOcean App Platform

1. Push code to GitHub
2. Go to DigitalOcean App Platform
3. Create new app from GitHub repo
4. Configure:
   - Build command: `npm run build`
   - Run command: `npm start`
   - HTTP Port: 3000
5. Deploy

## Deploy to AWS Amplify

1. Push code to GitHub
2. Go to AWS Amplify Console
3. Connect your GitHub repository
4. Configure build settings:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```
5. Deploy

## Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

Build and run:
```bash
docker build -t x402-website .
docker run -p 3000:3000 x402-website
```

## Environment Variables

No environment variables are required for this static website. All content is hardcoded for the hackathon submission.

If you add dynamic features later, create a `.env.local` file:
```bash
# Example for future use
NEXT_PUBLIC_API_URL=https://api.x402.dev
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

## Performance Optimization

The website is already optimized with:
- Static page generation
- Automatic code splitting
- Image optimization (when images are added)
- Font optimization
- Minified CSS and JS

### Additional Optimizations

1. **Enable Caching**:
   Add to `next.config.mjs`:
   ```javascript
   const nextConfig = {
     reactStrictMode: true,
     swcMinify: true,
     headers: async () => [
       {
         source: '/:all*(svg|jpg|png)',
         headers: [
           {
             key: 'Cache-Control',
             value: 'public, max-age=31536000, immutable',
           },
         ],
       },
     ],
   };
   ```

2. **Add Analytics**:
   - Vercel Analytics: Enable in Vercel dashboard
   - Google Analytics: Add to `layout.tsx`
   - Plausible: Add script tag to `layout.tsx`

3. **Add Sitemap**:
   Create `app/sitemap.ts`:
   ```typescript
   export default function sitemap() {
     return [
       {
         url: 'https://x402.dev',
         lastModified: new Date(),
       },
       {
         url: 'https://x402.dev/docs',
         lastModified: new Date(),
       },
       // ... other pages
     ];
   }
   ```

## DNS Configuration

If using a custom domain (e.g., x402.dev):

### For Vercel:
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### For Cloudflare (with proxy):
1. Add A record pointing to your host
2. Enable Cloudflare proxy (orange cloud)
3. Configure SSL/TLS to "Full"
4. Enable "Always Use HTTPS"

## Monitoring

### Vercel
- Built-in analytics available in dashboard
- Real-time logs
- Performance metrics

### External Services
- **Uptime Monitoring**: UptimeRobot, Pingdom
- **Error Tracking**: Sentry
- **Analytics**: Google Analytics, Plausible, Fathom

## Troubleshooting

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

### 404 Errors
- Ensure all pages are in the `app/` directory
- Check file naming conventions
- Verify Next.js routing structure

### Slow Performance
- Check Lighthouse scores
- Enable compression on your hosting platform
- Use CDN for static assets
- Enable HTTP/2

## Production Checklist

- [ ] Build completes successfully (`npm run build`)
- [ ] All pages load correctly in production mode
- [ ] Links work across all pages
- [ ] Mobile responsive design verified
- [ ] SEO meta tags present
- [ ] SSL certificate active
- [ ] Custom domain configured (if applicable)
- [ ] Analytics installed (if needed)
- [ ] Error monitoring setup (optional)
- [ ] Uptime monitoring configured (optional)

## Post-Deployment

1. Test all pages on production URL
2. Verify mobile responsiveness
3. Check page load speeds (should be <2s)
4. Test all links
5. Verify syntax highlighting in code blocks
6. Check animations work smoothly

## Support

For deployment issues:
- Next.js Docs: https://nextjs.org/docs
- Vercel Support: https://vercel.com/support
- GitHub Issues: Open an issue in the repo

---

The website is now production-ready and can be deployed to any platform supporting Next.js!
