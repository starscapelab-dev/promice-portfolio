# Deployment Guide

## Prerequisites
- GitHub repository: https://github.com/starscapelab-dev/promice-portfolio
- MongoDB Atlas account with database credentials

## Deploy to Vercel (Recommended)

### 1. Sign up / Log in to Vercel
Visit [vercel.com](https://vercel.com) and sign in with your GitHub account.

### 2. Import Your Repository
1. Click "Add New Project"
2. Import `starscapelab-dev/promice-portfolio`
3. Configure project settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: .next

### 3. Configure Environment Variables
Add these environment variables in Vercel project settings:

```env
MONGODB_URI=mongodb+srv://starscapelab_db_user:VfwPkP8Yi5dJYZVz@cluster0.fmgygnf.mongodb.net/promice-studios?retryWrites=true&w=majority&appName=Cluster0

NEXTAUTH_URL=https://your-project-name.vercel.app
NEXTAUTH_SECRET=8gXx/5xSLGHpDa0AzOucKsRDDdBGtgvY7ifAIEdJZOg=

ADMIN_EMAIL=admin@promice.com
ADMIN_PASSWORD=admin123
```

**Important:**
- Replace `NEXTAUTH_URL` with your actual Vercel deployment URL
- Generate a new `NEXTAUTH_SECRET` for production using:
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
  ```

### 4. Deploy
Click "Deploy" and wait for the build to complete (usually 2-3 minutes).

### 5. Initialize Database (First Time Only)
After deployment, visit:
```
https://your-project-name.vercel.app/api/init
```

This will create the admin user in your production database.

### 6. Seed Projects (Optional)
If you want to seed the projects in production:
1. Clone the repo locally
2. Update `.env.local` with production MongoDB URI
3. Run: `npm run seed`

Or add them manually through the admin panel at:
```
https://your-project-name.vercel.app/admin/login
```

## Deploy to Netlify

### 1. Install Netlify CLI (Optional)
```bash
npm install -g netlify-cli
```

### 2. Deploy via Netlify Dashboard
1. Visit [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Choose GitHub and select your repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`

### 3. Configure Environment Variables
In Netlify dashboard → Site settings → Environment variables, add the same variables as Vercel.

## Custom Domain Setup

### On Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXTAUTH_URL` environment variable to your custom domain

### On Netlify:
1. Go to Site settings → Domain management
2. Add custom domain
3. Update DNS records
4. Update `NEXTAUTH_URL` environment variable

## Post-Deployment

### Update NEXTAUTH_URL
After deployment, update the `NEXTAUTH_URL` in your environment variables to match your production URL.

### Test Authentication
1. Visit `/admin/login`
2. Login with your credentials
3. Verify the dashboard and projects work correctly

### Security Checklist
- [ ] Generated and set a strong `NEXTAUTH_SECRET`
- [ ] Changed default admin password
- [ ] Verified `.env.local` is in `.gitignore`
- [ ] Tested authentication flow
- [ ] Verified database connection

## Troubleshooting

### Build Fails
- Check build logs for specific errors
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Database Connection Issues
- Verify MongoDB Atlas allows connections from all IPs (0.0.0.0/0)
- Check connection string format
- Ensure database user has correct permissions

### Authentication Not Working
- Verify `NEXTAUTH_URL` matches your deployment URL exactly
- Check `NEXTAUTH_SECRET` is set
- Clear browser cookies and try again

## Monitoring

### Vercel Analytics
Enable in Project Settings → Analytics to track:
- Page views
- Performance metrics
- Error rates

### MongoDB Atlas Monitoring
Access through Atlas dashboard:
- Database metrics
- Connection stats
- Performance insights

---

For support, check the logs in your deployment platform's dashboard.
