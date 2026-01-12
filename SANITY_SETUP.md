# Sanity Studio Setup Guide

This guide will help you complete the Sanity Studio setup for your Limestone Fields project.

## 🔧 **Step 1: Environment Variables**

Make sure your `.env.local` file has these variables:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token
```

**Where to find these:**
- **Project ID**: In your Sanity dashboard at `sanity.io/manage` → Your project → Settings → API
- **Dataset**: Usually `production` or `development`
- **API Token**: Create one at `sanity.io/manage` → Your project → API → Tokens → Add API token

---

## 🌐 **Step 2: Add CORS Origins (IMPORTANT!)**

The error you're seeing means you need to add your deployment URL to Sanity's CORS settings.

### **Option A: Via Sanity Dashboard (Recommended)**

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project (`ve6k1p3k` based on your URL)
3. Go to **Settings** → **API** → **CORS origins**
4. Click **Add CORS origin**
5. Add these URLs:
   - `http://localhost:3000` (for local development)
   - `https://limestone-fields.vercel.app` (your production URL)
   - `https://limestone-fields.vercel.app/studio` (if needed)
6. Check **Allow credentials**
7. Click **Save**

### **Option B: Via Sanity CLI**

```bash
# Install Sanity CLI if you haven't
npm install -g @sanity/cli

# Login to Sanity
sanity login

# Add CORS origin
sanity cors add https://limestone-fields.vercel.app --credentials
sanity cors add http://localhost:3000 --credentials
```

---

## 🚀 **Step 3: Verify Studio is Working**

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Open the Studio:**
   - Local: `http://localhost:3000/studio`
   - Production: `https://limestone-fields.vercel.app/studio`

3. **You should see:**
   - Login screen (if not logged in)
   - Sanity Studio interface with your content types
   - No CORS errors

---

## 📝 **Step 4: Create Your First Content**

Once the Studio is working:

1. **Site Settings** (Create first):
   - Go to `/studio` → **Site Settings**
   - Fill in: Title, Description, Email, Opening Date
   - Toggle "Bookings Open" if needed
   - Save

2. **Create Pages:**
   - Go to **Pages** → **Create new**
   - Create pages with slugs: `home`, `weddings`, `buyouts`, `story`, `contact`
   - Add hero content and sections

3. **Add Cabins:**
   - Go to **Cabins** → **Create new**
   - Fill in cabin details and upload images

4. **Add FAQs:**
   - Go to **FAQs** → **Create new**
   - Add questions and answers

---

## 🔍 **Troubleshooting**

### **CORS Error Still Appearing?**
- Make sure you added the exact URL (with `https://`)
- Wait a few minutes for changes to propagate
- Clear your browser cache
- Try in an incognito window

### **"Project not found" Error?**
- Check your `NEXT_PUBLIC_SANITY_PROJECT_ID` in `.env.local`
- Make sure it matches your Sanity project ID

### **"Dataset not found" Error?**
- Check your `NEXT_PUBLIC_SANITY_DATASET` in `.env.local`
- Default is usually `production` or `development`

### **Studio Not Loading?**
- Check browser console for errors
- Verify environment variables are set
- Make sure you're logged into Sanity
- Try: `npm run dev` and visit `http://localhost:3000/studio`

---

## 📚 **Quick Reference**

**Required Environment Variables:**
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=ve6k1p3k  # Your project ID
NEXT_PUBLIC_SANITY_DATASET=production   # Your dataset name
SANITY_API_TOKEN=your-token-here        # Your API token
```

**Studio URLs:**
- Local: `http://localhost:3000/studio`
- Production: `https://limestone-fields.vercel.app/studio`

**Sanity Dashboard:**
- Manage: `https://sanity.io/manage`
- Your Project: `https://sanity.io/organizations/ojWyaspco/project/ve6k1p3k`

---

## ✅ **Checklist**

- [ ] Environment variables set in `.env.local`
- [ ] CORS origins added in Sanity dashboard
- [ ] Studio accessible at `/studio`
- [ ] Can log in to Studio
- [ ] Site Settings created
- [ ] At least one page created
- [ ] No CORS errors in browser console

---

## 🆘 **Need Help?**

If you're still having issues:
1. Check the browser console for specific error messages
2. Verify all environment variables are correct
3. Make sure you're using the correct project ID and dataset
4. Try logging out and back into Sanity
