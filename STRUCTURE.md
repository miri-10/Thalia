# Thalia Project Structure

This document provides a detailed overview of the project's folder structure and organization.

## Root Directory

```
thalia/
├── .git/                  # Git version control
├── .next/                 # Next.js build output (auto-generated)
├── node_modules/          # Dependencies (auto-generated)
├── prisma/                # Database schema and migrations
├── public/                # Static assets
├── src/                   # Source code
├── .env                   # Environment variables (not in git)
├── .env.example           # Environment variables template
├── .gitignore             # Git ignore rules
├── components.json        # shadcn/ui configuration
├── eslint.config.mjs      # ESLint configuration
├── next.config.ts         # Next.js configuration
├── next-env.d.ts          # Next.js TypeScript declarations
├── package.json           # Project dependencies and scripts
├── postcss.config.mjs     # PostCSS configuration
├── README.md              # Project documentation
├── STRUCTURE.md           # This file
├── tailwind.config.ts     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## Source Directory (`src/`)

### Actions (`src/actions/`)
Server actions for form handling and data mutations.

```
src/actions/
├── login.ts               # Login authentication logic
└── register.ts            # User registration logic
```

### App Router (`src/app/`)
Next.js 14 App Router structure with route groups.

```
src/app/
├── (dashboard)/           # Protected dashboard routes
│   ├── dashboard/
│   │   └── page.tsx       # Main dashboard page
│   └── layout.tsx         # Dashboard layout with sidebar
│
├── (marketing)/           # Public marketing routes
│   ├── about/
│   │   └── page.tsx       # About page
│   ├── crops/
│   │   ├── page.tsx       # Crops listing
│   │   └── [crop]/
│   │       └── page.tsx   # Individual crop details
│   ├── districts/
│   │   ├── page.tsx       # Districts listing
│   │   └── [district]/
│   │       └── page.tsx   # Individual district details
│   ├── login/
│   │   └── page.tsx       # Login page
│   ├── signup/
│   │   └── page.tsx       # Signup page
│   ├── layout.tsx         # Marketing layout with navbar/footer
│   └── page.tsx           # Landing page
│
├── api/                   # API routes
│   ├── auth/
│   │   └── [...nextauth]/ # NextAuth.js authentication
│   ├── alerts/
│   │   └── route.ts       # Alerts API endpoints
│   ├── crops/
│   │   └── route.ts       # Crops API endpoints
│   ├── districts/
│   │   └── route.ts       # Districts API endpoints
│   ├── expenses/
│   │   └── route.ts       # Expenses API endpoints
│   ├── market-prices/
│   │   └── route.ts       # Market prices API endpoints
│   ├── weather/
│   │   └── route.ts       # Weather API endpoints
│   └── yields/
│       └── route.ts       # Yields API endpoints
│
├── error/
│   └── page.tsx           # Error page
├── favicon.ico            # Site favicon
├── globals.css            # Global styles and Tailwind
└── layout.tsx             # Root layout
```

### Components (`src/components/`)
Reusable React components organized by feature.

```
src/components/
├── auth/                  # Authentication components
│   ├── LogoutButton.tsx   # Logout functionality
│   └── UserButton.tsx     # User profile dropdown
│
├── dashboard/             # Dashboard-specific components
│   ├── DashboardWelcome.tsx  # Welcome card
│   ├── MarketOverview.tsx    # Market prices overview
│   └── WeatherCard.tsx       # Weather information card
│
├── home/                  # Landing page components
│   ├── Features.tsx       # Features section
│   ├── Hero.tsx           # Hero section
│   ├── NepalMap.tsx       # Interactive Nepal map
│   └── Stats.tsx          # Statistics section
│
├── layout/                # Layout components
│   ├── Footer.tsx         # Site footer
│   ├── LanguageToggle.tsx # Language switcher
│   └── Navbar.tsx         # Navigation bar
│
├── providers/             # React context providers
│   └── AuthProvider.tsx   # Authentication provider
│
└── ui/                    # shadcn/ui components
    ├── avatar.tsx
    ├── badge.tsx
    ├── button.tsx
    ├── calendar.tsx
    ├── card.tsx
    ├── dialog.tsx
    ├── dropdown-menu.tsx
    ├── form.tsx
    ├── input.tsx
    ├── label.tsx
    ├── popover.tsx
    ├── select.tsx
    ├── sheet.tsx
    ├── table.tsx
    └── tabs.tsx
```

### Contexts (`src/contexts/`)
React Context providers for global state management.

```
src/contexts/
└── LanguageContext.tsx    # Language/i18n context
```

### Hooks (`src/hooks/`)
Custom React hooks for reusable logic.

```
src/hooks/
├── use-current-user.ts    # Get current authenticated user
└── use-media-query.ts     # Responsive design utilities
```

### Library (`src/lib/`)
Utility functions and configurations.

```
src/lib/
├── db.ts                  # Prisma client instance
└── utils.ts               # Utility functions (cn, etc.)
```

### Schemas (`src/schemas/`)
Zod validation schemas for forms and API.

```
src/schemas/
└── index.ts               # Validation schemas
```

### Root Files (`src/`)
Configuration and middleware files.

```
src/
├── auth.config.ts         # NextAuth configuration
├── auth.ts                # NextAuth setup
├── middleware.ts          # Next.js middleware for auth
├── next-auth.d.ts         # NextAuth TypeScript types
└── routes.ts              # Route definitions and constants
```

## Database (`prisma/`)

```
prisma/
├── dev.db                 # SQLite database (development)
├── schema.prisma          # Database schema definition
└── seed.ts                # Database seeding script
```

### Database Models

- **User** - User accounts and authentication
- **FarmProfile** - Farm information linked to users
- **District** - Nepal districts with regional data
- **Crop** - Crop types and information
- **FarmCrop** - Junction table for farm-crop relationships
- **MarketPrice** - Real-time market prices for crops
- **Weather** - Weather data by district
- **Expense** - Farm expense tracking
- **Yield** - Harvest yield records
- **Alert** - User notifications and alerts
- **Chat** - Messaging between users

## Public Assets (`public/`)

```
public/
├── file.svg               # File icon
├── globe.svg              # Globe icon
├── next.svg               # Next.js logo
├── vercel.svg             # Vercel logo
└── window.svg             # Window icon
```

## Configuration Files

### TypeScript Configuration (`tsconfig.json`)
- Strict type checking enabled
- Path aliases configured (`@/*` → `src/*`)
- Next.js specific settings

### Tailwind Configuration (`tailwind.config.ts`)
- Custom color scheme (agriculture-themed green)
- shadcn/ui integration
- Custom border radius variables
- Dark mode support

### Next.js Configuration (`next.config.ts`)
- Image optimization settings
- Performance optimizations
- SWC minification enabled
- Package import optimizations

### ESLint Configuration (`eslint.config.mjs`)
- Next.js recommended rules
- TypeScript support

## Naming Conventions

### Files
- Components: PascalCase (e.g., `UserButton.tsx`)
- Utilities: kebab-case (e.g., `use-current-user.ts`)
- API routes: kebab-case (e.g., `market-prices/route.ts`)

### Folders
- Route groups: (parentheses) (e.g., `(dashboard)`)
- Dynamic routes: [brackets] (e.g., `[crop]`)
- Regular folders: kebab-case (e.g., `market-prices`)

### Components
- React components: PascalCase
- Hooks: camelCase with `use` prefix
- Constants: UPPER_SNAKE_CASE

## Development Workflow

1. **Local Development**: `npm run dev`
2. **Database Changes**: 
   - Update `prisma/schema.prisma`
   - Run `npx prisma db push`
   - Run `npx prisma generate`
3. **Adding UI Components**: `npx shadcn@latest add <component>`
4. **Linting**: `npm run lint`
5. **Building**: `npm run build`

## Best Practices

### Component Organization
- Keep components small and focused
- Use composition over inheritance
- Separate business logic into hooks
- Use server components by default, add "use client" only when needed

### API Routes
- Use proper HTTP methods (GET, POST, PATCH, DELETE)
- Implement proper error handling
- Return consistent response formats
- Add authentication checks where needed

### Database
- Use Prisma relations for data integrity
- Index frequently queried fields
- Use transactions for multi-step operations
- Seed database with realistic test data

### Styling
- Use Tailwind utility classes
- Follow the design system (colors, spacing)
- Ensure responsive design (mobile-first)
- Support dark mode where applicable

## Future Enhancements

Potential areas for expansion:
- Real-time WebSocket integration for live market prices
- Mobile app (React Native)
- Advanced analytics and reporting
- Integration with external weather APIs
- Multi-language support expansion
- Progressive Web App (PWA) features
