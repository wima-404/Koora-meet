# Koora Meet - Deployment Guide 🚀

This guide will help you deploy the **Koora Meet** application to the web so you can share it with the world!

## Prerequisite: Build the Project
Before deploying, we need to create a production-ready version of the app.
Open your terminal and run:

```bash
npm run build
```

This will create a `dist` folder containing optimized files.

## Option 1: Deploy to Netlify (Recommended)
Netlify is the easiest way to host React apps for free.

1.  **Drag & Drop**:
    - Go to [app.netlify.com/drop](https://app.netlify.com/drop).
    - Drag your `dist` folder onto the page.
    - That's it! Your site is live.

2.  **Via Git (Continuous Deployment)**:
    - Push this project to GitHub.
    - Go to Netlify -> "New site from Git".
    - Connect your repository.
    - **Build Command**: `npm run build`
    - **Publish Directory**: `dist`
    - Click "Deploy".

## Option 2: Deploy to Vercel
Vercel is optimized for Next.js but works great for Vite apps too.

1.  Install Vercel CLI: `npm i -g vercel`
2.  Run: `vercel`
3.  Follow the prompts (accept defaults).

## Option 3: Traditional Web Hosting
Since this is a Single Page Application (SPA), you can host the contents of the `dist` folder on any static file server (Apache, Nginx, Hostinger, etc.).

**Important for SPA Hosting**:
Ensure your server redirects all 404s to `index.html` so that React Router can handle navigation (e.g., refreshing on `/tickets` shouldn't fail).

---

## ⚠️ Notes
- **Data Persistence**: Currently, the app uses `localStorage`. Data (users, posts, tickets) will **NOT** be shared between different devices. Each user will have their own local copy of the data.
- **To make it real**: You need to replace `storage.js` with a real backend connection (Firebase, Supabase, or AWS).
