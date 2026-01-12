# Content Management Guide: Code vs Sanity

This guide explains what content should be edited in **code** (requires a developer) vs **Sanity CMS** (can be edited by content editors).

---

## 🎨 **Edit in CODE** (Developer Required)

These are structural, design, or functionality changes that require code changes:

### **Design & Layout**
- ✅ Font choices and typography assignments
- ✅ Color palette and theme colors
- ✅ Component structure and layout
- ✅ Page structure (sections, order, layout)
- ✅ Responsive breakpoints
- ✅ Spacing, padding, margins
- ✅ Button styles, form styles
- ✅ Navigation structure (adding/removing pages)

### **Functionality**
- ✅ Form validation logic
- ✅ API routes and endpoints
- ✅ Form submission handling
- ✅ New page routes
- ✅ Component behavior and interactions
- ✅ Routing and navigation

### **Configuration**
- ✅ Environment variables
- ✅ Build configuration
- ✅ Deployment settings
- ✅ Third-party integrations

---

## 📝 **Edit in SANITY** (Content Editors)

These are content changes that can be made by non-developers in the Sanity Studio:

### **Site Settings** (`/studio` → Site Settings)
- ✅ Site title and description
- ✅ Contact email
- ✅ Opening date text (e.g., "Spring 2026")
- ✅ Bookings open/closed toggle
- ✅ Footer CTA (headline, body, button text)

### **Pages** (`/studio` → Pages)
- ✅ Page hero headlines and subheads
- ✅ Page body content (rich text)
- ✅ Page sections (text sections, image sections)
- ✅ SEO metadata (meta title, description, social images)

**Currently using Sanity:**
- `/stay` page - Hero and intro content

**Could be moved to Sanity (currently hardcoded):**
- Homepage (`/`) - All content is hardcoded
- `/weddings` - All content is hardcoded
- `/buyouts` - All content is hardcoded
- `/story` - All content is hardcoded
- `/contact` - Most content is hardcoded

### **Cabins** (`/studio` → Cabins)
- ✅ Cabin titles and descriptions
- ✅ Cabin specifications (sq ft, sleeps, bed type)
- ✅ Cabin images
- ✅ Included amenities list
- ✅ Cabin ordering

### **FAQs** (`/studio` → FAQs)
- ✅ FAQ questions and answers
- ✅ FAQ ordering

### **Policies** (`/studio` → Policies)
- ✅ Policy documents (terms, privacy, etc.)
- ✅ Policy content

### **Form Submissions** (View Only)
- ✅ Waitlist submissions
- ✅ Buyout inquiries

---

## 🔄 **Current State: What's Hardcoded vs CMS-Driven**

### **✅ Currently CMS-Driven (Edit in Sanity):**
1. **Site Settings** - Title, email, bookings status, footer CTA
2. **Stay Page** - Hero content, intro text
3. **Cabins** - All cabin listings
4. **FAQs** - All FAQ content
5. **Form Submissions** - View waitlist and buyout inquiries

### **❌ Currently Hardcoded (Edit in Code):**
1. **Homepage** (`/`) - All hero text, value props, cabin previews, etc.
2. **Weddings Page** (`/weddings`) - All content, pricing, what's included
3. **Buyouts Page** (`/buyouts`) - All content, process, what's included
4. **Story Page** (`/story`) - All philosophy and story content
5. **Contact Page** (`/contact`) - Contact info, directions, airport info
6. **Navigation** - Menu items are hardcoded in `app/(site)/layout.tsx`

---

## 💡 **Recommendations**

### **High Priority: Move to Sanity**
These pages have a lot of content that changes frequently:

1. **Homepage** - Hero text, value propositions, cabin previews
2. **Weddings Page** - Pricing, what's included, capacity info
3. **Buyouts Page** - Process steps, what's included
4. **Contact Page** - Contact info, directions, airport details

### **Medium Priority: Move to Sanity**
1. **Story Page** - Philosophy content (changes less frequently)
2. **Navigation** - Menu items (could be in Site Settings)

### **Keep in Code**
- Form validation logic
- Form submission handling
- Component structure
- Design system (colors, fonts, spacing)

---

## 🚀 **How to Edit in Sanity**

1. **Access Sanity Studio**: Navigate to `/studio` on your site (e.g., `http://localhost:3000/studio`)
2. **Edit Content**: Click on any content type (Pages, Cabins, FAQs, etc.)
3. **Save Changes**: Changes are automatically saved and will appear on the site after rebuild
4. **Preview**: Use Sanity's preview feature to see changes before publishing

---

## 📋 **Quick Reference**

| Content Type | Edit Location | Who Can Edit |
|-------------|---------------|--------------|
| Hero headlines | Sanity (Pages) | Content Editor |
| Body text | Sanity (Pages) | Content Editor |
| Cabin info | Sanity (Cabins) | Content Editor |
| FAQs | Sanity (FAQs) | Content Editor |
| Site settings | Sanity (Site Settings) | Content Editor |
| Page layout | Code | Developer |
| Colors/Fonts | Code | Developer |
| Form logic | Code | Developer |
| Navigation structure | Code | Developer |

---

## 🎯 **Best Practice**

**Rule of thumb**: If it's **content** (text, images, descriptions), it should be in Sanity. If it's **structure** (layout, design, functionality), it stays in code.
