"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, X, Minimize2, Star, GitFork, ExternalLink, ChevronUp, ChevronDown, MessageCircle, Mail, Github, Linkedin, Globe, MapPin, Code, Heart, Settings, Briefcase, GraduationCap, Target, Lightbulb } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  richContent?: {
    type: 'github-repos' | 'project-card' | 'profile-card' | 'info-card';
    data: any;
  };
}

interface ChatProps {
  isOpen: boolean;
  onToggle: () => void;
  initialMessage?: string;
  fullScreen?: boolean;
}

// Language color mapping for GitHub languages
const getLanguageColor = (language: string) => {
  const colors: { [key: string]: string } = {
    'JavaScript': '#f1e05a',
    'TypeScript': '#3178c6',
    'Python': '#3572A5',
    'Java': '#b07219',
    'C++': '#f34b7d',
    'C#': '#239120',
    'PHP': '#777bb4',
    'Go': '#00ADD8',
    'Rust': '#dea584',
    'Ruby': '#701516',
    'Swift': '#fa7343',
    'Kotlin': '#A97BFF',
    'Dart': '#00B4AB',
    'HTML': '#e34c26',
    'CSS': '#1572B6',
    'Vue': '#4FC08D',
    'React': '#61DAFB',
    'Angular': '#DD0031',
    'Shell': '#89e051',
    'Dockerfile': '#384d54',
    'C': '#555555',
    'Unknown': '#858585'
  };
  return colors[language] || colors['Unknown'];
};



// Profile Card Component
const ProfileCard = ({ profile }: { profile: any }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-card border border-border rounded-xl p-4 sm:p-6 shadow-lg"
    >
      {/* Main Layout - Responsive */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        {/* Left Side - Image and Basic Info */}
        <div className="flex-shrink-0 flex flex-col items-center sm:items-start w-full sm:w-auto mb-4 sm:mb-0">
          <div className="relative mb-4">
            <img
              src={profile.image}
              alt={profile.name}
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-primary shadow-lg"
            />
            <div className="absolute -top-2 -right-2">
              <span className="text-3xl">👋</span>
            </div>
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">{profile.name}</h2>
            <div className="space-y-1 text-sm">
              <div className="flex items-center justify-center sm:justify-start gap-1 text-muted-foreground">
                <Code className="h-4 w-4" />
                <span>{profile.age}</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-1 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{profile.location}</span>
              </div>
            </div>
          </div>
        </div>
        {/* Right Side - Content */}
        <div className="flex-1 space-y-4 min-w-0">
          {/* Bio */}
          <div>
            <p className="text-sm text-foreground leading-relaxed whitespace-pre-line break-words">
              {profile.bio}
            </p>
          </div>
          {/* Philosophy */}
          <div className="p-4 bg-primary/10 rounded-lg border-l-4 border-primary">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="h-4 w-4 text-primary" />
              <span className="text-sm font-bold text-primary">Philosophy</span>
            </div>
            <p className="text-sm text-foreground italic break-words">"{profile.philosophy}"</p>
          </div>
          {/* Skills and Projects Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Skills/Tags */}
            <div>
              <h3 className="text-sm font-bold text-foreground mb-2">Skills</h3>
              <div className="flex flex-wrap gap-1">
                {profile.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {/* Featured Projects */}
            <div>
              <h3 className="text-sm font-bold text-foreground mb-2">Featured Projects</h3>
              <div className="flex flex-wrap gap-1">
                {profile.projects.map((project: string, index: number) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded"
                  >
                    {project}
                  </span>
                ))}
              </div>
            </div>
          </div>
          {/* Contact Links */}
          <div>
            <h3 className="text-sm font-bold text-foreground mb-2">Connect with me</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => window.open(`mailto:${profile.contact.email}`, '_blank')}
                className="flex items-center gap-1 p-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded transition-colors text-xs w-full justify-center"
              >
                <Mail className="h-3 w-3" />
                <span>Email</span>
              </button>
              <button
                onClick={() => window.open(profile.contact.github, '_blank')}
                className="flex items-center gap-1 p-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded transition-colors text-xs w-full justify-center"
              >
                <Github className="h-3 w-3" />
                <span>GitHub</span>
              </button>
              <button
                onClick={() => window.open(profile.contact.linkedin, '_blank')}
                className="flex items-center gap-1 p-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded transition-colors text-xs w-full justify-center"
              >
                <Linkedin className="h-3 w-3" />
                <span>LinkedIn</span>
              </button>
              <button
                onClick={() => window.open(profile.contact.website, '_blank')}
                className="flex items-center gap-1 p-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded transition-colors text-xs w-full justify-center"
              >
                <Globe className="h-3 w-3" />
                <span>Website</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Info Card Component for structured responses
const InfoCard = ({ title, sections, icon: Icon }: { title: string; sections: any[]; icon?: any }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-card border border-border rounded-xl p-6 shadow-lg"
    >
      <div className="flex items-center gap-3 mb-6">
        {Icon && <Icon className="h-6 w-6 text-primary" />}
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
      </div>
      
      <div className="space-y-6">
        {sections.map((section, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              {section.icon && <section.icon className="h-5 w-5 text-primary" />}
              <h3 className="font-semibold text-foreground">{section.title}</h3>
            </div>
            
            {section.type === 'list' && (
              <div className="grid grid-cols-1 gap-2">
                {section.items.map((item: string, itemIndex: number) => (
                  <div key={itemIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}
            
            {section.type === 'tags' && (
              <div className="flex flex-wrap gap-2">
                {section.items.map((item: string, itemIndex: number) => (
                  <span
                    key={itemIndex}
                    className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            )}
            
            {section.type === 'text' && (
              <p className="text-sm text-foreground leading-relaxed">{section.content}</p>
            )}
            
            {section.type === 'cards' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.items.map((item: any, itemIndex: number) => (
                  <div key={itemIndex} className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-medium text-foreground mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                    {item.technologies && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.technologies.map((tech: string, techIndex: number) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-primary/20 text-primary text-xs rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// GitHub Repository Card Component
const GitHubRepoCard = ({ repo, onClick }: { repo: any; onClick: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-lg p-4 hover:shadow-lg hover:border-primary/20 transition-all duration-200 cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
            {repo.name}
            <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {repo.description || 'No description available'}
          </p>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {repo.language && (
            <span className="flex items-center gap-1.5">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: getLanguageColor(repo.language) }}
              ></div>
              <span className="font-medium">{repo.language}</span>
            </span>
          )}
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 text-yellow-500" />
            <span className="font-medium">{repo.stars}</span>
          </span>
          <span className="flex items-center gap-1">
            <GitFork className="h-3.5 w-3.5 text-blue-500" />
            <span className="font-medium">{repo.forks}</span>
          </span>
        </div>
        
        {repo.topics && repo.topics.length > 0 && (
          <div className="flex gap-1">
            {repo.topics.slice(0, 2).map((topic: string, index: number) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium"
              >
                {topic}
              </span>
            ))}
            {repo.topics.length > 2 && (
              <span className="px-2 py-1 bg-muted text-xs rounded-full text-muted-foreground">
                +{repo.topics.length - 2}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Rich Content Renderer
const RichContentRenderer = ({ richContent }: { richContent: any }) => {
  if (!richContent) return null;

  switch (richContent.type) {
    case 'profile-card':
      return (
        <div className="mt-3">
          <ProfileCard profile={richContent.data} />
        </div>
      );

    case 'info-card':
      return (
        <div className="mt-3">
          <InfoCard 
            title={richContent.data.title}
            sections={richContent.data.sections}
            icon={richContent.data.icon}
          />
        </div>
      );

    case 'github-repos':
      return (
        <div className="space-y-3 mt-3">
          {richContent.data.repos.map((repo: any, index: number) => (
            <GitHubRepoCard
              key={index}
              repo={repo}
              onClick={() => window.open(repo.url, '_blank')}
            />
          ))}
          <div className="text-center pt-3">
            <button
              onClick={() => window.open(richContent.data.profile, '_blank')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              View all repositories on GitHub
            </button>
          </div>
        </div>
      );
    

    default:
      return null;
  }
};

// Real knowledge base about Wissal Baaziz from GitHub, LinkedIn, and website
const knowledgeBase = {
  personal: {
    name: "Wissal Baaziz",
    role: "Full Stack Developer | Digital Craftsman | Code Architect",
    education: "Currently at Youcode-UM6P",
    background: "Mathematics background with a love for problem-solving",
    email: "contact@bwissal.me",
    github: "https://github.com/bwissal13",
    linkedin: "https://www.linkedin.com/in/baaziz-wissal-311a9526a/",
    instagram: "https://www.instagram.com/baazizwissal/",
    website: "https://www.bwissal.me"
  },
  skills: {
    frontend: [
      "React", "Angular", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap"
    ],
    backend: [
      "Spring Boot", "Laravel", "Java", "PHP", "Spring Security", "JPA"
    ],
    database: [
      "MySQL", "PostgreSQL", "ElasticSearch"
    ],
    tools: [
      "Docker", "Git", "Postman", "Figma", "Adobe XD"
    ],
    currentlyLearning: [
      "React", "Spring Boot", "Cloud Technologies"
    ]
  },
  projects: [
    {
      title: "eBankify - Banking Application",
      description: "A comprehensive banking system with advanced transaction features, user role management, and ElasticSearch integration for efficient searching.",
      tech: ["Spring Boot", "Spring Security", "JPA", "ElasticSearch", "MySQL"],
      features: ["Role-based authentication", "Instant & scheduled transactions", "Loan management"],
      category: "Full-Stack Banking"
    },
    {
      title: "Anazor - Art Marketplace",
      description: "A digital marketplace for artists to showcase and sell their work, complete with a community forum.",
      tech: ["Laravel", "HTML5", "CSS", "Bootstrap", "JavaScript"],
      features: ["User authentication", "Admin panel", "CRUD operations", "Interactive forum"],
      category: "E-commerce"
    },
    {
      title: "Tafukut - Interactive Learning Platform",
      description: "An educational platform combining video tutorials with a real-time code editor.",
      tech: ["React", "JavaScript"],
      features: ["Video-code synchronization", "Real-time code execution", "Interactive learning"],
      category: "Educational"
    },
    {
      title: "TaskifyApi",
      description: "Task management API built with PHP for efficient task organization and management.",
      tech: ["PHP"],
      category: "Backend API"
    },
    {
      title: "Hotel Management System",
      description: "Java console application for managing hotel reservations and operations.",
      tech: ["Java"],
      category: "Console Application"
    },
    {
      title: "Employee Management System",
      description: "Java application designed to manage employee information and department data using DTO pattern.",
      tech: ["Java"],
      category: "Enterprise Application"
    }
  ],
  experience: {
    current: "Full Stack Developer at Youcode-UM6P, mastering React, Spring Boot, and Cloud Technologies",
    background: "Mathematics background with strong problem-solving skills",
    goals: "Goals for 2025: Contribute to open source projects and build scalable applications",
    approach: "Transforms ideas into elegant, functional solutions driven by curiosity and continuous learning"
  },
  philosophy: "Code is poetry written for machines but read by humans"
};

// Smart response system that can search and provide detailed information
function generateResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();
  
  // Check for specific project questions
  if (message.includes('ebankify') || message.includes('banking') || message.includes('bank')) {
    const project = knowledgeBase.projects.find(p => p.title.toLowerCase().includes('ebankify'));
    if (project) {
      return `eBankify is one of my favorite projects! 🏦 It's a comprehensive banking system I built with Spring Boot, Spring Security, and MySQL. Here's what makes it special:

• **Core Features**: Role-based authentication, instant & scheduled transactions, and loan management
• **Tech Stack**: Spring Boot, Spring Security, JPA, ElasticSearch, MySQL
• **What I'm proud of**: The advanced transaction features and ElasticSearch integration for efficient searching
• **Challenge**: Implementing secure payment processing and role-based access control

It's a full-stack banking solution that handles real-world banking operations with enterprise-level security! Want to know more about any specific aspect? 💰`;
    }
  }
  
  if (message.includes('anazor') || message.includes('marketplace') || message.includes('art')) {
    const project = knowledgeBase.projects.find(p => p.title.toLowerCase().includes('anazor'));
    if (project) {
      return `Anazor is super cool! 🎨 It's an art marketplace I built where artists can showcase and sell their work, plus it has a community forum for interaction.

• **What it does**: Digital marketplace for artists with community features
• **Tech Stack**: Laravel, HTML5, CSS, Bootstrap, JavaScript  
• **Key Features**: User authentication, admin panel, full CRUD operations, interactive forum
• **Why I love it**: It combines e-commerce with social features for the art community

The coolest part is how it brings artists together in one platform - they can sell their work AND connect with other artists! Are you interested in art or e-commerce development? 🖼️`;
    }
  }
  
  if (message.includes('tafukut') || message.includes('learning') || message.includes('education')) {
    const project = knowledgeBase.projects.find(p => p.title.toLowerCase().includes('tafukut'));
    if (project) {
      return `Tafukut is my educational platform project! 📚 It's designed to make learning programming more interactive and engaging.

• **What it does**: Interactive learning platform with video tutorials and real-time code editor
• **Tech Stack**: React, JavaScript
• **Cool Features**: Video-code synchronization, real-time code execution, interactive learning modules
• **Innovation**: Students can watch tutorials while coding simultaneously in the same interface

The idea came from my own learning experience - I wanted to create something that bridges the gap between watching tutorials and actually coding. It's like having a coding mentor right next to you! Interested in educational technology? 🚀`;
    }
  }
  
  // More detailed skill responses
  if (message.includes('spring boot') || message.includes('java')) {
    return `Spring Boot is one of my favorite backend technologies! ☕ I've used it extensively in projects like eBankify. Here's why I love it:

• **Why Spring Boot**: It makes Java development so much faster and cleaner
• **What I've built**: Banking systems, APIs, microservices
• **Key features I use**: Spring Security for authentication, JPA for database operations, REST APIs
• **Learning curve**: Coming from a math background, I appreciate how logical and structured it is

I pair it with MySQL or PostgreSQL for databases, and it integrates beautifully with React frontends. The dependency injection and auto-configuration features are game-changers! Are you working with Spring Boot too? 🌱`;
  }
  
  if (message.includes('react') || message.includes('frontend')) {
    return `React is my go-to frontend framework! ⚛️ I absolutely love how it makes complex UIs manageable and reusable.

• **What I've built**: Portfolio sites, dashboard interfaces, interactive learning platforms
• **Why I chose React**: Component-based architecture, virtual DOM, huge ecosystem
• **Favorite features**: Hooks, state management, component reusability
• **Paired with**: TypeScript for type safety, Tailwind CSS for styling, Next.js for full-stack apps

The best part? I can create interactive, dynamic user interfaces that feel smooth and responsive. Plus, the React ecosystem has solutions for everything! What kind of React projects are you working on? 🎯`;
  }
  
  // Casual greetings
  if (message.includes('hi') || message.includes('hello') || message.includes('hey')) {
    const greetings = [
      "Hey there! 👋 I'm Wissal. Nice to meet you!",
      "Hi! Great to see you here. What's on your mind?",
      "Hello! I'm Wissal, a full-stack developer. How can I help you today?",
      "Hey! Welcome to my portfolio. What would you like to know?"
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }
  
  // Personal information
  if (message.includes('who') || message.includes('name') || message.includes('about')) {
    const responses = [
      "I'm Wissal Baaziz! I'm a full-stack developer currently at Youcode-UM6P, mastering React, Spring Boot, and Cloud Technologies. I come from a mathematics background which gives me a unique problem-solving perspective. I believe 'Code is poetry written for machines but read by humans' 😊",
      "Hey! I'm Wissal. I'm a Digital Craftsman and Code Architect who transforms ideas into elegant, functional solutions. Currently studying at Youcode-UM6P and working on some exciting projects like eBankify and Anazor. What brings you here today?",
      "I'm Wissal! A full-stack developer with a math background who loves creating digital experiences. I work with React, Spring Boot, Laravel, and I'm always learning new technologies. My goal for 2025 is to contribute to open source projects and build scalable applications!"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  // Skills
  if (message.includes('skill') || message.includes('technology') || message.includes('tech') || message.includes('stack')) {
    const responses = [
      "Oh, that's a fun question! 🚀 I work with quite a diverse tech stack! For frontend, I'm all about React and Angular - they're like my digital paintbrushes! I pair them with JavaScript and modern CSS frameworks like Tailwind and Bootstrap. On the backend, I love Spring Boot and Laravel - they're incredibly powerful for building robust APIs! I also work with databases like MySQL, PostgreSQL, and even ElasticSearch. Currently diving deep into Cloud Technologies because, let's be honest, the cloud is where everything's heading! What's your favorite technology to work with?",
      "I'm pretty versatile! 💻 My main frontend technologies are React and Angular - I love how they make complex UIs feel manageable. For backend development, Spring Boot and Laravel are my go-to choices. They're so elegant in how they handle everything! I also work with databases like MySQL and PostgreSQL, and tools like Docker, Git, Postman, and Figma for design work. The cool thing about being a developer is that there's always something new to learn. Are you working on anything exciting with these technologies?",
      "My toolkit is pretty diverse! 🛠️ React, Angular, Spring Boot, Laravel, Java, PHP, and various databases like MySQL and PostgreSQL. I'm currently obsessed with Cloud Technologies and always experimenting with new frameworks. You know what I love most? The fact that there's always a new challenge to tackle in this field! It keeps things exciting. Are you working on something similar or looking to dive into any of these technologies?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  // Projects overview
  if (message.includes('project') || message.includes('work') || message.includes('portfolio')) {
    return `I've worked on some really exciting projects! 🎯 Here's a quick overview:

**🏦 eBankify** - A comprehensive banking system with Spring Boot, featuring role-based authentication and transaction processing

**🎨 Anazor** - An art marketplace built with Laravel where artists can sell their work and connect with the community

**📚 Tafukut** - Interactive learning platform with React that combines video tutorials with real-time code editing

**⚙️ TaskifyApi** - Task management API built with PHP for efficient organization

**🏨 Hotel Management System** - Java console application for managing reservations and operations

Each project taught me something new and pushed me to solve different challenges. I love the variety - from banking security to educational technology to e-commerce! Which one interests you most? I'd love to tell you more details! 💫`;
  }
  
  // Experience
  if (message.includes('experience') || message.includes('background') || message.includes('career')) {
    const responses = [
      "That's a great question! 🎓 I'm currently studying at Youcode-UM6P, which is an amazing place for tech education. My background is actually in mathematics, which gives me a unique problem-solving perspective when it comes to coding. I love that I can take a project from concept to deployment - handle the backend logic, create the user interface, and make sure everything looks and feels great. It's like being a digital craftsperson! What's your background? Are you in tech too?",
      "My journey's been pretty interesting! 🌟 I come from a mathematics background, which really helps with logical thinking and problem-solving in development. Currently studying at Youcode-UM6P and loving every minute of it! I can write clean, efficient code and also make sure the user experience is top-notch. I've worked on everything from banking systems to project management tools. What got you interested in web development, or are you exploring it as a career option?",
      "I've been building web applications and working on design projects through my studies at Youcode-UM6P. 💻 My math background really comes in handy for logical problem-solving. What I love most is being able to solve real problems with code and design. Whether it's making a complex banking process simple or creating an interface that just feels right - that's what drives me every day! Are you thinking about getting into development yourself?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  // Contact
  if (message.includes('contact') || message.includes('email') || message.includes('reach') || message.includes('hire')) {
    const responses = [
      "I'd absolutely love to chat! 📧 You can reach me at contact@bwissal.me or check out my work on GitHub at github.com/bwissal13. I'm also on LinkedIn at linkedin.com/in/baaziz-wissal-311a9526a if that's your thing. And hey, if you're into Instagram, I share some behind-the-scenes stuff at @baazizwissal! Always happy to discuss new projects or just talk tech. What's on your mind?",
      "Feel free to drop me a line! 🚀 My email is contact@bwissal.me and I'm always open to interesting conversations and potential collaborations. You can also find me on GitHub (github.com/bwissal13), LinkedIn, and Instagram @baazizwissal. I love connecting with fellow developers and designers! What kind of project are you working on?",
      "Let's connect! 💫 My email is baazizwissal13@gmail.com and you can see more of my work at bwissal.me. I'm pretty active on GitHub (github.com/bwissal13) if you want to check out my code, and I'm on LinkedIn and Instagram too (@baazizwissal). I'm always excited to meet new people in the tech community! What's the best way to reach you?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  // Design related
  if (message.includes('design') || message.includes('ui') || message.includes('ux')) {
    const responses = [
      "Oh, design is such a huge part of what I do! 🎨 I believe great code means nothing if users can't figure out how to use it, right? I work with Figma mostly - it's like my digital canvas! I'm also comfortable with Adobe XD and the whole Creative Suite. I love creating interfaces that feel intuitive and look clean. There's something magical about seeing users interact with something you designed effortlessly. Are you working on a design project? I'd love to hear about it!",
      "I'm absolutely passionate about design! 💫 You know what I think? The best applications are where you can't tell where the code ends and the design begins - they just flow together perfectly. I do everything from wireframes to high-fidelity prototypes, and I'm always thinking about user experience. Design isn't just about making things pretty; it's about making them work beautifully. What's your design challenge? Maybe I can share some insights!",
      "Design and development go hand in hand for me! 🚀 I honestly can't code something without thinking about how it will look and feel for users - they're inseparable in my mind. Figma is my main tool, but I also love diving into brand identity work and creating consistent design systems. The psychology behind good design fascinates me. What aspect of design interests you most? UI, UX, or maybe the whole branding side?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // AI related questions
  if (message.includes('ai') || message.includes('artificial intelligence') || message.includes('chatbot') || message.includes('conversational')) {
    const responses = [
      "Ah, you mean like conversational AI! That's a really cool area! 🤖 It involves training models on tons of text data so they can understand and generate human-like responses. You need to focus on natural language processing (NLP) techniques, and frameworks like TensorFlow or PyTorch can help. It's all about making the AI understand context and respond in a way that feels natural. Have you ever thought about building something like that yourself?",
      "AI and conversational interfaces are fascinating! 🚀 The key is making interactions feel natural and helpful. I've been exploring how to integrate AI features into web applications - things like smart suggestions, automated responses, or even chatbots like this one! The challenge is balancing functionality with user experience. Are you interested in the technical side or more about the user experience aspect?",
      "AI is such an exciting field right now! 💫 Especially conversational AI - it's amazing how we can create systems that understand context and provide helpful responses. I love working on projects that incorporate AI features, whether it's for user assistance, data analysis, or automation. The possibilities are endless! What aspect of AI interests you the most?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  // More technology-specific responses
  if (message.includes('laravel') || message.includes('php')) {
    return `Laravel is fantastic for rapid web development! 🚀 I used it to build Anazor, my art marketplace platform. Here's why I love it:

• **What I built**: Art marketplace with user authentication, admin panel, and community forum
• **Why Laravel**: Elegant syntax, built-in authentication, powerful ORM (Eloquent)
• **Favorite features**: Blade templating, migrations, artisan commands
• **Real-world use**: Perfect for e-commerce and content management systems

The Laravel ecosystem is amazing - it handles so much out of the box! Have you worked with Laravel before? 💻`;
  }
  
  if (message.includes('mysql') || message.includes('database') || message.includes('sql')) {
    return `Databases are the backbone of any good application! 🗄️ I work with MySQL and PostgreSQL regularly:

• **Used in**: eBankify (banking transactions), Anazor (user data & products)
• **Why I love them**: Reliable, ACID compliance, great for complex relationships
• **Advanced features**: I've used ElasticSearch for efficient searching in eBankify
• **Database design**: I focus on normalization, indexing, and query optimization

Coming from a math background, I really appreciate the logical structure of relational databases. What kind of data challenges are you working on? 📊`;
  }
  
  if (message.includes('github') || message.includes('git') || message.includes('code')) {
    return `You can check out my code on GitHub! 🐙 Here's what you'll find:

• **GitHub**: github.com/bwissal13
• **What's there**: My projects like eBankify, Anazor, Tafukut, and more
• **Languages**: Java, PHP, JavaScript, React components
• **Project variety**: From banking systems to art marketplaces to educational tools

I believe in clean, readable code and good documentation. Each project shows different aspects of my development skills. Which type of project interests you most? I'd love to show you the specific implementations! 💻`;
  }
  
  // Enhanced search for related terms
  if (message.includes('learn') || message.includes('studying') || message.includes('youcode')) {
    return `I'm currently studying at Youcode-UM6P! 🎓 It's an amazing place for tech education. Here's what I'm focusing on:

• **Current focus**: React, Spring Boot, and Cloud Technologies
• **Background**: Mathematics, which really helps with logical problem-solving
• **Learning approach**: I believe in learning by building - that's why I have so many projects!
• **2025 goals**: Contribute to open source and build more scalable applications

The great thing about Youcode is the practical, project-based approach. We don't just learn theory - we build real applications! Are you a student too, or thinking about getting into development? 🚀`;
  }
  
  // Intelligent fallback that tries to help
  if (message.includes('tell me') || message.includes('more about') || message.includes('what') || message.includes('how')) {
    return `I'd love to help you learn more! 🤔 Here are some things I can tell you about:

• **My Projects**: eBankify (banking), Anazor (art marketplace), Tafukut (education), and more
• **Technologies**: React, Spring Boot, Laravel, MySQL, JavaScript, Java, PHP
• **Background**: Mathematics student turned full-stack developer at Youcode-UM6P
• **Contact**: email, GitHub, LinkedIn, Instagram - all the ways to connect!

Just ask me about any specific project, technology, or aspect of my work. I love sharing details about what I've built and how I built it! What would you like to know more about? 💫`;
  }
  
  // Default responses - more casual and varied
  const defaultResponses = [
    "That's an interesting question! 🤔 I'm Wissal, a full-stack developer and designer who's passionate about creating amazing digital experiences. What would you like to know more about? My projects, my tech stack, or maybe how I got into development? I'm all ears!",
    "Hey! 😊 I'm not sure I caught that exactly, but I'm here to chat about web development, design, or anything tech-related. What's on your mind? I love talking about code, design, or just hearing about what other people are working on!",
    "I'm Wissal! 🚀 I work with React, Spring Boot, Laravel, and I absolutely love design too. What brings you to my portfolio today? Are you exploring web development, looking for collaboration, or just curious about what I do?",
    "Hi there! 👋 I'm a developer who's passionate about creating great web experiences that actually solve real problems. Is there something specific you'd like to know about my work, my background, or maybe you have a project idea you want to discuss?"
  ];
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

export function AIChat({ isOpen, onToggle, initialMessage, fullScreen = false }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hey there! 👋 I'm Wissal's AI assistant, here to chat about her work, projects, and experience. \n\nYou can ask me anything or use the Quick Questions below for some popular topics! 🚀",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasProcessedInitialMessage, setHasProcessedInitialMessage] = useState(false);
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Quick questions data
  const quickQuestions = [
    {
      category: "About Me",
      questions: [
        "Who are you?",
        "What are your passions?",
        "How did you get started in tech?",
        "Where do you see yourself in 5 years?"
      ]
    },
    {
      category: "Professional",
      questions: [
        "Can I see your resume?",
        "What makes you a valuable team member?",
        "Where are you working now?",
        "Why should I hire you?"
      ]
    },
    {
      category: "Projects",
      questions: [
        "What projects are you most proud of?",
        "Tell me about eBankify",
        "Tell me about Anazor",
        "Tell me about Tafukut"
      ]
    },
    {
      category: "Skills & Learning",
      questions: [
        "What are your skills?",
        "How did you learn React?",
        "How did you learn Spring Boot?",
        "How did you learn Laravel?"
      ]
    },
    {
      category: "Fun & Personal",
      questions: [
        "What are your hobbies?",
        "What's the craziest thing you've built?",
        "Mac or PC?",
        "What's something 90% of people get wrong?"
      ]
    },
    {
      category: "Contact & Future",
      questions: [
        "How can I reach you?",
        "What kind of project would make you say yes immediately?",
        "Where are you located?",
        "What's your Instagram about?"
      ]
    }
  ];

  // Handle quick question click
  const handleQuickQuestionClick = (question: string) => {
    setInput(question);
    setShowQuickQuestions(false);
    // Optionally auto-send the question
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  // Auto-hide quick questions when user starts typing or when there are more messages
  useEffect(() => {
    if (messages.length > 1) {
      // Hide quick questions when conversation starts
      setShowQuickQuestions(false);
    }
  }, [messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Process initial message if provided
  useEffect(() => {
    if (initialMessage && !hasProcessedInitialMessage && isOpen) {
      setInput(initialMessage);
      setHasProcessedInitialMessage(true);
      
      // Auto-send the initial message after a short delay
      setTimeout(() => {
        handleSendMessage();
      }, 500);
    }
  }, [isOpen, initialMessage, hasProcessedInitialMessage]);

  // Reset initial message flag when chat closes
  useEffect(() => {
    if (!isOpen) {
      setHasProcessedInitialMessage(false);
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input.trim();
    setInput('');
    setIsTyping(true);

    try {
      // Make API call to our AI backend
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: currentInput }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: 'ai',
        timestamp: new Date(),
        richContent: data.richContent
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Fallback to local response if API fails
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(currentInput),
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={fullScreen 
        ? "w-full h-full bg-background flex flex-col" 
        : "fixed bottom-4 right-4 w-96 h-[600px] bg-background border border-border rounded-lg shadow-2xl flex flex-col z-50"
      }
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <h3 className="font-medium text-primary">Portfolio AI Assistant</h3>
        </div>
        {!fullScreen && (
          <div className="flex items-center gap-2">
            <button
              onClick={onToggle}
              className="p-1 hover:bg-muted rounded-md transition-colors"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`${
                  message.richContent ? 'max-w-[95%]' : 'max-w-[80%]'
                } p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                } ${message.sender === 'ai' ? 'whitespace-pre-line' : ''}`}
              >
                <div className="flex items-start gap-2">
                  {message.sender === 'ai' && (
                    <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  )}
                  {message.sender === 'user' && (
                    <User className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    {message.sender === 'ai' ? (
                      <div 
                        className="text-sm"
                        dangerouslySetInnerHTML={{ __html: message.text }}
                      />
                    ) : (
                      <p className="text-sm">{message.text}</p>
                    )}
                    {message.richContent && (
                      <RichContentRenderer richContent={message.richContent} />
                    )}
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-muted text-muted-foreground p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions Section */}
      <div className="border-t border-border">
        {/* Quick Questions Toggle */}
        <button
          onClick={() => setShowQuickQuestions(!showQuickQuestions)}
          className="w-full p-3 flex items-center justify-between hover:bg-muted/50 transition-colors text-sm font-medium text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            <span>Quick Questions</span>
          </div>
          {showQuickQuestions ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>

        {/* Quick Questions List */}
        <AnimatePresence>
          {showQuickQuestions && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="max-h-60 overflow-y-auto border-t border-border bg-muted/20"
            >
              <div className="p-3 space-y-3">
                {quickQuestions.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="space-y-2">
                    <h4 className="text-xs font-semibold text-primary uppercase tracking-wider">
                      {category.category}
                    </h4>
                    <div className="grid grid-cols-1 gap-1">
                      {category.questions.map((question, questionIndex) => (
                        <button
                          key={questionIndex}
                          onClick={() => handleQuickQuestionClick(question)}
                          className="text-left p-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about skills, projects, experience..."
            className="flex-1 px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim() || isTyping}
            className="px-3 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
} 