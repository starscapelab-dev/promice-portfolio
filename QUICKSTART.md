# Quick Start Guide

Get up and running with PROMICE Studios website in 5 minutes!

## Step 1: Environment Setup

Create `.env.local` file (already created) and update if needed:

```env
MONGODB_URI=mongodb://localhost:27017/promice-studios
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
ADMIN_EMAIL=admin@promice.com
ADMIN_PASSWORD=admin123
```

## Step 2: Choose Your Database Option

### Option A: MongoDB Atlas (Recommended - No Installation)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free tier
3. Create a cluster
4. Click "Connect" → "Connect your application"
5. Copy connection string
6. Update `MONGODB_URI` in `.env.local`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/promice-studios
   ```

### Option B: Local MongoDB

1. Install MongoDB: https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. Keep default `MONGODB_URI` in `.env.local`

## Step 3: Start Development Server

```bash
npm run dev
```

Wait for "Ready" message, then server runs on http://localhost:3000

## Step 4: Initialize Admin User

**Option 1: Using Browser**
Open: http://localhost:3000/api/init

You should see:
```json
{"message":"Admin user created successfully","email":"admin@promice.com"}
```

**Option 2: Using Command Line**
In a new terminal:
```bash
curl -X POST http://localhost:3000/api/init
```

## Step 5: Login to Admin Dashboard

1. Go to: http://localhost:3000/admin/login
2. Login with:
   - Email: `admin@promice.com`
   - Password: `admin123`
3. You're in! 🎉

## Step 6: Add Your First Project

1. Click "Add Project" button
2. Fill in the form:
   - Title: "Your Project Name"
   - Director: "Director Name"
   - Language: "Malayalam"
   - Studio: "Your Studio"
   - Category: "Latest"
   - Image URL: (optional) e.g., "https://via.placeholder.com/600x800"
3. Click "Create Project"
4. View it on the main site!

## Troubleshooting

### Cannot connect to database
- **MongoDB Atlas**: Check connection string and IP whitelist
- **Local MongoDB**: Ensure MongoDB service is running

### Admin already exists error
- This means you already ran `/api/init`
- Just login with existing credentials

### Port 3000 in use
```bash
# Kill the port
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

## Next Steps

- ✅ Add more projects
- ✅ Upload project images
- ✅ Customize services section
- ✅ Update contact information
- ✅ Deploy to production

## Production Deployment

### Using Vercel (Easiest)

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables:
   - `MONGODB_URI`
   - `NEXTAUTH_URL` (your domain)
   - `NEXTAUTH_SECRET`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
5. Deploy!

After deployment, run: `https://your-domain.com/api/init`

## Need Help?

- 📖 Read [ADMIN_DASHBOARD_SETUP.md](ADMIN_DASHBOARD_SETUP.md) for detailed documentation
- 📖 Check main [README.md](README.md) for project overview
- 🔍 Review error messages in browser console
- ✅ Verify `.env.local` file exists and has correct values

---

**Happy Building! 🚀**
