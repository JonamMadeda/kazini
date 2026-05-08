# Kazini - Career Opportunity Discovery Platform

A modern, AI-ready internship and career opportunity aggregation platform built with Next.js, TypeScript, Tailwind CSS, and PostgreSQL.

![Kazini](https://img.shields.io/badge/Version-1.0.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![License](https://img.shields.io/badge/License-MIT-green)

## 🌟 Features

- **Smart Job Aggregation** - Scrapes real opportunities from multiple sources
- **Advanced Search & Filtering** - Filter by type, location, skills, education
- **Responsive Design** - Works on mobile, tablet, and desktop
- **Real-time Updates** - Automatic scraping every hour
- **PostgreSQL Database** - Powered by Prisma ORM
- **SEO Optimized** - Ready for search engines

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Setup database (requires PostgreSQL)
# 1. Copy .env.example to .env
# 2. Configure DATABASE_URL
npx prisma generate
npx prisma db push

# Run development server
npm run dev
```

## 📦 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** ShadCN UI / Radix
- **Database:** PostgreSQL + Prisma
- **Deployment:** Vercel

## 📁 Project Structure

```
kazini/
├── app/              # Next.js pages
│   ├── page.tsx      # Homepage
│   ├── search/       # Search page
│   ├── opportunities/# Job details
│   └── api/          # API routes
├── components/       # React components
│   ├── ui/          # UI primitives
│   ├── layout/      # Navbar, Footer
│   └── features/    # Feature components
├── lib/             # Utilities
│   ├── prisma.ts    # Database client
│   └── scrapers/    # Job scrapers
├── prisma/          # Database schema
└── public/          # Static assets
```

## 🔧 Configuration

Create `.env` file:

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
```

## 🌐 Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/JonamMadeda/kazini)

## 📝 License

MIT License - feel free to use this project!

---

Built with ❤️ for African Career Opportunities