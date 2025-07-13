"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink, CheckCircle } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    id: "ebankify",
    name: "eBankify",
    description: "A comprehensive modular e-banking API built with Spring Boot, designed to provide secure and efficient banking services for various user types with enterprise-level security standards.",
    shortDescription: "Enterprise-grade banking system with advanced security and real-time processing",
    status: "Production-ready",
    category: "Enterprise Application",
    featured: true,
    technologies: ["Spring Boot", "Spring Security", "ElasticSearch", "MySQL", "JWT", "API"],
    github: "https://github.com/bwissal13/eBankify",
    demo: null,
    highlights: ["Zero critical bugs in production", "Enterprise-level security", "Real-time transaction processing"]
  },
  {
    id: "echo",
    name: "Echo",
    description: "A collaborative platform where reading and writing enthusiasts meet to share, discover, and bring stories to life. Built with Spring Boot and JWT authentication for secure user management.",
    shortDescription: "Collaborative platform for reading and writing enthusiasts",
    status: "Production-ready",
    category: "Social Platform",
    featured: true,
    technologies: ["Spring Boot", "JWT", "PostgreSQL", "Liquibase", "Swagger", "Rate Limiting"],
    github: "https://github.com/bwissal13/Echo",
    demo: null,
    highlights: ["JWT authentication with refresh tokens", "Rate limiting and caching", "Comprehensive monitoring"]
  },
  {
    id: "recyclehub",
    name: "RecycleHub",
    description: "An Angular-based environmental platform focused on recycling and waste management. Features modern UI components and user-friendly interfaces for promoting sustainable practices.",
    shortDescription: "Environmental platform for recycling and waste management",
    status: "Production-ready",
    category: "Environmental Platform",
    featured: true,
    technologies: ["Angular", "TypeScript", "HTML5", "CSS3", "Vercel"],
    github: "https://github.com/bwissal13/RecycleHub",
    demo: "https://recycle-hub-eight.vercel.app/",
    highlights: ["Modern Angular architecture", "Environmental impact focus", "Responsive design"]
  },
  {
    id: "anazor",
    name: "Anazor",
    description: "Art marketplace platform connecting artists with buyers, featuring e-commerce functionality, community forums, and comprehensive artist portfolio management.",
    shortDescription: "Art marketplace connecting artists with buyers",
    status: "Production-ready",
    category: "E-commerce Platform",
    featured: true,
    technologies: ["Laravel", "PHP", "MySQL", "E-commerce", "Community Features"],
    github: "https://github.com/bwissal13/Anazor",
    demo: null,
    highlights: ["Artist portfolio management", "E-commerce integration", "Community features"]
  },
  {
    id: "tafukut",
    name: "Tafukut",
    description: "Interactive learning platform with video-code synchronization and real-time code execution for programming education, designed to enhance the learning experience.",
    shortDescription: "Interactive learning platform with video-code synchronization",
    status: "Production-ready",
    category: "Educational Platform",
    featured: true,
    technologies: ["React", "Real-time Processing", "Educational Tools", "Interactive Learning"],
    github: "https://github.com/bwissal13/Tafukut",
    demo: null,
    highlights: ["Video-code synchronization", "Real-time code execution", "Educational focus"]
  },
  {
    id: "citronix",
    name: "Citronix",
    description: "A comprehensive farm management system for citrus cultivation, featuring crop monitoring, harvest tracking, and agricultural data management for optimal farm productivity.",
    shortDescription: "Farm management system for citrus cultivation",
    status: "Production-ready",
    category: "Agricultural Platform",
    featured: true,
    technologies: ["Spring Boot", "Agricultural Management", "Data Analytics", "Monitoring"],
    github: "https://github.com/bwissal13/citronix",
    demo: null,
    highlights: ["Crop monitoring system", "Harvest tracking", "Data-driven agriculture"]
  },
  {
    id: "evento",
    name: "Evento",
    description: "Event management platform for organizing and managing events, featuring registration systems, attendee management, and event analytics for successful event coordination.",
    shortDescription: "Comprehensive event management platform",
    status: "Production-ready",
    category: "Event Management",
    featured: true,
    technologies: ["Event Management", "Registration Systems", "Analytics", "User Management"],
    github: "https://github.com/bwissal13/Evento",
    demo: null,
    highlights: ["Event registration", "Attendee management", "Analytics dashboard"]
  },
  {
    id: "job-dating",
    name: "Job Dating",
    description: "Professional networking platform facilitating job matching and career connections, featuring candidate-employer matching algorithms and professional networking tools.",
    shortDescription: "Professional networking and job matching platform",
    status: "Production-ready",
    category: "Professional Platform",
    featured: true,
    technologies: ["Matching Algorithms", "Professional Networking", "Career Management", "User Profiles"],
    github: "https://github.com/bwissal13/job-dating",
    demo: null,
    highlights: ["Smart matching algorithms", "Professional networking", "Career development"]
  },
  {
    id: "staduimstream",
    name: "StaduimStream",
    description: "Sports streaming platform for live sports events and content delivery, featuring real-time streaming capabilities and sports content management systems.",
    shortDescription: "Sports streaming platform for live events",
    status: "Production-ready",
    category: "Streaming Platform",
    featured: true,
    technologies: ["Streaming Technology", "Real-time Processing", "Sports Content", "Media Delivery"],
    github: "https://github.com/bwissal13/StaduimStream",
    demo: null,
    highlights: ["Real-time streaming", "Sports content delivery", "Live event management"]
  },
  {
    id: "dom-platform",
    name: "DOM Platform",
    description: "Web development platform featuring modern DOM manipulation techniques and interactive web components, showcasing advanced frontend development skills.",
    shortDescription: "Modern web development platform with DOM manipulation",
    status: "Production-ready",
    category: "Web Platform",
    featured: false,
    technologies: ["JavaScript", "DOM Manipulation", "Web Components", "Frontend"],
    github: null,
    demo: "https://dom-eosin-omega.vercel.app/",
    highlights: ["DOM manipulation", "Interactive components", "Modern web standards"]
  },
  {
    id: "rxjs-intro",
    name: "RxJS Learning Platform",
    description: "Interactive learning platform for RxJS concepts and reactive programming, featuring hands-on tutorials and practical examples for mastering reactive programming.",
    shortDescription: "Interactive RxJS learning platform",
    status: "Production-ready",
    category: "Educational Platform",
    featured: false,
    technologies: ["RxJS", "Reactive Programming", "JavaScript", "Educational Content"],
    github: null,
    demo: "https://rxjs-kappa.vercel.app/intro",
    highlights: ["Reactive programming", "Interactive tutorials", "Practical examples"]
  },
  {
    id: "taskifyapi",
    name: "TaskifyApi",
    description: "RESTful API for task management with advanced features including priority management, team collaboration, and productivity analytics.",
    shortDescription: "Advanced task management API",
    status: "Production-ready",
    category: "API Development",
    featured: false,
    technologies: ["REST API", "Task Management", "Team Collaboration", "Analytics"],
    github: null,
    demo: null,
    highlights: ["Priority management", "Team collaboration", "Productivity analytics"]
  }
];

export default function Projects() {
  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);
  
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
            My Projects
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mb-16"
          >
            A collection of applications that solve real problems - from enterprise banking systems 
            to innovative learning platforms. Each project represents a journey of learning, 
            problem-solving, and building technology that makes a difference.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          >
            <div className="p-4 bg-muted/50 rounded-lg border border-border text-center">
              <div className="text-2xl font-bold text-primary mb-1">12+</div>
              <div className="text-sm text-muted-foreground">Projects Built</div>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg border border-border text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">0</div>
              <div className="text-sm text-muted-foreground">Critical Bugs</div>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg border border-border text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">25+</div>
              <div className="text-sm text-muted-foreground">Technologies</div>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg border border-border text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">9</div>
              <div className="text-sm text-muted-foreground">Featured Projects</div>
            </div>
          </motion.div>

          {/* Featured Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-semibold text-primary mb-8">Featured Projects</h2>
            
            <div className="space-y-6">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 * index }}
                >
                  <FeaturedProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Other Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-semibold text-primary mb-8">More Projects</h2>
            
            <div className="space-y-6">
              {otherProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 * index }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-16 pt-8 border-t border-border text-center"
          >
            <h2 className="text-2xl font-semibold text-primary mb-4">Interested in My Work?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-6">
              I'm always excited to discuss my projects, share insights about development challenges, 
              or explore collaboration opportunities. Let's connect and build something amazing together!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Get In Touch
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              
              <a
                href="https://github.com/bwissal13"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border hover:bg-muted transition-colors"
              >
                <Github className="h-4 w-4" />
                View All Code
              </a>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}

function FeaturedProjectCard({ project }: { project: typeof projects[0] }) {
  const projectUrl = project.demo || project.github;
  
  return (
    <Link 
      href={projectUrl || "#"}
      target={projectUrl ? "_blank" : "_self"}
      rel={projectUrl ? "noopener noreferrer" : ""}
      className="group block p-6 rounded-lg border border-border hover:bg-muted/50 transition-colors"
    >
      <article className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
              {project.name}
            </h3>
            <span className="px-2 py-1 text-xs bg-muted rounded-md">
              {project.category}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {project.github && (
              <Github className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            )}
            <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </div>
        
        <p className="text-muted-foreground leading-relaxed">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 5).map((tech) => (
            <span key={tech} className="px-2 py-1 text-xs bg-muted rounded-md">
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="px-2 py-1 text-xs bg-muted rounded-md text-muted-foreground">
              +{project.technologies.length - 5} more
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-4 pt-2">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm text-muted-foreground">{project.status}</span>
          </div>
          <div className="flex items-center gap-2">
            {project.demo && (
              <span className="text-sm text-muted-foreground">Live Demo</span>
            )}
            {project.github && (
              <span className="text-sm text-muted-foreground">View Code</span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const projectUrl = project.demo || project.github;
  
  return (
    <Link
      href={projectUrl || "#"}
      target={projectUrl ? "_blank" : "_self"}
      rel={projectUrl ? "noopener noreferrer" : ""}
      className="group block p-6 rounded-lg border border-border hover:bg-muted/50 transition-colors"
    >
      <article className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
            {project.name}
          </h3>
          <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="px-2 py-1 text-xs bg-muted rounded-md">
            {project.category}
          </span>
        </div>
        
        <p className="text-muted-foreground leading-relaxed">
          {project.shortDescription}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="px-2 py-1 text-xs bg-muted rounded-md">
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-1 text-xs bg-muted rounded-md text-muted-foreground">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>

        <div className="flex items-center gap-4 pt-2">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm text-muted-foreground">{project.status}</span>
          </div>
          <div className="flex items-center gap-2">
            {project.demo && (
              <span className="text-sm text-muted-foreground">Live Demo</span>
            )}
            {project.github && (
              <span className="text-sm text-muted-foreground">View Code</span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
} 