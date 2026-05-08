# Kazini - Career Opportunity Discovery Platform

## Project Overview

- **Name:** Kazini
- **Type:** Next.js SaaS Web Application
- **Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, ShadCN UI, Prisma, PostgreSQL

## Quick Start

```bash
# Install dependencies
npm install

# Setup database (requires PostgreSQL)
# 1. Copy .env.example to .env and configure DATABASE_URL
# 2. npx prisma generate
# 3. npx prisma db push

# Run development server
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
kazini/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with Navbar/Footer
│   ├── page.tsx            # Homepage with hero, search, categories
│   ├── search/             # Search results with filters
│   ├── opportunities/      # Opportunity detail pages
│   └── auth/               # Sign in / Sign up pages
├── components/
│   ├── ui/                 # ShadCN-style UI components
│   ├── layout/             # Navbar, Footer
│   └── features/           # SearchBar, FilterPanel, OpportunityCard
├── lib/                    # Utilities
├── prisma/                 # Database schema
└── public/                 # Static assets
```

## Features Implemented

- Homepage with hero, search, categories, trending skills
- Advanced search with filters (type, work mode, education, skills)
- Opportunity cards with save/apply functionality
- Opportunity detail pages with similar opportunities
- Authentication pages (sign in/sign up)
- Responsive design with mobile support
- SEO-ready with metadata

## Next Steps

- Connect PostgreSQL database
- Add NextAuth.js authentication
- Create API routes
- Build user dashboard
- Build admin dashboard
- Set up scraper infrastructure