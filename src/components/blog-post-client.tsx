"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface BlogPost {
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string;
}

interface BlogPostClientProps {
  post: BlogPost;
}

export function BlogPostClient({ post }: BlogPostClientProps) {
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
        const lines = section.trim().split('\n');
        const firstLine = lines[0];
        
        if (firstLine.startsWith('# ')) {
          // Main heading
          return (
            <h1 key={index} className="text-3xl font-bold text-primary mb-4">
              {firstLine.substring(2)}
            </h1>
          );
        } else if (firstLine.startsWith('## ')) {
          // Subheading
          return (
            <h2 key={index} className="text-2xl font-semibold text-primary mb-3">
              {firstLine.substring(3)}
            </h2>
          );
        } else if (firstLine.startsWith('### ')) {
          // Sub-subheading
          return (
            <h3 key={index} className="text-xl font-semibold text-primary mb-2">
              {firstLine.substring(4)}
            </h3>
          );
        } else if (firstLine.startsWith('- ')) {
          // Unordered list
          return (
            <ul key={index} className="list-disc list-inside space-y-1 ml-4">
              {lines.map((line, lineIndex) => (
                <li key={lineIndex} className="text-muted-foreground">
                  {line.substring(2)}
                </li>
              ))}
            </ul>
          );
        } else if (firstLine.startsWith('1. ')) {
          // Ordered list
          return (
            <ol key={index} className="list-decimal list-inside space-y-1 ml-4">
              {lines.map((line, lineIndex) => (
                <li key={lineIndex} className="text-muted-foreground">
                  {line.substring(line.indexOf('.') + 2)}
                </li>
              ))}
            </ol>
          );
        } else if (firstLine.includes('```')) {
          // Code block
          const codeContent = lines.slice(1, -1).join('\n');
          const language = firstLine.replace('```', '').trim();
          return (
            <pre key={index} className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code className={`language-${language}`}>
                {codeContent}
              </code>
            </pre>
          );
        } else {
          // Regular paragraph
          return (
            <p key={index} className="text-muted-foreground leading-relaxed">
              {section}
            </p>
          );
        }
      })}
    </div>
  );
} 