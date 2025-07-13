# Personal Portfolio Website

A minimal, elegant portfolio website built with Next.js, Tailwind CSS, and Framer Motion.

## Features

- 🎨 **Clean, minimal design** with beautiful typography
- 🌙 **Dark/Light mode** toggle
- 📱 **Fully responsive** and mobile-first
- ⚡ **Performance optimized** with Next.js
- 🎭 **Smooth animations** with Framer Motion
- 📝 **Blog support** with MDX (ready for expansion)
- 🔧 **Highly customizable** and scalable

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Typography**: Inter + Geist Mono fonts
- **Theme**: next-themes for dark/light mode

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Download the Geist Mono font:
   - Visit [Vercel's font page](https://vercel.com/font/mono)
   - Download `GeistMonoVF.woff2`
   - Place it in `src/app/fonts/GeistMonoVF.woff2`
   - Or use any other monospace font and update the path in `src/app/layout.tsx`

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization Guide

### 1. Personal Information

Update the following files with your information:

- `src/app/layout.tsx` - Meta tags, name, social handles
- `src/components/navigation.tsx` - Your name in the header
- `src/app/page.tsx` - Homepage content, name, bio
- `src/app/about/page.tsx` - About page content, skills, links
- `src/app/contact/page.tsx` - Contact information

### 2. Projects

Edit `src/app/projects/page.tsx` to add your projects:

```typescript
const projects = [
  {
    title: "Your Project",
    description: "Project description",
    tech: ["React", "Next.js", "TypeScript"],
    github: "https://github.com/yourusername/project",
    demo: "https://project-demo.com",
    image: "/api/placeholder/400/300"
  },
  // Add more projects...
];
```

### 3. Blog Posts

For now, blog posts are stored in `src/app/blog/[slug]/page.tsx`. To add a new post:

1. Add the post data to the `blogPosts` object
2. Update the `src/app/blog/page.tsx` with the new post info

**Future Enhancement**: Implement proper MDX file-based blog posts with frontmatter.

### 4. Styling & Theme

The design system is built with CSS custom properties. You can customize:

- **Colors**: Edit the color variables in `src/app/globals.css`
- **Typography**: Change fonts in `src/app/layout.tsx`
- **Spacing**: Modify Tailwind config in `tailwind.config.ts`
- **Animations**: Adjust Framer Motion settings in components

### 5. Navigation

Update the navigation links in `src/components/navigation.tsx`:

```typescript
const navLinks = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];
```

## Project Structure

```
src/
├── app/
│   ├── about/page.tsx          # About page
│   ├── blog/
│   │   ├── page.tsx           # Blog listing
│   │   └── [slug]/page.tsx    # Individual blog posts
│   ├── contact/page.tsx        # Contact page
│   ├── projects/page.tsx       # Projects page
│   ├── fonts/                  # Font files
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Homepage
├── components/
│   ├── navigation.tsx          # Navigation component
│   └── theme-provider.tsx      # Theme provider
└── ...
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy with one click

### Other Platforms

This is a standard Next.js app and can be deployed to:
- Netlify
- Railway
- Digital Ocean
- AWS
- Any platform that supports Node.js

## Performance

The website is optimized for performance with:
- Server-side rendering with Next.js
- Optimized images and fonts
- Minimal JavaScript bundle
- Efficient CSS with Tailwind
- Proper caching headers

## Accessibility

- Semantic HTML structure
- Proper heading hierarchy
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios
- Focus indicators

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you find this project helpful, please consider giving it a ⭐ on GitHub!

For questions or support, feel free to [open an issue](https://github.com/yourusername/portfolio/issues) or reach out via [email](mailto:your@email.com).
