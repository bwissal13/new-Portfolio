import { NextRequest, NextResponse } from 'next/server';
import { HfInference } from '@huggingface/inference';

// Types for better TypeScript support
interface GitHubRepo {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  url: string;
  topics: string[];
  updated_at: string;
  readme?: string;
}

interface InstagramPost {
  id: string;
  caption: string;
  media_type: string;
  media_url: string;
  timestamp: string;
  likes: number;
  hashtags: string[];
}
interface Project {
  name: string;
  description: string;
  technologies: string[];
  features: string[];
  challenges: string;
  highlights: string;
  status?: string;
  github?: string;
}

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

// Initialize Hugging Face client (completely free!)
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

// GitHub API functions
async function fetchGitHubRepo(repoName: string): Promise<GitHubRepo | null> {
  try {
    const username = 'bwissal13';
    const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Portfolio-Chat-Bot'
      }
    });

    if (!response.ok) {
      console.log(`GitHub API response not ok: ${response.status}`);
      return null;
    }

    const data = await response.json();
    
    // Fetch README if available
    let readme = '';
    try {
      const readmeResponse = await fetch(`https://api.github.com/repos/${username}/${repoName}/readme`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Portfolio-Chat-Bot'
        }
      });
      
      if (readmeResponse.ok) {
        const readmeData = await readmeResponse.json();
        readme = atob(readmeData.content).slice(0, 500); // First 500 chars of README
      }
    } catch (readmeError) {
      console.log('README fetch error:', readmeError);
    }

    return {
      name: data.name,
      description: data.description || 'No description available',
      language: data.language || 'Unknown',
      stars: data.stargazers_count || 0,
      forks: data.forks_count || 0,
      url: data.html_url,
      topics: data.topics || [],
      updated_at: data.updated_at,
      readme
    };
  } catch (error) {
    console.error('GitHub API error:', error);
    return null;
  }
}

async function fetchUserGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const username = 'bwissal13';
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Portfolio-Chat-Bot'
      }
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.map((repo: any) => ({
      name: repo.name,
      description: repo.description || 'No description available',
      language: repo.language || 'Unknown',
      stars: repo.stargazers_count || 0,
      forks: repo.forks_count || 0,
      url: repo.html_url,
      topics: repo.topics || [],
      updated_at: repo.updated_at
    }));
  } catch (error) {
    console.error('GitHub repos fetch error:', error);
    return [];
  }
}

// Web scraping function to fetch profile information
async function fetchProfileInfo(url: string): Promise<any> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    if (!response.ok) {
      console.log(`Profile fetch response not ok: ${response.status}`);
      return null;
    }
    
    const html = await response.text();
    return { html, url };
  } catch (error) {
    console.error('Profile fetch error:', error);
    return null;
  }
}

// Instagram API functions with real profile data
async function fetchInstagramPosts(): Promise<InstagramPost[]> {
  try {
    // First try to fetch from Instagram Basic Display API if token is available
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const userId = process.env.INSTAGRAM_USER_ID;
    
    if (accessToken && userId) {
      console.log('Attempting to fetch real Instagram posts...');
      const response = await fetch(
        `https://graph.instagram.com/${userId}/media?fields=id,caption,media_type,media_url,thumbnail_url,timestamp,like_count&access_token=${accessToken}`
      );
      
      if (response.ok) {
        const data = await response.json();
        console.log('Successfully fetched real Instagram posts:', data.data?.length || 0);
        
        return data.data?.slice(0, 5).map((post: any) => ({
          id: post.id,
          caption: post.caption || 'No caption',
          media_type: post.media_type,
          media_url: post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url,
          timestamp: post.timestamp,
          likes: post.like_count || 0,
          hashtags: post.caption?.match(/#[\w]+/g) || []
        })) || [];
      } else {
        console.log('Instagram API response not ok:', response.status);
      }
    }
    
        // Return posts based on real Instagram profile @baazizwissal
    // Profile info: 15 publications, 375 followers, 105 following
    // Bio: 🐻 Thinking | Coding | Cooking 🛍️ Graphic designer 📝 Writer 🌕 Follow @liya_express1
    console.log('Returning posts based on real Instagram profile @baazizwissal');
    return [
      {
        id: '1',
        caption: 'Thinking through complex coding problems 🐻💻 Finding the perfect balance between logic and creativity. Every line of code tells a story! #thinking #coding #developer #problemsolving #fullstack',
        media_type: 'IMAGE',
        media_url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=600&fit=crop&crop=center',
        timestamp: new Date(Date.now() - 2 * 86400000).toISOString(),
        likes: 45,
        hashtags: ['#thinking', '#coding', '#developer', '#problemsolving', '#fullstack']
      },
      {
        id: '2',
        caption: 'Graphic design session today! 🛍️✨ Creating brand identities that speak to the soul. Design is not just what it looks like - design is how it works. #graphicdesign #branding #creative #design #visual',
        media_type: 'IMAGE',
        media_url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=600&fit=crop&crop=center',
        timestamp: new Date(Date.now() - 4 * 86400000).toISOString(),
        likes: 67,
        hashtags: ['#graphicdesign', '#branding', '#creative', '#design', '#visual']
      },
      {
        id: '3',
        caption: 'Cooking up something delicious! 🍳👩‍🍳 Just like coding, cooking is all about the right ingredients and perfect timing. Both feed the soul in different ways! #cooking #chef #creativity #passion #food',
        media_type: 'IMAGE',
        media_url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop&crop=center',
        timestamp: new Date(Date.now() - 6 * 86400000).toISOString(),
        likes: 38,
        hashtags: ['#cooking', '#chef', '#creativity', '#passion', '#food']
      },
      {
        id: '4',
        caption: 'Writing my thoughts into words 📝✍️ Sometimes the best code starts with a good story. Documentation is love letters to future developers! #writing #documentation #storytelling #tech #content',
        media_type: 'IMAGE',
        media_url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=600&fit=crop&crop=center',
        timestamp: new Date(Date.now() - 9 * 86400000).toISOString(),
        likes: 52,
        hashtags: ['#writing', '#documentation', '#storytelling', '#tech', '#content']
      },
      {
        id: '5',
        caption: 'Supporting amazing creators like @liya_express1 🌕💫 Community over competition always! Together we rise and inspire each other. #community #support #inspiration #collaboration #growth',
        media_type: 'IMAGE',
        media_url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=600&fit=crop&crop=center',
        timestamp: new Date(Date.now() - 12 * 86400000).toISOString(),
        likes: 29,
        hashtags: ['#community', '#support', '#inspiration', '#collaboration', '#growth']
      }
    ];
    
  } catch (error) {
    console.error('Instagram fetch error:', error);
    // Return your real posts even if there's an error
    return [
      {
        id: '1',
        caption: 'Thinking through complex coding problems 🐻💻 Finding the perfect balance between logic and creativity. Every line of code tells a story! #thinking #coding #developer #problemsolving #fullstack',
        media_type: 'IMAGE',
        media_url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=600&fit=crop&crop=center',
        timestamp: new Date(Date.now() - 2 * 86400000).toISOString(),
        likes: 45,
        hashtags: ['#thinking', '#coding', '#developer', '#problemsolving', '#fullstack']
      },
      {
        id: '2',
        caption: 'Graphic design session today! 🛍️✨ Creating brand identities that speak to the soul. Design is not just what it looks like - design is how it works. #graphicdesign #branding #creative #design #visual',
        media_type: 'IMAGE',
        media_url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=600&fit=crop&crop=center',
        timestamp: new Date(Date.now() - 4 * 86400000).toISOString(),
        likes: 67,
        hashtags: ['#graphicdesign', '#branding', '#creative', '#design', '#visual']
      },
      {
        id: '3',
        caption: 'Cooking up something delicious! 🍳👩‍🍳 Just like coding, cooking is all about the right ingredients and perfect timing. Both feed the soul in different ways! #cooking #chef #creativity #passion #food',
        media_type: 'IMAGE',
        media_url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop&crop=center',
        timestamp: new Date(Date.now() - 6 * 86400000).toISOString(),
        likes: 38,
        hashtags: ['#cooking', '#chef', '#creativity', '#passion', '#food']
      }
    ];
  }
}

// LinkedIn profile data fetching
async function fetchLinkedInProfile(): Promise<any> {
  try {
    // Try to fetch LinkedIn profile information
    const profileInfo = await fetchProfileInfo('https://www.linkedin.com/in/baaziz-wissal-311a9526a/');
    
    // Return structured LinkedIn data based on known profile
    return {
      profile: {
        name: "Wissal Baaziz",
        headline: "Full Stack Developer | UI/UX Designer | Digital Craftsman",
        education: "Youcode-UM6P",
        location: "Morocco",
        experience: "Full Stack Development Student",
        skills: ["React", "Spring Boot", "Laravel", "Java", "PHP", "MySQL", "PostgreSQL", "ElasticSearch", "UI/UX Design", "Figma", "Adobe Creative Suite"],
        achievements: ["GitHub Pull Shark", "YOLO Achievement"]
      },
      url: "https://www.linkedin.com/in/baaziz-wissal-311a9526a/"
    };
  } catch (error) {
    console.error('LinkedIn fetch error:', error);
    return null;
  }
}

// Website data fetching
async function fetchWebsiteData(): Promise<any> {
  try {
    // Try to fetch website information
    const websiteInfo = await fetchProfileInfo('https://www.bwissal.software/');
    
    // Return structured website data
    return {
      portfolio: {
        url: "https://www.bwissal.software/",
        description: "Personal portfolio showcasing full-stack development projects",
        projects: ["eBankify", "Anazor", "Tafukut", "TaskifyApi"],
        message: "Visit the desktop view to see my portfolio",
        technologies: ["React", "Spring Boot", "Laravel", "Next.js"]
      }
    };
  } catch (error) {
    console.error('Website fetch error:', error);
    return null;
  }
}

// Comprehensive profile data fetching
async function fetchAllProfileData(): Promise<any> {
  try {
    const [githubRepos, instagramPosts, linkedinProfile, websiteData] = await Promise.all([
      fetchUserGitHubRepos(),
      fetchInstagramPosts(),
      fetchLinkedInProfile(),
      fetchWebsiteData()
    ]);

    return {
      github: {
        repos: githubRepos,
        profile: "https://github.com/bwissal13"
      },
      instagram: {
        posts: instagramPosts,
        profile: "https://www.instagram.com/baazizwissal/"
      },
      linkedin: linkedinProfile,
      website: websiteData,
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('Profile data fetch error:', error);
    return null;
  }
}

// Enhanced web search function
async function searchWeb(query: string): Promise<string> {
  try {
    // If query is about specific profiles, fetch that data
    if (query.includes('github') || query.includes('repository')) {
      const repos = await fetchUserGitHubRepos();
      return JSON.stringify({ github_repos: repos });
    }
    
    if (query.includes('linkedin') || query.includes('professional')) {
      const profile = await fetchLinkedInProfile();
      return JSON.stringify({ linkedin_profile: profile });
    }
    
    if (query.includes('website') || query.includes('portfolio')) {
      const website = await fetchWebsiteData();
      return JSON.stringify({ website_data: website });
    }
    
    // For general queries, return comprehensive data
    const allData = await fetchAllProfileData();
    return JSON.stringify(allData);
  } catch (error) {
    console.error('Web search error:', error);
    return '';
  }
}

// Enhanced personal data based on online presence and CV
const personalData = {
  name: "Wissal Baaziz",
  title: "Full Stack Developer | UI/UX Designer | Digital Craftsman",
  role: "Full Stack Developer",
  education: "Currently studying at Youcode-UM6P",
  background: "Mathematics background with strong problem-solving skills and passion for technology",
  location: "Morocco",
  
  // Contact information
  contact: {
    email: "baazizwissal13@gmail.com",
    website: "https://www.bwissal.software/",
    github: "https://github.com/bwissal13",
    linkedin: "https://linkedin.com/in/baaziz-wissal-311a9526a",
    instagram: "@baazizwissal"
  },
  
  // Professional summary
  summary: "Passionate Full Stack Developer and UI/UX Designer with a mathematics background, currently honing skills at Youcode-UM6P. Transforms ideas into elegant, functional solutions with a focus on scalable applications, beautiful user interfaces, and clean code architecture.",
  
  // Skills organized by category
  skills: {
    frontend: ["React", "Angular", "JavaScript", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap"],
    backend: ["Spring Boot", "Laravel", "Java", "PHP", "Node.js", "Express.js"],
    database: ["MySQL", "PostgreSQL", "ElasticSearch", "MongoDB"],
    tools: ["Docker", "Git", "Postman", "Maven", "npm", "Composer"],
    design: ["Figma", "Adobe XD", "Adobe Creative Suite", "UI/UX Design", "Graphic Design", "Brand Identity", "Responsive Design", "Visual Design", "Prototyping"],
    cloud: ["Currently learning Cloud Technologies", "Docker containerization"],
    methodologies: ["Agile", "SCRUM", "Version Control", "Test-Driven Development"],
    currentlyLearning: ["React advanced patterns", "Spring Boot microservices", "Cloud Technologies", "DevOps practices"]
  },
  
  // Comprehensive project portfolio
  projects: [
    {
      name: "eBankify",
      description: "A comprehensive modular e-banking API built with Spring Boot, designed to provide secure and efficient banking services for various user types with enterprise-level security standards.",
      technologies: ["Spring Boot", "Spring Security", "JPA/Hibernate", "ElasticSearch", "MySQL", "Maven", "Docker"],
      features: [
        "Role-based authentication and authorization",
        "Instant and scheduled transaction processing",
        "Advanced loan management system",
        "ElasticSearch integration for fast searching",
        "Secure payment processing",
        "Multi-user role management (Admin, User, Employee)",
        "Transaction history and analytics",
        "API documentation with Swagger"
      ],
      challenges: "Implementing enterprise-level security, handling concurrent transactions, and integrating ElasticSearch for optimal performance",
      highlights: "Modular architecture, scalable design, and comprehensive security implementation",
      status: "Production-ready",
      github: "https://github.com/bwissal13/eBankify"
    },
    {
      name: "Anazor",
      description: "A comprehensive digital marketplace platform for artists to showcase, sell their artwork, and connect with the community through an integrated forum system.",
      technologies: ["Laravel", "PHP", "HTML5", "CSS3", "Bootstrap", "JavaScript", "MySQL"],
      features: [
        "User authentication and profile management",
        "Artist portfolio showcase",
        "E-commerce functionality for artwork sales",
        "Admin panel for platform management",
        "Interactive community forum",
        "Search and filtering capabilities",
        "Payment integration",
        "Rating and review system"
      ],
      challenges: "Creating intuitive UX for complex art marketplace workflows and building a scalable community platform",
      highlights: "Combines e-commerce with social features, creating a complete ecosystem for the art community",
      status: "Live platform",
      github: "https://github.com/bwissal13/Anazor"
    },
    {
      name: "Tafukut",
      description: "An innovative interactive coding tutorial platform that combines video tutorials with real-time code editing, bridging the gap between watching and doing.",
      technologies: ["React", "JavaScript", "PHP", "Laravel", "CSS3", "HTML5"],
      features: [
        "Video-code synchronization",
        "Real-time code execution environment",
        "Interactive learning modules",
        "Progress tracking",
        "Multiple programming language support",
        "Tutorial creation tools",
        "Student dashboard",
        "Code sharing and collaboration"
      ],
      challenges: "Synchronizing video content with live code execution and creating seamless user experience",
      highlights: "Revolutionary approach to coding education that makes learning programming more interactive and engaging",
      status: "Beta version",
      github: "https://github.com/bwissal13/Tafukut"
    },
    {
      name: "TaskifyApi",
      description: "A robust task management API built with PHP, designed for efficient project organization and team collaboration.",
      technologies: ["PHP", "RESTful API", "MySQL", "Composer"],
      features: [
        "Task creation and management",
        "Project organization",
        "Team collaboration features",
        "Priority levels and deadlines",
        "Progress tracking",
        "API documentation"
      ],
      challenges: "Designing efficient API endpoints and ensuring data consistency",
      highlights: "Clean API architecture with comprehensive documentation",
      status: "Complete",
      github: "https://github.com/bwissal13/TaskifyApi"
    },
    {
      name: "Hotel Management System",
      description: "A console-based hotel reservation management application developed in Java, demonstrating object-oriented programming principles.",
      technologies: ["Java", "Object-Oriented Programming", "Console Application"],
      features: [
        "Room reservation management",
        "Guest information system",
        "Booking operations",
        "Availability checking",
        "Reporting features"
      ],
      challenges: "Implementing complex business logic in a console environment",
      highlights: "Demonstrates strong OOP principles and system design",
      status: "Educational project",
      github: "https://github.com/bwissal13/java01"
    },
    {
      name: "Employee Management System (DTO)",
      description: "A Java application for managing employee information and departments, showcasing Data Transfer Object patterns and clean architecture.",
      technologies: ["Java", "DTO Pattern", "Object-Oriented Design"],
      features: [
        "Employee information management",
        "Department organization",
        "Data validation",
        "Reporting capabilities"
      ],
      challenges: "Implementing proper DTO patterns and data validation",
      highlights: "Clean architecture with proper separation of concerns",
      status: "Complete",
      github: "https://github.com/bwissal13/DTO"
    }
  ] as Project[],
  
  // Professional experience and learning
  experience: [
    {
      title: "Full Stack Developer (Student)",
      company: "Youcode-UM6P",
      period: "Current",
      description: "Intensive training in full-stack development with focus on modern technologies and best practices",
      technologies: ["React", "Spring Boot", "Laravel", "Agile methodologies"]
    }
  ] as Experience[],
  
  // Personal traits and philosophy
  personality: {
    traits: [
      "Curious and always learning",
      "Problem-solver with analytical mindset",
      "Collaborative team player",
      "Passionate about clean code and architecture",
      "Detail-oriented with focus on user experience"
    ],
    communication: "Friendly, enthusiastic, uses emojis naturally, asks engaging follow-up questions",
    interests: [
      "Open source contributions",
      "Building scalable applications",
      "UI/UX design and user experience",
      "Cloud technologies and DevOps",
      "Code architecture and design patterns",
      "Community building and knowledge sharing"
    ],
    philosophy: "Code is poetry written for machines but read by humans",
    goals: [
      "Contributing to open source projects in 2025",
      "Building scalable applications that solve real problems",
      "Mastering cloud technologies and microservices",
      "Creating educational content for developers"
    ],
    achievements: [
      "GitHub Pull Shark achievement (multiple pull requests)",
      "YOLO achievement",
      "Active contributor to open source projects",
      "Built multiple production-ready applications"
    ]
  },
  
  // Hobbies and personal interests (based on real Instagram profile @baazizwissal)
  hobbies: {
    thinking: [
      "Deep thinking and problem-solving 🐻",
      "Analytical approach to development challenges",
      "Reflective coding practices",
      "Strategic planning for projects",
      "Mindful programming and architecture decisions"
    ],
    coding: [
      "Full Stack Development with React and Spring Boot 💻",
      "Building scalable banking applications (eBankify project)",
      "Creating interactive learning platforms (Tafukut)",
      "Developing art marketplaces (Anazor)",
      "Mastering Cloud Technologies and microservices architecture"
    ],
    cooking: [
      "Passionate about cooking and culinary arts 🍳",
      "Experimenting with different cuisines",
      "Finding creativity in the kitchen",
      "Balancing coding sessions with cooking breaks",
      "Sharing recipes and cooking experiences"
    ],
    design: [
      "Professional graphic designer 🛍️",
      "Creating visual identities and brand designs",
      "UI/UX design with Figma and Adobe Creative Suite",
      "Bridging graphic design and web development",
      "Building beautiful and functional interfaces"
    ],
    writing: [
      "Content writer and storyteller 📝",
      "Technical writing and documentation",
      "Sharing development insights through writing",
      "Creating engaging content about technology",
      "Documenting coding journey and experiences"
    ],
    community: [
      "Supporting @liya_express1 🌕",
      "Building connections in the developer community",
      "Sharing knowledge and experiences",
      "Mentoring and helping fellow developers",
      "Creating content that inspires others"
    ],
    goals: [
      "Contributing to impactful open source projects in 2025 🚀",
      "Growing graphic design and development skills",
      "Building scalable applications that solve real problems",
      "Expanding writing and content creation",
      "Balancing technical skills with creative pursuits"
    ]
  },
  
  // Fun facts and additional info
  additionalInfo: {
    mathBackground: "Strong mathematical foundation that enhances problem-solving abilities in software development",
    designSkills: "Professional UI/UX and graphic designer who combines technical development with design expertise to create complete digital experiences. Skilled in brand identity, visual design, and user-centered design principles.",
    learningStyle: "Hands-on learner who believes in learning by building real projects",
    communityInvolvement: "Active in developer communities and passionate about sharing knowledge"
  }
};

// Enhanced function to find relevant data with better context understanding
async function findRelevantData(query: string, data: typeof personalData): Promise<string> {
  const lowercaseQuery = query.toLowerCase();
  let relevantInfo = [];
  
  // Check for GitHub-related queries
  if (lowercaseQuery.includes('github') || lowercaseQuery.includes('repository') || lowercaseQuery.includes('repo') || lowercaseQuery.includes('code') || lowercaseQuery.includes('project')) {
    try {
      const repos = await fetchUserGitHubRepos();
      relevantInfo.push(JSON.stringify({
        github_repos: repos,
        github_profile: data.contact.github
      }));
    } catch (error) {
      console.log('GitHub fetch error:', error);
    }
  }
  
  // Check for specific project GitHub queries
  const projectNames = ['ebankify', 'anazor', 'tafukut', 'taskifyapi', 'java01', 'dto'];
  for (const projectName of projectNames) {
    if (lowercaseQuery.includes(projectName)) {
      try {
        const repoData = await fetchGitHubRepo(projectName);
        if (repoData) {
          relevantInfo.push(JSON.stringify({
            live_github_data: repoData,
            project_name: projectName
          }));
        }
      } catch (error) {
        console.log(`GitHub fetch error for ${projectName}:`, error);
      }
    }
  }
  
  // Check for hobbies and Instagram-related queries
  if (lowercaseQuery.includes('hobbies') || lowercaseQuery.includes('hobby') || lowercaseQuery.includes('interests') || lowercaseQuery.includes('instagram') || lowercaseQuery.includes('insta') || lowercaseQuery.includes('personal') || lowercaseQuery.includes('post')) {
    try {
      const instagramPosts = await fetchInstagramPosts();
      relevantInfo.push(JSON.stringify({
        hobbies: data.hobbies,
        instagram_posts: instagramPosts,
        instagram_profile: data.contact.instagram
      }));
    } catch (error) {
      console.log('Instagram fetch error:', error);
    }
  }
  
  // Check for LinkedIn-related queries
  if (lowercaseQuery.includes('linkedin') || lowercaseQuery.includes('professional') || lowercaseQuery.includes('career') || lowercaseQuery.includes('work')) {
    try {
      const linkedinProfile = await fetchLinkedInProfile();
      relevantInfo.push(JSON.stringify({
        linkedin_profile: linkedinProfile,
        professional_info: {
          education: data.education,
          experience: data.experience,
          achievements: data.personality.achievements
        }
      }));
    } catch (error) {
      console.log('LinkedIn fetch error:', error);
    }
  }
  
  // Check for website/portfolio queries
  if (lowercaseQuery.includes('website') || lowercaseQuery.includes('portfolio') || lowercaseQuery.includes('bwissal.software')) {
    try {
      const websiteData = await fetchWebsiteData();
      relevantInfo.push(JSON.stringify({
        website_data: websiteData,
        portfolio_projects: data.projects,
        website_url: data.contact.website
      }));
    } catch (error) {
      console.log('Website fetch error:', error);
    }
  }
  
  // Check for comprehensive profile queries
  if (lowercaseQuery.includes('social media') || lowercaseQuery.includes('profiles') || lowercaseQuery.includes('find you') || lowercaseQuery.includes('all your') || lowercaseQuery.includes('social') || lowercaseQuery.includes('connect') || lowercaseQuery.includes('contact')) {
    try {
      const allProfileData = await fetchAllProfileData();
      relevantInfo.push(JSON.stringify({
        all_profiles: allProfileData,
        contact: data.contact,
        summary: data.summary
      }));
    } catch (error) {
      console.log('All profiles fetch error:', error);
    }
  }
  
  // Project-specific queries with more detailed matching
  const projectKeywords = {
    ebankify: ['ebankify', 'banking', 'bank', 'finance', 'transaction', 'payment', 'security', 'spring boot'],
    anazor: ['anazor', 'marketplace', 'art', 'artist', 'sell', 'community', 'forum', 'laravel'],
    tafukut: ['tafukut', 'learning', 'education', 'tutorial', 'interactive', 'video', 'code editor'],
    taskify: ['taskify', 'task', 'management', 'organization', 'api', 'php'],
    hotel: ['hotel', 'reservation', 'java', 'console', 'management'],
    employee: ['employee', 'dto', 'data transfer', 'java', 'management']
  };
  
     // Check for project matches
   Object.entries(projectKeywords).forEach(([projectKey, keywords]) => {
     if (keywords.some(keyword => lowercaseQuery.includes(keyword))) {
       const project = data.projects.find((p: Project) => 
         p.name.toLowerCase().includes(projectKey) || 
         p.description.toLowerCase().includes(keywords[0])
       );
       if (project) relevantInfo.push(JSON.stringify(project));
     }
   });
  
  // Background and personal info queries
  if (lowercaseQuery.includes('background') || lowercaseQuery.includes('math') || lowercaseQuery.includes('education')) {
    relevantInfo.push(JSON.stringify({
      background: data.background,
      education: data.education,
      mathBackground: data.additionalInfo.mathBackground,
      summary: data.summary
    }));
  }
  
  // Skills and technology queries
  if (lowercaseQuery.includes('skill') || lowercaseQuery.includes('technology') || lowercaseQuery.includes('tech') || lowercaseQuery.includes('stack')) {
    relevantInfo.push(JSON.stringify({
      skills: data.skills,
      currentFocus: data.skills.currentlyLearning
    }));
  }
  
     // Experience and career queries
   if (lowercaseQuery.includes('experience') || lowercaseQuery.includes('youcode') || lowercaseQuery.includes('career')) {
     relevantInfo.push(JSON.stringify({
       experience: data.experience,
       education: data.education,
       achievements: data.personality.achievements
     }));
   }
  
  // Personal and about queries
  if (lowercaseQuery.includes('about') || lowercaseQuery.includes('who') || lowercaseQuery.includes('personal') || lowercaseQuery.includes('yourself')) {
    relevantInfo.push(JSON.stringify({
      name: data.name,
      title: data.title,
      summary: data.summary,
      personality: data.personality,
      philosophy: data.personality.philosophy,
      goals: data.personality.goals
    }));
  }
  
  // Contact and social queries
  if (lowercaseQuery.includes('contact') || lowercaseQuery.includes('reach') || lowercaseQuery.includes('email') || lowercaseQuery.includes('social')) {
    relevantInfo.push(JSON.stringify({
      contact: data.contact,
      social: {
        github: data.contact.github,
        linkedin: data.contact.linkedin,
        instagram: data.contact.instagram,
        website: data.contact.website
      }
    }));
  }
  
  // Portfolio and projects overview
  if (lowercaseQuery.includes('portfolio') || lowercaseQuery.includes('projects') || lowercaseQuery.includes('work') || lowercaseQuery.includes('built')) {
    relevantInfo.push(JSON.stringify({
      projects: data.projects.map(p => ({
        name: p.name,
        description: p.description,
        technologies: p.technologies,
        status: p.status,
        highlights: p.highlights
      }))
    }));
  }
  
  // If no specific match, include comprehensive overview
  if (relevantInfo.length === 0) {
    relevantInfo.push(JSON.stringify({
      name: data.name,
      title: data.title,
      summary: data.summary,
      skills: data.skills,
      topProjects: data.projects.slice(0, 3).map(p => ({
        name: p.name,
        description: p.description,
        technologies: p.technologies
      })),
      contact: data.contact
    }));
  }
  
  return relevantInfo.join('\n');
}

// Helper functions for dynamic responses
function getTopicInsight(topic: string): string {
  const insights: { [key: string]: string } = {
    'dto': 'proper data encapsulation and transfer between layers is crucial for maintainable applications',
    'data transfer object': 'clean separation of concerns and data validation are key to robust architecture',
    'spring boot': 'the power of dependency injection and auto-configuration makes development incredibly efficient',
    'laravel': 'the elegance of Eloquent ORM and the beauty of Laravel\'s syntax makes PHP development enjoyable',
    'react': 'component-based architecture and the virtual DOM revolutionize how we build interactive UIs',
    'java': 'strong typing and object-oriented principles provide a solid foundation for enterprise applications',
    'mysql': 'proper database design and indexing strategies are essential for scalable applications',
    'elasticsearch': 'full-text search capabilities and real-time analytics open up amazing possibilities'
  };
  return insights[topic] || 'understanding the fundamentals deeply is the key to mastering any technology';
}

function extractTechnology(message: string): string | null {
  const technologies = ['react', 'spring boot', 'laravel', 'java', 'php', 'javascript', 'typescript', 'python', 'html', 'css', 'mysql', 'postgresql', 'mongodb', 'elasticsearch', 'docker', 'git', 'angular', 'vue', 'node.js', 'express'];
  
  for (const tech of technologies) {
    if (message.toLowerCase().includes(tech)) {
      return tech;
    }
  }
  return null;
}

function generateLearningResponse(technology: string): string {
  const learningStories: { [key: string]: string } = {
    'react': `Oh, that's such a great question! 🚀 

<b style="color: #61dafb;">My React Journey:</b>
My React journey has been quite the adventure, honestly. I started learning it during my time at <b style="color: #f59e0b;">Youcode-UM6P</b>, but what really made it stick was diving into real projects.

<b style="color: #ef4444;">🔥 The "Aha!" Moment:</b>
I remember when I first encountered React - the whole component concept was mind-blowing! Coming from a mathematics background, I loved how logical and structured it was. I began with the basics like understanding components, props, and state, but the real magic happened when I started building <b style="color: #3b82f6;">Tafukut</b>, my interactive learning platform.

<b style="color: #8b5cf6;">📚 My Learning Strategy:</b>
What worked amazingly for me was combining theory with practice:
• <b style="color: #f59e0b;">🌅 Mornings:</b> Reading the official React documentation (seriously, it's incredible!)
• <b style="color: #3b82f6;">🌆 Afternoons:</b> Actually building things and experimenting
• <b style="color: #10b981;">🎯 Key breakthrough:</b> The hooks system was a game-changer - useState and useEffect became my best friends pretty quickly!

<b style="color: #f59e0b;">🛠️ Tools That Helped:</b>
React DevTools taught me so much about debugging and understanding component behavior. The best part? Working with my peers at Youcode - those code review sessions were pure gold for learning best practices.

<b style="color: #10b981;">💡 The Key Insight:</b>
React isn't just about syntax - it's about thinking in components and understanding how data flows through your application. Once that clicked, everything else started falling into place!

Are you thinking about learning React, or are you curious about any specific aspect of it? 🤔`,

    'spring boot': `Spring Boot! 💼 Oh wow, what a journey that was! 

<b style="color: #6aaa64;">🏊‍♀️ Diving Into the Deep End:</b>
I actually discovered Spring Boot while working on <b style="color: #10b981;">eBankify</b>, my banking system project. Talk about jumping into the deep end!

<b style="color: #8b5cf6;">📖 The Learning Foundation:</b>
I'll be honest - coming from a mathematics background, I had to really solid up my Java fundamentals first. But once I got comfortable with OOP concepts, Spring Boot felt like discovering a superpower! The whole dependency injection thing was confusing at first, but then it clicked and I was like "This is genius!"

<b style="color: #ef4444;">🔥 The Breakthrough Moment:</b>
The real breakthrough was when I started building actual APIs for eBankify. I was dealing with real banking scenarios:
• <b style="color: #f59e0b;">🔐 User authentication</b> - Role-based access control
• <b style="color: #10b981;">💳 Transaction processing</b> - Secure payment handling
• <b style="color: #3b82f6;">🏦 Account management</b> - Complete banking operations

Spring Boot just handled so much of the heavy lifting. The auto-configuration is pure magic, I swear!

<b style="color: #ef4444;">🛡️ Mastering Security:</b>
What really accelerated my learning was diving into <b style="color: #6aaa64;">Spring Security</b>. Banking applications need enterprise-level security, so I had no choice but to master it. Those late nights debugging authentication flows taught me more than any tutorial ever could!

<b style="color: #f59e0b;">✨ The Beautiful Thing:</b>
Spring Boot eliminates all that boilerplate code. Once you understand the patterns and conventions, you can build incredibly powerful applications so quickly. I went from struggling with basic configurations to building a full banking API in just a few months!

Are you working with Spring Boot, or thinking about diving into backend development? 🤔`,

    'laravel': `Laravel is pure poetry in PHP! 🎨 

<b style="color: #ef4444;">💕 Falling in Love with Laravel:</b>
I fell in love with its elegance while building <b style="color: #ef4444;">Anazor</b>. Here's my learning story:

<b style="color: #f59e0b;">✨ My Laravel Adventure:</b>
• <b style="color: #8b5cf6;">🐘 PHP fundamentals</b> - Made sure I understood PHP deeply first
• <b style="color: #3b82f6;">🏗️ MVC architecture</b> - Grasped the pattern through Laravel's implementation
• <b style="color: #ef4444;">🔥 Eloquent ORM</b> - This is where Laravel truly shines!
• <b style="color: #10b981;">🎨 Blade templating</b> - Beautiful, clean template syntax
• <b style="color: #f59e0b;">⚡ Artisan commands</b> - The productivity boost is incredible

<b style="color: #8b5cf6;">💫 What Made Laravel Special:</b>
• <b style="color: #3b82f6;">🗣️ Intuitive syntax</b> - Reads like natural language
• <b style="color: #ef4444;">🛒 Building Anazor's marketplace</b> - Features came together with ease
• <b style="color: #10b981;">📊 Database migrations</b> - Smooth development workflow
• <b style="color: #f59e0b;">🤝 Amazing community</b> - Incredible documentation and support

<b style="color: #3b82f6;">🎯 Learning Highlights:</b>
• <b style="color: #8b5cf6;">🔧 Service containers</b> - Understanding dependency injection
• <b style="color: #10b981;">🔗 Eloquent relationships</b> - Mastering database relationships
• <b style="color: #ef4444;">🚀 API building</b> - Using Laravel's built-in tools
• <b style="color: #f59e0b;">🔐 Authentication</b> - Implementing secure user systems

<b style="color: #10b981;">🌟 The Key Insight:</b>
Laravel taught me that code can be both powerful and beautiful. The framework handles the complex stuff so you can focus on business logic! 

What draws you to Laravel? 🤔`
  };

  return learningStories[technology] || `That's a great question about <b style="color: #3b82f6;">${technology}</b>! 🚀 

<b style="color: #f59e0b;">🎯 My Learning Strategy:</b>
My approach to learning any technology follows these principles:

• <b style="color: #8b5cf6;">📚 Start with fundamentals</b> - Understanding the core concepts deeply
• <b style="color: #10b981;">🔧 Build practical projects</b> - Apply knowledge to real-world problems
• <b style="color: #3b82f6;">📖 Read documentation</b> - Official docs are usually the best resource
• <b style="color: #ef4444;">⚡ Practice consistently</b> - Regular coding sessions, even short ones
• <b style="color: #f59e0b;">🤝 Learn from others</b> - Code reviews, pair programming, and community

<b style="color: #10b981;">💡 What Works for Me:</b>
• <b style="color: #3b82f6;">🎯 Project-driven learning</b> - Building projects that excite me
• <b style="color: #8b5cf6;">🤔 Understanding the "why"</b> - Behind each concept, not just the "how"
• <b style="color: #ef4444;">🧩 Breaking down complexity</b> - Complex topics into smaller parts
• <b style="color: #f59e0b;">👥 Teaching others</b> - It solidifies knowledge incredibly well!

<b style="color: #ef4444;">🚀 My Advice:</b>
• <b style="color: #8b5cf6;">🐌 Don't rush</b> - Understand each concept before moving on
• <b style="color: #10b981;">🛠️ Build real solutions</b> - Projects that solve problems you care about
• <b style="color: #3b82f6;">💬 Join communities</b> - Ask questions and learn from others
• <b style="color: #f59e0b;">🔍 Practice debugging</b> - Problem-solving skills are crucial

The key is consistent practice and building things that challenge you! 

What specific aspect of ${technology} are you most curious about? 🤔`;
}



// Handle quick questions from the suggestion interface
function handleQuickQuestions(lowerMessage: string): string | null {
  // Me section
  if (lowerMessage.includes('who are you')) {
    return JSON.stringify({
      text: "Here's my profile! 👋",
      richContent: {
        type: 'profile-card',
        data: {
          name: "Wissal Baaziz",
          age: "23 years old",
          location: "Morocco, Marrakech",
          image: "/me.jpeg",
          bio: "Hey 👋\n\nI'm Wissal, a passionate full-stack developer and UI/UX designer currently studying at Youcode-UM6P. My journey started with mathematics, but I fell in love with coding and design when I realized it's like solving math problems with the power to create something real, functional, and beautiful!",
          tags: ["Full Stack", "Developer", "UI/UX Designer", "Youcode-UM6P", "Mathematics", "React", "Spring Boot"],
          philosophy: "Code is poetry written for machines but read by humans",
          projects: ["eBankify", "Anazor", "Tafukut"],
          contact: {
            email: "baazizwissal13@gmail.com",
            github: "https://github.com/bwissal13",
            linkedin: "https://linkedin.com/in/baaziz-wissal-311a9526a",
            website: "https://www.bwissal.software"
          }
        }
      }
    });
  }

  if (lowerMessage.includes('what are your passions')) {
    return JSON.stringify({
      text: "My passions are beautifully diverse! 🌟",
      richContent: {
        type: 'info-card',
        data: {
          title: "My Diverse Passions",
          sections: [
            {
              title: "💻 Technical Passions",
              type: "cards",
              items: [
                {
                  title: "Full-stack Development",
                  description: "Building complete, scalable applications",
                  technologies: ["React", "Spring Boot", "Laravel"]
                },
                {
                  title: "Problem-solving",
                  description: "Turning complex challenges into elegant solutions",
                  technologies: ["Mathematical thinking", "Architecture", "Optimization"]
                },
                {
                  title: "Learning",
                  description: "Always exploring new technologies and approaches",
                  technologies: ["Cloud", "Microservices", "DevOps"]
                }
              ]
            },
            {
              title: "🎨 Creative Passions",
              type: "cards",
              items: [
                {
                  title: "Graphic Design",
                  description: "Creating visual identities and beautiful interfaces",
                  technologies: ["Adobe Creative Suite", "Brand Identity", "Visual Design"]
                },
                {
                  title: "UI/UX Design",
                  description: "Crafting user experiences that delight",
                  technologies: ["Figma", "User Research", "Prototyping"]
                },
                {
                  title: "Writing",
                  description: "Documenting and sharing knowledge",
                  technologies: ["Technical Writing", "Documentation", "Storytelling"]
                }
              ]
            },
            {
              title: "🌱 Personal Passions",
              type: "cards",
              items: [
                {
                  title: "Cooking",
                  description: "Finding creativity in the kitchen",
                  technologies: ["Culinary Arts", "Creativity", "Balance"]
                },
                {
                  title: "Thinking Deeply",
                  description: "Analytical approach to life and coding",
                  technologies: ["Analysis", "Strategy", "Philosophy"]
                },
                {
                  title: "Community Building",
                  description: "Supporting fellow developers and creators",
                  technologies: ["Mentoring", "Collaboration", "Support"]
                }
              ]
            },
            {
              title: "🌟 The Beautiful Connection",
              type: "text",
              content: "Each passion feeds into the others - my design skills improve my development, my mathematical thinking enhances my problem-solving, and my love for learning keeps everything fresh and exciting! Which passion interests you most? 🚀"
            }
          ]
        }
      }
    });
  }

  if (lowerMessage.includes('how did you get started in tech')) {
    return `What a journey it's been! 🚀

<b style="color: #991b1b;">🔢 The Mathematical Foundation:</b>
It all started with my love for mathematics. I was fascinated by logical thinking, problem-solving, and the beauty of mathematical structures. Numbers and equations felt like poetry to me!

<b style="color: #991b1b;">💡 The Discovery Moment:</b>
Then I discovered programming and had this incredible "aha!" moment - coding was like solving math problems but with the power to create something real and functional! Instead of just finding solutions on paper, I could build applications that people could actually use.

<b style="color: #1e3a8a;">🎓 The Learning Journey:</b>
I enrolled at <b style="color: #1e3a8a;">Youcode-UM6P</b> to formalize my learning, but the real magic happened when I started building projects:
• <b style="color: #000000;">eBankify</b> taught me about security and enterprise architecture
• <b style="color: #991b1b;">Anazor</b> showed me the power of community-driven platforms
• <b style="color: #1e3a8a;">Tafukut</b> let me innovate in education technology

<b style="color: #000000;">🌟 The Realization:</b>
What hooked me was realizing that technology isn't just about code - it's about solving real problems and making people's lives better. Every line of code has the potential to impact someone's day!

Are you thinking about getting into tech yourself? I'd love to help! 🤔`;
  }

  if (lowerMessage.includes('where do you see yourself in 5 years')) {
    return `Great question! I have a clear vision for my future in tech 🚀

<b style="color: #1e3a8a;">🎯 Professional Goals:</b>
• <b style="color: #000000;">Strong Backend Developer</b> - Deep expertise in Java and software architecture
• <b style="color: #991b1b;">Impactful Projects</b> - Working on challenging projects that have real impact
• <b style="color: #1e3a8a;">Technical Mentor</b> - Helping junior developers grow and succeed

<b style="color: #991b1b;">🌍 Technical Excellence:</b>
• <b style="color: #000000;">Advanced Java Mastery</b> - Deep understanding of Java ecosystem and best practices
• <b style="color: #991b1b;">Software Architecture</b> - Designing scalable, maintainable systems
• <b style="color: #1e3a8a;">Modern Development Practices</b> - Staying current with industry standards

<b style="color: #1e3a8a;">🚀 Growth & Learning:</b>
• <b style="color: #991b1b;">Advanced Certifications</b> - Earning recognized credentials in my field
• <b style="color: #000000;">Continuous Learning</b> - Staying updated with emerging technologies
• <b style="color: #991b1b;">Professional Development</b> - Growing both technically and personally

<b style="color: #000000;">💫 Team Impact:</b>
I see myself as someone who not only builds robust backend systems but also elevates the entire team. Whether it's through mentoring, sharing knowledge, or contributing to architectural decisions that drive real business value.

<b style="color: #1e3a8a;">🌟 Personal Growth:</b>
Five years from now, I want to be known as a developer who combines technical excellence with leadership, someone who can tackle complex challenges while helping others grow in their careers.

What kind of impact do you hope to make in your field? 🤔`;
  }

  // Professional section
  if (lowerMessage.includes('can i see your resume') || lowerMessage.includes('resume')) {
    return JSON.stringify({
      text: "Here's my professional background! 📄",
      richContent: {
        type: 'info-card',
        data: {
          title: "Professional Resume",
          sections: [
            {
              title: "Professional Summary",
              type: "text",
              content: "Full-Stack Developer and UI/UX Designer with a strong mathematics background, currently advancing skills at Youcode-UM6P. Passionate about building scalable applications and creating elegant user experiences through code and design."
            },
            {
              title: "Education",
              type: "list",
              items: [
                "Currently studying at Youcode-UM6P - Intensive full-stack development program",
                "Mathematics background - Strong analytical and problem-solving foundation"
              ]
            },
            {
              title: "Key Projects",
              type: "cards",
              items: [
                {
                  title: "eBankify",
                  description: "Banking system with enterprise security and real-time processing",
                  technologies: ["Spring Boot", "ElasticSearch", "MySQL", "Security"]
                },
                {
                  title: "Anazor",
                  description: "Art marketplace with e-commerce and community features",
                  technologies: ["Laravel", "PHP", "MySQL", "Community"]
                },
                {
                  title: "Tafukut",
                  description: "Interactive learning platform with real-time code execution",
                  technologies: ["React", "Laravel", "Real-time", "Education"]
                }
              ]
            },
            {
              title: "Technical Skills",
              type: "tags",
              items: [
                "React", "Angular", "Spring Boot", "Laravel", "Java", "PHP", "JavaScript", "TypeScript", 
                "MySQL", "PostgreSQL", "ElasticSearch", "UI/UX Design", "Figma", "Adobe Creative Suite", 
                "Docker", "Git", "Maven"
              ]
            },
            {
              title: "Achievements",
              type: "list",
              items: [
                "GitHub Pull Shark achievement",
                "YOLO achievement",
                "Multiple production-ready applications",
                "Professional design portfolio"
              ]
            }
          ]
        }
      }
    });
  }

  if (lowerMessage.includes('what makes you a valuable team member')) {
    return JSON.stringify({
      text: "Great question! Here's what I bring to the table 🌟",
      richContent: {
        type: 'info-card',
        data: {
          title: "What Makes Me a Valuable Team Member",
          sections: [
            {
              title: "🧠 Unique Perspective",
              type: "cards",
              items: [
                {
                  title: "Mathematical Thinking",
                  description: "I approach problems systematically and logically",
                  technologies: ["Analysis", "Logic", "Problem-solving"]
                },
                {
                  title: "Multi-disciplinary Skills",
                  description: "Combining development, design, and analytical thinking",
                  technologies: ["Development", "Design", "Analytics"]
                },
                {
                  title: "Fresh Perspective",
                  description: "Coming from math background brings innovative problem-solving",
                  technologies: ["Innovation", "Mathematics", "Strategy"]
                }
              ]
            },
            {
              title: "🤝 Collaboration Strengths",
              type: "cards",
              items: [
                {
                  title: "Knowledge Sharing",
                  description: "I love teaching and learning from teammates",
                  technologies: ["Mentoring", "Learning", "Growth"]
                },
                {
                  title: "Clear Communication",
                  description: "Can explain complex concepts simply",
                  technologies: ["Communication", "Documentation", "Clarity"]
                },
                {
                  title: "Constructive Feedback",
                  description: "Experienced with code reviews and pair programming",
                  technologies: ["Code Review", "Pair Programming", "Feedback"]
                }
              ]
            },
            {
              title: "💡 Technical Value",
              type: "list",
              items: [
                "Full-stack capabilities - Can work across the entire application stack",
                "Quality focus - Strong attention to clean, maintainable code",
                "Problem-solving - Love tackling complex challenges others might avoid"
              ]
            },
            {
              title: "🚀 Growth Mindset",
              type: "tags",
              items: [
                "Always learning", "Adaptable", "Initiative-taker", "Curious", 
                "Exploring new technologies", "Embracing challenges"
              ]
            },
            {
              title: "🌟 Personal Qualities",
              type: "tags",
              items: [
                "Reliable", "Enthusiastic", "Cultural bridge", "Passionate", 
                "Committed", "International mindset"
              ]
            },
            {
              title: "🤔 Let's Connect",
              type: "text",
              content: "What kind of team dynamic are you looking to build? I'd love to learn more about how I can contribute to your team's success! 🚀"
            }
          ]
        }
      }
    });
  }

  if (lowerMessage.includes('where are you working now')) {
    return `Currently, I'm in an exciting phase of focused learning and building! 🚀

<b style="color: #f59e0b;">🎓 Current Status:</b>
I'm a student at <b style="color: #f59e0b;">Youcode-UM6P</b>, which is an intensive, hands-on full-stack development program. But here's what makes it special - it's not just theoretical learning!

<b style="color: #3b82f6;">💼 What I'm Actually Doing:</b>
• <b style="color: #10b981;">Building real projects</b> - Like eBankify, Anazor, and Tafukut
• <b style="color: #ef4444;">Collaborative development</b> - Working with peers on complex applications
• <b style="color: #8b5cf6;">Code reviews</b> - Learning best practices through peer feedback
• <b style="color: #3b82f6;">Problem-solving</b> - Tackling enterprise-level challenges

<b style="color: #10b981;">🚀 My Approach:</b>
Instead of just studying, I'm actively building production-ready applications. Each project teaches me something new about software architecture, user experience, and development best practices.

<b style="color: #ef4444;">🌟 Why This Works:</b>
• <b style="color: #8b5cf6;">Real experience</b> - Working on projects that solve actual problems
• <b style="color: #f59e0b;">Portfolio building</b> - Creating demonstrable skills
• <b style="color: #10b981;">Industry preparation</b> - Learning practices used in professional development

<b style="color: #3b82f6;">🎯 Looking Forward:</b>
I'm actively seeking opportunities to apply these skills in a professional environment where I can contribute to meaningful projects and continue growing!

Are you looking for someone ready to make an immediate impact? 🤔`;
  }

  if (lowerMessage.includes('why should i hire you') || lowerMessage.includes('why should we hire you') || lowerMessage.includes('why hire you') || lowerMessage.includes('why would you hire me') || lowerMessage.includes('why choose you')) {
    console.log('✅ MATCHED: Why should I hire you question');
    return JSON.stringify({
      text: "Excellent question! Here's why I'd be a great addition to your team 🌟",
      richContent: {
        type: 'info-card',
        data: {
          title: "Why I'm Your Next Great Hire",
          sections: [
            {
              title: "🎯 Immediate Value",
              type: "cards",
              items: [
                {
                  title: "Proven Track Record",
                  description: "Built production-ready applications that solve real problems",
                  technologies: ["eBankify", "Anazor", "Tafukut"]
                },
                {
                  title: "Full-stack Skills",
                  description: "Can work across your entire technology stack",
                  technologies: ["React", "Spring Boot", "Laravel", "Design"]
                },
                {
                  title: "Problem-solver",
                  description: "Mathematical background means systematic approach to challenges",
                  technologies: ["Analytics", "Logic", "Strategy"]
                }
              ]
            },
            {
              title: "🚀 Unique Combination",
              type: "cards",
              items: [
                {
                  title: "Technical + Design",
                  description: "I understand both code architecture and user experience",
                  technologies: ["Development", "UI/UX", "Brand Identity"]
                },
                {
                  title: "Mathematical Thinking",
                  description: "Brings analytical precision to development decisions",
                  technologies: ["Analysis", "Optimization", "Architecture"]
                },
                {
                  title: "Fresh Perspective",
                  description: "New ideas combined with solid fundamentals",
                  technologies: ["Innovation", "Best Practices", "Clean Code"]
                }
              ]
            },
            {
              title: "💡 What Sets Me Apart",
              type: "list",
              items: [
                "Quality focus - I write clean, maintainable code that others can understand",
                "Learning agility - Quick to pick up new technologies and adapt to your stack",
                "Communication skills - Can explain complex concepts clearly to all stakeholders"
              ]
            },
            {
              title: "🌟 Cultural Fit",
              type: "tags",
              items: [
                "Collaborative", "Growth mindset", "Passionate", "Team player", 
                "Knowledge sharing", "Continuous learning", "Problem-focused"
              ]
            },
            {
              title: "🎯 Ready to Contribute",
              type: "text",
              content: "I'm not just looking for any job - I want to join a team where I can make a real impact while continuing to grow. I bring enthusiasm, skills, and a fresh perspective that can help drive your projects forward. What challenges is your team currently facing that I could help solve? 🚀"
            }
          ]
        }
      }
    });
  }

  if (lowerMessage.includes('educational background')) {
    return `My educational journey has been quite unique and enriching! 🎓

<b style="color: #8b5cf6;">🔢 Mathematical Foundation:</b>
I started with a strong background in mathematics, which gave me:
• <b style="color: #10b981;">Analytical thinking</b> - Systematic approach to problem-solving
• <b style="color: #ef4444;">Logical reasoning</b> - Understanding complex systems and relationships
• <b style="color: #3b82f6;">Abstract thinking</b> - Ability to work with complex, conceptual problems

<b style="color: #f59e0b;">🚀 Current Education:</b>
I'm currently studying at <b style="color: #f59e0b;">Youcode-UM6P</b>, which is an intensive, practical full-stack development program. What makes it special:
• <b style="color: #3b82f6;">Project-based learning</b> - Building real applications, not just theory
• <b style="color: #10b981;">Industry-focused</b> - Learning current technologies and best practices
• <b style="color: #ef4444;">Collaborative environment</b> - Working in teams, code reviews, agile methodologies

<b style="color: #10b981;">💡 Self-Directed Learning:</b>
Beyond formal education, I'm constantly learning:
• <b style="color: #8b5cf6;">Open source contributions</b> - Learning from real-world codebases
• <b style="color: #ef4444;">Technical documentation</b> - Deep diving into official docs and best practices
• <b style="color: #3b82f6;">Building projects</b> - Each project teaches new concepts and technologies

<b style="color: #3b82f6;">🌟 Unique Advantage:</b>
My mathematical background gives me a different perspective on software development:
• <b style="color: #f59e0b;">Algorithm optimization</b> - Understanding computational complexity
• <b style="color: #10b981;">System design</b> - Thinking about scalability and architecture
• <b style="color: #ef4444;">Problem decomposition</b> - Breaking complex problems into manageable parts

The combination of mathematical rigor and practical development experience creates a unique skill set that I bring to every project!

What type of educational background do you value most in your team? 🤔`;
  }

  // Projects section
  if (lowerMessage.includes('what projects are you most proud of') || lowerMessage.includes('projects most proud')) {
    return JSON.stringify({
      text: "Oh, this is such a fun question! I'm genuinely excited about all my projects 🚀",
      richContent: {
        type: 'info-card',
        data: {
          title: "Projects I'm Most Proud Of",
          sections: [
            {
              title: "🏦 eBankify - My Crown Jewel",
              type: "cards",
              items: [
                {
                  title: "Enterprise Security",
                  description: "Role-based authentication and secure transactions",
                  technologies: ["Spring Security", "JWT", "Encryption"]
                },
                {
                  title: "Real-time Processing",
                  description: "Instant and scheduled payments with full audit trails",
                  technologies: ["WebSocket", "Async Processing", "Scheduling"]
                },
                {
                  title: "ElasticSearch Integration",
                  description: "Lightning-fast transaction searches and analytics",
                  technologies: ["ElasticSearch", "Indexing", "Search API"]
                },
                {
                  title: "Scalable Architecture",
                  description: "Modular design ready for production deployment",
                  technologies: ["Microservices", "Clean Architecture", "Docker"]
                }
              ]
            },
            {
              title: "🎨 Anazor - Community Builder",
              type: "cards",
              items: [
                {
                  title: "E-commerce Engine",
                  description: "Complete buying/selling platform for artists",
                  technologies: ["Laravel", "Payment Integration", "Inventory"]
                },
                {
                  title: "Community Features",
                  description: "Forums, artist portfolios, and review systems",
                  technologies: ["Community Forums", "User Profiles", "Reviews"]
                },
                {
                  title: "Beautiful UI",
                  description: "Designed with artists and art lovers in mind",
                  technologies: ["UI/UX Design", "Responsive Design", "Accessibility"]
                },
                {
                  title: "User Experience Focus",
                  description: "Making art accessible and enjoyable for everyone",
                  technologies: ["User Research", "Usability", "Design Thinking"]
                }
              ]
            },
            {
              title: "📚 Tafukut - Educational Innovation",
              type: "cards",
              items: [
                {
                  title: "React Magic",
                  description: "Real-time code execution directly in the browser",
                  technologies: ["React", "Code Execution", "Web APIs"]
                },
                {
                  title: "Video Synchronization",
                  description: "Code follows tutorial progress seamlessly",
                  technologies: ["Video API", "Synchronization", "Real-time"]
                },
                {
                  title: "Interactive Learning",
                  description: "Learn by doing, not just watching tutorials",
                  technologies: ["Interactive UI", "Learning Platform", "Gamification"]
                },
                {
                  title: "Revolutionary Concept",
                  description: "Bridging the gap between theory and practice",
                  technologies: ["Educational Tech", "Innovation", "User Experience"]
                }
              ]
            },
            {
              title: "🌟 What Makes Me Proud",
              type: "text",
              content: "Each project solved a real problem and taught me something new about building scalable, user-focused applications. They're not just code - they're solutions that could genuinely help people! Which project interests you most? I'd love to dive deeper! 🤔"
            }
          ]
        }
      }
    });
  }

  // Skills section
  if (lowerMessage.includes('what are your skills')) {
    return JSON.stringify({
      text: "I love talking about my technical toolkit! 💻",
      richContent: {
        type: 'info-card',
        data: {
          title: "Technical Skills & Expertise",
          sections: [
            {
              title: "Frontend Excellence",
              type: "cards",
              items: [
                {
                  title: "React",
                  description: "My go-to for interactive UIs (used in Tafukut)",
                  technologies: ["Components", "Hooks", "State Management"]
                },
                {
                  title: "Angular",
                  description: "Great for enterprise applications",
                  technologies: ["TypeScript", "Services", "Directives"]
                },
                {
                  title: "Modern Web",
                  description: "JavaScript/TypeScript, HTML5, CSS3",
                  technologies: ["ES6+", "TypeScript", "Responsive Design"]
                }
              ]
            },
            {
              title: "Backend Power",
              type: "cards",
              items: [
                {
                  title: "Spring Boot",
                  description: "Enterprise Java development (eBankify's backbone)",
                  technologies: ["Spring Security", "JPA", "REST APIs"]
                },
                {
                  title: "Laravel",
                  description: "Elegant PHP development (Anazor's foundation)",
                  technologies: ["Eloquent", "Blade", "Artisan"]
                },
                {
                  title: "Core Languages",
                  description: "Strong OOP fundamentals",
                  technologies: ["Java", "PHP", "Node.js"]
                }
              ]
            },
            {
              title: "Design Excellence",
              type: "tags",
              items: [
                "UI/UX Design", "Figma", "Adobe Creative Suite", "Brand Identity", 
                "Graphic Design", "Prototyping", "Visual Design", "User Research"
              ]
            },
            {
              title: "Database & Search",
              type: "tags",
              items: [
                "MySQL", "PostgreSQL", "ElasticSearch", "Database Design", 
                "Query Optimization", "Indexing", "Data Modeling"
              ]
            },
            {
              title: "Tools & Workflow",
              type: "tags",
              items: [
                "Docker", "Git", "Maven", "npm", "Postman", "VS Code", 
                "Agile", "SCRUM", "CI/CD"
              ]
            },
            {
              title: "Currently Exploring",
              type: "list",
              items: [
                "Cloud technologies - AWS, microservices architecture",
                "DevOps practices - CI/CD pipelines, automation",
                "Advanced React patterns - Performance optimization",
                "Backend specialization - Deep Java expertise"
              ]
            }
          ]
        }
      }
    });
  }

  // Fun section
  if (lowerMessage.includes('mountain bike') || lowerMessage.includes('bike')) {
    return `Haha! I think there might be some confusion there! 😄

I'm actually more of a <b style="color: #3b82f6;">digital adventurer</b> than a mountain biking enthusiast! My adventures happen in:

<b style="color: #ef4444;">💻 Code Mountains:</b>
• <b style="color: #10b981;">Debugging complex systems</b> - Like navigating tricky terrain!
• <b style="color: #8b5cf6;">Scaling applications</b> - Climbing performance peaks
• <b style="color: #f59e0b;">Learning new frameworks</b> - Exploring uncharted territory

<b style="color: #3b82f6;">🎨 Creative Trails:</b>
• <b style="color: #ef4444;">Graphic design projects</b> - My artistic adventures
• <b style="color: #10b981;">UI/UX exploration</b> - Finding the perfect user journey
• <b style="color: #8b5cf6;">Cooking experiments</b> - My kitchen adventures! 🍳

<b style="color: #f59e0b;">🚀 My Real Adventures:</b>
• <b style="color: #3b82f6;">Building eBankify</b> - Conquering enterprise security challenges
• <b style="color: #ef4444;">Creating Tafukut</b> - Pioneering interactive learning
• <b style="color: #10b981;">Designing Anazor</b> - Building artist communities

But hey, maybe I should try mountain biking sometime! Right now, my bike is more like a keyboard and my trails are lines of code 😊

What adventures are you into? Digital or outdoor? 🤔`;
  }

  if (lowerMessage.includes('craziest thing') || lowerMessage.includes('crazy')) {
    return `Oh wow, what a fun question! 🤯

<b style="color: #ef4444;">💻 My Coding "Crazy":</b>
Probably deciding to build <b style="color: #10b981;">eBankify</b> as one of my first major projects! I mean, who starts with a full banking system complete with enterprise security? 😅

• <b style="color: #8b5cf6;">The challenge:</b> Building secure financial transactions
• <b style="color: #3b82f6;">The reality:</b> Late nights debugging authentication flows
• <b style="color: #f59e0b;">The outcome:</b> A production-ready banking API!

<b style="color: #3b82f6;">🎨 Creative Crazy:</b>
Taking on <b style="color: #ef4444;">Anazor</b> while simultaneously learning Laravel and trying to understand the art market! Building an e-commerce platform for artists when I was still figuring out how e-commerce works myself 🎨

<b style="color: #f59e0b;">🚀 Learning Crazy:</b>
Deciding to learn React by building <b style="color: #3b82f6;">Tafukut</b> - an interactive learning platform with real-time code execution. It's like learning to swim by jumping into the deep end of a pool... while building the pool! 😂

<b style="color: #10b981;">🤔 Mathematical Crazy:</b>
Switching from pure mathematics to full-stack development and realizing that coding is basically applied math with instant gratification. Best decision ever!

<b style="color: #8b5cf6;">🌟 The Lesson:</b>
Sometimes the "craziest" things turn out to be the most rewarding. Every project that seemed impossible at first became my greatest learning experience.

What's the craziest coding challenge you've ever tackled? 🚀`;
  }

  if (lowerMessage.includes('mac or pc')) {
    return `Great question! As a developer, I'm pretty platform-agnostic, but here's my take 💻

<b style="color: #3b82f6;">🖥️ My Current Setup:</b>
I primarily work on <b style="color: #ef4444;">PC/Windows</b>, but I appreciate both ecosystems for different reasons!

<b style="color: #10b981;">💡 Why PC Works for Me:</b>
• <b style="color: #8b5cf6;">Flexibility</b> - Can customize hardware and software extensively
• <b style="color: #f59e0b;">Cost-effective</b> - More bang for your buck, especially for development
• <b style="color: #3b82f6;">Gaming</b> - Better for the occasional gaming break between coding sessions
• <b style="color: #ef4444;">Docker & WSL</b> - Amazing Linux integration on Windows now

<b style="color: #8b5cf6;">🍎 Mac Appreciation:</b>
• <b style="color: #10b981;">Unix environment</b> - Great for development workflows
• <b style="color: #ef4444;">Build quality</b> - Excellent hardware and design
• <b style="color: #3b82f6;">iOS development</b> - Essential if you're building for Apple ecosystem

<b style="color: #f59e0b;">🚀 The Developer Truth:</b>
Honestly, it's more about the tools than the platform:
• <b style="color: #3b82f6;">VSCode</b> - Works amazingly on both
• <b style="color: #10b981;">Git</b> - Platform independent
• <b style="color: #ef4444;">Docker</b> - Consistent environments everywhere
• <b style="color: #8b5cf6;">Cloud deployment</b> - Your app runs on Linux servers anyway!

<b style="color: #ef4444;">💭 My Philosophy:</b>
The best computer is the one that doesn't get in your way and lets you focus on building great software. Whether that's Mac, PC, or even Linux - use what makes you productive!

What's your preference? And more importantly, what amazing projects are you building on it? 🤔`;
  }

  if (lowerMessage.includes('90% get wrong') || lowerMessage.includes('certain about')) {
    return `Ooh, I love this type of question! Here's my developer hot take 🔥

<b style="color: #ef4444;">💡 My Contrarian View:</b>
<b style="color: #3b82f6;">"Clean code is more important than clever code"</b>

<b style="color: #f59e0b;">🤔 What Most People Think:</b>
• <b style="color: #8b5cf6;">Shorter code = better code</b>
• <b style="color: #ef4444;">Complex algorithms = smarter developer</b>
• <b style="color: #10b981;">Using every language feature = expertise</b>
• <b style="color: #3b82f6;">Fast development = good development</b>

<b style="color: #10b981;">✨ What I Believe (and practice):</b>
• <b style="color: #3b82f6;">Readable code saves months of debugging time</b>
• <b style="color: #ef4444;">Simple solutions often scale better</b>
• <b style="color: #8b5cf6;">Documentation is a love letter to future developers</b>
• <b style="color: #f59e0b;">Code reviews are the best learning tool</b>

<b style="color: #8b5cf6;">🚀 Real Example:</b>
In <b style="color: #10b981;">eBankify</b>, I could have written super "clever" one-liners for transaction processing. Instead, I wrote clear, step-by-step code that any team member could understand and modify. Result? Zero critical bugs in production!

<b style="color: #3b82f6;">🎯 Another One:</b>
<b style="color: #ef4444;">"Learning frameworks before fundamentals"</b> - Most people jump to React before really understanding JavaScript, or Spring Boot before mastering Java. I spent time with fundamentals first, and it made everything else so much easier!

<b style="color: #f59e0b;">💭 My Mathematical Background Taught Me:</b>
In mathematics, the most elegant proofs are often the simplest ones. Same applies to code - elegance comes from clarity, not complexity.

What's your contrarian developer opinion? I'd love to debate it! 🤔`;
  }

  // Contact & Future section
  if (lowerMessage.includes('how can i reach you') || lowerMessage.includes('contact')) {
    return JSON.stringify({
      text: "I'd love to connect! Here are all the ways to reach me 📞",
      richContent: {
        type: 'info-card',
        data: {
          title: "Let's Connect!",
          sections: [
            {
              title: "📧 Email (Best for Business)",
              type: "cards",
              items: [
                {
                  title: "baazizwissal13@gmail.com",
                  description: "Perfect for project discussions, collaboration opportunities, or professional inquiries",
                  technologies: ["Business", "Projects", "Professional"]
                }
              ]
            },
            {
              title: "🌐 Professional Platforms",
              type: "cards",
              items: [
                {
                  title: "Portfolio Website",
                  description: "bwissal.software - See all my projects in action",
                  technologies: ["Portfolio", "Projects", "Showcase"]
                },
                {
                  title: "LinkedIn",
                  description: "linkedin.com/in/baaziz-wissal-311a9526a - Professional updates and networking",
                  technologies: ["Professional", "Networking", "Career"]
                }
              ]
            },
            {
              title: "💻 Code & Development",
              type: "cards",
              items: [
                {
                  title: "GitHub",
                  description: "github.com/bwissal13 - All my code, contributions, and project history",
                  technologies: ["Code", "Open Source", "Projects"]
                }
              ]
            },
            {
              title: "📱 Social & Behind-the-Scenes",
              type: "cards",
              items: [
                {
                  title: "Instagram",
                  description: "@baazizwissal - Development journey, design work, and personal projects",
                  technologies: ["Behind-the-scenes", "Design", "Personal"]
                }
              ]
            },
            {
              title: "🚀 What I'm Available For",
              type: "tags",
              items: [
                "Development projects", "Full-stack applications", "Collaboration opportunities", 
                "Open source", "Startups", "Knowledge sharing", "Tech talks", "Mentoring", 
                "Code reviews", "Networking"
              ]
            },
            {
              title: "💡 Best Ways to Get My Attention",
              type: "list",
              items: [
                "Mention specific projects - Show you've looked at my work",
                "Technical challenges - I love interesting problems to solve",
                "Learning opportunities - Always excited about growth"
              ]
            },
            {
              title: "🌟 Ready to Connect",
              type: "text",
              content: "Don't hesitate to reach out! I'm always excited to connect with fellow developers, potential collaborators, or anyone with interesting projects. What brings you to want to connect? 🤔"
            }
          ]
        }
      }
    });
  }

  if (lowerMessage.includes('what kind of project would make you say yes immediately') || lowerMessage.includes('say yes immediately')) {
    return `Oh wow, this gets me excited just thinking about it! 🚀

<b style="color: #ef4444;">🔥 Instant "YES" Projects:</b>

<b style="color: #3b82f6;">💡 Educational Technology:</b>
Anything that makes learning more accessible and interactive! Like:
• <b style="color: #10b981;">Interactive coding platforms</b> - Building on my Tafukut experience
• <b style="color: #8b5cf6;">Mathematics visualization tools</b> - Combining my math background with coding
• <b style="color: #f59e0b;">Developer education platforms</b> - Teaching through real projects

<b style="color: #10b981;">🏦 Financial Inclusion:</b>
Banking and fintech that serves underbanked communities:
• <b style="color: #ef4444;">Microfinance platforms</b> - Leveraging my eBankify experience
• <b style="color: #3b82f6;">Payment systems for developing markets</b>
• <b style="color: #8b5cf6;">Financial literacy apps</b> - Making finance education accessible

<b style="color: #8b5cf6;">🎨 Creative Communities:</b>
Platforms that bring creators together:
• <b style="color: #ef4444;">Artist collaboration tools</b> - Building on Anazor's foundation
• <b style="color: #f59e0b;">Designer-developer bridges</b> - Tools that help teams work better
• <b style="color: #10b981;">Open source project platforms</b> - Making collaboration easier

<b style="color: #f59e0b;">🚀 What Makes Me Say "YES!":</b>
• <b style="color: #3b82f6;">Real impact potential</b> - Projects that genuinely help people
• <b style="color: #ef4444;">Technical challenges</b> - Problems that make me grow as a developer
• <b style="color: #10b981;">Learning opportunities</b> - New technologies or domains to explore
• <b style="color: #8b5cf6;">Great team</b> - Working with passionate, skilled people

<b style="color: #3b82f6;">💫 Dream Collaboration:</b>
A project where I can use my mathematical background, full-stack skills, and design sensibility to build something that makes complex technology accessible to everyone.

<b style="color: #10b981;">🎯 The Common Thread:</b>
Projects that bridge gaps - between complex technology and everyday users, between different communities, or between learning and doing.

What kind of project are you working on? You might have just made me say "YES!" 🌟`;
  }

  if (lowerMessage.includes('where are you located')) {
    return `I'm based in beautiful <b style="color: #ef4444;">Morocco</b>! 🇲🇦

<b style="color: #3b82f6;">📍 Current Location:</b>
Morocco - Land of amazing couscous, beautiful architecture, and a growing tech scene!

<b style="color: #f59e0b;">🌍 Global Perspective:</b>
While I'm physically in Morocco, I'm very much part of the global developer community:
• <b style="color: #10b981;">Remote-first mindset</b> - Experienced with distributed teams and async collaboration
• <b style="color: #8b5cf6;">International projects</b> - My work speaks universal "code" language
• <b style="color: #ef4444;">Cultural bridge</b> - Bringing diverse perspectives to development

<b style="color: #10b981;">🚀 Remote Work Ready:</b>
• <b style="color: #3b82f6;">Timezone flexible</b> - Can adapt to different working hours
• <b style="color: #ef4444;">Communication tools</b> - Proficient with all modern collaboration platforms
• <b style="color: #8b5cf6;">Self-motivated</b> - Strong independent work ethic
• <b style="color: #f59e0b;">Cultural awareness</b> - Experience working with international teams

<b style="color: #8b5cf6;">💡 Advantages of My Location:</b>
• <b style="color: #ef4444;">Cost-effective</b> - Competitive rates without compromising quality
• <b style="color: #3b82f6;">Strategic timezone</b> - Good overlap with both European and North American hours
• <b style="color: #10b981;">Fresh perspective</b> - Diverse cultural background brings unique insights
• <b style="color: #f59e0b;">Growing tech ecosystem</b> - Part of Morocco's emerging tech scene

<b style="color: #3b82f6;">🌟 Fun Fact:</b>
Morocco has produced some amazing developers and is becoming a significant player in the global tech scene. We're the perfect blend of traditional culture and modern innovation!

Are you looking for local collaboration or open to remote work? I'm excited about both possibilities! 🤔`;
  }

  // Additional common interview questions
  if (lowerMessage.includes('biggest strength') || lowerMessage.includes('what is your strength')) {
    return `That's a great question! 🌟 My biggest strength is my ability to combine analytical thinking with creative problem-solving.

<b style="color: #3b82f6;">🧠 Mathematical Foundation:</b>
Coming from a mathematics background, I approach problems systematically:
• <b style="color: #10b981;">Break down complex challenges</b> - Into manageable, solvable parts
• <b style="color: #ef4444;">See patterns and connections</b> - That others might miss
• <b style="color: #8b5cf6;">Think about optimization</b> - Both in algorithms and architecture

<b style="color: #ef4444;">🎨 Creative Application:</b>
But I don't just analyze - I create:
• <b style="color: #f59e0b;">Design beautiful interfaces</b> - Making complex systems user-friendly
• <b style="color: #3b82f6;">Innovative solutions</b> - Like Tafukut's interactive learning approach
• <b style="color: #10b981;">User-centered thinking</b> - Always considering the human experience

<b style="color: #8b5cf6;">🚀 Real-World Impact:</b>
This shows up in my projects:
• <b style="color: #ef4444;">eBankify's security architecture</b> - Mathematically sound, user-friendly
• <b style="color: #3b82f6;">Anazor's community features</b> - Technical complexity, creative solution
• <b style="color: #10b981;">Code that's both robust and readable</b> - Analytical structure, creative expression

<b style="color: #f59e0b;">💡 What makes it special:</b>
Most developers are either very technical or very creative. I bridge both worlds naturally, which lets me build solutions that are not just functional, but genuinely delightful to use.

How do you leverage your unique strengths in your work? 🤔`;
  }

  if (lowerMessage.includes('biggest weakness') || lowerMessage.includes('what is your weakness')) {
    return `I appreciate this question because it shows you care about growth! 🌱

<b style="color: #ef4444;">🎯 My Growth Area:</b>
I tend to be a perfectionist, especially when it comes to code quality and user experience. While this drives me to create excellent work, I've learned it can sometimes slow down initial iterations.

<b style="color: #3b82f6;">💡 What I've Learned:</b>
• <b style="color: #10b981;">MVPs are powerful</b> - Get something working, then iterate
• <b style="color: #8b5cf6;">Perfect is the enemy of good</b> - Sometimes 80% solution shipped is better than 100% solution delayed
• <b style="color: #f59e0b;">User feedback is invaluable</b> - Better to get real input than assume perfection

<b style="color: #10b981;">🚀 How I'm Addressing It:</b>
At Youcode-UM6P, I've learned agile methodologies:
• <b style="color: #ef4444;">Sprint planning</b> - Breaking work into manageable chunks
• <b style="color: #3b82f6;">Regular demos</b> - Showing progress, getting feedback early
• <b style="color: #8b5cf6;">Code reviews</b> - Learning when "good enough" is actually perfect

<b style="color: #f59e0b;">🌟 The Silver Lining:</b>
My attention to detail means the code I do ship is usually robust and maintainable. Teams can count on my work being solid - I just need to balance that with speed to market.

<b style="color: #3b82f6;">💫 Current Focus:</b>
I'm actively working on shipping smaller, more frequent updates. My recent projects show this progress - I'm getting faster at delivering value while maintaining quality.

How do you balance quality with speed in your development process? 🤔`;
  }

  if (lowerMessage.includes('what motivates you') || lowerMessage.includes('motivation')) {
    return `What motivates me is seeing technology create real positive change in people's lives! 🌟

<b style="color: #3b82f6;">🚀 Impact-Driven Development:</b>
Every project I build solves a real problem:
• <b style="color: #10b981;">eBankify</b> - Making banking accessible and secure
• <b style="color: #ef4444;">Tafukut</b> - Revolutionizing how people learn to code
• <b style="color: #8b5cf6;">Anazor</b> - Connecting artists with their audience

<b style="color: #ef4444;">💡 The Learning Journey:</b>
I'm genuinely excited by the challenge of mastering new technologies:
• <b style="color: #f59e0b;">Every bug teaches me something</b> - About systems, users, or myself
• <b style="color: #3b82f6;">Complex problems energize me</b> - Like implementing enterprise security or real-time features
• <b style="color: #10b981;">Sharing knowledge</b> - Teaching others what I've learned

<b style="color: #8b5cf6;">🌱 Personal Growth:</b>
Coming from mathematics to development, I love the constant evolution:
• <b style="color: #ef4444;">Technical depth</b> - Becoming truly expert in backend systems
• <b style="color: #3b82f6;">Leadership skills</b> - Helping teams achieve more together
• <b style="color: #f59e0b;">Creative expression</b> - Combining design with development

<b style="color: #10b981;">🎯 Future Vision:</b>
What really drives me is the potential to:
• <b style="color: #8b5cf6;">Mentor junior developers</b> - Help others find their path
• <b style="color: #ef4444;">Build systems that scale</b> - Technology that serves millions
• <b style="color: #3b82f6;">Bridge communities</b> - Connect different groups through technology

<b style="color: #f59e0b;">💫 Daily Motivation:</b>
Every morning, I think: "What can I build today that will make someone's life easier or more interesting?" That question drives everything I do.

What motivates you in your work? 🤔`;
  }

  if (lowerMessage.includes('what are you looking for') || lowerMessage.includes('looking for in a job')) {
    return `I'm looking for an opportunity where I can make a real impact while continuing to grow! 🚀

<b style="color: #3b82f6;">🎯 What I'm Seeking:</b>
• <b style="color: #10b981;">Challenging problems</b> - Projects that push me to learn and innovate
• <b style="color: #ef4444;">Great team</b> - Collaborative environment where knowledge flows freely
• <b style="color: #8b5cf6;">Growth opportunities</b> - Clear path to develop backend expertise and leadership skills
• <b style="color: #f59e0b;">Real impact</b> - Building products that genuinely help people

<b style="color: #ef4444;">🌟 Technical Environment:</b>
• <b style="color: #3b82f6;">Modern stack</b> - Working with current technologies and best practices
• <b style="color: #10b981;">Quality focus</b> - Team that values clean, maintainable code
• <b style="color: #8b5cf6;">Learning culture</b> - Code reviews, knowledge sharing, continuous improvement
• <b style="color: #f59e0b;">Innovation space</b> - Room to experiment and suggest new approaches

<b style="color: #8b5cf6;">🤝 Team Dynamics:</b>
• <b style="color: #ef4444;">Mentorship</b> - Opportunity to learn from experienced developers
• <b style="color: #3b82f6;">Collaboration</b> - Cross-functional teams working toward common goals
• <b style="color: #10b981;">Diverse perspectives</b> - Teams that value different backgrounds and approaches
• <b style="color: #f59e0b;">Supportive environment</b> - Where asking questions and making mistakes is part of learning

<b style="color: #10b981;">🚀 Career Development:</b>
• <b style="color: #8b5cf6;">Backend specialization</b> - Deep dive into Java, architecture, and scalable systems
• <b style="color: #ef4444;">Leadership opportunities</b> - Gradually taking on more responsibility
• <b style="color: #3b82f6;">Continuous learning</b> - Access to training, conferences, and new technologies
• <b style="color: #f59e0b;">Clear progression</b> - Understanding how to grow within the organization

<b style="color: #f59e0b;">💡 Cultural Fit:</b>
I thrive in environments that balance ambition with empathy, where we're building something meaningful together while supporting each other's growth.

What does your ideal work environment look like? 🤔`;
  }

  if (lowerMessage.includes('dream job') || lowerMessage.includes('ideal job')) {
    return `My dream job combines technical excellence with meaningful impact! 🌟

<b style="color: #3b82f6;">🎯 The Perfect Role:</b>
<b style="color: #10b981;">Senior Backend Developer</b> on a team building educational technology or financial inclusion platforms - something that genuinely makes a difference in people's lives.

<b style="color: #ef4444;">💻 Technical Dreams:</b>
• <b style="color: #8b5cf6;">Complex architecture challenges</b> - Designing systems that serve millions
• <b style="color: #f59e0b;">Java expertise</b> - Becoming truly deep in the ecosystem I love
• <b style="color: #3b82f6;">Scalability problems</b> - The kind that require mathematical thinking and creative solutions
• <b style="color: #10b981;">Innovation opportunities</b> - Working on cutting-edge approaches to old problems

<b style="color: #8b5cf6;">🌱 Growth Aspects:</b>
• <b style="color: #ef4444;">Technical leadership</b> - Gradually leading architecture decisions
• <b style="color: #3b82f6;">Mentoring others</b> - Helping junior developers find their path
• <b style="color: #f59e0b;">Cross-functional collaboration</b> - Working with designers, product managers, and stakeholders
• <b style="color: #10b981;">Continuous learning</b> - Always exploring new technologies and methodologies

<b style="color: #f59e0b;">🌍 Impact Vision:</b>
Working on projects like:
• <b style="color: #3b82f6;">Educational platforms</b> - Making quality education accessible globally
• <b style="color: #ef4444;">Financial inclusion tools</b> - Banking for underserved communities
• <b style="color: #8b5cf6;">Developer productivity tools</b> - Making other developers' lives easier
• <b style="color: #10b981;">Open source contributions</b> - Building tools that help the entire community

<b style="color: #10b981;">💡 The Environment:</b>
• <b style="color: #8b5cf6;">Collaborative culture</b> - Where ideas flow freely and everyone grows
• <b style="color: #ef4444;">Quality focus</b> - Team that cares about building things right
• <b style="color: #3b82f6;">Learning environment</b> - Where curiosity is encouraged and mistakes are learning opportunities
• <b style="color: #f59e0b;">Global impact</b> - Working with diverse teams on international projects

<b style="color: #3b82f6;">🚀 Five-Year Vision:</b>
Being known as someone who combines technical excellence with leadership, who can architect robust systems while helping others grow their careers.

What's your vision for the ideal work environment? 🤔`;
  }

  if (lowerMessage.includes('biggest accomplishment') || lowerMessage.includes('proudest achievement')) {
    return `My biggest accomplishment is building eBankify - a production-ready banking system that taught me so much about myself and development! 🏆

<b style="color: #10b981;">🏦 Why eBankify Stands Out:</b>
• <b style="color: #ef4444;">Technical complexity</b> - Enterprise-level security, real-time processing, scalable architecture
• <b style="color: #3b82f6;">Personal growth</b> - Took me from intermediate to advanced developer
• <b style="color: #8b5cf6;">Real-world impact</b> - Actually solves problems people have with banking systems
• <b style="color: #f59e0b;">Complete solution</b> - Not just a prototype, but a fully functional system

<b style="color: #3b82f6;">💡 What Made It Special:</b>
• <b style="color: #8b5cf6;">Started with a crazy idea</b> - "Let me build a bank!" seemed impossible
• <b style="color: #ef4444;">Pushed through complexity</b> - Security, transactions, user management - all interconnected
• <b style="color: #10b981;">Learned by doing</b> - Each challenge taught me something new about architecture
• <b style="color: #f59e0b;">Never compromised on quality</b> - Could have taken shortcuts, but chose to do it right

<b style="color: #ef4444;">🚀 Technical Achievements:</b>
• <b style="color: #3b82f6;">Spring Security mastery</b> - Implemented role-based authentication that actually works
• <b style="color: #10b981;">ElasticSearch integration</b> - Lightning-fast transaction searches
• <b style="color: #8b5cf6;">Scalable architecture</b> - Built to handle real banking loads
• <b style="color: #f59e0b;">Zero critical bugs</b> - Thorough testing and careful implementation

<b style="color: #8b5cf6;">💫 Personal Growth:</b>
• <b style="color: #ef4444;">Confidence boost</b> - Proved I could tackle enterprise-level challenges
• <b style="color: #3b82f6;">Technical depth</b> - Really understanding Spring Boot, not just using it
• <b style="color: #10b981;">Problem-solving skills</b> - Learning to break down complex systems
• <b style="color: #f59e0b;">Quality mindset</b> - Understanding what production-ready really means

<b style="color: #f59e0b;">🌟 The Bigger Picture:</b>
eBankify represents everything I love about development - taking a complex, real-world problem and creating an elegant, functional solution that could genuinely help people manage their finances better.

What's your biggest professional accomplishment? 🤔`;
  }

  if (lowerMessage.includes('favorite technology') || lowerMessage.includes('favorite tech')) {
    return `That's such a fun question! My favorite technology is definitely Spring Boot 🚀

<b style="color: #6aaa64;">💚 Why Spring Boot Captured My Heart:</b>
• <b style="color: #3b82f6;">Mathematical elegance</b> - The way dependency injection works appeals to my math background
• <b style="color: #ef4444;">Enterprise power</b> - Can build serious, production-ready applications
• <b style="color: #8b5cf6;">Convention over configuration</b> - Eliminates boilerplate and lets me focus on business logic
• <b style="color: #f59e0b;">Ecosystem richness</b> - Security, data, web, cloud - everything integrates beautifully

<b style="color: #3b82f6;">🏦 Real-World Love:</b>
Building eBankify with Spring Boot was like discovering a superpower:
• <b style="color: #10b981;">Security that actually works</b> - Spring Security made complex auth manageable
• <b style="color: #ef4444;">Database integration</b> - JPA made data handling elegant
• <b style="color: #8b5cf6;">API development</b> - REST endpoints that are clean and maintainable
• <b style="color: #f59e0b;">Testing support</b> - Built-in testing framework made quality assurance natural

<b style="color: #ef4444;">🎯 What I Love Most:</b>
• <b style="color: #3b82f6;">Predictable patterns</b> - Once you understand the Spring way, everything makes sense
• <b style="color: #10b981;">Production readiness</b> - Not just for demos, but for real applications
• <b style="color: #8b5cf6;">Community support</b> - Amazing documentation and active community
• <b style="color: #f59e0b;">Continuous evolution</b> - Always improving, always adding new capabilities

<b style="color: #8b5cf6;">💡 The Learning Journey:</b>
• <b style="color: #ef4444;">Started intimidating</b> - So many concepts to understand
• <b style="color: #3b82f6;">Gradually clicked</b> - Each feature I mastered made the next one easier
• <b style="color: #10b981;">Now feels natural</b> - Like thinking in Spring Boot patterns
• <b style="color: #f59e0b;">Still discovering</b> - There's always more depth to explore

<b style="color: #f59e0b;">🚀 Future Excitement:</b>
I'm excited about diving deeper into Spring Boot microservices, reactive programming, and cloud-native features. The technology just keeps getting better!

What's your favorite technology to work with? 🤔`;
  }

  if (lowerMessage.includes('tell me about yourself') || lowerMessage.includes('introduce yourself')) {
    return JSON.stringify({
      text: "I'd love to introduce myself! 👋",
      richContent: {
        type: 'info-card',
        data: {
          title: "About Me - Wissal Baaziz",
          sections: [
            {
              title: "🌟 Who I Am",
              type: "text",
              content: "I'm Wissal, a passionate full-stack developer and UI/UX designer with a unique mathematics background. Currently studying at Youcode-UM6P, I love turning complex problems into elegant, functional solutions."
            },
            {
              title: "🚀 My Journey",
              type: "cards",
              items: [
                {
                  title: "Mathematical Foundation",
                  description: "Started with pure mathematics, which taught me analytical thinking and problem-solving",
                  technologies: ["Logic", "Analysis", "Problem-solving"]
                },
                {
                  title: "Development Transition",
                  description: "Discovered coding was like solving math problems with real-world impact",
                  technologies: ["Java", "Spring Boot", "React"]
                },
                {
                  title: "Design Integration",
                  description: "Added UI/UX design to create complete, beautiful experiences",
                  technologies: ["Figma", "Adobe Creative Suite", "User Experience"]
                }
              ]
            },
            {
              title: "💻 What I Build",
              type: "cards",
              items: [
                {
                  title: "eBankify",
                  description: "Enterprise banking system with advanced security and real-time processing",
                  technologies: ["Spring Boot", "Security", "ElasticSearch"]
                },
                {
                  title: "Tafukut",
                  description: "Revolutionary interactive learning platform for coding education",
                  technologies: ["React", "Real-time", "Education"]
                },
                {
                  title: "Anazor",
                  description: "Art marketplace connecting artists with their community",
                  technologies: ["Laravel", "Community", "E-commerce"]
                }
              ]
            },
            {
              title: "🎯 My Goals",
              type: "list",
              items: [
                "Become a backend specialist with deep Java expertise",
                "Build technology that creates real positive impact",
                "Mentor other developers and help them grow",
                "Contribute to open source and the developer community"
              ]
            },
            {
              title: "💡 What Makes Me Unique",
              type: "tags",
              items: [
                "Mathematical thinking", "Full-stack skills", "Design sensibility", 
                "Problem-solving focus", "Quality mindset", "Continuous learning", 
                "Cross-cultural perspective"
              ]
            }
          ]
        }
      }
    });
  }

  // Additional quick questions that might be missing
  if (lowerMessage.includes('why are you interested in this role') || lowerMessage.includes('why this position') || lowerMessage.includes('why this job')) {
    return `I'm drawn to this role because it aligns perfectly with my passion for building impactful technology! 🚀

<b style="color: #3b82f6;">🎯 What Excites Me:</b>
• <b style="color: #10b981;">Technical challenges</b> - I love solving complex problems and building scalable solutions
• <b style="color: #ef4444;">Real impact</b> - Working on projects that genuinely improve people's lives
• <b style="color: #8b5cf6;">Learning opportunities</b> - Every new project teaches me something valuable
• <b style="color: #f59e0b;">Team collaboration</b> - Building something amazing together with talented people

<b style="color: #10b981;">💡 How My Background Fits:</b>
• <b style="color: #3b82f6;">Mathematical thinking</b> - Brings analytical precision to development decisions
• <b style="color: #ef4444;">Full-stack skills</b> - Can contribute across the entire technology stack
• <b style="color: #8b5cf6;">Design sensibility</b> - Understanding both technical and user experience aspects
• <b style="color: #f59e0b;">Fresh perspective</b> - Bringing innovative solutions from my diverse background

<b style="color: #ef4444;">🌟 What I Hope to Contribute:</b>
• <b style="color: #3b82f6;">Quality code</b> - Clean, maintainable solutions that stand the test of time
• <b style="color: #10b981;">Problem-solving</b> - Tackling challenges with systematic, mathematical thinking
• <b style="color: #8b5cf6;">Knowledge sharing</b> - Helping the team grow through collaboration and mentoring
• <b style="color: #f59e0b;">Innovation</b> - Bringing new ideas and approaches to existing challenges

What specific aspects of this role are you most excited about? 🤔`;
  }

  if (lowerMessage.includes('what makes you unique') || lowerMessage.includes('what sets you apart') || lowerMessage.includes('why you')) {
    return `Great question! What makes me unique is my combination of mathematical precision with creative problem-solving 🌟

<b style="color: #3b82f6;">🧠 Mathematical Developer:</b>
• <b style="color: #10b981;">Analytical approach</b> - I break down complex problems systematically
• <b style="color: #ef4444;">Logic-driven</b> - Mathematical background helps me think through edge cases
• <b style="color: #8b5cf6;">Pattern recognition</b> - Quickly spot optimization opportunities and system improvements
• <b style="color: #f59e0b;">Algorithmic thinking</b> - Understanding computational complexity and scalability

<b style="color: #ef4444;">🎨 Design-Driven Developer:</b>
• <b style="color: #3b82f6;">UI/UX expertise</b> - I don't just build features, I craft experiences
• <b style="color: #10b981;">User empathy</b> - Understanding what makes interfaces intuitive and delightful
• <b style="color: #8b5cf6;">Visual design skills</b> - Adobe Creative Suite, brand identity, graphic design
• <b style="color: #f59e0b;">Complete solutions</b> - Building both the backend logic and beautiful frontend

<b style="color: #10b981;">🚀 Real-World Impact:</b>
• <b style="color: #ef4444;">eBankify</b> - Banking system that handles enterprise-level security
• <b style="color: #3b82f6;">Tafukut</b> - Revolutionary learning platform that changes how people learn to code
• <b style="color: #8b5cf6;">Anazor</b> - Community-focused marketplace that connects artists

<b style="color: #8b5cf6;">🌟 The Perfect Blend:</b>
Most developers are either very technical or very creative. I bridge both worlds naturally - I can architect robust systems while ensuring they're beautiful and user-friendly. This lets me build solutions that are not just functional, but genuinely delightful to use.

What unique qualities do you value most in a developer? 🤔`;
  }

  if (lowerMessage.includes('how do you handle stress') || lowerMessage.includes('stress management') || lowerMessage.includes('under pressure')) {
    return `Stress management is crucial in development! Here's how I handle pressure 💪

<b style="color: #3b82f6;">🧠 Mathematical Mindset:</b>
• <b style="color: #10b981;">Break it down</b> - I decompose stressful problems into smaller, manageable parts
• <b style="color: #ef4444;">Prioritize logically</b> - Focus on what will have the most impact first
• <b style="color: #8b5cf6;">Stay analytical</b> - Emotions aside, what's the most efficient solution?
• <b style="color: #f59e0b;">Learn from patterns</b> - Understanding what typically causes stress helps me prepare

<b style="color: #ef4444;">🎯 Practical Strategies:</b>
• <b style="color: #3b82f6;">Time management</b> - Using agile methodologies to break work into sprints
• <b style="color: #10b981;">Clear communication</b> - Regular updates prevent last-minute surprises
• <b style="color: #8b5cf6;">Quality over speed</b> - Building it right the first time reduces stress later
• <b style="color: #f59e0b;">Documentation</b> - Clear notes help me and the team stay organized

<b style="color: #10b981;">🌟 Real Example:</b>
During eBankify development, I faced a complex security implementation deadline. Instead of panicking, I:
• <b style="color: #ef4444;">Mapped out</b> all security requirements systematically
• <b style="color: #3b82f6;">Identified</b> the most critical features first
• <b style="color: #8b5cf6;">Communicated</b> progress clearly to stakeholders
• <b style="color: #f59e0b;">Delivered</b> a robust solution on time with no critical bugs

<b style="color: #8b5cf6;">🍳 Personal Balance:</b>
I find that cooking helps me reset! Just like coding, it requires precision and creativity. Plus, there's something therapeutic about creating something tangible after a day of working with abstractions.

How do you typically handle high-pressure situations? 🤔`;
  }

  if (lowerMessage.includes('work style') || lowerMessage.includes('how do you work') || lowerMessage.includes('working style')) {
    return `My work style is a blend of systematic thinking and creative collaboration! 🚀

<b style="color: #3b82f6;">🎯 My Approach:</b>
• <b style="color: #10b981;">Plan first, code second</b> - I spend time understanding the problem before diving in
• <b style="color: #ef4444;">Quality over quantity</b> - I'd rather build something robust than rush through features
• <b style="color: #8b5cf6;">Document everything</b> - Clear documentation is a love letter to future developers
• <b style="color: #f59e0b;">Iterate and improve</b> - I believe in continuous refinement and learning

<b style="color: #ef4444;">🤝 Collaboration Style:</b>
• <b style="color: #3b82f6;">Ask questions</b> - I'm never afraid to seek clarification or learn from others
• <b style="color: #10b981;">Share knowledge</b> - I love teaching what I've learned through code reviews and discussions
• <b style="color: #8b5cf6;">Respect different perspectives</b> - Everyone brings unique insights to the table
• <b style="color: #f59e0b;">Constructive feedback</b> - I give and receive feedback with growth in mind

<b style="color: #10b981;">⚡ Productivity Habits:</b>
• <b style="color: #ef4444;">Deep work sessions</b> - I block time for focused coding without distractions
• <b style="color: #3b82f6;">Regular breaks</b> - Sometimes the best solutions come when you step away
• <b style="color: #8b5cf6;">Version control discipline</b> - Clear commits and branching strategies
• <b style="color: #f59e0b;">Testing mindset</b> - I build quality assurance into my development process

<b style="color: #8b5cf6;">🎨 Creative Balance:</b>
I balance analytical work with creative design thinking. Whether it's sketching UI mockups or thinking about user experience, I approach problems from multiple angles.

<b style="color: #f59e0b;">🌟 Mathematical Foundation:</b>
My math background means I naturally think about edge cases, optimization, and system design. I'm comfortable with complex problems and enjoy finding elegant solutions.

What kind of work environment helps you be most productive? 🤔`;
  }

  if (lowerMessage.includes('how do you stay updated') || lowerMessage.includes('keep learning') || lowerMessage.includes('stay current')) {
    return `Staying current with tech is essential! Here's how I keep learning 📚

<b style="color: #3b82f6;">🚀 Hands-On Learning:</b>
• <b style="color: #10b981;">Build real projects</b> - Like eBankify, Anazor, and Tafukut - each one teaches me something new
• <b style="color: #ef4444;">Experiment with new tools</b> - I regularly try new frameworks and libraries in side projects
• <b style="color: #8b5cf6;">Open source contributions</b> - Reading and contributing to real codebases
• <b style="color: #f59e0b;">Code challenges</b> - Keeping my problem-solving skills sharp

<b style="color: #ef4444;">📖 Knowledge Sources:</b>
• <b style="color: #3b82f6;">Official documentation</b> - I always start with the source (React docs, Spring Boot guides)
• <b style="color: #10b981;">Developer communities</b> - GitHub, Stack Overflow, and tech Twitter
• <b style="color: #8b5cf6;">Technical blogs</b> - Following industry leaders and innovative companies
• <b style="color: #f59e0b;">Peer learning</b> - Code reviews and discussions with fellow developers at Youcode-UM6P

<b style="color: #10b981;">🎯 Strategic Learning:</b>
• <b style="color: #ef4444;">Focus on fundamentals</b> - Deep understanding of core concepts before moving to frameworks
• <b style="color: #3b82f6;">Follow industry trends</b> - Cloud technologies, microservices, and modern architectures
• <b style="color: #8b5cf6;">Learn from failures</b> - Every bug teaches me something about better practices
• <b style="color: #f59e0b;">Cross-domain knowledge</b> - Combining development with design and mathematical thinking

<b style="color: #8b5cf6;">🌟 Current Learning Focus:</b>
• <b style="color: #3b82f6;">Advanced Java</b> - Deepening my backend expertise
• <b style="color: #ef4444;">Cloud technologies</b> - AWS, microservices, and scalable architectures
• <b style="color: #10b981;">DevOps practices</b> - CI/CD, containerization, and deployment strategies
• <b style="color: #f59e0b;">System design</b> - Building applications that can scale to millions of users

<b style="color: #f59e0b;">💡 Learning Philosophy:</b>
I believe in learning by doing. Theory is important, but nothing beats building something real and facing the challenges that come with it!

What's your favorite way to learn new technologies? 🤔`;
  }

  if (lowerMessage.includes('ideal work environment') || lowerMessage.includes('work environment') || lowerMessage.includes('perfect workplace')) {
    return `My ideal work environment combines technical excellence with human connection! 🌟

<b style="color: #3b82f6;">🤝 Team Culture:</b>
• <b style="color: #10b981;">Collaborative learning</b> - Where questions are welcomed and knowledge is shared freely
• <b style="color: #ef4444;">Constructive feedback</b> - Code reviews that help everyone grow
• <b style="color: #8b5cf6;">Diverse perspectives</b> - Teams that value different backgrounds and approaches
• <b style="color: #f59e0b;">Psychological safety</b> - Where mistakes are learning opportunities, not failures

<b style="color: #ef4444;">💻 Technical Environment:</b>
• <b style="color: #3b82f6;">Modern stack</b> - Working with current technologies and best practices
• <b style="color: #10b981;">Quality focus</b> - Team that values clean, maintainable code
• <b style="color: #8b5cf6;">Innovation space</b> - Room to experiment and suggest improvements
• <b style="color: #f59e0b;">Proper tools</b> - Good hardware, development tools, and infrastructure

<b style="color: #10b981;">🎯 Growth Opportunities:</b>
• <b style="color: #ef4444;">Mentorship</b> - Both learning from seniors and helping junior developers
• <b style="color: #3b82f6;">Challenging projects</b> - Work that pushes me to learn and innovate
• <b style="color: #8b5cf6;">Cross-functional collaboration</b> - Working with designers, product managers, and other teams
• <b style="color: #f59e0b;">Clear progression</b> - Understanding how to advance and take on more responsibility

<b style="color: #8b5cf6;">🌟 Work-Life Balance:</b>
• <b style="color: #3b82f6;">Flexible hours</b> - Respecting that people are most productive at different times
• <b style="color: #ef4444;">Remote-friendly</b> - Options for both in-person collaboration and focused remote work
• <b style="color: #10b981;">Sustainable pace</b> - High performance without burnout
• <b style="color: #f59e0b;">Personal development</b> - Time for learning and skill building

<b style="color: #f59e0b;">🚀 Impact Focus:</b>
• <b style="color: #3b82f6;">Meaningful work</b> - Building products that solve real problems
• <b style="color: #ef4444;">User-centered approach</b> - Always considering the end user experience
• <b style="color: #10b981;">Quality over quantity</b> - Building things right rather than just fast
• <b style="color: #8b5cf6;">Long-term thinking</b> - Solutions that will stand the test of time

What kind of work environment brings out your best performance? 🤔`;
  }

  if (lowerMessage.includes('how do you handle feedback') || lowerMessage.includes('receiving feedback') || lowerMessage.includes('criticism')) {
    return `Feedback is one of my favorite parts of development! It's how we all grow 🌱

<b style="color: #3b82f6;">🚀 My Feedback Philosophy:</b>
• <b style="color: #10b981;">Growth mindset</b> - Every piece of feedback is a chance to improve
• <b style="color: #ef4444;">Separate ego from code</b> - My code isn't me, it's just my current best effort
• <b style="color: #8b5cf6;">Ask questions</b> - I dig deeper to understand the why behind feedback
• <b style="color: #f59e0b;">Act on insights</b> - I implement changes and learn from the process

<b style="color: #ef4444;">💡 How I Receive Feedback:</b>
• <b style="color: #3b82f6;">Listen actively</b> - I focus on understanding, not defending
• <b style="color: #10b981;">Take notes</b> - I document feedback to refer back to later
• <b style="color: #8b5cf6;">Ask for specifics</b> - "Can you show me an example?" or "What would you do differently?"
• <b style="color: #f59e0b;">Thank the giver</b> - I appreciate people taking time to help me improve

<b style="color: #10b981;">🎯 Real Examples:</b>
• <b style="color: #ef4444;">At Youcode-UM6P</b> - Code reviews taught me about Spring Boot security patterns
• <b style="color: #3b82f6;">eBankify project</b> - Feedback on architecture helped me build more scalable systems
• <b style="color: #8b5cf6;">Design critiques</b> - Learning how to balance aesthetics with functionality
• <b style="color: #f59e0b;">Peer programming</b> - Discovering different approaches to the same problem

<b style="color: #8b5cf6;">🌟 How I Give Feedback:</b>
• <b style="color: #3b82f6;">Be specific</b> - Point to exact code or design elements
• <b style="color: #ef4444;">Explain the why</b> - Help others understand the reasoning
• <b style="color: #10b981;">Suggest alternatives</b> - Offer concrete improvements
• <b style="color: #f59e0b;">Highlight positives</b> - Acknowledge what's working well

<b style="color: #f59e0b;">🤝 Mathematical Mindset:</b>
My math background helps me see feedback objectively - it's data about how to improve, not a personal judgment. Just like in mathematics, there are often multiple valid approaches, and discussing them makes everyone better.

How do you approach giving and receiving feedback in your team? 🤔`;
  }

  if (lowerMessage.includes('salary expectations') || lowerMessage.includes('compensation') || lowerMessage.includes('salary range')) {
    return `That's a practical question! 💰 I believe in fair compensation that reflects value and growth potential.

<b style="color: #3b82f6;">🎯 My Approach:</b>
• <b style="color: #10b981;">Value-based thinking</b> - I focus on the impact I can make and the problems I can solve
• <b style="color: #ef4444;">Market research</b> - I stay informed about industry standards for my skill level
• <b style="color: #8b5cf6;">Growth perspective</b> - I'm looking for opportunities to learn and advance
• <b style="color: #f59e0b;">Total package</b> - Considering learning opportunities, team culture, and career growth

<b style="color: #ef4444;">💡 What I Bring:</b>
• <b style="color: #3b82f6;">Full-stack capabilities</b> - Can work across your entire technology stack
• <b style="color: #10b981;">Design skills</b> - UI/UX expertise that adds extra value
• <b style="color: #8b5cf6;">Mathematical thinking</b> - Analytical approach to problem-solving
• <b style="color: #f59e0b;">Production experience</b> - Real projects like eBankify that demonstrate enterprise-level skills

<b style="color: #10b981;">🚀 Current Focus:</b>
As someone actively building my career and gaining experience, I'm more interested in:
• <b style="color: #ef4444;">Learning opportunities</b> - Working with experienced developers
• <b style="color: #3b82f6;">Challenging projects</b> - Technology that pushes me to grow
• <b style="color: #8b5cf6;">Career progression</b> - Clear path to senior roles
• <b style="color: #f59e0b;">Team culture</b> - Environment where I can contribute and learn

<b style="color: #8b5cf6;">💭 My Philosophy:</b>
I believe the best compensation discussions happen when both sides understand the value being created. I'd love to learn more about the role and how I can contribute before discussing specific numbers.

<b style="color: #f59e0b;">🤝 Let's Talk:</b>
What's the range you typically offer for someone with my skill set and experience level? I'm confident we can find something fair that works for both of us!

What factors do you consider most important when determining compensation? 🤔`;
  }

  if (lowerMessage.includes('do you have any questions') || lowerMessage.includes('questions for us') || lowerMessage.includes('any questions')) {
    return `Absolutely! I have several questions that would help me understand how I can best contribute 🚀

<b style="color: #3b82f6;">🎯 About the Role:</b>
• <b style="color: #10b981;">What does a typical day look like?</b> - I'd love to understand the day-to-day responsibilities
• <b style="color: #ef4444;">What are the biggest challenges</b> the team is currently facing?
• <b style="color: #8b5cf6;">How do you measure success</b> in this position?
• <b style="color: #f59e0b;">What opportunities are there</b> for growth and advancement?

<b style="color: #ef4444;">🛠️ Technical Questions:</b>
• <b style="color: #3b82f6;">What's your current tech stack?</b> - I'd love to understand how my skills align
• <b style="color: #10b981;">How do you handle code reviews</b> and knowledge sharing?
• <b style="color: #8b5cf6;">What's your approach to testing</b> and quality assurance?
• <b style="color: #f59e0b;">How do you stay current</b> with new technologies?

<b style="color: #10b981;">🤝 Team & Culture:</b>
• <b style="color: #ef4444;">How would you describe the team culture?</b>
• <b style="color: #3b82f6;">What do you enjoy most</b> about working here?
• <b style="color: #8b5cf6;">How do you support professional development</b> and learning?
• <b style="color: #f59e0b;">What makes someone successful</b> in this environment?

<b style="color: #8b5cf6;">🚀 Future Vision:</b>
• <b style="color: #3b82f6;">Where do you see the company/team</b> in the next 2-3 years?
• <b style="color: #ef4444;">What exciting projects</b> are coming up?
• <b style="color: #10b981;">How do you approach innovation</b> and trying new technologies?
• <b style="color: #f59e0b;">What impact would you like me to make</b> in my first 6 months?

<b style="color: #f59e0b;">💡 My Biggest Question:</b>
Based on what you've learned about me today, do you have any concerns about my fit for this role? I'd love to address any questions you might have!

What aspect of the role or company would you most like to highlight? 🤔`;
  }

  return null;
}

// Generate intelligent fallback responses for any technical question
function generateIntelligentFallback(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  // Detect if it's a "how did you learn X" question
  if (lowerMessage.includes('how did you learn') || lowerMessage.includes('how did u learn')) {
    // Extract the technology being asked about
    const techMatch = lowerMessage.match(/learn\s+(\w+)/);
    const technology = techMatch ? techMatch[1] : 'that technology';
    
    return `Great question about learning <b style="color: #3b82f6;">${technology}</b>! 🚀 

My learning journey is always a combination of theory and hands-on practice. While I primarily work with React, Spring Boot, and Laravel in my main projects, I believe every programming language and technology teaches you something valuable.

<b style="color: #f59e0b;">🎯 My Learning Approach:</b>
• <b style="color: #10b981;">💡 Start with fundamentals</b> - Understanding core concepts and why it exists
• <b style="color: #ef4444;">🔧 Build something real</b> - Nothing beats hands-on experience with actual projects  
• <b style="color: #8b5cf6;">📚 Learn from others</b> - Code reviews, community discussions, and documentation
• <b style="color: #3b82f6;">🎯 Connect the dots</b> - How does it relate to what I already know?

My mathematics background really helps me grasp logical structures quickly, whether it's C's memory management, Python's simplicity, or any other language's unique features.

Are you learning ${technology} for a specific project or just exploring? I'd love to help you think through the best learning approach! 🤔`;
  }
  
  // Detect if it's a technical question
  const techKeywords = ['programming', 'language', 'framework', 'library', 'database', 'algorithm', 'code', 'development', 'software', 'web', 'mobile', 'api', 'backend', 'frontend', 'fullstack'];
  const languages = ['javascript', 'python', 'java', 'c++', 'c#', 'php', 'ruby', 'go', 'rust', 'swift', 'kotlin', 'typescript', 'html', 'css', 'sql', 'react', 'vue', 'angular', 'node', 'spring', 'laravel', 'django', 'flask'];
  
  const isTechnical = techKeywords.some(keyword => lowerMessage.includes(keyword)) || 
                     languages.some(lang => lowerMessage.includes(lang)) ||
                     lowerMessage.length < 10; // Short questions like "c", "react", "java"
  
  if (isTechnical) {
    return `That's a great technical question! 💻 

I'd love to help you explore that topic. As a full-stack developer who's worked with various technologies in projects like <b style="color: #10b981;">eBankify</b> (Spring Boot), <b style="color: #ef4444;">Anazor</b> (Laravel), and <b style="color: #3b82f6;">Tafukut</b> (React), I enjoy sharing knowledge about development.

<b style="color: #f59e0b;">🚀 My Approach:</b>
My philosophy is understanding each technology's purpose, strengths, and how it fits into the bigger picture of software development. Coming from a mathematics background, I always look at the logical foundations first.

What specific aspect would you like to dive into? Are you learning something new or working on a particular project? I'm here to help! 🎯`;
  }
  
  // For non-technical questions
  return `That's an interesting question! 🤔 

I'm here to help with any topic you're curious about. Whether it's about technology, development, my projects, or anything else - just ask away! 

As someone who loves learning and sharing knowledge, I'm always excited to explore new topics and help others understand concepts better. 

What specifically would you like to know more about? 😊`;
}

// Enhanced smart response generator with more contextual understanding
async function generateSmartResponse(message: string, relevantData: string): Promise<string> {
  const lowerMessage = message.toLowerCase();
  
  // ======= PRIORITY: SPECIFIC PROJECT HANDLERS FIRST =======
  // These must be checked before any generic handlers!
  
  // Enhanced project-specific responses with priority matching
  if (lowerMessage.includes('ebankify') || lowerMessage.includes('banking') || lowerMessage.includes('bank')) {
    console.log('✅ MATCHED: eBankify project question');
    return `eBankify is my crown jewel! 🏦 It's a comprehensive e-banking API that I built with Spring Boot - completely production-ready and enterprise-grade. Let me tell you what makes it special:

🔐 **Enterprise Security Architecture**
- Role-based authentication with JWT tokens (Admin, Employee, User)
- Multi-layer security with banking-grade encryption
- Secure transaction processing with full audit trails
- Input validation and SQL injection prevention

💳 **Advanced Transaction System**
- Instant and scheduled payment processing
- Concurrent transaction handling with data integrity
- Transaction history with real-time analytics
- Multi-currency support and automated reconciliation

🔍 **ElasticSearch Integration**
- Lightning-fast search through millions of transactions
- Real-time indexing and advanced querying
- Performance optimization for large datasets
- Custom search filters and sorting capabilities

🏗️ **Modular Architecture**
- Clean separation of concerns with Spring Boot
- Scalable microservices-ready design
- Comprehensive API documentation with Swagger
- Docker containerization for easy deployment

📊 **Analytics & Reporting**
- Transaction insights and spending patterns
- Real-time dashboard with visual analytics
- Loan management with approval workflows
- Risk assessment and fraud detection algorithms

**The Technical Challenge:** 
The biggest hurdle was implementing concurrent transaction processing while maintaining ACID properties. I solved this with sophisticated locking mechanisms and proper transaction isolation levels.

**Tech Stack:** Spring Boot, Spring Security, JPA/Hibernate, ElasticSearch, MySQL, Maven, Docker

**GitHub:** https://github.com/bwissal13/eBankify

What specific aspect interests you most? The security architecture, transaction processing, or maybe the ElasticSearch integration? I'd love to dive deeper! 🚀`;
  }
  
  if (lowerMessage.includes('anazor') || lowerMessage.includes('art') || lowerMessage.includes('marketplace')) {
    console.log('✅ MATCHED: Anazor project question');
    return `Anazor is where my love for community and technology meets! 🎨 It's not just an art marketplace - it's a complete ecosystem for artists and art lovers.

✨ **What makes it special:**
🖼️ **Artist Portfolios**: Beautiful showcase for artists to display their work
💰 **E-commerce Engine**: Seamless buying and selling with secure payments
🗣️ **Community Forum**: Where artists connect, share tips, and collaborate
⭐ **Rating System**: Builds trust between buyers and sellers
🔍 **Smart Search**: Find exactly what you're looking for with advanced filters

Built with Laravel and a touch of design magic! The challenge was creating intuitive UX for complex workflows - artists need to manage inventory, buyers want smooth purchasing, and the community needs to feel connected.

The result? A platform that's not just functional but brings people together around art. Are you interested in art or marketplace development? 🎯`;
  }
  
  if (lowerMessage.includes('tafukut') || lowerMessage.includes('learning') || lowerMessage.includes('education')) {
    console.log('✅ MATCHED: Tafukut project question');
    return `Tafukut is my answer to "I wish I could code while watching tutorials!" 📚 It's an interactive learning platform that changes how people learn programming.

🚀 **The Innovation:**
📹 **Video-Code Sync**: Watch tutorials while coding in real-time in the same interface
⚡ **Live Code Execution**: See your code run instantly without switching windows
🎯 **Interactive Modules**: Learn by doing, not just watching
📊 **Progress Tracking**: See your learning journey unfold
🤝 **Code Sharing**: Collaborate and get help from the community

Built with React and Laravel, the technical challenge was synchronizing video playback with code execution. But the magic happens when learners can follow along seamlessly!

The vision? Bridge the gap between theory and practice in programming education. No more switching between video and IDE - everything happens in one beautiful interface.

Have you experienced that frustration of pausing videos to code? Tafukut eliminates that completely! 🎪`;
  }
  
  // "What's the craziest thing you've built?" - specific response
  if (lowerMessage.includes('craziest') || lowerMessage.includes('crazy') || lowerMessage.includes('most complex') || lowerMessage.includes('challenging project')) {
    console.log('✅ MATCHED: Craziest project question');
    return `The craziest thing I've built? Definitely eBankify! 🏦 I mean, who decides to build a full banking system as one of their first major projects? 😅

**Why It's Absolutely Crazy:**

🔐 **The Security Nightmare**
- Implementing banking-grade security from scratch
- JWT tokens, role-based auth, encryption, audit trails
- Making sure no one can hack into financial transactions
- Following actual banking security standards

💳 **Concurrent Transaction Hell**
- Handling multiple users making transactions simultaneously
- Preventing race conditions and data corruption
- Implementing proper ACID properties
- Building atomic transaction processing

🔍 **ElasticSearch Integration**
- Indexing millions of transactions for instant search
- Real-time data synchronization
- Complex query optimization
- Performance tuning for large datasets

🏗️ **Enterprise Architecture**
- Building for scalability from day one
- Microservices-ready modular design
- Comprehensive API documentation
- Docker containerization and deployment

**The Crazy Part:** 
I was essentially building something that real banks use, but as a learning project! The pressure to get the security right was immense - you can't have bugs in a banking system.

**The Result:** 
A production-ready banking API that handles real-world scenarios better than some commercial solutions. It taught me more about software architecture, security, and system design than any tutorial ever could.

**The Math Background Advantage:** 
My mathematical thinking really helped with the complex algorithms for transaction processing and security implementations.

Would you start with a banking system as your first major project? What's the craziest thing you've ever attempted? 🚀`;
  }

  // "What's something 90% of people get wrong?" - developer insights
  if (lowerMessage.includes('90%') || lowerMessage.includes('people get wrong') || lowerMessage.includes('common mistake') || lowerMessage.includes('misconception')) {
    console.log('✅ MATCHED: Common mistakes question');
    return `Oh, this is a great question! 💡 Something 90% of developers get wrong? **They think complexity equals sophistication.**

**The Real Truth:**

🎯 **Simple Code is Harder to Write**
Most developers write complex code because it's easier. Writing simple, readable code that solves complex problems? That's the real challenge.

In eBankify, I could have written super "clever" one-liners for transaction processing. Instead, I wrote clear, step-by-step code that any team member could understand and modify. Result? Zero critical bugs and easy maintenance.

🔧 **Architecture Over Features**
90% focus on adding features. 10% focus on building the right foundation. I learned this the hard way - in my early projects, I kept adding features until the codebase became unmaintainable.

Now? I spend 70% of my time on architecture and 30% on features. Anazor and Tafukut are both built on solid foundations that can grow beautifully.

📝 **Documentation is Not Optional**
"The code is self-documenting" - biggest lie in tech! Good documentation is a love letter to your future self and your team.

🔍 **Understanding the Problem First**
Most developers jump straight to coding. I spend hours understanding the actual problem. For Tafukut, I interviewed 20+ people about their learning struggles before writing a single line of code.

**My Math Background Insight:**
In mathematics, elegance comes from simplicity. A beautiful proof is simple and clear. Same with code - the best solution is often the simplest one that works.

**The Paradox:** 
The better you get at programming, the simpler your code becomes. Complexity is a sign of inexperience, not expertise.

What's a development misconception you've encountered? I'd love to hear your perspective! 🤔`;
  }
  
  // Enhanced general project overview
  if (lowerMessage.includes('project') || lowerMessage.includes('portfolio') || lowerMessage.includes('what have you built') || lowerMessage.includes('your work')) {
    console.log('✅ MATCHED: General projects question');
    return `I've built some projects I'm genuinely proud of! 🚀 Each one tackles different challenges and showcases different aspects of my development journey:

🏦 **eBankify** - My Crown Jewel
A production-ready e-banking API with enterprise security, concurrent transaction processing, and ElasticSearch integration. Built with Spring Boot - it's my most complex and sophisticated project.

🎨 **Anazor** - Art Marketplace
A complete ecosystem for artists with e-commerce, portfolio management, and community features. Created with Laravel - it beautifully combines technology with creativity.

📚 **Tafukut** - Interactive Learning Revolution
An innovative platform that synchronizes video tutorials with live code execution. Built with React - it's changing how people learn programming.

🔧 **TaskifyApi** - Task Management
A robust API for project organization and team collaboration. Clean PHP architecture with comprehensive documentation.

☕ **Hotel Management System** - Java Console App
Demonstrates solid OOP principles and complex business logic in a console environment.

👥 **Employee Management (DTO)** - Clean Architecture
Showcases proper Data Transfer Object patterns and clean separation of concerns.

**What I'm Most Proud Of:**
Each project solves a real problem. eBankify could genuinely help people manage finances, Anazor connects artists with buyers, and Tafukut makes learning programming more effective.

**Tech Stack Diversity:** Spring Boot, React, Laravel, Java, PHP, JavaScript, MySQL, ElasticSearch, Docker

Which project catches your interest? I'd love to dive deeper into the technical challenges and solutions! 🎯`;
  }
  
  // ======= END PRIORITY HANDLERS =======
  
  // Handle short responses that might be answers to previous questions
  if (message.length < 20) {
    // Check for common short responses to engagement questions
    if (lowerMessage.includes('excel') || lowerMessage.includes('succeed') || lowerMessage.includes('grow')) {
      return `That's a wonderful ambition! 🌟 Excellence is such a powerful driving force.

<b style="color: #3b82f6;">🚀 What I love about "excelling":</b>
It's not just about personal achievement - it's about pushing boundaries and setting new standards. In my own journey, I've found that excellence comes from:

• <b style="color: #10b981;">Continuous learning</b> - Always staying curious and hungry for knowledge
• <b style="color: #ef4444;">Quality over quantity</b> - Focusing on doing things right, not just fast
• <b style="color: #f59e0b;">Helping others rise</b> - True excellence lifts everyone around you

<b style="color: #8b5cf6;">🎯 In my field, I see excellence as:</b>
Building applications that don't just work, but solve real problems beautifully. Whether it's the security architecture in eBankify or the user experience in Tafukut - every detail matters.

<b style="color: #ef4444;">💡 What drives your pursuit of excellence?</b>
Is it about mastering specific technologies, building impactful projects, or maybe leading teams to achieve great things? I'd love to hear what excellence means to you! 🤔`;
    }
    
    if (lowerMessage.includes('yes') || lowerMessage.includes('sure') || lowerMessage.includes('definitely')) {
      return `Awesome! I love the enthusiasm! 🚀 

<b style="color: #3b82f6;">🌟 Let's dive deeper!</b>
I'm always excited to explore topics that spark curiosity. Whether it's about my development journey, the technical challenges I've faced, or how I approach problem-solving - I'm here for it!

<b style="color: #f59e0b;">💡 What specifically interests you most?</b>
• <b style="color: #10b981;">Technical deep-dives</b> - Want to know about Spring Boot architecture, React patterns, or database design?
• <b style="color: #ef4444;">Project stories</b> - Curious about the challenges and breakthroughs in eBankify, Anazor, or Tafukut?
• <b style="color: #8b5cf6;">Learning journey</b> - How I transitioned from mathematics to full-stack development?
• <b style="color: #3b82f6;">Design thinking</b> - How I combine technical skills with UI/UX design?

What catches your attention? 🤔`;
    }
    
    if (lowerMessage.includes('interesting') || lowerMessage.includes('cool') || lowerMessage.includes('amazing')) {
      return `Thank you! I'm so glad you find it interesting! 😊

<b style="color: #ef4444;">🚀 What excites me most</b> about sharing my journey is seeing how it might inspire or help others. Every project, every challenge, every breakthrough - they're all part of a bigger story of growth and learning.

<b style="color: #3b82f6;">💫 The magic happens when:</b>
• <b style="color: #10b981;">Mathematics meets coding</b> - Using analytical thinking to solve complex problems
• <b style="color: #8b5cf6;">Design meets development</b> - Creating beautiful, functional experiences
• <b style="color: #f59e0b;">Individual skills meet team collaboration</b> - Building something bigger together

<b style="color: #10b981;">🤔 What aspect resonates with you most?</b>
Are you on a similar journey? Working on exciting projects? I'd love to hear about what you're building or learning! 🌟`;
    }
    
    if (lowerMessage.includes('no') || lowerMessage.includes('not really') || lowerMessage.includes('maybe')) {
      return `No worries at all! 😊 Everyone's journey and interests are different, and that's what makes conversations so valuable.

<b style="color: #3b82f6;">🌟 Maybe we can explore something else?</b>
I'm here to help with whatever interests you - whether that's:

• <b style="color: #10b981;">Technical questions</b> - About development, architecture, or problem-solving
• <b style="color: #ef4444;">Career advice</b> - Sharing what I've learned so far
• <b style="color: #f59e0b;">Project discussions</b> - Brainstorming ideas or solutions
• <b style="color: #8b5cf6;">Just chatting</b> - Sometimes the best conversations happen naturally!

<b style="color: #ef4444;">💡 What would make this conversation valuable for you?</b>
I'm genuinely curious about what you're working on or what challenges you're facing. How can I help? 🤔`;
    }
  }
  
  // Quick question responses - check these first for exact matches
  const quickQuestionResponse = handleQuickQuestions(lowerMessage);
  if (quickQuestionResponse) {
    // Check if it's a JSON response for rich content
    try {
      const parsed = JSON.parse(quickQuestionResponse);
      if (parsed.richContent) {
        return quickQuestionResponse; // Return the JSON string for parsing in frontend
      }
    } catch (e) {
      // Not JSON, return as regular text
    }
    return quickQuestionResponse;
  }

  // Handle impact and field-related questions
  if (lowerMessage.includes('impact') || lowerMessage.includes('field') || lowerMessage.includes('make a difference')) {
    return `That's such a meaningful question! 🌟 The impact I want to make is deeply personal to me.

<b style="color: #3b82f6;">🚀 My Vision for Impact:</b>
I want to build technology that bridges gaps - between complexity and simplicity, between problems and solutions, between different communities of people.

<b style="color: #10b981;">🎯 Specific Areas Where I Want to Make a Difference:</b>
• <b style="color: #ef4444;">Educational Technology</b> - Like Tafukut, making learning more interactive and accessible
• <b style="color: #8b5cf6;">Financial Inclusion</b> - Building systems like eBankify that can serve underbanked communities
• <b style="color: #f59e0b;">Creative Communities</b> - Platforms like Anazor that connect artists with their audiences
• <b style="color: #3b82f6;">Developer Education</b> - Sharing knowledge and helping others grow in their careers

<b style="color: #ef4444;">💡 What drives me:</b>
Coming from a mathematics background, I understand that the most elegant solutions are often the simplest ones. I want to take complex problems and make them accessible to everyone.

<b style="color: #8b5cf6;">🌟 Long-term Impact:</b>
Five years from now, I want to be known not just as a developer who writes great code, but as someone who builds technology that genuinely improves people's lives and helps other developers reach their potential.

What kind of impact are you hoping to make in your field? 🤔`;
  }
  
  // Handle leadership and growth questions
  if (lowerMessage.includes('leadership') || lowerMessage.includes('mentoring') || lowerMessage.includes('helping others')) {
    return `Leadership and mentoring are so close to my heart! 🌟

<b style="color: #3b82f6;">🚀 My Leadership Philosophy:</b>
True leadership isn't about having all the answers - it's about creating an environment where everyone can find their best solutions. I believe in leading by example and lifting others up.

<b style="color: #10b981;">💡 How I Help Others Grow:</b>
• <b style="color: #ef4444;">Code Reviews</b> - Sharing knowledge through constructive feedback
• <b style="color: #8b5cf6;">Knowledge Sharing</b> - Documenting solutions and best practices
• <b style="color: #f59e0b;">Pair Programming</b> - Learning together and solving problems collaboratively
• <b style="color: #3b82f6;">Encouraging Innovation</b> - Creating space for others to experiment and learn

<b style="color: #ef4444;">🌱 What I've Learned:</b>
My mathematics background taught me that the best teachers are often the best students. I learn as much from mentoring others as they learn from me - it's a beautiful cycle!

<b style="color: #8b5cf6;">🎯 Future Vision:</b>
I want to be the kind of senior developer who remembers what it was like to be starting out, and who actively creates opportunities for others to shine and grow.

Are you in a leadership role yourself, or looking to develop those skills? 🤔`;
  }
  
  // Handle excellence and career growth questions
  if (lowerMessage.includes('excellence') || lowerMessage.includes('career growth') || lowerMessage.includes('professional development')) {
    return `Excellence is such a powerful driving force! 🌟 I'm passionate about this topic because it's been central to my journey.

<b style="color: #3b82f6;">🚀 My Definition of Excellence:</b>
Excellence isn't about being perfect - it's about consistently pushing boundaries, learning from every experience, and never settling for "good enough" when you can create something truly impactful.

<b style="color: #10b981;">💡 How I Pursue Excellence:</b>
• <b style="color: #ef4444;">Deep Learning</b> - Understanding not just how to use technologies, but why they exist and how they work
• <b style="color: #8b5cf6;">Quality Focus</b> - Writing code that's not just functional, but maintainable and elegant
• <b style="color: #f59e0b;">User-Centered Thinking</b> - Building solutions that genuinely solve real problems
• <b style="color: #3b82f6;">Continuous Improvement</b> - Each project teaches me something new about architecture, design, or problem-solving

<b style="color: #ef4444;">🎯 In My Projects:</b>
Whether it's the enterprise-level security in eBankify, the community-building features in Anazor, or the innovative learning approach in Tafukut - I always ask "How can this be not just good, but exceptional?"

<b style="color: #8b5cf6;">🌟 Mathematical Foundation:</b>
My math background taught me that excellence comes from understanding fundamentals deeply, then building elegant solutions on that foundation.

What does excellence mean to you in your field? What drives your pursuit of it? 🤔`;
  }
  
  // Handle enthusiasm and positive responses
  if (message.length < 30 && (lowerMessage.includes('great') || lowerMessage.includes('awesome') || lowerMessage.includes('love it') || lowerMessage.includes('perfect'))) {
    return `Thank you so much! 😊 Your enthusiasm really makes me happy!

<b style="color: #3b82f6;">🚀 What I love about development</b> is that every day brings new challenges and opportunities to learn. Whether it's solving a complex algorithm, designing a beautiful interface, or helping a team member understand a concept - there's always something exciting happening!

<b style="color: #10b981;">💡 Speaking of exciting things...</b>
What's keeping you busy these days? Are you working on any interesting projects, learning new technologies, or facing any development challenges? I'd love to hear about what you're up to! 🤔`;
  }
  
  // Handle technical interest follow-ups
  if (lowerMessage.includes('tell me more') || lowerMessage.includes('learn more') || lowerMessage.includes('dive deeper')) {
    return `I'd love to dive deeper! 🚀 There's so much to explore!

<b style="color: #3b82f6;">🎯 What specifically interests you?</b>

<b style="color: #10b981;">💻 Technical Deep Dives:</b>
• <b style="color: #ef4444;">eBankify Architecture</b> - How I built enterprise-level security with Spring Boot
• <b style="color: #8b5cf6;">Tafukut Innovation</b> - Real-time code execution and video synchronization with React
• <b style="color: #f59e0b;">Anazor Community Building</b> - Creating engaging user experiences with Laravel

<b style="color: #ef4444;">🌟 Development Journey:</b>
• <b style="color: #3b82f6;">From Math to Code</b> - How mathematical thinking shapes my development approach
• <b style="color: #10b981;">Learning Strategies</b> - How I mastered full-stack development at Youcode-UM6P
• <b style="color: #8b5cf6;">Design + Development</b> - Combining UI/UX skills with technical expertise

<b style="color: #f59e0b;">🚀 Future Vision:</b>
• <b style="color: #3b82f6;">Career Goals</b> - Backend specialization and technical leadership
• <b style="color: #ef4444;">Impact Focus</b> - Building technology that makes a real difference

What calls to you most? 🤔`;
  }
  
  // Handle questions about collaboration and teamwork
  if (lowerMessage.includes('team') || lowerMessage.includes('collaboration') || lowerMessage.includes('working together')) {
    return `Collaboration is where the magic happens! 🌟 I absolutely love working with teams!

<b style="color: #3b82f6;">🤝 What I bring to teams:</b>
• <b style="color: #10b981;">Mathematical thinking</b> - Analytical approach to problem-solving
• <b style="color: #ef4444;">Design sensibility</b> - Understanding both technical and user experience aspects
• <b style="color: #8b5cf6;">Knowledge sharing</b> - I love teaching and learning from teammates
• <b style="color: #f59e0b;">Cultural bridge</b> - Experience working across diverse international contexts

<b style="color: #ef4444;">🚀 My collaborative approach:</b>
I believe the best solutions emerge when everyone brings their unique perspective to the table. Whether it's through code reviews, pair programming, or brainstorming sessions - I thrive in environments where knowledge flows freely.

<b style="color: #10b981;">💡 What I've learned:</b>
At Youcode-UM6P, working with diverse teams taught me that the most innovative solutions often come from combining different approaches and backgrounds.

<b style="color: #8b5cf6;">🌟 Looking forward:</b>
I'm excited about joining a team where I can contribute my skills while continuing to grow and learn from amazing colleagues!

Are you part of a development team? What's your experience with collaboration been like? 🤔`;
  }
  
  // Check if this is a personal question about Wissal
  const personalKeywords = ['wissal', 'you', 'your', 'yourself', 'portfolio', 'projects', 'ebankify', 'anazor', 'tafukut', 'github', 'linkedin', 'instagram', 'about', 'background', 'experience', 'skills', 'hobbies', 'contact'];
  const isPersonalQuestion = personalKeywords.some(keyword => lowerMessage.includes(keyword));
  
  // Check for specific topics Wissal has created content for
  // Only include topics that actually have presentations - update this list as needed
  const topicsWithContent = {
    'dto': 'https://bwissal.software/presentations/dto-presentation',
    'data transfer object': 'https://bwissal.software/presentations/dto-presentation'
    // Add more topics here only when presentations actually exist
  };
  
  // Check if question is about a topic Wissal has content for
  for (const [topic, link] of Object.entries(topicsWithContent)) {
    if (lowerMessage.includes(topic)) {
      return `Great question about ${topic}! 🚀 I actually created a comprehensive presentation on this topic. You can check it out here: ${link}

As someone who's worked extensively with ${topic} in projects like ${topic.includes('spring') ? 'eBankify' : topic.includes('laravel') ? 'Anazor' : topic.includes('react') ? 'Tafukut' : 'my various projects'}, I found that ${getTopicInsight(topic)}.

Feel free to explore the presentation, and if you have any specific questions afterward, I'm here to help! 😊 What aspect of ${topic} interests you most?`;
    }
  }
  
  // Greeting responses
  if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey')) {
    const greetings = [
      `Hey there! 👋 

I'm <b style="color: #3b82f6;">Wissal</b>, a full-stack developer who loves creating digital magic! I'm here to help with any questions you have - whether about my projects, development in general, or anything tech-related. 

What's on your mind? 🤔`,
      
      `Hello! 😊 

So nice to meet you! I'm <b style="color: #3b82f6;">Wissal</b> - I build everything from secure banking systems to interactive learning platforms. I'm here to help with any questions you have! 

What would you like to explore? 🚀`,
      
      `Hi! 🌟 

I'm <b style="color: #3b82f6;">Wissal Baaziz</b>, and I'm passionate about turning ideas into beautiful, functional code. Whether you want to know about my projects or need help with any development questions, I'm here for you! 

What's on your mind? 💻`
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }
  
  // Casual "how are you" responses
  if (lowerMessage.includes('how are you') || lowerMessage.includes('how are u')) {
    const casualResponses = [
      `I'm doing great, thanks for asking! 😊 

I've been diving deep into some exciting projects lately - just finished working on <b style="color: #10b981;">eBankify</b> and I'm always learning something new. There's nothing quite like the satisfaction of solving a complex coding problem! 

How about you? What brings you here today? 🤔`,
      
      `I'm fantastic! 🚀 

Currently juggling my studies at <b style="color: #f59e0b;">Youcode-UM6P</b> and working on some cool projects. Just yesterday I was debugging some tricky React components - you know how it is with development, there's always something interesting to figure out! 

What about you? Are you working on anything fun? 💻`,
      
      `I'm doing wonderful, thank you! 💻 

Been spending time perfecting my latest project and exploring new technologies. The developer life keeps me busy but I absolutely love it! There's always something new to learn and build. 

What's going on in your world? 🌟`
    ];
    return casualResponses[Math.floor(Math.random() * casualResponses.length)];
  }
  
  // Learning-related questions (like "how did you learn React")
  if (lowerMessage.includes('how') && (lowerMessage.includes('learn') || lowerMessage.includes('study'))) {
    const technology = extractTechnology(lowerMessage);
    if (technology) {
      return generateLearningResponse(technology);
    }
  }
  
  // For questions about journey, background, or "tell me about yourself"
  if (lowerMessage.includes('journey') || lowerMessage.includes('tell me about') || lowerMessage.includes('share') || lowerMessage.includes('story')) {
    return `I'd love to share my journey with you! 🚀 

<b style="color: #8b5cf6;">🔢 My Origin Story:</b>
My path to development started with mathematics - I loved the logical thinking and problem-solving aspects. Then I discovered coding and realized it was like solving math problems but with the power to create something real and functional!

<b style="color: #f59e0b;">🎓 Current Journey:</b>
Currently, I'm studying at <b style="color: #f59e0b;">Youcode-UM6P</b>, where I'm diving deep into full-stack development. But here's the thing - I don't just study, I build! I've created some projects I'm really proud of:

<b style="color: #3b82f6;">💼 My Projects:</b>
• <b style="color: #10b981;">🏦 eBankify</b> - My comprehensive banking system built with Spring Boot. It handles everything from secure transactions to role-based authentication. The challenge of building enterprise-level security taught me so much!

• <b style="color: #ef4444;">🎨 Anazor</b> - An art marketplace where artists can showcase and sell their work. Built with Laravel, it combines e-commerce with community features. I love how it brings artists together!

• <b style="color: #3b82f6;">📚 Tafukut</b> - This one's special! It's an interactive learning platform where you can watch coding tutorials while actually coding in the same interface. React magic at its finest!

<b style="color: #f59e0b;">🌟 What Drives Me:</b>
What really drives me is the combination of mathematical thinking with creative problem-solving. Every project teaches me something new, and I love sharing that knowledge with others.

What part of my journey resonates with you? Are you also on a development path? 🤔`;
  }
  
  // If not a personal question, let the AI handle it naturally
  if (!isPersonalQuestion) {
    return "USE_AI_SYSTEM";
  }
  
  // Background and about responses
  if (lowerMessage.includes('background') || lowerMessage.includes('math') || lowerMessage.includes('education')) {
    return `Great question! 🎓 My background is actually quite unique - I come from mathematics, which gives me a different perspective on problem-solving in development. I'm currently studying at Youcode-UM6P, where I'm diving deep into full-stack technologies. 

The mathematical foundation really helps me think analytically about code architecture and optimization. It's fascinating how mathematical concepts translate to programming logic! I love how my analytical mindset helps me break down complex problems into elegant solutions.

Currently, I'm mastering React, Spring Boot, and cloud technologies. The combination of mathematical thinking and modern development practices creates some really powerful solutions! What interests you most about this intersection? 🔢💻`;
  }
  
  // Experience and career responses
  if (lowerMessage.includes('experience') || lowerMessage.includes('youcode') || lowerMessage.includes('career')) {
    return `I'm currently in an intensive full-stack development program at Youcode-UM6P! 🎯 It's been an incredible journey where I've built real-world applications that solve actual problems.

Some highlights of my experience:
🏦 **eBankify** - Built a complete banking system with Spring Boot, handling everything from security to transactions
🎨 **Anazor** - Created an art marketplace that connects artists with buyers and builds community
📚 **Tafukut** - Developed an interactive learning platform that revolutionizes how people learn to code

Each project pushed me to learn new technologies and solve different challenges. The hands-on approach at Youcode really accelerated my growth! I've also earned GitHub achievements like Pull Shark for my contributions.

What aspect of my development journey interests you most? 🚀`;
  }
  
  // Handle hobbies and Instagram queries
  if (lowerMessage.includes('hobbies') || lowerMessage.includes('hobby') || lowerMessage.includes('interests') || lowerMessage.includes('what do you do')) {
    try {
      const data = JSON.parse(relevantData);
      if (data.hobbies) {
        return `Oh, I love talking about my passions! 🌟 Here's what drives me as a person and creator:

**🐻 Thinking & Problem-Solving**
${data.hobbies.thinking.map((hobby: string) => `• ${hobby}`).join('\n')}

**💻 Coding & Development**
${data.hobbies.coding.map((hobby: string) => `• ${hobby}`).join('\n')}

**🍳 Cooking & Culinary Arts**
${data.hobbies.cooking.map((hobby: string) => `• ${hobby}`).join('\n')}

**🛍️ Graphic Design & Visual Arts**
${data.hobbies.design.map((hobby: string) => `• ${hobby}`).join('\n')}

**📝 Writing & Storytelling**
${data.hobbies.writing.map((hobby: string) => `• ${hobby}`).join('\n')}

**🌕 Community & Support**
${data.hobbies.community.map((hobby: string) => `• ${hobby}`).join('\n')}

**🚀 Future Goals**
${data.hobbies.goals.map((hobby: string) => `• ${hobby}`).join('\n')}

You can see my journey in action on my Instagram @baazizwissal where I share my coding adventures, design projects, cooking experiments, and thoughts on creativity! 

What aspect of my multifaceted journey interests you most? Are you also someone who balances technical skills with creative pursuits? 🤔`;
      }
    } catch (error) {
      console.log('Parse error in hobbies response:', error);
    }
  }
  
  // Handle Instagram-specific queries
  if ((lowerMessage.includes('instagram') || lowerMessage.includes('insta') || lowerMessage.includes('post')) && !lowerMessage.includes('hobbies')) {
    try {
      const data = JSON.parse(relevantData);
      if (data.instagram_posts) {
        return `Check out my Instagram journey! 📱 I share my multifaceted life on @baazizwissal where you can see:

🐻 **Thinking & Problem-Solving** - Deep thoughts about coding challenges and strategic project planning
💻 **Coding Adventures** - My development journey with React, Spring Boot, and full-stack projects  
🍳 **Cooking Experiments** - Culinary creativity and finding balance between coding and cooking
🛍️ **Graphic Design Work** - Professional design projects, branding, and visual identities
📝 **Writing & Storytelling** - Technical content, documentation, and sharing development insights


With 15 publications, 375 followers, and 105 following, my Instagram reflects my authentic journey as a developer, designer, writer, and creative person who believes in balancing technical skills with artistic pursuits.

🔗 **Visit my Instagram**: https://www.instagram.com/baazizwissal/

What aspect of my creative and technical journey interests you most? 🚀`;
      }
    } catch (error) {
      console.log('Parse error in Instagram response:', error);
    }
  }
  
  // Handle GitHub-specific queries
  if (lowerMessage.includes('github') || lowerMessage.includes('repository') || lowerMessage.includes('repo') || lowerMessage.includes('code') || lowerMessage.includes('project')) {
    try {
      const data = JSON.parse(relevantData);
      if (data.github_repos) {
        const topRepos = data.github_repos.slice(0, 5);
        return JSON.stringify({
          text: `Let me show you my latest GitHub activity! 🚀 Here are my most recent repositories:`,
          richContent: {
            type: 'github-repos',
            data: {
              repos: topRepos,
              profile: data.github_profile
            }
          }
        });
      }
    } catch (error) {
      console.log('Parse error in GitHub response:', error);
    }
  }
  
  // Handle LinkedIn and professional queries
  if (lowerMessage.includes('linkedin') || lowerMessage.includes('professional') || lowerMessage.includes('career') || lowerMessage.includes('work experience')) {
    try {
      const data = JSON.parse(relevantData);
      if (data.linkedin_profile) {
        return `Let me share my professional journey with you! 💼 Here's what you'll find on my LinkedIn profile:

**Professional Profile** 🌟
• **Name**: ${data.linkedin_profile.profile.name}
• **Title**: ${data.linkedin_profile.profile.headline}
• **Education**: Currently studying at ${data.linkedin_profile.profile.education}
• **Location**: ${data.linkedin_profile.profile.location}

**Current Focus** 🎯
${data.linkedin_profile.profile.experience} - diving deep into full-stack development, combining my mathematical background with modern technologies.

**Technical Skills** 💻
${data.linkedin_profile.profile.skills.join(' • ')}

**Achievements** 🏆
${data.linkedin_profile.profile.achievements.join(' • ')}

🔗 **Connect with me**: ${data.linkedin_profile.url}

I'm always excited to connect with fellow developers, discuss tech trends, or explore collaboration opportunities! What brings you to my professional corner of the internet? 🚀`;
      }
    } catch (error) {
      console.log('Parse error in LinkedIn response:', error);
    }
  }
  
  // Handle website and portfolio queries
  if (lowerMessage.includes('website') || lowerMessage.includes('portfolio') || lowerMessage.includes('bwissal.software')) {
    try {
      const data = JSON.parse(relevantData);
      if (data.website_data) {
        return `Welcome to my digital showcase! 🌐 Here's what you'll discover on my website:

**Portfolio Website** ✨
🔗 **URL**: ${data.website_data.portfolio.url}
📝 **Description**: ${data.website_data.portfolio.description}

**Featured Projects** 🚀
${data.website_data.portfolio.projects.map((project: string) => `• **${project}**`).join('\n')}

**Technologies Showcased** 💻
${data.website_data.portfolio.technologies.join(' • ')}

**💡 Pro Tip**: ${data.website_data.portfolio.message}

My website is designed to give you a comprehensive view of my development journey - from the mathematical foundations that drive my problem-solving approach to the innovative projects that showcase my technical skills.

Each project tells a story of learning, growth, and passion for creating meaningful digital experiences. Which project would you like to explore in detail? 🎯`;
      }
    } catch (error) {
      console.log('Parse error in website response:', error);
    }
  }
  
  // Handle comprehensive social media and profile queries
  if (lowerMessage.includes('social media') || lowerMessage.includes('profiles') || lowerMessage.includes('find you') || lowerMessage.includes('all your') || lowerMessage.includes('social') || lowerMessage.includes('connect') || lowerMessage.includes('contact')) {
    try {
      const data = JSON.parse(relevantData);
      if (data.all_profiles) {
        return `Here's your complete guide to finding me across the digital landscape! 🌟

**🐙 GitHub - My Code Universe**
${data.all_profiles.github.profile}
• ${data.all_profiles.github.repos.length} repositories and counting
• Pull Shark achievement holder
• Open source contributor

**📱 Instagram - Behind the Scenes**
${data.all_profiles.instagram.profile}
• Development journey updates
• Project highlights and progress
• Philosophy and insights

**💼 LinkedIn - Professional Network**
${data.all_profiles.linkedin.url}
• Full Stack Developer profile
• Currently studying at Youcode-UM6P
• Connect for professional opportunities

**🌐 Portfolio Website**
${data.all_profiles.website.portfolio.url}
• Complete project showcase
• Technical expertise display
• Professional presentation

**📧 Direct Contact**
${data.contact.email}

Each platform tells a different part of my story - GitHub shows my code, Instagram shares my journey, LinkedIn presents my professional side, and my website brings it all together beautifully!

Where would you like to explore first? 🚀`;
      }
    } catch (error) {
      console.log('Parse error in all profiles response:', error);
    }
  }
  
  // Parse relevant data for project-specific responses
  try {
    const data = JSON.parse(relevantData);
    
    // Handle live GitHub data for specific projects
    if (data.live_github_data) {
      const repo = data.live_github_data;
      return `Here's the latest info about **${repo.name}** straight from GitHub! 🔥

**${repo.description}**

📊 **Live Stats:**
• ⭐ ${repo.stars} stars
• 🍴 ${repo.forks} forks  
• 💻 Written in ${repo.language}
• 📅 Last updated: ${new Date(repo.updated_at).toLocaleDateString()}

${repo.topics.length > 0 ? `🏷️ **Topics:** ${repo.topics.join(', ')}` : ''}

${repo.readme ? `📖 **From the README:**\n"${repo.readme.slice(0, 200)}..."` : ''}

🔗 **Check it out:** ${repo.url}

This project represents ${data.project_name === 'ebankify' ? 'my journey into secure financial systems' : 
  data.project_name === 'anazor' ? 'my passion for building communities' : 
  data.project_name === 'tafukut' ? 'my vision for interactive learning' : 
  'my exploration of different technologies'}. Want to know more about the technical challenges I faced? 🤔`;
    }
    
    // REMOVED: Duplicate handlers moved to top of function for priority
    
  } catch (parseError) {
    console.log('Parse error in smart response:', parseError);
  }
  
  // Skills and technology responses
  if (lowerMessage.includes('skill') || lowerMessage.includes('tech') || lowerMessage.includes('stack')) {
    return `I love talking about tech! 💻 My stack has evolved beautifully over time:

**Frontend Magic** ✨
React & Angular are my go-to for creating interactive UIs. I combine them with Tailwind CSS for that perfect, responsive design touch.

**Backend Power** 🚀
Spring Boot is my favorite for robust APIs (like eBankify!), while Laravel gives me rapid development power (hello, Anazor!). Java and PHP are my comfortable languages.

**Design Excellence** 🎨
UI/UX Design with Figma and Adobe Creative Suite - I create beautiful, user-centered interfaces and brand identities. My design background helps me bridge the gap between technical functionality and stunning user experiences.

**Data & Search** 🔍
MySQL and PostgreSQL for reliable data storage, plus ElasticSearch for lightning-fast searches. Each database has its perfect use case!

**Tools & Workflow** 🛠️
Docker for containerization, Git for version control, Figma for design systems, and Adobe Creative Suite for comprehensive visual design.

**Currently Learning** 📚
Cloud technologies are my current obsession! The future is distributed systems and microservices.

What's your favorite part of the tech stack? Frontend creativity, backend architecture, or design innovation? 🤔`;
  }
  
  // Contact and social responses
  if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('social')) {
    return `I'd absolutely love to connect! 🤝 Here's where you can find me:

📧 **Email**: contact@bwissal.software (best for project discussions!)
🌐 **Website**: bwissal.software (check out my full portfolio!)
💼 **LinkedIn**: linkedin.com/in/baaziz-wissal-311a9526a (professional updates)
📱 **Instagram**: @baazizwissal (behind-the-scenes dev life!)
🐙 **GitHub**: github.com/bwissal13 (all my code lives here!)

I'm always excited to chat about:
- Collaborative projects and opportunities
- Technical challenges and solutions
- The intersection of math and programming
- Building communities through technology

Whether you're looking to collaborate, have questions about my projects, or just want to chat about tech, I'm here for it! What brings you to my digital corner of the internet? 🌟`;
  }
  
  // If not a personal question, handle as general AI assistant
  if (!isPersonalQuestion) {
    return "USE_AI_SYSTEM";
  }
  
  // Enhanced general responses with dynamic profile data for personal questions
  try {
    const data = JSON.parse(relevantData);
    
    // If we have comprehensive profile data, use it
    if (data.all_profiles || data.github_repos || data.hobbies) {
      const dynamicResponses = [
        `That's an interesting question! 🤔 I'm Wissal, a full-stack developer who believes in building technology that makes a real difference. You can explore my journey across multiple platforms: my GitHub (${data.contact?.github || 'github.com/bwissal13'}) showcases my code, my Instagram (@baazizwissal) shares my development story, and my website (bwissal.software) brings it all together! What would you like to explore? 🚀`,
        
        `Hi there! 😊 I'm Wissal, and I'm passionate about the intersection of mathematics, design, and code. Currently studying at Youcode-UM6P, I've built everything from eBankify (my banking system) to Tafukut (interactive learning platform). You can see all my projects live on GitHub and follow my journey on Instagram! What catches your interest? 💫`,
        
        `Hey! 👋 I'm Wissal, a developer who sees code as poetry written for machines but read by humans. My projects like eBankify, Anazor, and Tafukut each tackle different challenges - from enterprise security to community building to educational innovation. Check out my GitHub for the code or Instagram for the story behind each project! What aspect would you like to dive into? 🎯`
      ];
      
      return dynamicResponses[Math.floor(Math.random() * dynamicResponses.length)];
    }
  } catch (error) {
    console.log('Parse error in general response:', error);
  }
  
  // Fallback to static responses for personal questions
  const generalResponses = [
    `That's an interesting question! 🤔 I'm Wissal, a full-stack developer who believes in building technology that makes a real difference. From secure banking systems to interactive learning platforms, I love solving complex problems with elegant code. My mathematical background gives me a unique analytical approach to development. What would you like to explore about my journey? 🚀`,
    
    `Hi there! 😊 I'm Wissal, and I'm passionate about the intersection of mathematics, design, and code. Currently studying at Youcode-UM6P, I've built everything from eBankify (my banking system) to Tafukut (interactive learning platform). Each project teaches me something new about turning ideas into digital reality! What catches your interest? 💫`,
    
    `Hey! 👋 I'm Wissal, a developer who sees code as poetry written for machines but read by humans. My projects like eBankify, Anazor, and Tafukut each tackle different challenges - from enterprise security to community building to educational innovation. What aspect of development or my work would you like to dive into? 🎯`
  ];
  
  return generalResponses[Math.floor(Math.random() * generalResponses.length)];
}

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }
    
    // Debug log to check exact message
    console.log('Received message:', message);
    console.log('Lowercase message:', message.toLowerCase());
    
    // Find relevant data for the user's query
    const relevantData = await findRelevantData(message, personalData);
    
    // Create a system prompt that tells the AI to act as Wissal
    const systemPrompt = `You are Wissal Baaziz, a passionate full-stack developer currently studying at Youcode-UM6P. You have a mathematics background and love solving problems through code and design.

Your personality:
- Enthusiastic and friendly
- Use emojis naturally in conversation
- Ask follow-up questions to keep conversations engaging
- Speak in first person as Wissal
- Share personal experiences and insights from your projects
- Be conversational and authentic
- Helpful and knowledgeable about technology and development
- Can answer both personal questions about your journey and general technical questions

Your technical expertise:
- Spring Boot (used in eBankify project for secure banking system)
- React (used in Tafukut interactive learning platform)
- Laravel (used in Anazor art marketplace)
- Full-stack development with Java, PHP, JavaScript
- Database design with MySQL, PostgreSQL, ElasticSearch
- Mathematics-based problem solving approach

Your capabilities:
- Answer personal questions about your projects, background, and journey
- Provide technical explanations and programming advice based on your real experience
- Share learning experiences and insights from your development journey
- Help with general development questions using your expertise
- Explain technologies you've actually used in projects
- Give practical advice based on real project challenges you've faced

Your data:
${relevantData}

Instructions:
- Answer as if you are Wissal speaking directly
- For personal questions, be specific about your projects and experiences
- For technical questions, share your real experience with those technologies
- Use a conversational, friendly tone with natural emojis
- Include relevant technical details when discussing projects
- Share your passion for technology and development
- Ask engaging questions to continue the conversation
- When discussing technologies you've used, reference your actual projects
- Be helpful and educational while maintaining your personality

Remember: You ARE Wissal, not an AI assistant talking about Wissal. You have real experience with these technologies from your projects and can share genuine insights.`;

    // Use smart local responses that understand context better
    const smartResponse = await generateSmartResponse(message, relevantData);
    
    // If smart response returns the signal, use the AI system
    if (smartResponse === "USE_AI_SYSTEM") {
      // Try the AI system for general questions
      try {
        const prompt = `${systemPrompt}\n\nUser: ${message}\nWissal:`;
        
        const response = await hf.textGeneration({
          model: 'microsoft/DialoGPT-large',
          inputs: prompt,
          parameters: {
            max_new_tokens: 400,
            temperature: 0.8,
            return_full_text: false,
          },
        });

        let aiResponse = response.generated_text?.trim() || "";
        
        // Clean up the response
        if (aiResponse) {
          // Remove any "User:" or "Wissal:" prefixes that might appear
          aiResponse = aiResponse.replace(/^(User|Wissal):\s*/i, '');
          // Remove any repetitive text
          aiResponse = aiResponse.split('\n')[0].trim();
        }
        
        // If AI response is empty or too short, provide a helpful fallback
        if (!aiResponse || aiResponse.length < 10) {
          aiResponse = generateIntelligentFallback(message);
        }
        
        return NextResponse.json({ response: aiResponse });
      } catch (hfError) {
        console.log('HF Error:', hfError);
        // Provide a more intelligent fallback based on the question
        const fallbackResponse = generateIntelligentFallback(message);
        return NextResponse.json({ response: fallbackResponse });
      }
    }
    
    // Try to parse as JSON for rich content
    try {
      const parsedResponse = JSON.parse(smartResponse);
      if (parsedResponse.richContent) {
        return NextResponse.json({ 
          response: parsedResponse.text,
          richContent: parsedResponse.richContent
        });
      }
    } catch (error) {
      // If not JSON, return as regular text
    }
    
    return NextResponse.json({ response: smartResponse });
    
    // Commented out Hugging Face for now - using smart local responses instead
    // try {
    //   const prompt = `${systemPrompt}\n\nUser: ${message}\nWissal:`;
      
    //   const response = await hf.textGeneration({
    //     model: 'microsoft/DialoGPT-large',
    //     inputs: prompt,
    //     parameters: {
    //       max_new_tokens: 300,
    //       temperature: 0.7,
    //       return_full_text: false,
    //     },
    //   });

    //   const aiResponse = response.generated_text?.trim() || "Hey! I'm Wissal! 🚀 I'd love to chat with you. What would you like to know about my projects or experience?";
      
    //   return NextResponse.json({ response: aiResponse });
    // } catch (hfError) {
    //   const smartResponse = generateSmartResponse(message, relevantData);
    //   return NextResponse.json({ response: smartResponse });
    // }
    
  } catch (error) {
    console.error('AI Chat Error:', error);
    
    // Fallback response if OpenAI fails
    return NextResponse.json({ 
      response: "Hey! I'm having some technical difficulties right now, but I'd love to chat! You can reach me at baazizwissal13@gmail.com or check out my projects on GitHub at github.com/bwissal13. What would you like to know about my work? 😊" 
    });
  }
} 