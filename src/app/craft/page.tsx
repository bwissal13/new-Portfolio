"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Craft items data structure
interface CraftItem {
  id: string;
  title: string;
  date: string;
  image?: string;
  video?: string;
  description?: string;
  link?: string;
  category?: string;
}

const craftItems: CraftItem[] = [
  {
    id: "sidebar-navigation",
    title: "Sidebar Navigation",
    date: "February 2025",
    video: "/craft/sidebar-navigation.mp4",
    description: "An exploration of motion and navigation patterns for modern web applications.",
    category: "UI/UX"
  },
  {
    id: "toolbar-morph",
    title: "Toolbar Morph",
    date: "January 2025",
    video: "/craft/toolbar-morph.mp4",
    description: "A reimagined toolbar interface for development tools with smooth transitions.",
    category: "Design System"
  },
  {
    id: "command-palette",
    title: "Command Palette",
    date: "December 2024",
    video: "/craft/command-palette.mp4",
    description: "Modern command palette design inspired by VS Code and Raycast.",
    category: "Component"
  },
  {
    id: "dashboard-cards",
    title: "Dashboard Cards",
    date: "November 2024",
    image: "/craft/dashboard-cards.png",
    description: "Interactive card components for data visualization and analytics.",
    category: "UI/UX"
  },
  {
    id: "mobile-drawer",
    title: "Mobile Drawer",
    date: "October 2024",
    video: "/craft/mobile-drawer.mp4",
    description: "Smooth drawer animations for mobile navigation experiences.",
    category: "Mobile"
  },
  {
    id: "form-validation",
    title: "Form Validation",
    date: "September 2024",
    video: "/craft/form-validation.mp4",
    description: "Real-time form validation with micro-interactions and feedback.",
    category: "Component"
  },
  {
    id: "color-system",
    title: "Color System",
    date: "August 2024",
    description: "A comprehensive color system for dark and light themes.",
    category: "Design System"
  },
  {
    id: "typography-scale",
    title: "Typography Scale",
    date: "July 2024",
    description: "Modular typography system with perfect vertical rhythm.",
    category: "Design System"
  },
  {
    id: "button-variants",
    title: "Button Variants",
    date: "June 2024",
    video: "/craft/button-variants.mp4",
    description: "Complete button system with states, sizes, and variants.",
    category: "Component"
  }
];

export default function Craft() {
  return (
    <div className="min-h-screen pt-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="py-20 space-y-12"
        >
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
              Craft
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Design explorations, UI experiments, and component studies. A collection of creative work and interface ideas.
            </p>
          </motion.header>

          {/* Grid of Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {craftItems.map((item, index) => (
              <CraftCard key={item.id} item={item} index={index} />
            ))}
          </motion.div>
        </motion.article>
      </div>
    </div>
  );
}

// Individual craft card component
function CraftCard({ item, index }: { item: CraftItem; index: number }) {
  const CardWrapper = item.link ? Link : 'div';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="group"
    >
      <CardWrapper
        href={item.link || '#'}
        className={`block rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] ${
          item.link ? 'cursor-pointer' : ''
        }`}
      >
        {/* Media (Image or Video) */}
        {(item.image || item.video) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 * index }}
            className="aspect-[4/3] overflow-hidden relative"
          >
            {item.video ? (
              <video
                src={item.video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <Image
                src={item.image!}
                alt={item.title}
                width={400}
                height={300}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            )}
            
            {/* Overlay Content */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + 0.1 * index }}
              className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-blue-900/30 to-transparent dark:from-slate-900/90 dark:via-blue-900/30 flex flex-col justify-end p-8"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                                  <h3 className="font-semibold text-white drop-shadow-lg group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                  {item.category && (
                    <span className="px-2 py-1 text-xs bg-slate-800/60 backdrop-blur-sm rounded-md text-white drop-shadow-sm">
                      {item.category}
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-white/90 drop-shadow-md">
                  {item.date}
                </p>
                
                {item.description && (
                  <p className="text-sm text-white/95 leading-relaxed drop-shadow-md">
                    {item.description}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
        
        {/* Fallback Content for items without media */}
        {!(item.image || item.video) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 * index }}
            className="bg-card border border-border rounded-lg p-8 space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                {item.category && (
                  <span className="px-2 py-1 text-xs bg-muted rounded-md text-muted-foreground">
                    {item.category}
                  </span>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground">
                {item.date}
              </p>
            </div>
            
            {item.description && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            )}
          </motion.div>
        )}
      </CardWrapper>
    </motion.div>
  );
} 