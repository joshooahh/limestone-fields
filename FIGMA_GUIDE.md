# Figma Integration Guide

This guide explains how to work with your Limestone Fields website designs in Figma.

## 🎨 Option 1: Import Your Live Site into Figma (Recommended for Quick Start)

### Using html.to.design Plugin

1. **Install the Plugin:**
   - Open Figma Desktop or Figma in browser
   - Go to `Plugins` → `Browse plugins in Community`
   - Search for "html.to.design" by Builder.io
   - Click "Install"

2. **Import Your Site:**
   - In Figma, go to `Plugins` → `html.to.design`
   - Enter your site URL:
     - Local: `http://localhost:3000`
     - Production: Your deployed URL
   - Select which pages/sections to import
   - Click "Import"

3. **Edit in Figma:**
   - All your components will be imported as editable layers
   - You can modify colors, typography, spacing, etc.
   - Export assets or use Dev Mode to get specs

### Alternative: Screenshot + Trace
- Take screenshots of your pages
- Import into Figma
- Trace over them to create editable designs

---

## 🎨 Option 2: Design in Figma First (Standard Workflow)

### Step 1: Set Up Your Design System in Figma

1. **Create a Design System File:**
   - Create a new Figma file called "Limestone Fields Design System"
   - Set up your color styles, text styles, and component library

2. **Import Design Tokens:**
   - Use the design tokens file (see `figma-tokens.json` below)
   - Install "Figma Tokens" plugin
   - Import the tokens to sync colors, typography, and spacing

3. **Create Components:**
   - Build reusable components matching your code structure
   - Use auto-layout for responsive designs
   - Set up variants for different states

### Step 2: Design Your Pages
- Create frames for each page (Home, Stay, Weddings, etc.)
- Use your design system components
- Design at multiple breakpoints (mobile, tablet, desktop)

### Step 3: Implement Designs
- Use Figma Dev Mode to get exact specs
- Copy CSS values, spacing, colors
- Implement in your Next.js components

---

## 🎨 Option 3: Two-Way Sync (Advanced)

### Using Figma Tokens Plugin

1. **Install Figma Tokens:**
   - Install "Figma Tokens" plugin in Figma
   - Install "Figma Tokens Studio" (desktop app) for sync

2. **Sync Design Tokens:**
   - Your `tailwind.config.ts` and `globals.css` define your tokens
   - Use a tool like `style-dictionary` to convert Tailwind config to Figma tokens
   - Keep tokens in sync between code and Figma

3. **Benefits:**
   - Colors, typography, and spacing stay in sync
   - Changes in Figma can update code (with setup)
   - Single source of truth for design system

---

## 📋 Your Current Design System

### Colors

**Primary Palette:**
- **Black**: `#262624` (limestone-black)
- **Dark Blue**: `#253035` (limestone-dark-blue)
- **Olive**: `#686121` (limestone-olive)
- **Light Blue**: `#B3C1CE` (limestone-light-blue)
- **Cream**: `#F7F2E4` (limestone-cream)
- **Peach**: `#F7E7D5` (limestone-peach)

**Semantic Colors:**
- **Background**: `#F7F2E4` (Cream)
- **Foreground**: `#262624` (Black)
- **Primary**: `#253035` (Dark Blue)
- **Secondary**: `#F7E7D5` (Peach)
- **Accent**: `#686121` (Olive)
- **Muted**: `#B3C1CE` (Light Blue)

### Typography

**Font Families:**
- **Headline**: Messina Modern (serif)
- **Subhead**: ABC Marfa Mono (monospace)
- **Body**: ABC Marfa (sans-serif)
- **Body Secondary**: PP Kyoto (serif)
- **Special**: ABC Daily Slab (serif)

**Font Files:**
- `ABCMarfa-Light.woff2`
- `ABCMarfaMono-Medium.woff2`
- `MessinaModernWeb-Book.woff2`
- `PPKyoto-Light.woff2`
- `ABCDailySlab-RegularItalic.woff2`

### Spacing & Layout

- **Border Radius**: `0.5rem` (8px)
- **Container Max Width**: Responsive (see components)
- **Breakpoints**: Standard Tailwind breakpoints
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px
  - `2xl`: 1536px

---

## 🚀 Quick Start: Import Design Tokens into Figma

1. **Install Figma Tokens Plugin:**
   - In Figma: `Plugins` → `Browse plugins` → Search "Figma Tokens"

2. **Create Token Set:**
   - Run the plugin: `Plugins` → `Figma Tokens`
   - Click "Create token set"
   - Name it "Limestone Fields"

3. **Add Colors:**
   - Click "Add token" → "Color"
   - Add each color from your palette
   - Use the hex values listed above

4. **Add Typography:**
   - Click "Add token" → "Typography"
   - Create text styles for:
     - Headlines (Messina Modern)
     - Body text (ABC Marfa)
     - Subheads (ABC Marfa Mono)

5. **Apply to Styles:**
   - Select tokens → "Create styles"
   - Now you can use these styles throughout your designs

---

## 📦 Recommended Figma Plugins

1. **html.to.design** - Import live websites into Figma
2. **Figma Tokens** - Manage design tokens
3. **Auto Layout** - Built-in, use for responsive components
4. **Content Reel** - Quick content placeholders
5. **Unsplash** - Image placeholders
6. **Figma to Code** - Generate code from designs (experimental)

---

## 💡 Best Practices

1. **Component Structure:**
   - Match your React component structure in Figma
   - Use auto-layout for flexible components
   - Create variants for different states

2. **Naming Conventions:**
   - Use the same names as your code components
   - Example: `Hero`, `CabinCard`, `ValueProp`

3. **Design System:**
   - Keep design system in a separate Figma file
   - Reference it in your page designs
   - Update tokens in one place

4. **Dev Mode:**
   - Use Figma Dev Mode to get exact specs
   - Copy CSS values directly
   - Share designs with developers

---

## 🔄 Workflow Recommendations

### For Designers:
1. Design in Figma first
2. Get stakeholder approval
3. Hand off to developers with Dev Mode specs
4. Review implementation and iterate

### For Developers:
1. Import live site into Figma (html.to.design)
2. Use as reference for design updates
3. Extract exact values from Dev Mode
4. Implement changes in code

### For Both:
1. Maintain design system in Figma
2. Keep tokens synced with code
3. Use consistent naming
4. Document component usage

---

## 📝 Next Steps

1. **Choose your approach** (Import vs Design-first)
2. **Set up your Figma file** with design tokens
3. **Create component library** matching your code structure
4. **Design or import pages** you want to edit
5. **Use Dev Mode** to get implementation specs

Need help setting up any of these? Let me know which approach you'd like to use!
