# Vercel Deployment Guide for MilkRoad Pro

## Issue: Reports Not Showing on Vercel

If your markdown files load locally but not on Vercel, this is typically due to how Next.js handles static files and file system operations on serverless platforms.

## Solution Implemented

### 1. Updated `next.config.mjs`
The configuration now includes proper file tracing to ensure markdown files are included in the deployment:

```javascript
outputFileTracingIncludes: {
  '/': ['./public/newsletters/**/*'],
  '/newsletter/[id]': ['./public/newsletters/**/*'],
  '/archive': ['./public/newsletters/**/*'],
},
outputFileTracing: true,
```

**What this does:**
- Tells Next.js to include all files in `public/newsletters/` in the build output
- Ensures these files are available to serverless functions at runtime
- Maps specific routes to their required files

### 2. Added `vercel.json`
Created a Vercel-specific configuration to ensure proper file inclusion:

```json
{
  "buildCommand": "next build",
  "functions": {
    "app/**/*.tsx": {
      "includeFiles": "public/newsletters/**"
    }
  }
}
```

**What this does:**
- Explicitly tells Vercel to include newsletter files in serverless functions
- Ensures the markdown files are accessible during both build and runtime

### 3. Improved Error Handling in `lib/newsletters.ts`
Added better logging and error handling to diagnose issues:

```typescript
if (!fs.existsSync(NEWSLETTERS_DIR)) {
  console.error(`Newsletters directory not found at: ${NEWSLETTERS_DIR}`)
  cached = []
  return cached
}
files = fs.readdirSync(NEWSLETTERS_DIR)
console.log(`Found ${files.length} files in newsletters directory`)
```

**What this does:**
- Provides clear error messages if files aren't found
- Logs the number of files found for verification
- Helps debug deployment issues through Vercel logs

## Deployment Steps

### 1. Commit and Push Changes
```bash
git add next.config.mjs vercel.json lib/newsletters.ts
git commit -m "Fix: Ensure markdown files are included in Vercel deployment"
git push origin main
```

### 2. Redeploy on Vercel
Vercel should automatically trigger a new deployment when you push. If not:

1. Go to your Vercel dashboard
2. Select your project
3. Click "Deployments"
4. Click "Redeploy" on the latest deployment
5. Select "Use existing Build Cache: No" to ensure a fresh build

### 3. Verify Deployment
After deployment completes:

1. Visit your deployed site
2. Go to the Archive page (`/archive`)
3. Check if newsletters are listed
4. Click on a newsletter to verify it loads correctly

### 4. Check Build Logs
If issues persist, check the Vercel build logs:

1. Go to your deployment in Vercel
2. Click on the "Building" tab
3. Look for the console.log messages from `lib/newsletters.ts`:
   - Should show "Found X files in newsletters directory"
   - If it shows 0 files or an error, the files aren't being included

## Common Issues and Solutions

### Issue 1: "No newsletters found"
**Symptoms:** Archive page is empty, individual newsletter pages show 404

**Solution:**
- Verify markdown files exist in `public/newsletters/`
- Check file naming (must end in `.md` or `.markdown`)
- Ensure files aren't filtered out (shouldn't be named `MILK.md`)

**Verify locally:**
```bash
ls -la public/newsletters/*.md
```

### Issue 2: Build succeeds but pages are blank
**Symptoms:** Build completes without errors, but pages don't render content

**Solution:**
- Check Vercel function logs for runtime errors
- Verify `force-static` is working correctly
- Ensure `generateStaticParams()` is generating all routes

**Check in Vercel dashboard:**
- Go to Functions tab
- Look for errors in function logs

### Issue 3: Some newsletters work, others don't
**Symptoms:** Some markdown files render, others return 404

**Possible causes:**
- Special characters in filenames
- Encoding issues with file names

**Solution:**
- Ensure filenames are URL-safe
- Check for special characters that need encoding
- Test URL encoding: `encodeURIComponent(filename)`

## Environment Variables

The app doesn't require environment variables for the newsletter functionality, but if you're using the contact form:

```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

Add these in Vercel:
1. Project Settings → Environment Variables
2. Add each variable
3. Redeploy for changes to take effect

## Testing Locally Before Deployment

Always test the production build locally before deploying:

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Start production server
npm start
```

Then visit:
- Homepage: http://localhost:3000
- Archive: http://localhost:3000/archive
- Individual newsletter: http://localhost:3000/newsletter/[filename]

If everything works locally but not on Vercel, it's a deployment configuration issue.

## Vercel-Specific Considerations

### File System Access
- `fs` module works during build time (`generateStaticParams`, `getStaticProps`)
- At runtime, files must be pre-bundled using `outputFileTracingIncludes`
- Using `force-static` ensures pages are generated at build time

### Build Cache
- Sometimes Vercel's build cache can cause issues
- If problems persist, deploy with "Use existing Build Cache: No"
- This forces a complete rebuild

### Function Size
- Vercel has limits on serverless function size
- With many markdown files, ensure you're under the limit
- Current implementation uses static generation to avoid this

## Debugging Checklist

- [ ] Verify markdown files exist in `public/newsletters/`
- [ ] Check `next.config.mjs` has correct `outputFileTracingIncludes`
- [ ] Verify `vercel.json` exists with correct configuration
- [ ] Confirm build completes successfully on Vercel
- [ ] Check Vercel function logs for errors
- [ ] Test production build locally (`npm run build && npm start`)
- [ ] Verify routes are generated correctly in build output
- [ ] Check browser console for client-side errors
- [ ] Verify network requests succeed (no 404s)

## Additional Resources

- [Next.js Static Generation Docs](https://nextjs.org/docs/app/building-your-application/rendering/server-components#static-rendering-default)
- [Vercel Build Configuration](https://vercel.com/docs/projects/project-configuration)
- [Next.js outputFileTracing](https://nextjs.org/docs/pages/api-reference/next-config-js/output#automatically-copying-traced-files)

## Support

If you continue to experience issues:
1. Check build logs in Vercel dashboard
2. Open an issue on GitHub with:
   - Build log output
   - Function log output (if available)
   - Screenshots of the issue
   - Steps to reproduce
