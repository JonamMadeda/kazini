# Kazini - Career Opportunity Discovery Platform

## Project Overview

**Project Name:** Kazini
**Type:** Web Application (Next.js SaaS Platform)
**Core Functionality:** AI-ready internship and career opportunity aggregation platform with intelligent search, filtering, and user management.
**Target Users:** Students, graduates, professionals, and career seekers in Africa and globally.

---

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** ShadCN UI + Radix primitives
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js
- **Animations:** Framer Motion
- **Deployment:** Vercel

---

## Brand Identity

### Colors
- **Primary:** White (#FFFFFF)
- **Secondary:** Dark Navy (#000047)
- **Accent:** Electric Blue (#0066FF)
- **Success:** Emerald (#10B981)
- **Warning:** Amber (#F59E0B)
- **Error:** Rose (#F43F5E)
- **Muted:** Slate (#64748B)

### Typography
- **Headings:** Inter (Bold/SemiBold)
- **Body:** Inter (Regular/Medium)
- **Monospace:** JetBrains Mono (for code/technical content)

### Design Philosophy
- Minimal, clean, premium aesthetic
- Whitespace-heavy layouts
- Subtle shadows and rounded corners (8-16px radius)
- Glassmorphism used sparingly
- Smooth animations and transitions

---

## Page Structure

### 1. Homepage (`/`)
- **Hero Section:** Large search bar with tagline "Discover Your Next Career"
- **Featured Opportunities:** Grid of top opportunities
- **Trending Skills:** Popular skill tags
- **Popular Categories:** Internship, Jobs, Remote, Graduate Programs
- **Featured Companies:** Company logos grid
- **Stats Section:** Number of opportunities, companies, categories
- **CTA Sections:** Sign up and explore calls-to-action
- **Footer:** Links, social media, newsletter

### 2. Search Results (`/search`)
- **Search Bar:** Full-width search with filters
- **Filter Sidebar:** Skills, Education, Experience, Location, Type
- **Results Grid:** Opportunity cards with pagination
- **Sort Options:** Recent, Relevance, Salary

### 3. Opportunity Details (`/opportunities/[id]`)
- **Header:** Title, company, location, type
- **Metadata:** Salary, posted date, deadline
- **Description:** Full job description with formatting
- **Requirements:** Skills, education, experience
- **Actions:** Apply, Save, Share
- **Sidebar:** Similar opportunities, company info

### 4. User Dashboard (`/dashboard`)
- **Overview:** Saved opportunities, applications
- **Saved:** Bookmarked opportunities
- **Applications:** Application tracking
- **Preferences:** Profile settings

### 5. Admin Dashboard (`/admin`)
- **Overview:** Stats, charts, recent activity
- **Opportunities:** Manage listings, approve/reject
- **Sources:** Manage scraper sources
- **Users:** User management
- **Analytics:** Platform analytics

### 6. Auth Pages (`/auth/signin`, `/auth/signup`)
- **Sign In:** Email/password, social login
- **Sign Up:** Registration with profile setup

---

## Components

### Core Components
1. **Button** - Primary, secondary, outline, ghost variants
2. **Input** - Text, email, password with states
3. **Card** - Opportunity card, stats card, feature card
4. **Badge** - Skill tags, status indicators
5. **Avatar** - User avatar, company logo
6. **Dropdown** - Select menus, filter dropdowns
7. **Modal** - Dialogs, confirmations
8. **Toast** - Notifications, alerts
9. **Skeleton** - Loading states
10. **Tabs** - Category navigation
11. **Pagination** - Page navigation
12. **SearchBar** - Search with autocomplete
13. **FilterPanel** - Advanced filters
14. **OpportunityCard** - Listing card component
15. **StatsCard** - Dashboard statistics

### Layout Components
1. **Navbar** - Main navigation with auth
2. **Footer** - Site footer with links
3. **Sidebar** - Admin sidebar
4. **Container** - Max-width wrapper
5. **Grid** - Responsive grid system

---

## Database Schema (Prisma)

### Models
- **User** - id, email, name, password, role, profile, createdAt
- **Opportunity** - id, title, company, description, location, type, salary, requirements, source, postedAt
- **Company** - id, name, logo, website, description
- **Skill** - id, name, category, slug
- **Category** - id, name, slug, type
- **SavedOpportunity** - userId, opportunityId
- **Application** - userId, opportunityId, status
- **SearchHistory** - userId, query, filters
- **Source** - id, name, url, type, status
- **ScraperLog** - sourceId, status, message, timestamp

---

## API Routes

### Auth
- POST `/api/auth/register`
- POST `/api/auth/login`
- POST `/api/auth/logout`

### Opportunities
- GET `/api/opportunities` - List with filters
- GET `/api/opportunities/[id]` - Single opportunity
- POST `/api/opportunities` - Create (admin)
- PUT `/api/opportunities/[id]` - Update (admin)
- DELETE `/api/opportunities/[id]` - Delete (admin)

### Users
- GET `/api/users/me` - Current user
- PUT `/api/users/me` - Update profile
- GET `/api/users/me/saved` - Saved opportunities
- POST `/api/users/me/saved` - Save opportunity
- DELETE `/api/users/me/saved/[id]` - Unsave

### Admin
- GET `/api/admin/overview` - Dashboard stats
- GET `/api/admin/opportunities` - Manage opportunities
- GET `/api/admin/sources` - Manage sources
- GET `/api/admin/logs` - Scraper logs

---

## Acceptance Criteria

### Homepage
- [ ] Hero section displays with search bar
- [ ] Search returns results
- [ ] Featured opportunities display
- [ ] Trending skills show
- [ ] Categories navigation works
- [ ] Footer displays correctly

### Search
- [ ] Search input works with autocomplete
- [ ] Filters update results instantly
- [ ] Pagination works
- [ ] Results display in cards
- [ ] Sort options work

### Opportunity Details
- [ ] Full details display
- [ ] Save/bookmark works
- [ ] Share functionality works
- [ ] Similar opportunities show

### User System
- [ ] Sign up works
- [ ] Sign in works
- [ ] Dashboard shows saved opportunities
- [ ] Profile can be updated

### Admin
- [ ] Admin dashboard shows stats
- [ ] Opportunity management works
- [ ] Source monitoring works

### Performance
- [ ] Page loads under 3 seconds
- [ ] No console errors
- [ ] Responsive on all breakpoints
- [ ] SEO meta tags present

---

## File Structure

```
kazini/
├── app/
│   ├── (auth)/
│   │   ├── signin/
│   │   └── signup/
│   ├── (main)/
│   │   ├── search/
│   │   └── opportunities/
│   ├── (dashboard)/
│   │   └── dashboard/
│   ├── (admin)/
│   │   └── admin/
│   ├── api/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   ├── layout/
│   └── features/
├── lib/
├── prisma/
├── public/
└── styles/
```

---

## Implementation Priority

1. Project setup and configuration
2. Design system and theme
3. Core UI components
4. Homepage with search
5. Search results page
6. Opportunity details page
7. Authentication system
8. User dashboard
9. Admin dashboard
10. API routes
11. SEO and metadata
12. Polish and optimization