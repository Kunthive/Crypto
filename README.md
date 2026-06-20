# Milkroad Pro Archive

> A clean, minimalist web archive for Milkroad Pro cryptocurrency newsletters.

A Next.js application that turns a folder of Markdown files into a searchable, browsable newsletter
archive. It pairs a monochromatic black/white/grey aesthetic with full-text search, individual
newsletter pages rendered from Markdown, and a contact form. New issues are added simply by dropping
a `.md` file into the newsletters directory.

## ✨ Features

- **Markdown-driven content** — add a `.md` file and it appears in the archive automatically.
- **Full-text search** — filter newsletters by title and content.
- **Individual newsletter pages** — Markdown rendered with GitHub-flavored Markdown, raw HTML support, and sanitization.
- **Contact form** — powered by EmailJS.
- **SEO** — sitemap (`app/sitemap.ts`), SEO helpers (`lib/seo.ts`), meta tags, and semantic HTML.
- **Responsive** — works across desktop, tablet, and mobile.
- **Minimalist design** — monochromatic theme with theming support via `next-themes`.

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router) with React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **UI components:** Radix UI / shadcn/ui, Lucide icons
- **Markdown:** `react-markdown` with `remark-gfm`, `rehype-raw`, `rehype-sanitize`
- **Forms:** React Hook Form + Zod
- **Email:** EmailJS
- **Analytics:** Vercel Analytics

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your EmailJS credentials
```

### Running locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

### Available scripts

```bash
npm run dev     # Start the development server
npm run build   # Create a production build
npm run start   # Start the production server
npm run lint    # Run ESLint
```

See [SETUP.md](./SETUP.md) for detailed setup and deployment instructions, and
[SEO_OPTIMIZATIONS.md](./SEO_OPTIMIZATIONS.md) for SEO notes.

## ✍️ Adding Newsletters

1. Create a Markdown file in `public/newsletters/` (e.g. `bitcoin-analysis.md`).
2. The file is picked up automatically and appears in the archive.

```markdown
# Newsletter Title

Your content here...
```

## ⚙️ Configuration

### EmailJS

1. Sign up at [emailjs.com](https://www.emailjs.com).
2. Create an email service and a template with the variables `{{from_name}}`, `{{user_email}}`, `{{message}}`.
3. Add your credentials to `.env.local`.

### Customization

Edit `app/globals.css` to adjust colors, fonts, and spacing.

## 📁 Project Structure

```
.
├── app/                 # Next.js App Router
│   ├── page.tsx         # Homepage
│   ├── archive/         # Archive listing
│   ├── newsletter/      # Individual newsletter pages
│   ├── intent/          # About page
│   ├── contact/         # Contact form
│   ├── sitemap.ts       # Dynamic sitemap
│   └── layout.tsx       # Root layout
├── components/          # Reusable components (navigation, footer, search, cards, ui/)
├── lib/                 # Utilities (newsletters.ts, seo.ts, utils.ts)
└── public/
    └── newsletters/     # Markdown source files
```

## 📄 License

Proprietary — Kunthive.

---

Built by [Kunthive](https://kunthive.in)
