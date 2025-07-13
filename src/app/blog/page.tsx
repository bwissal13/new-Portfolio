"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import Link from "next/link";

const blogPosts = [
  {
    title: "The Art of Web Design",
    description: "Balancing creativity and functionality in modern web design. Exploring the intersection of visual aesthetics and user experience.",
    date: "2024-01-15",
    readTime: "6 min read",
    slug: "art-of-web-design",
    tags: ["Web Design", "UI/UX", "Creative Process"]
  },
  {
    title: "Building Brand Identity",
    description: "My approach to creating memorable and effective brand identities that resonate with audiences and stand the test of time.",
    date: "2024-01-10",
    readTime: "8 min read",
    slug: "building-brand-identity",
    tags: ["Branding", "Logo Design", "Visual Identity"]
  },
  {
    title: "From Design to Code",
    description: "Bridging the gap between design and development. How to translate visual concepts into functional, responsive web applications.",
    date: "2024-01-05",
    readTime: "10 min read",
    slug: "design-to-code",
    tags: ["Design Systems", "Frontend", "Workflow"]
  },
  {
    title: "Modern Design Tools & Workflow",
    description: "A comprehensive guide to the design tools and workflows that help streamline the creative process from concept to completion.",
    date: "2024-01-01",
    readTime: "7 min read",
    slug: "modern-design-tools",
    tags: ["Design Tools", "Adobe Creative Suite", "Figma"]
  },
  {
    title: "Responsive Design Best Practices",
    description: "Essential techniques for creating websites that look and function beautifully across all devices and screen sizes.",
    date: "2023-12-25",
    readTime: "9 min read",
    slug: "responsive-design-practices",
    tags: ["Responsive Design", "CSS", "Mobile First"]
  },
  {
    title: "Typography in Digital Design",
    description: "The power of typography in web and graphic design. How to choose and implement fonts that enhance your message and brand.",
    date: "2023-12-20",
    readTime: "5 min read",
    slug: "typography-digital-design",
    tags: ["Typography", "Font Selection", "Visual Hierarchy"]
  }
];

export default function Blog() {
  return (
    <div className="min-h-screen pt-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="py-20"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-8 text-primary"
          >
            Blog
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mb-16"
          >
            Insights on web design, graphic design, development, and the creative process. 
            Sharing knowledge from the intersection of design and technology.
          </motion.p>
          
          <div className="space-y-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * index }}
              >
                <BlogPostCard post={post} />
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}

function BlogPostCard({ post }: { post: typeof blogPosts[0] }) {
  return (
    <Link 
      href={`/blog/${post.slug}`}
      className="group block p-6 rounded-lg border border-border hover:bg-muted/50 transition-colors"
    >
      <article className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
            {post.title}
          </h2>
          <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
        
        <p className="text-muted-foreground leading-relaxed">
          {post.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
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
      </article>
    </Link>
  );
} 