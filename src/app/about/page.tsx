"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Instagram, Mail, Code, Palette, Brain, Coffee, ExternalLink } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    title: "eBankify",
    description: "A comprehensive e-banking API with enterprise-level security, real-time processing, and ElasticSearch integration. Built with Spring Boot.",
    technologies: ["Spring Boot", "Security", "ElasticSearch", "MySQL"],
    type: "Banking System",
    github: "https://github.com/bwissal13/eBankify"
  },
  {
    title: "Anazor",
    description: "Art marketplace platform connecting artists with buyers, featuring e-commerce functionality and community forums.",
    technologies: ["Laravel", "PHP", "Community", "E-commerce"],
    type: "Marketplace",
    github: "https://github.com/bwissal13/Anazor"
  },
  {
    title: "Tafukut",
    description: "Interactive learning platform with video-code synchronization and real-time code execution for programming education.",
    technologies: ["React", "Real-time", "Education", "Interactive"],
    type: "Learning Platform",
    github: "https://github.com/bwissal13/Tafukut"
  }
];

export default function About() {
  return (
    <div className="min-h-screen pt-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
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
            About Wissal
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mb-16"
          >
            Full Stack Developer & UI/UX Designer with a passion for building technology that creates real positive change. 
            My journey started with mathematics and evolved into creating digital solutions that solve real problems.
          </motion.p>


          
          {/* Journey Cards */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
            {/* Mathematical Background */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ 
                scale: 1.02, 
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="p-6 bg-muted/50 rounded-lg border border-border"
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  whileHover={{ rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Brain className="h-6 w-6 text-primary" />
                </motion.div>
                <h3 className="font-semibold">Mathematical Foundation</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                My path started with mathematics - I loved the logical thinking and problem-solving aspects. 
                This analytical approach became the foundation for everything I do in coding.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 text-xs bg-muted rounded-md">Analytical Thinking</span>
                <span className="px-2 py-1 text-xs bg-muted rounded-md">Problem Solving</span>
                <span className="px-2 py-1 text-xs bg-muted rounded-md">Logic & Patterns</span>
              </div>
            </motion.div>

            {/* Discovery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              whileHover={{ 
                scale: 1.02, 
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="p-6 bg-muted/50 rounded-lg border border-border"
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  whileHover={{ rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Code className="h-6 w-6 text-primary" />
                </motion.div>
                <h3 className="font-semibold">The "Aha!" Moment</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                I discovered coding was like solving math problems but with the power to create something real and functional! 
                Instead of just finding solutions on paper, I could build applications people could actually use.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 text-xs bg-muted rounded-md">Real-world Impact</span>
                <span className="px-2 py-1 text-xs bg-muted rounded-md">Creative Expression</span>
              </div>
            </motion.div>

            {/* Current Education */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ 
                scale: 1.02, 
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="p-6 bg-muted/50 rounded-lg border border-border md:col-span-2 lg:col-span-1"
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  whileHover={{ rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Palette className="h-6 w-6 text-primary" />
                </motion.div>
                <h3 className="font-semibold">Youcode-UM6P Journey</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Currently studying at Youcode-UM6P - an intensive, hands-on full-stack development program. 
                I don't just study, I build! Every concept gets immediately applied to real-world applications.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 text-xs bg-muted rounded-md">Full-Stack Development</span>
                <span className="px-2 py-1 text-xs bg-muted rounded-md">Project-Based Learning</span>
              </div>
            </motion.div>
          </div>

          {/* Skills Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="grid gap-6 md:grid-cols-2 mb-16"
          >
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-primary">Technical Skills</h2>
              
              <div className="space-y-4">
                <motion.div 
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 bg-muted/50 rounded-lg border border-border"
                >
                  <h3 className="font-medium mb-2">Frontend Development</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Building interactive user interfaces with modern frameworks and libraries
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <motion.span whileHover={{ scale: 1.05 }} className="px-2 py-1 text-xs bg-muted rounded-md">React</motion.span>
                    <motion.span whileHover={{ scale: 1.05 }} className="px-2 py-1 text-xs bg-muted rounded-md">Angular</motion.span>
                    <motion.span whileHover={{ scale: 1.05 }} className="px-2 py-1 text-xs bg-muted rounded-md">JavaScript</motion.span>
                    <motion.span whileHover={{ scale: 1.05 }} className="px-2 py-1 text-xs bg-muted rounded-md">TypeScript</motion.span>
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 bg-muted/50 rounded-lg border border-border"
                >
                  <h3 className="font-medium mb-2">Backend Development</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Creating scalable server-side applications and APIs
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <motion.span whileHover={{ scale: 1.05 }} className="px-2 py-1 text-xs bg-muted rounded-md">Spring Boot</motion.span>
                    <motion.span whileHover={{ scale: 1.05 }} className="px-2 py-1 text-xs bg-muted rounded-md">Laravel</motion.span>
                    <motion.span whileHover={{ scale: 1.05 }} className="px-2 py-1 text-xs bg-muted rounded-md">Java</motion.span>
                    <motion.span whileHover={{ scale: 1.05 }} className="px-2 py-1 text-xs bg-muted rounded-md">PHP</motion.span>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 bg-muted/50 rounded-lg border border-border"
                >
                  <h3 className="font-medium mb-2">Design & Visual Arts</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Creating beautiful, user-centered designs and brand identities
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <motion.span whileHover={{ scale: 1.05 }} className="px-2 py-1 text-xs bg-muted rounded-md">UI/UX Design</motion.span>
                    <motion.span whileHover={{ scale: 1.05 }} className="px-2 py-1 text-xs bg-muted rounded-md">Figma</motion.span>
                    <motion.span whileHover={{ scale: 1.05 }} className="px-2 py-1 text-xs bg-muted rounded-md">Adobe Creative Suite</motion.span>
                    <motion.span whileHover={{ scale: 1.05 }} className="px-2 py-1 text-xs bg-muted rounded-md">Brand Identity</motion.span>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-primary">Beyond Coding</h2>
              
              <div className="space-y-4">
                <motion.div 
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 bg-muted/50 rounded-lg border border-border"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <motion.div whileHover={{ rotate: 5 }} transition={{ duration: 0.2 }}>
                      <Brain className="h-4 w-4 text-primary" />
                    </motion.div>
                    <h3 className="font-medium">Deep Thinking 🐻</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Analytical problem-solving approach and strategic project planning
                  </p>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 bg-muted/50 rounded-lg border border-border"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <motion.div whileHover={{ rotate: 5 }} transition={{ duration: 0.2 }}>
                      <Coffee className="h-4 w-4 text-primary" />
                    </motion.div>
                    <h3 className="font-medium">Cooking Arts 🍳</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Finding creativity through cooking and using cooking breaks for problem-solving
                  </p>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 bg-muted/50 rounded-lg border border-border"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <motion.div whileHover={{ rotate: 5 }} transition={{ duration: 0.2 }}>
                      <Palette className="h-4 w-4 text-primary" />
                    </motion.div>
                    <h3 className="font-medium">Graphic Design 🛍️</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Creating brand identities and visual systems, bridging design with development
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Featured Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-semibold text-primary mb-8">Featured Projects</h2>
            <div className="space-y-6">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 * index }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="grid gap-4 md:grid-cols-3 mb-16"
          >
            <motion.div 
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ duration: 0.2 }}
              className="p-4 bg-muted/50 rounded-lg border border-border text-center"
            >
              <h3 className="font-semibold text-primary mb-2">GitHub Pull Shark</h3>
              <p className="text-sm text-muted-foreground">Multiple pull requests and active open source contributions</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ duration: 0.2 }}
              className="p-4 bg-muted/50 rounded-lg border border-border text-center"
            >
              <h3 className="font-semibold text-primary mb-2">Zero Critical Bugs</h3>
              <p className="text-sm text-muted-foreground">Built eBankify with enterprise-level security and reliability</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ duration: 0.2 }}
              className="p-4 bg-muted/50 rounded-lg border border-border text-center"
            >
              <h3 className="font-semibold text-primary mb-2">6 Projects Built</h3>
              <p className="text-sm text-muted-foreground">From banking systems to learning platforms</p>
            </motion.div>
          </motion.div>

          {/* Contact Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
          >
            <ContactCard
              icon={<Github className="h-5 w-5" />}
              title="GitHub"
              href="https://github.com/bwissal13"
              linkText="@bwissal13"
            />
            
            <ContactCard
              icon={<Linkedin className="h-5 w-5" />}
              title="LinkedIn"
              href="https://linkedin.com/in/baaziz-wissal-311a9526a"
              linkText="Wissal Baaziz"
            />
            
            <ContactCard
              icon={<Instagram className="h-5 w-5" />}
              title="Instagram"
              href="https://www.instagram.com/baazizwissal/"
              linkText="@baazizwissal"
            />
            
            <ContactCard
              icon={<Mail className="h-5 w-5" />}
              title="Email"
              href="mailto:baazizwissal13@gmail.com"
              linkText="Get in touch"
            />
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-16 pt-8 border-t border-border text-center"
          >
            <h2 className="text-2xl font-semibold text-primary mb-4">Let's Build Something Amazing</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-6">
              I'm always excited to connect with fellow developers, discuss interesting projects, 
              or explore collaboration opportunities. Whether you want to talk about code, design, 
              or just share development experiences - I'd love to hear from you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                View My Projects
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border hover:bg-muted transition-colors"
              >
                Get In Touch
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: typeof projects[0] }) {
  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Link 
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="group block p-6 rounded-lg border border-border hover:bg-muted/50 transition-colors"
      >
        <article className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <motion.div
              whileHover={{ x: 2, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </motion.div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="px-2 py-1 text-xs bg-muted rounded-md">
              {project.type}
            </span>
          </div>
          
          <p className="text-muted-foreground leading-relaxed">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <motion.span 
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.3, 
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ scale: 1.05 }}
                className="px-2 py-1 text-xs bg-muted rounded-md"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

function ContactCard({
  icon,
  title,
  href,
  linkText
}: {
  icon: React.ReactNode;
  title: string;
  href: string;
  linkText: string;
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
        <div className="flex items-center gap-3">
          <motion.div 
            className="flex-shrink-0 text-primary"
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
            <p className="text-sm text-muted-foreground mt-1 group-hover:text-primary transition-colors">
              {linkText}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
} 