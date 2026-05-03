# PROMICE Studios Website

A pixel-perfect, fully responsive single-page website for PROMICE Studios - a leading Visual Effects and Animation studio.

## Features

### Public Website
- **Responsive Design**: Works seamlessly across all devices (mobile, tablet, desktop)
- **Modern Tech Stack**: Built with Next.js 15, React 18, TypeScript, and Tailwind CSS
- **Smooth Animations**: Elegant hover effects and transitions
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Fast Performance**: Optimized with Next.js App Router
- **Dynamic Content**: Projects loaded from database

### Admin Dashboard
- **Secure Authentication**: Login system with NextAuth.js
- **Project Management**: Full CRUD operations for portfolio items
- **Real-time Updates**: Changes reflect immediately on the website
- **User-friendly Interface**: Intuitive dashboard for content management
- **Role-Based Access**: Protected admin routes
- **Image Management**: URL-based image uploads

## Sections

1. **Hero**: Stunning introduction with PROMICE logo and tagline
2. **Experience**: Showcases 8 years of successful experience
3. **Services**: Details of all VFX and production services
4. **Latest Projects**: Gallery of completed projects
5. **Upcoming Projects**: Showcase of projects in production
6. **Clients**: Logos of trusted clients and partners
7. **Contact**: Complete contact information and social links

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Update MongoDB connection string
   - Generate a secure `NEXTAUTH_SECRET`
   - Set admin credentials

3. Initialize the database:
```bash
# Start the dev server
npm run dev

# In another terminal, initialize admin user
curl -X POST http://localhost:3000/api/init
```

4. Open the application:
   - Main site: [http://localhost:3000](http://localhost:3000)
   - Admin login: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
   - Default credentials: `admin@promice.com` / `admin123`

### Build for Production

```bash
npm run build
npm start
```

## Design

The website is designed to match the PROMICE STUDIOS.pdf reference with:
- Brand color: #C8322C (Promice Red)
- Dark theme background: #0A0A0A
- Clean, modern typography
- Decorative corner accents
- Vertical branding element

## Admin Dashboard

### Access
- **URL**: `/admin/login`
- **Default Credentials**:
  - Email: `admin@promice.com`
  - Password: `admin123`

### Features
- Dashboard with statistics
- Add, edit, and delete projects
- Filter by category (Latest/Upcoming)
- Image URL management
- Publish/unpublish projects
- Order management

### Setup Guide
For detailed setup instructions, see [ADMIN_DASHBOARD_SETUP.md](ADMIN_DASHBOARD_SETUP.md)

## Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom React components
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast

### Backend
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **API**: Next.js API Routes
- **Security**: Bcrypt for password hashing

## Project Structure

```
├── app/
│   ├── admin/             # Admin dashboard
│   │   ├── dashboard/     # Dashboard page
│   │   ├── login/         # Login page
│   │   ├── projects/      # Projects management
│   │   └── layout.tsx     # Admin layout
│   ├── api/               # API routes
│   │   ├── auth/          # NextAuth endpoints
│   │   ├── projects/      # Projects CRUD API
│   │   └── init/          # Admin initialization
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── providers.tsx      # Auth & toast providers
│   └── page.tsx           # Home page
├── components/
│   ├── admin/             # Admin components
│   │   └── AdminNav.tsx   # Admin navigation
│   ├── Hero.tsx           # Hero section
│   ├── Experience.tsx     # Experience section
│   ├── Services.tsx       # Services section
│   ├── LatestProjects.tsx # Latest projects gallery (API)
│   ├── UpcomingProjects.tsx # Upcoming projects (API)
│   ├── Clients.tsx        # Clients section
│   └── Contact.tsx        # Contact section
├── lib/
│   ├── auth/              # Auth configuration
│   ├── models/            # MongoDB models
│   └── mongodb.ts         # Database connection
├── types/                 # TypeScript types
├── public/                # Static assets
└── middleware.ts          # Route protection
```

## Customization

- Update colors in `tailwind.config.ts`
- Modify global styles in `app/globals.css`
- Add project images in `public/images/`
- Update content in component files

## License

Copyright © 2025 PROMICE Studios. All rights reserved.
