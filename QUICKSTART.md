# Quick Start Guide

Get the x402 website running locally in under 2 minutes.

## Prerequisites

- Node.js 18 or later
- npm or yarn

## Installation

```bash
# Navigate to project directory
cd /Users/bober4ik/WebstormProjects/solana-x402/x402-website

# Install dependencies (if not already done)
npm install
```

## Development

```bash
# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Pages

- `/` - Homepage
- `/docs` - Documentation hub
- `/docs/getting-started` - Getting started guide
- `/architecture` - Technical architecture
- `/examples` - Code examples
- `/hackathon` - Hackathon submission

## Making Changes

### Edit Content

All page content is in `app/` directory:
- Homepage: `app/page.tsx`
- Docs: `app/docs/page.tsx`
- Other pages: `app/{page-name}/page.tsx`

### Edit Components

Reusable components are in `components/`:
- Header: `components/Header.tsx`
- Footer: `components/Footer.tsx`
- Button: `components/Button.tsx`
- Card: `components/Card.tsx`
- CodeBlock: `components/CodeBlock.tsx`

### Edit Styles

- Global styles: `app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Use Tailwind utility classes in components

### Add New Pages

1. Create new directory in `app/`: `app/new-page/`
2. Add `page.tsx`: `app/new-page/page.tsx`
3. The route is automatically available at `/new-page`

Example:
```tsx
export default function NewPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="mx-auto max-w-4xl px-6">
        <h1 className="text-4xl font-bold mb-4">New Page</h1>
        <p>Content goes here</p>
      </div>
    </div>
  );
}
```

## Build for Production

```bash
# Create production build
npm run build

# Test production build locally
npm start
```

Production build will be in `.next/` directory.

## Deploy

### Deploy to Vercel (Easiest)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Your site is live! Vercel URL will be provided.

### Other Options

See `DEPLOYMENT.md` for detailed deployment guides for:
- Netlify
- Railway
- DigitalOcean
- AWS Amplify
- Docker

## Project Structure Quick Reference

```
x402-website/
├── app/                    # Pages (Next.js App Router)
│   ├── page.tsx            # Homepage
│   ├── layout.tsx          # Root layout
│   ├── globals.css         # Global styles
│   └── {page}/page.tsx     # Other pages
├── components/             # Reusable components
├── public/                 # Static files
├── package.json            # Dependencies
├── tailwind.config.ts      # Tailwind config
└── tsconfig.json           # TypeScript config
```

## Common Tasks

### Add a New Component

1. Create file in `components/`: `components/MyComponent.tsx`
2. Export default function:
```tsx
export default function MyComponent() {
  return <div>My Component</div>;
}
```
3. Import in pages: `import MyComponent from "@/components/MyComponent";`

### Update Navigation

Edit `components/Header.tsx`:
```tsx
const navigation = [
  { name: "Docs", href: "/docs" },
  { name: "New Link", href: "/new-page" }, // Add this
];
```

### Change Colors

Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: "#2563EB",    // Change blue color
  // ... other colors
}
```

### Add Code Example

Use CodeBlock component:
```tsx
import CodeBlock from "@/components/CodeBlock";

<CodeBlock
  code={`const example = "code here";`}
  language="typescript"
/>
```

## Troubleshooting

### Port 3000 already in use
```bash
# Use different port
PORT=3001 npm run dev
```

### Build errors
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### TypeScript errors
```bash
# Check types
npx tsc --noEmit
```

## Getting Help

- Read `README.md` for full documentation
- Check `DEPLOYMENT.md` for deployment help
- Review `PROJECT_SUMMARY.md` for project overview
- Open issue on GitHub

## Next Steps

1. Explore the codebase
2. Make your changes
3. Test locally with `npm run dev`
4. Build for production with `npm run build`
5. Deploy to your platform of choice

---

You're ready to go! Happy coding!
