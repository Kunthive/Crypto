# Milkroad Pro Archive

A professional, minimalist archive for Milkroad Pro cryptocurrency newsletters. Built with Next.js, featuring search functionality, responsive design, and a contact form.

## Features

- **Clean Design** - Monochromatic black/white/grey aesthetic  
- **Full-Text Search** - Search newsletters by title and content  
- **Responsive** - Works perfectly on desktop, tablet, and mobile  
- **Contact Form** - EmailJS integration for inquiries  
- **Fast** - Static site generation for optimal performance  
- **SEO Optimized** - Sitemap, meta tags, and semantic HTML  
- **Easy Content Management** - Just add Markdown files  

## Quick Start

\`\`\`bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your EmailJS credentials

# Run development server
npm run dev
\`\`\`

Visit [http://localhost:3000](http://localhost:3000)

## Adding Newsletters

1. Create a `.md` file in `public/newsletters/`
2. Example: `bitcoin-analysis.md`
3. The file will automatically appear in the archive

\`\`\`markdown
# Newsletter Title

Your content here...
\`\`\`

## Deployment

Deploy to Vercel with one click:

\`\`\`bash
npm run build
npm start
\`\`\`

See [SETUP.md](./SETUP.md) for detailed deployment instructions.

## Configuration

### EmailJS Setup

1. Sign up at [emailjs.com](https://www.emailjs.com)
2. Create an email service
3. Create a template with variables: `{{from_name}}`, `{{user_email}}`, `{{message}}`
4. Add credentials to `.env.local`

### Customization

Edit `app/globals.css` to change colors, fonts, and spacing.

## Project Structure

\`\`\`
app/              # Next.js app directory
├── page.tsx      # Homepage
├── archive/      # Archive page
├── newsletter/   # Individual newsletter pages
├── intent/       # About page
├── contact/      # Contact form
└── layout.tsx    # Root layout

components/       # Reusable components
lib/              # Utilities
public/
└── newsletters/  # Markdown files
\`\`\`

## Technologies

- **Next.js 16** - React framework
- **Tailwind CSS** - Styling
- **React Markdown** - Markdown rendering
- **EmailJS** - Contact form
- **Lucide Icons** - Icons

## License

Open source - feel free to use and modify.
