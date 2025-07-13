# Quick Customization Guide

## 🎯 Quick Start Checklist

### 1. Personal Information (5 minutes)
- [ ] Update your name in `src/components/navigation.tsx` (line 22)
- [ ] Update your name and bio in `src/app/page.tsx` (lines 22-29)
- [ ] Update metadata in `src/app/layout.tsx` (lines 21-40)

### 2. About Page (10 minutes)
- [ ] Edit `src/app/about/page.tsx`:
  - [ ] Update the bio paragraphs (lines 31-48)
  - [ ] Update skills list (lines 62-67)
  - [ ] Update contact links (lines 79-101)

### 3. Contact Information (5 minutes)
- [ ] Update `src/app/contact/page.tsx`:
  - [ ] Email address (multiple locations)
  - [ ] Social media handles
  - [ ] Location and availability info (lines 92-112)

### 4. Projects (15 minutes)
- [ ] Edit `src/app/projects/page.tsx`:
  - [ ] Replace sample projects with your own (lines 7-50)
  - [ ] Add your GitHub and demo links
  - [ ] Update project descriptions and tech stacks

### 5. Blog Posts (Optional)
- [ ] Edit `src/app/blog/page.tsx` to add your blog posts (lines 7-40)
- [ ] Add new blog post pages in `src/app/blog/[slug]/page.tsx`

## 🎨 Visual Customization

### Colors
Edit `src/app/globals.css` to change the color scheme:
- Light mode colors: lines 7-20
- Dark mode colors: lines 22-35

### Typography
Update fonts in `src/app/layout.tsx`:
- Main font: line 11 (currently Inter)
- Mono font: lines 16-24 (currently Geist Mono)

### Animations
Adjust animation settings in any page component:
- Duration: `transition={{ duration: 0.8 }}`
- Delays: `delay: 0.1, 0.2, 0.3...`
- Types: `initial`, `animate`, `transition`

## 🚀 Essential Replacements

### Replace These Placeholders:
1. **"Your Name"** → Your actual name
2. **"your@email.com"** → Your email address
3. **"@yourhandle"** → Your social media handles
4. **"yourusername"** → Your GitHub username
5. **"https://yourname.com"** → Your domain
6. **Project descriptions** → Your actual projects
7. **Bio content** → Your personal story

### Add Your Own Content:
1. **Profile photo** (optional) - add to `public/` folder
2. **Project images** - replace placeholder images
3. **Blog posts** - add your own writing
4. **Skills** - update the skills list with your technologies
5. **Location** - update your location/timezone

## 📝 Content Writing Tips

### Homepage Bio
- Keep it concise (2-3 sentences)
- Focus on what you do and your approach
- Make it personal but professional

### About Page
- Tell your story
- Include your background
- Mention what drives you
- Keep it conversational

### Project Descriptions
- Start with what the project does
- Mention the key technologies
- Include what you learned or what makes it special
- Keep descriptions to 1-2 sentences

### Blog Posts
- Write about what you're learning
- Share your process and insights
- Include code examples when relevant
- Keep a consistent voice

## 🔧 Technical Customization

### Adding New Pages
1. Create new file in `src/app/newpage/page.tsx`
2. Add navigation link in `src/components/navigation.tsx`
3. Follow the existing pattern for animations and layout

### Modifying the Theme
1. Edit CSS variables in `src/app/globals.css`
2. Update Tailwind config in `tailwind.config.ts`
3. Adjust component styles as needed

### Adding New Components
1. Create in `src/components/` folder
2. Follow the existing naming convention
3. Use TypeScript for props
4. Include proper animations

## 🎯 Final Steps

1. **Test everything** - Click all links, test dark/light mode
2. **Check mobile** - Ensure responsive design works
3. **Update README** - Add your own info to README.md
4. **Set up analytics** (optional) - Add Google Analytics or similar
5. **Deploy** - Push to GitHub and deploy on Vercel

## 💡 Pro Tips

- Use the same animation patterns for consistency
- Keep the minimal aesthetic - less is more
- Test on different screen sizes
- Use semantic HTML for accessibility
- Optimize images before adding them
- Keep loading times fast

---

**Need help?** Check the main README.md for more detailed instructions! 