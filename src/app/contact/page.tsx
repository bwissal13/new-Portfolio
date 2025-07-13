"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MessageCircle, Github, Linkedin, Instagram, Globe } from "lucide-react";
import Link from "next/link";

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    description: "Best for project discussions and collaborations",
    value: "baazizwissal13@gmail.com",
    href: "mailto:baazizwissal13@gmail.com",
    available: "Usually responds within 24 hours"
  },
  {
    icon: MessageCircle,
    title: "Let's Chat",
    description: "Quick questions and casual conversations",
    value: "AI Chat Assistant",
    href: "/chat",
    available: "Available 24/7"
  }
];

const socialProfiles = [
  {
    icon: Github,
    platform: "GitHub",
    username: "@bwissal13",
    description: "All my code, projects, and open source contributions",
    url: "https://github.com/bwissal13",
    stats: "6+ repositories • Pull Shark achievement"
  },
  {
    icon: Globe,
    platform: "Portfolio Website",
    username: "bwissal.software",
    description: "Complete showcase of my projects and professional work",
    url: "https://www.bwissal.software/",
    stats: "Full portfolio • Project details"
  },
  {
    icon: Linkedin,
    platform: "LinkedIn",
    username: "baaziz-wissal-311a9526a",
    description: "Professional updates, career journey, and networking",
    url: "https://linkedin.com/in/baaziz-wissal-311a9526a",
    stats: "Professional network • Career updates"
  },
  {
    icon: Instagram,
    platform: "Instagram",
    username: "@baazizwissal",
    description: "Behind-the-scenes development journey and creative projects",
    url: "https://www.instagram.com/baazizwissal/",
    stats: "15 posts • 375 followers • Development journey"
  }
];

const collaborationTypes = [
  {
    title: "Full-Stack Development",
    description: "Building complete applications with React, Spring Boot, and Laravel",
    examples: ["Web applications", "REST APIs", "Database design", "Enterprise systems"]
  },
  {
    title: "Team Collaboration",
    description: "Contributing to teams with my mathematical thinking and design skills",
    examples: ["Code reviews", "Architecture planning", "Mentoring", "Knowledge sharing"]
  },
  {
    title: "Open Source",
    description: "Contributing to community projects and sharing knowledge",
    examples: ["GitHub contributions", "Documentation", "Bug fixes", "Feature development"]
  },
  {
    title: "Meaningful Projects",
    description: "Building technology that creates positive impact",
    examples: ["Educational platforms", "Community tools", "Accessibility features", "Social good"]
  }
];

export default function Contact() {
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
            Get in touch
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mb-16"
          >
            I'm always excited to connect with fellow developers, discuss interesting projects, 
            or explore collaboration opportunities. Whether you want to talk about code, design, 
            or just share development experiences - I'd love to hear from you!
          </motion.p>

          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6 mb-16"
          >
            <h2 className="text-2xl font-semibold mb-6 text-primary">How to reach me</h2>

            <div className="space-y-4">
              {contactMethods.map((method) => (
                <ContactCard
                  key={method.title}
                  icon={<method.icon className="h-5 w-5" />}
                  title={method.title}
                  description={method.description}
                  href={method.href}
                  linkText={method.value}
                  available={method.available}
                />
              ))}
            </div>
          </motion.div>

          {/* Social Profiles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6 mb-16"
          >
            <h2 className="text-2xl font-semibold mb-6 text-primary">Connect across platforms</h2>

            <div className="grid md:grid-cols-2 gap-4">
              {socialProfiles.map((profile) => (
                <SocialCard
                  key={profile.platform}
                  icon={<profile.icon className="h-5 w-5" />}
                  platform={profile.platform}
                  username={profile.username}
                  description={profile.description}
                  href={profile.url}
                  stats={profile.stats}
                />
              ))}
            </div>
          </motion.div>

          {/* What I'm Excited About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-6 mb-16"
          >
            <h2 className="text-2xl font-semibold mb-6 text-primary">What I'm excited about</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {collaborationTypes.map((type, index) => (
                <motion.div 
                  key={type.title} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="p-4 bg-muted/50 rounded-lg"
                >
                  <h3 className="font-medium mb-2">{type.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{type.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {type.examples.map((example, exampleIndex) => (
                      <motion.span 
                        key={example} 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          duration: 0.3, 
                          delay: 0.1 * index + 0.05 * exampleIndex,
                          type: "spring",
                          stiffness: 100
                        }}
                        whileHover={{ scale: 1.05 }}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded"
                      >
                        {example}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Chat Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.01, y: -2 }}
            className="p-6 bg-muted/50 rounded-lg mb-16 border-l-4 border-primary"
          >
            <h3 className="text-lg font-semibold text-primary mb-3">Want to chat right now?</h3>
            <p className="text-muted-foreground mb-4">
              Try my AI chat assistant! It knows all about my projects, skills, and journey. 
              Perfect for quick questions or getting to know more about my work.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/chat"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Start a Conversation
              </Link>
            </motion.div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-16 pt-8 border-t border-border text-center"
          >
            <h2 className="text-2xl font-semibold text-primary mb-4">Ready to connect?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-6">
              Whether it's about a project, a question, or just to say hello - 
              I'm excited to hear from you and explore how we can work together!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href="mailto:baazizwissal13@gmail.com"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Send Email
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/chat"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border hover:bg-muted transition-colors"
                >
                  Start Chat
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}

function ContactCard({
  icon,
  title,
  description,
  href,
  linkText,
  available
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  linkText: string;
  available: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        href={href}
        target={href.startsWith('http') ? "_blank" : undefined}
        rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
        className="group block p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-start gap-3">
          <motion.div 
            className="flex-shrink-0 mt-1 text-primary"
            whileHover={{ rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            {icon}
          </motion.div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-medium group-hover:text-primary transition-colors">
                {title}
              </h3>
              <motion.div
                whileHover={{ x: 2, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.div>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {description}
            </p>
            <p className="text-sm font-medium mt-2 group-hover:text-primary transition-colors">
              {linkText}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {available}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function SocialCard({
  icon,
  platform,
  username,
  description,
  href,
  stats
}: {
  icon: React.ReactNode;
  platform: string;
  username: string;
  description: string;
  href: string;
  stats: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-start gap-3">
          <motion.div 
            className="flex-shrink-0 mt-1 text-primary"
            whileHover={{ rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            {icon}
          </motion.div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-medium group-hover:text-primary transition-colors">
                {platform}
              </h3>
              <motion.div
                whileHover={{ x: 2, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.div>
            </div>
            <p className="text-sm text-primary font-medium mt-1">
              {username}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {description}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {stats}
            </p>
          </div>
        </div>
      </a>
    </motion.div>
  );
} 