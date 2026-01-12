# Troubleshooting localhost:3000/studio

If your Vercel deployment works but localhost doesn't, here are the most common issues:

## 🔍 **Issue 1: CORS Not Added for Localhost**

Even though you added it, sometimes it needs to be added again or configured differently.

### **Fix:**
1. Go to: https://sanity.io/manage/project/ve6k1p3k/api
2. Scroll to **CORS origins**
3. Make sure you see: `http://localhost:3000` with **Allow credentials** checked
4. If it's not there, add it:
   - Click **Add CORS origin**
   - Enter: `http://localhost:3000`
   - ✅ Check **Allow credentials**
   - Click **Save**

---

## 🔍 **Issue 2: Environment Variables Not Loading**

Next.js might not be picking up your `.env.local` file.

### **Fix:**
1. **Restart your dev server** (completely stop and restart):
   ```bash
   # Stop the server (Ctrl+C)
   # Then restart:
   npm run dev
   ```

2. **Verify variables are loaded:**
   - Check browser console for errors
   - Look for "NEXT_PUBLIC_SANITY_PROJECT_ID" in any error messages

---

## 🔍 **Issue 3: Browser Cache**

Your browser might be caching the old CORS error.

### **Fix:**
1. **Hard refresh**: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
2. **Clear cache**: Open DevTools → Application → Clear Storage
3. **Try incognito/private window**

---

## 🔍 **Issue 4: Wrong Port**

Make sure you're using port 3000.

### **Fix:**
1. Check what port your dev server is running on:
   ```bash
   npm run dev
   # Look for: "Local: http://localhost:XXXX"
   ```

2. If it's a different port, either:
   - Use that port in the URL: `http://localhost:XXXX/studio`
   - Or add that port to CORS origins in Sanity dashboard

---

## 🔍 **Issue 5: Next.js Configuration**

Sometimes Next.js needs explicit configuration for the Studio.

### **Fix:**
Check if you need to add this to `next.config.mjs`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add if you have issues with Sanity Studio
  transpilePackages: ['next-sanity'],
};

export default nextConfig;
```

---

## 🔍 **Issue 6: Check Browser Console**

The browser console will tell you the exact error.

### **Steps:**
1. Open `http://localhost:3000/studio`
2. Open DevTools (F12 or Cmd+Option+I)
3. Go to **Console** tab
4. Look for red error messages
5. Share the error message - it will tell us exactly what's wrong

Common errors:
- `CORS policy` → CORS not configured
- `Project not found` → Wrong project ID
- `Dataset not found` → Wrong dataset name
- `401 Unauthorized` → Not logged in or wrong token

---

## ✅ **Quick Checklist**

- [ ] Added `http://localhost:3000` to CORS origins in Sanity dashboard
- [ ] Checked "Allow credentials" for localhost CORS
- [ ] Restarted dev server after adding CORS
- [ ] Cleared browser cache / tried incognito
- [ ] Checked browser console for specific error
- [ ] Verified `.env.local` has correct values
- [ ] Dev server is running on port 3000

---

## 🆘 **Still Not Working?**

1. **Check the exact error** in browser console
2. **Verify CORS is added**:
   - Go to: https://sanity.io/manage/project/ve6k1p3k/api
   - Scroll to CORS origins
   - Confirm `http://localhost:3000` is listed
3. **Try a different browser** (Chrome, Firefox, Safari)
4. **Check if dev server is actually running**:
   ```bash
   curl http://localhost:3000
   ```
