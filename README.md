## Limestone Fields Website

Marketing site for Limestone Fields, built with **Next.js 14 App Router**, **TypeScript**, **Tailwind**, and a **Sanity** CMS backend. The UI is implemented from the Figma file `Limestone Fields – Copy` using the Figma MCP tools, with layout and imagery mapped section‑by‑section into React components.

### Tech stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript, React 18
- **Styling**: Tailwind CSS + design tokens in `tailwind.config.ts` and `app/globals.css`
- **CMS**: Sanity (`/sanity`), with `SiteSettings` powering nav and footer content
- **Images**: `next/image` with a mix of local assets and Figma MCP asset URLs

### Local development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

Key entry points:

- Layout chrome: `app/(site)/layout.tsx`
- Homepage: `app/(site)/page.tsx`
- Hero: `components/sections/Hero.tsx`
- Footer + contact form: `components/sections/Footer.tsx`, `components/forms/FooterContactForm.tsx`

### Figma integration

Design source:  
`https://www.figma.com/design/hegaFu30p517sxFdBne66d/Limestone-Fields--Copy`

We use the **Figma MCP `get_design_context` tool** to pull:

- Typography, spacing, and section structure (e.g. nodes `2004:28`, `2004:12`, `2004:19`, `2004:20`, `2004:21`)
- Temporary image asset URLs (`https://www.figma.com/api/mcp/asset/...`) wired through `next/image` and allowed in `next.config.mjs`

If you change the Figma design and want to re‑align the site:

1. Select the relevant frame/section in Figma.
2. Copy the link to selection and paste it into Cursor.
3. Use the MCP `get_design_context` tool to update the corresponding React section.

### Sanity content

`SiteSettings` in Sanity control:

- Header “join waitlist” destination (`bookingsOpen` flag)
- Footer address, phone, email, map URL, and optional CTA copy

Run the Sanity Studio locally (if included in this repo) to edit content, or update through the hosted Studio if configured.

### Deployment

This app can be deployed to any Next.js host (Vercel recommended). Ensure:

- Environment variables for Sanity are set in `.env.local`
- `next.config.mjs` is deployed with the `images.remotePatterns` entry for Figma MCP assets

Then run:

```bash
npm run build
npm start
```
