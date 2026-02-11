# Thalia - Smart Agriculture Platform for Nepalese Farmers

A modern web application built with Next.js 14 that empowers Nepalese farmers with real-time market prices, weather forecasts, and agricultural insights.

## Features

- 🌾 Real-time crop market prices across Nepal
- 🌤️ Weather forecasts by district
- 📊 Dashboard for tracking expenses and yields
- 🗺️ Interactive Nepal map with district information
- 🌐 Bilingual support (English/Nepali)
- 🔐 Secure authentication with NextAuth.js
- 📱 Responsive design for mobile and desktop

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui + Radix UI
- **Database:** Prisma ORM with SQLite (dev)
- **Authentication:** NextAuth.js v5
- **Charts:** Recharts
- **Animations:** Framer Motion
- **Icons:** Lucide React

## Project Structure

```
thalia/
├── prisma/
│   ├── schema.prisma      # Database schema
│   ├── seed.ts            # Database seeding
│   └── dev.db             # SQLite database
├── public/                # Static assets
├── src/
│   ├── actions/           # Server actions
│   │   ├── login.ts
│   │   └── register.ts
│   ├── app/               # Next.js app router
│   │   ├── (dashboard)/   # Dashboard routes
│   │   ├── (marketing)/   # Public routes
│   │   ├── api/           # API routes
│   │   └── layout.tsx
│   ├── components/
│   │   ├── auth/          # Authentication components
│   │   ├── dashboard/     # Dashboard components
│   │   ├── home/          # Landing page components
│   │   ├── layout/        # Layout components (Navbar, Footer)
│   │   └── ui/            # shadcn/ui components
│   ├── contexts/          # React contexts
│   │   └── LanguageContext.tsx
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── schemas/           # Zod validation schemas
│   ├── auth.ts            # NextAuth configuration
│   ├── auth.config.ts     # Auth config
│   ├── middleware.ts      # Next.js middleware
│   └── routes.ts          # Route definitions
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd thalia
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your configuration:
```env
DATABASE_URL="file:./dev.db"
AUTH_SECRET="your-secret-key"
```

4. Initialize the database:
```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## API Routes

- `GET /api/districts` - Fetch all districts
- `GET /api/crops` - Fetch all crops
- `GET /api/market-prices` - Fetch market prices
- `GET /api/weather?districtId=<id>` - Fetch weather data
- `GET /api/expenses` - Fetch user expenses (authenticated)
- `POST /api/expenses` - Create expense (authenticated)
- `GET /api/yields` - Fetch user yields (authenticated)
- `POST /api/yields` - Create yield record (authenticated)
- `GET /api/alerts` - Fetch user alerts (authenticated)
- `PATCH /api/alerts` - Update alert status (authenticated)

## Database Schema

The application uses Prisma with the following main models:

- **User** - User accounts
- **FarmProfile** - Farm information
- **District** - Nepal districts
- **Crop** - Crop information
- **MarketPrice** - Real-time market prices
- **Weather** - Weather data by district
- **Expense** - Farm expenses
- **Yield** - Harvest records
- **Alert** - User notifications

## Language Support

The application supports English and Nepali languages. Use the language toggle in the navigation bar to switch between languages.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Components

UI components are built with shadcn/ui. To add a new component:

```bash
npx shadcn@latest add <component-name>
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Acknowledgments

- Built with [Next.js](https://nextjs.org)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)
