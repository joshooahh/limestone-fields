# Photography Guide for Limestone Fields

## 📸 Image Size Requirements

### Hero Images (Carousel/Full-Width)
**Recommended Dimensions:**
- **Desktop**: 1920px × 1080px (16:9 aspect ratio)
- **Mobile**: 1200px × 800px (3:2 aspect ratio)
- **Format**: JPG (high quality, optimized) or WebP
- **File Size**: Under 500KB per image (optimized)
- **Notes**: 
  - These will be the main hero images on homepage
  - Need dark areas for logo overlay (per brand guidelines)
  - Consider both landscape and portrait orientations

### Accommodation/Cabin Images
**Recommended Dimensions:**
- **Grid Display**: 1200px × 900px (4:3 aspect ratio)
- **Detail View**: 1920px × 1280px (3:2 aspect ratio)
- **Format**: JPG or WebP
- **File Size**: Under 300KB per image
- **Notes**:
  - Standard Cabin interior/exterior
  - Cabin Suite interior/exterior
  - Lifestyle shots (people in quiet moments)
  - Detail shots (bedding, kitchen, outdoor tub)

### General Content Images
**Recommended Dimensions:**
- **Section Images**: 1200px × 800px (3:2 aspect ratio)
- **Card Images**: 800px × 600px (4:3 aspect ratio)
- **Format**: JPG or WebP
- **File Size**: Under 200KB per image
- **Notes**:
  - Lake views
  - Landscape/nature shots
  - Commons Barn
  - Communal spaces

### Thumbnail/Preview Images
**Recommended Dimensions:**
- **Thumbnails**: 400px × 300px (4:3 aspect ratio)
- **Format**: JPG or WebP
- **File Size**: Under 50KB per image

## 🎨 Photography Style Guidelines

### Brand Alignment
- **Mood**: Quiet, still, intentional
- **Color Tone**: Natural, warm, earthy (aligns with brand palette)
- **Lighting**: Natural light preferred, soft and diffused
- **Composition**: Clean, minimal, spacious

### Content Themes
1. **Stillness & Reflection**
   - Empty spaces with natural light
   - Windows open to nature
   - Quiet moments

2. **Grounded Beauty**
   - Simple, well-appointed details
   - Quality materials (linen, wood, stone)
   - Natural textures

3. **Connection to Land**
   - Lake Limestone views
   - Working farm elements
   - Nature trails
   - Wide horizons

4. **Lifestyle (People)**
   - People in quiet moments (reading, writing, reflecting)
   - Small groups (2-4 people max)
   - Natural, unposed
   - Focus on experience, not faces

## 📁 File Organization

Place images in these directories:

```
public/images/
├── hero/
│   ├── hero-01.jpg
│   ├── hero-02.jpg
│   └── hero-03.jpg
├── cabins/
│   ├── standard/
│   │   ├── standard-exterior-01.jpg
│   │   ├── standard-interior-01.jpg
│   │   └── standard-detail-01.jpg
│   └── suite/
│       ├── suite-exterior-01.jpg
│       ├── suite-interior-01.jpg
│       └── suite-detail-01.jpg
└── general/
    ├── lake-views/
    ├── commons-barn/
    ├── nature-trails/
    └── lifestyle/
```

## 🎯 Priority Images Needed

### High Priority (For Launch)
1. **Hero Carousel** (3-4 images):
   - Lake view at sunrise/sunset
   - Cabin exterior with natural light
   - Commons Barn interior
   - Nature trail/landscape

2. **Accommodations** (2-3 per type):
   - Standard Cabin: exterior, interior, detail (bed/soaking tub)
   - Cabin Suite: exterior, interior, kitchen detail

3. **General** (2-3 images):
   - Lake Limestone view
   - Wide landscape/horizon
   - Natural detail (grass, stone, water)

### Medium Priority
4. **Lifestyle** (3-4 images):
   - Person reading/writing in cabin
   - Small group at Commons Barn
   - Quiet moment on porch
   - Nature walk

5. **Details** (5-6 images):
   - Bedding/linen close-up
   - Coffee setup
   - Outdoor soaking tub
   - Kitchen details
   - Natural textures

## 📝 Image Naming Convention

Use descriptive, consistent naming:
- Format: `category-description-number.jpg`
- Examples:
  - `hero-lake-sunset-01.jpg`
  - `cabin-standard-interior-01.jpg`
  - `lifestyle-reading-porch-01.jpg`
  - `detail-linen-bedding-01.jpg`

## ✅ Image Quality Checklist

Before uploading, ensure:
- [ ] Correct dimensions (see above)
- [ ] Optimized file size
- [ ] Proper exposure (not too dark/bright)
- [ ] Color grading matches brand (warm, natural)
- [ ] Composition is clean and minimal
- [ ] No distracting elements
- [ ] Dark areas available for logo overlay (hero images)
- [ ] Proper focus and sharpness
- [ ] Consistent style across all images

## 🔧 Optimization Tools

Recommended tools for image optimization:
- **Squoosh** (https://squoosh.app) - Web-based compression
- **ImageOptim** (Mac) - Batch optimization
- **TinyPNG** - Online compression service
- **Next.js Image Optimization** - Automatic (built-in)

## 📍 Where to Place Images

Once you have images ready:
1. Place them in the appropriate `public/images/` subdirectory
2. Update components to reference the new images
3. Images will be automatically optimized by Next.js Image component

---

*Last updated: January 23, 2026*
