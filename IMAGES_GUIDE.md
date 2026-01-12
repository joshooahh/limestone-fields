# Images in Sanity - Quick Guide

## 📸 **How Images Work in Sanity**

### **Uploading Images**
1. Go to `/studio` in your browser
2. Navigate to any content type (Pages, Cabins, etc.)
3. Click the image field
4. Upload from your computer or select existing images
5. Images are automatically:
   - Stored on Sanity's CDN
   - Optimized for web (WebP, responsive sizes)
   - Given unique URLs

### **Image Features**
- ✅ **Hotspot & Crop**: Set focal point for responsive cropping
- ✅ **Alt Text**: Add accessibility descriptions
- ✅ **Automatic Optimization**: Sanity handles format conversion and sizing
- ✅ **CDN Delivery**: Fast global delivery
- ✅ **No File Size Limits**: Sanity handles large images efficiently

### **Using Images in Code**
Images from Sanity are accessed via the `urlForImage()` helper:

```tsx
import { urlForImage } from '@/sanity/lib/image'
import Image from 'next/image'

// In your component
<Image
  src={urlForImage(page.heroImage).width(1200).height(600).url()}
  alt="Hero image"
  width={1200}
  height={600}
/>
```

### **Image Optimization Options**
```tsx
// Responsive width
urlForImage(image).width(1200).url()

// Specific dimensions
urlForImage(image).width(1200).height(900).url()

// Quality control
urlForImage(image).quality(90).url()

// Format conversion
urlForImage(image).format('webp').url()

// Auto-format (best format for browser)
urlForImage(image).auto('format').url()
```

### **Best Practices**
1. **Always set alt text** for accessibility
2. **Use hotspot** for important images (set focal point)
3. **Set appropriate sizes** - don't request larger than needed
4. **Use Next.js Image component** for automatic optimization
5. **Consider aspect ratios** when cropping

### **Image Locations**
- **Hero Images**: Page-level hero backgrounds
- **Section Images**: Within page sections
- **Cabin Images**: In cabin listings
- **SEO Images**: Social sharing images (ogImage)

### **Current Setup**
- ✅ Image helper configured (`sanity/lib/image.ts`)
- ✅ Cabin images working (see `CabinCard.tsx`)
- ✅ Page schema supports images
- ✅ All new section types support images

---

## 🎯 **What You Can Do Now**

1. **Upload images in Sanity Studio** (`/studio`)
2. **Set alt text** for accessibility
3. **Use hotspot** to set focal points
4. **Images automatically appear** on the site after upload

No code changes needed to add images - just upload in Sanity!
