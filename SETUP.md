# Milkroad Pro Archive - Setup Guide

## Quick Start

This is a Next.js application that archives Milkroad Pro newsletters. Follow these steps to get started.

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone or download the project**

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Add sample newsletters** (optional)
   - Place `.md` files in the `public/newsletters/` directory
   - Files are automatically discovered and displayed

4. **Configure EmailJS** (for contact form)
   - Sign up at [emailjs.com](https://www.emailjs.com)
   - Create an email service (Gmail, Outlook, etc.)
   - Create an email template with these variables:
     - `{{from_name}}` - Sender's name
     - `{{user_email}}` - Sender's email
     - `{{message}}` - Message content
   - Copy your credentials:
     - Public Key
     - Service ID
     - Template ID

5. **Set environment variables**
   - Copy `.env.example` to `.env.local`
   - Fill in your EmailJS credentials:
     \`\`\`
     NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
     NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
     NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
     \`\`\`

6. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`
   - Open [http://localhost:3000](http://localhost:3000) in your browser

### Adding Newsletters

1. Create a `.md` file in `public/newsletters/`
2. Use this format:
   \`\`\`markdown
   # Newsletter Title

   Your content here...

   ## Section Heading

   More content...
   \`\`\`
3. The filename becomes the URL slug (e.g., `bitcoin-analysis.md` → `/newsletter/bitcoin-analysis`)
4. Titles are auto-generated from filenames (hyphens become spaces, capitalized)

### File Structure

\`\`\`
public/
  newsletters/
    bitcoin-market-analysis.md
    ethereum-defi-report.md
    crypto-regulations-update.md
    ...

app/
  page.tsx                 # Homepage
  archive/
    page.tsx              # Archive page with search
  newsletter/
    [id]/
      page.tsx            # Individual newsletter page
  intent/
    page.tsx              # About/Intent page
  contact/
    page.tsx              # Contact form page
  layout.tsx              # Root layout
  globals.css             # Global styles

components/
  navigation.tsx          # Navigation bar
  footer.tsx              # Footer
  newsletter-card.tsx     # Newsletter card component

lib/
  newsletters.ts          # Newsletter utilities
\`\`\`

### Features

- **Homepage**: Welcome section with latest 3 reports
- **Archive**: Complete searchable list of all newsletters
- **Search**: Real-time search through titles and content
- **Newsletter Pages**: Individual pages for each newsletter with Markdown rendering
- **Navigation**: Previous/Next buttons for browsing
- **Contact Form**: EmailJS integration for inquiries
- **Responsive Design**: Mobile-friendly layout
- **SEO**: Sitemap, robots.txt, meta tags

### Deployment

#### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables in project settings:
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
5. Deploy!

#### Deploy to Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Cloudflare Pages
- GitHub Pages
- Self-hosted servers

Build command: `npm run build`
Start command: `npm start`

### Customization

#### Change Site Title
Edit `app/layout.tsx` and update the metadata:
\`\`\`tsx
export const metadata: Metadata = {
  title: 'Your Custom Title',
  description: 'Your custom description',
}
\`\`\`

#### Change Colors
Edit `app/globals.css` and modify the CSS variables in the `:root` section.

#### Change Navigation Links
Edit `components/navigation.tsx` and update the `links` array.

#### Change Footer Text
Edit `components/footer.tsx` and update the footer content.

### Troubleshooting

**Contact form not working?**
- Verify EmailJS credentials are correct
- Check that environment variables are set
- Test your EmailJS template with sample data

**Newsletters not showing?**
- Ensure `.md` files are in `public/newsletters/`
- Check file names use lowercase with hyphens (e.g., `my-newsletter.md`)
- Restart the dev server after adding files

**Search not working?**
- Make sure you're on the Archive page
- Try searching for words in the newsletter titles
- Check browser console for errors

### Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the code comments
3. Consult Next.js documentation: [nextjs.org](https://nextjs.org)
4. EmailJS docs: [emailjs.com/docs](https://www.emailjs.com/docs)

### License

This project is open source and available for personal and commercial use.
