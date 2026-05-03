# Admin Dashboard Setup Guide

Complete guide to set up and use the PROMICE Studios Admin Dashboard.

## Features

- **Authentication System**: Secure login with NextAuth.js
- **Project Management**: Full CRUD operations for portfolio items
- **Real-time Updates**: Frontend automatically fetches from database
- **Role-Based Access**: Admin-only access to dashboard
- **Responsive Design**: Works on all devices
- **Image Support**: URL-based image uploads

## Prerequisites

- Node.js 18+ installed
- MongoDB database (local or MongoDB Atlas)
- npm or yarn package manager

## Installation Steps

### 1. Install Dependencies

Dependencies are already installed. If needed:
```bash
npm install
```

### 2. Set Up MongoDB

**Option A: Local MongoDB**
- Install MongoDB locally
- Start MongoDB service
- Database will be created automatically at: `mongodb://localhost:27017/promice-studios`

**Option B: MongoDB Atlas (Recommended)**
- Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a free cluster
- Get your connection string
- Replace in `.env.local`

### 3. Configure Environment Variables

The `.env.local` file has been created. Update these values:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/promice-studios
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/promice-studios

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production

# Admin Credentials
ADMIN_EMAIL=admin@promice.com
ADMIN_PASSWORD=admin123
```

**Generate a secure NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 4. Initialize Admin User

Before logging in for the first time, you need to create the admin user:

**Method 1: Using API Route**
```bash
# Start the dev server
npm run dev

# In another terminal, run:
curl -X POST http://localhost:3000/api/init
```

**Method 2: Using Browser**
- Start dev server: `npm run dev`
- Open: `http://localhost:3000/api/init` (POST request will create admin)
- You should see: `{"message":"Admin user created successfully"}`

### 5. Start the Development Server

```bash
npm run dev
```

The application will run on:
- Main site: http://localhost:3000
- Admin login: http://localhost:3000/admin/login

## Admin Dashboard Access

### Login Credentials

**Default credentials:**
- Email: `admin@promice.com`
- Password: `admin123`

**Important:** Change these credentials in production!

### Dashboard Routes

- **Login**: `/admin/login`
- **Dashboard**: `/admin/dashboard`
- **Projects Management**: `/admin/projects`

## Using the Dashboard

### 1. Dashboard Overview

After logging in, you'll see:
- Total projects count
- Latest projects count
- Upcoming projects count
- Quick action buttons

### 2. Managing Projects

#### Add New Project

1. Click "Add Project" button
2. Fill in the form:
   - **Title** (required): Project name
   - **Director** (required): Director name
   - **Language** (required): Language (e.g., Malayalam, Kannada)
   - **Studio** (required): Production studio
   - **Category** (required): "Latest" or "Upcoming"
   - **Image URL** (optional): Direct link to project poster
   - **Description** (optional): Project description
   - **Order** (optional): Display order (lower numbers appear first)
   - **Published**: Check to make visible on main site
3. Click "Create Project"

#### Edit Project

1. Navigate to Projects page
2. Find the project card
3. Click "Edit" button
4. Update fields as needed
5. Click "Update Project"

#### Delete Project

1. Find the project card
2. Click the trash icon
3. Confirm deletion

#### Filter Projects

Use the filter buttons:
- **All**: Show all projects
- **Latest**: Show only latest projects
- **Upcoming**: Show only upcoming projects

### 3. Image Management

Currently, the system uses URL-based images. You can:

**Option 1: Host Images Externally**
- Upload images to services like:
  - Cloudinary
  - AWS S3
  - ImgBB
  - Imgur
- Copy the direct image URL
- Paste into the "Image URL" field

**Option 2: Use Project Images**
- Place images in `public/images/projects/`
- Reference them as `/images/projects/your-image.jpg`

### 4. Logout

Click the "Logout" button in the navigation to end your session.

## API Endpoints

### Authentication
- `POST /api/auth/[...nextauth]` - NextAuth.js endpoints

### Projects
- `GET /api/projects` - Get all projects
  - Query params: `?category=latest|upcoming`, `?admin=true`
- `POST /api/projects` - Create project (Admin only)
- `GET /api/projects/[id]` - Get single project
- `PUT /api/projects/[id]` - Update project (Admin only)
- `DELETE /api/projects/[id]` - Delete project (Admin only)

### Admin Initialization
- `POST /api/init` - Create initial admin user

## Database Schema

### User Model
```typescript
{
  email: string;       // Unique email
  password: string;    // Bcrypt hashed
  name: string;        // Display name
  role: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
}
```

### Project Model
```typescript
{
  title: string;       // Project title
  director: string;    // Director name
  language: string;    // Language
  studio: string;      // Studio/Production house
  category: 'latest' | 'upcoming';
  imageUrl?: string;   // Optional image URL
  description?: string; // Optional description
  order: number;       // Display order (default: 0)
  isPublished: boolean; // Visibility (default: true)
  createdAt: Date;
  updatedAt: Date;
}
```

## Security

### Route Protection
- Admin routes are protected by NextAuth middleware
- Unauthenticated users are redirected to login
- Only users with `role: 'admin'` can access admin features

### Best Practices
1. **Change default credentials** immediately
2. **Use strong passwords** for admin accounts
3. **Keep NEXTAUTH_SECRET secure** - never commit to git
4. **Use environment variables** for all sensitive data
5. **Enable HTTPS** in production
6. **Use MongoDB Atlas** with IP whitelist for production

## Troubleshooting

### Cannot connect to MongoDB
- Verify MongoDB is running: `mongod --version`
- Check connection string in `.env.local`
- For Atlas: Verify IP whitelist and credentials

### Admin user already exists
- This is normal if you've already run `/api/init`
- Use existing credentials to log in
- To reset: Delete user from MongoDB and run init again

### Session/Login Issues
- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your domain
- Clear browser cookies and try again

### Projects not appearing
- Check if projects have `isPublished: true`
- Verify MongoDB connection
- Check browser console for API errors

### Port 3000 already in use
- Kill the process: `npx kill-port 3000`
- Or use different port: `npm run dev -- -p 3001`

## Production Deployment

### Environment Variables
Set these in your hosting platform:
```env
MONGODB_URI=your-production-mongodb-url
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-secure-secret-key
ADMIN_EMAIL=your-admin-email
ADMIN_PASSWORD=your-secure-password
```

### Build Commands
```bash
npm run build
npm start
```

### Recommended Platforms
- **Vercel** (Easiest for Next.js)
- **Netlify**
- **Railway**
- **DigitalOcean App Platform**

## Future Enhancements

Possible improvements:
- [ ] File upload for images (with cloud storage)
- [ ] Multiple admin users management
- [ ] Analytics and statistics
- [ ] Bulk operations
- [ ] Search and advanced filtering
- [ ] Activity logs
- [ ] Image optimization
- [ ] Rich text editor for descriptions

## Support

For issues or questions:
- Check this documentation first
- Review error messages in console
- Verify environment variables
- Check MongoDB connection

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast
- **Icons**: Lucide React

---

**Created for PROMICE Studios**
Last Updated: 2026-02-11
