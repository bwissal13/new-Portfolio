"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Sample blog post data - in a real app, this would come from a CMS or markdown files
const blogPosts = {
  "building-better-ux": {
    title: "Building Better User Experiences",
    description: "Thoughts on designing interfaces that truly serve users. Exploring the principles of user-centered design and how to apply them in modern web development.",
    date: "2024-01-15",
    readTime: "5 min read",
    tags: ["UX", "Design", "Frontend"],
    content: `
# Building Better User Experiences

User experience design is more than just making things look pretty. It's about creating interfaces that truly serve users and help them accomplish their goals efficiently and enjoyably.

## The Foundation of Good UX

Great user experience starts with understanding your users. This means:

- **Research first**: Before you design anything, understand who your users are, what they need, and what problems they're trying to solve.
- **Empathy over assumptions**: Don't assume you know what users want. Talk to them, observe them, and test your assumptions.
- **Context matters**: The same user might have different needs in different contexts.

## Key Principles

### 1. Simplicity
Remove unnecessary complexity. Every element on your interface should serve a purpose.

\`\`\`jsx
// Bad: Too many options overwhelm users
function ComplexButton() {
  return (
    <button className="btn btn-primary btn-large btn-rounded btn-animated btn-shadow">
      Click me!
    </button>
  );
}

// Good: Simple and focused
function SimpleButton() {
  return (
    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
      Click me!
    </button>
  );
}
\`\`\`

### 2. Consistency
Maintain consistent patterns throughout your interface. Users should be able to predict how things work.

### 3. Feedback
Always provide clear feedback for user actions. Loading states, success messages, and error handling are crucial.

## The Process

1. **Research and Discovery**: Understand the problem space
2. **Define and Ideate**: Create user personas and user journeys
3. **Design and Prototype**: Create wireframes and prototypes
4. **Test and Iterate**: Get feedback and refine your designs
5. **Measure and Optimize**: Use analytics to understand how users interact with your design

## Tools and Techniques

Some of my favorite tools for UX design:

- **Figma**: For design and prototyping
- **Hotjar**: For user behavior analysis
- **UserTesting**: For getting user feedback
- **Analytics**: For measuring success

## Conclusion

Building better user experiences is an ongoing process. It requires empathy, research, and a willingness to iterate based on feedback. Remember, the best interface is often the one that gets out of the user's way and lets them accomplish their goals.

The key is to always put users first and design with intention. Every decision should be made with the user's needs in mind.
    `
  },
  "minimal-design": {
    title: "The Art of Minimal Design",
    description: "Why less is often more in digital design. A deep dive into minimalism and how it can improve user experience and performance.",
    date: "2024-01-10",
    readTime: "7 min read",
    tags: ["Design", "Minimalism", "UI"],
    content: `
# The Art of Minimal Design

Minimalism in design isn't about removing everything—it's about removing the unnecessary to highlight what matters most.

## What is Minimal Design?

Minimal design is characterized by:
- Clean, uncluttered interfaces
- Purposeful use of whitespace
- Limited color palettes
- Simple typography
- Focus on essential elements

## Benefits of Minimal Design

### Performance
Less elements mean faster load times and better performance.

### Clarity
Users can focus on what's important without distractions.

### Timeless Appeal
Minimal designs tend to age better than trend-heavy designs.

## How to Achieve Minimal Design

1. **Start with purpose**: Every element should have a clear reason for existing
2. **Use whitespace effectively**: Don't be afraid of empty space
3. **Choose typography carefully**: Stick to 1-2 fonts maximum
4. **Limit your color palette**: 2-3 colors can be more effective than 10
5. **Prioritize content**: Make sure the most important information stands out

Remember: Minimal doesn't mean boring. It means intentional.
    `
  }
};

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug as keyof typeof blogPosts];
  
  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-20 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="py-20"
        >
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-8"
          >
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to blog
            </Link>
          </motion.div>
          
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12 space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
              {post.title}
            </h1>
            
            <p className="text-lg text-muted-foreground">
              {post.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-2 py-1 text-xs bg-muted rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </div>
            </div>
          </motion.header>
          
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="prose prose-lg max-w-none"
          >
            <MDXContent content={post.content} />
          </motion.div>
          
          {/* Footer */}
          <motion.footer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 pt-8 border-t border-border"
          >
            <div className="flex items-center justify-between">
              <Link 
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to blog
              </Link>
              
              <Link 
                href="/contact"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Get in touch
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.footer>
        </motion.article>
      </div>
    </div>
  );
}

// Simple MDX content renderer
function MDXContent({ content }: { content: string }) {
  // Split content into sections and render
  const sections = content.split('\n\n');
  
  return (
    <div className="space-y-6">
      {sections.map((section, index) => {
        if (section.startsWith('# ')) {
          return (
            <h1 key={index} className="text-3xl font-bold mt-8 mb-4 text-primary">
              {section.slice(2)}
            </h1>
          );
        }
        
        if (section.startsWith('## ')) {
          return (
            <h2 key={index} className="text-2xl font-semibold mt-6 mb-3 text-primary">
              {section.slice(3)}
            </h2>
          );
        }
        
        if (section.startsWith('### ')) {
          return (
            <h3 key={index} className="text-xl font-medium mt-4 mb-2 text-primary">
              {section.slice(4)}
            </h3>
          );
        }
        
        if (section.startsWith('```')) {
          const codeContent = section.slice(3, -3);
          return (
            <pre key={index} className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code className="text-sm">{codeContent}</code>
            </pre>
          );
        }
        
        if (section.startsWith('- ')) {
          const items = section.split('\n').filter(line => line.startsWith('- '));
          return (
            <ul key={index} className="list-disc list-inside space-y-1">
              {items.map((item, i) => (
                <li key={i} className="text-muted-foreground">{item.slice(2)}</li>
              ))}
            </ul>
          );
        }
        
        if (section.trim()) {
          return (
            <p key={index} className="text-muted-foreground leading-relaxed">
              {section}
            </p>
          );
        }
        
        return null;
      }).filter(Boolean)}
    </div>
  );
} 