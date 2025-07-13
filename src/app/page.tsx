"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Send, User, FolderOpen, Code, Paintbrush, Mail, MessageCircle, Sun, Moon, Download } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

// Custom typewriter hook
function useTypewriter(text: string, speed: number = 100) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return { displayText, isComplete: currentIndex >= text.length };
}

// Background Code Animation Component
function CodeBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [codeElements, setCodeElements] = useState<Array<{
    id: number;
    char: string;
    x: number;
    y: number;
    opacity: number;
    size: number;
  }>>([]);
  const [isMounted, setIsMounted] = useState(false);

  const codeChars = [
    '{', '}', '(', ')', '[', ']', '<', '>', '/', '\\', ';', ':', '=', '+', '-', '*', '%', '&', '|', '!', '?', '@', '#', '$',
    'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'import', 'export', 'async', 'await',
    '01', '10', '11', '00', 'AI', 'ML', 'JS', 'TS', 'CSS', 'HTML', 'API', 'JSON', 'SQL', 'GIT'
  ];

  useEffect(() => {
    setIsMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCodeElements(prev => {
        const newElements = [...prev];
        
        // Add new elements near cursor more frequently
        if (Math.random() < 0.7) {
          const newElement = {
            id: Date.now() + Math.random(),
            char: codeChars[Math.floor(Math.random() * codeChars.length)],
            x: mousePosition.x + (Math.random() - 0.5) * 300,
            y: mousePosition.y + (Math.random() - 0.5) * 300,
            opacity: 0.2 + Math.random() * 0.4,
            size: 10 + Math.random() * 20
          };
          newElements.push(newElement);
        }

        // Add random elements across screen
        if (Math.random() < 0.2) {
          const newElement = {
            id: Date.now() + Math.random(),
            char: codeChars[Math.floor(Math.random() * codeChars.length)],
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            opacity: 0.1 + Math.random() * 0.2,
            size: 8 + Math.random() * 14
          };
          newElements.push(newElement);
        }

        // Remove old elements and update positions
        return newElements
          .filter(el => el.opacity > 0.01)
          .map(el => ({
            ...el,
            y: el.y + 0.3,
            opacity: el.opacity * 0.99
          }))
          .slice(-80); // Keep max 80 elements
      });
    }, 80);

    return () => clearInterval(interval);
  }, [mousePosition, codeChars]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Animated grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Cursor following effect */}
      <div 
        className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl transition-all duration-500 ease-out"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      {/* Floating code elements */}
      {codeElements.map((element) => (
        <motion.div
          key={element.id}
          initial={{ opacity: 0, scale: 0, y: element.y + 20 }}
          animate={{ opacity: element.opacity, scale: 1, y: element.y }}
          className="absolute font-mono text-primary/40 pointer-events-none select-none font-bold"
          style={{
            left: element.x,
            top: element.y,
            fontSize: element.size,
            opacity: element.opacity
          }}
        >
          {element.char}
        </motion.div>
      ))}

      {/* Additional background code elements */}
      {isMounted && (
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`bg-${i}`}
              className="absolute font-mono text-primary/10 pointer-events-none select-none"
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: Math.random() * window.innerHeight,
                opacity: 0
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0.1 + Math.random() * 0.2
              }}
              transition={{
                duration: 30 + Math.random() * 20,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }}
              style={{
                fontSize: 12 + Math.random() * 8
              }}
            >
              {codeChars[Math.floor(Math.random() * codeChars.length)]}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle redirecting to chat page with message
  const handleGoToChat = () => {
    if (inputValue.trim()) {
      const encodedMessage = encodeURIComponent(inputValue);
      router.push(`/chat?message=${encodedMessage}`);
    } else {
      router.push('/chat');
    }
  };

  // Handle CV download
  const handleDownloadCV = () => {
    try {
    const link = document.createElement('a');
    link.href = '/CV_BAAZIZ_FullStack-fr.pdf';
    link.download = 'CV_BAAZIZ_FullStack-fr.pdf';
      link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading CV:', error);
      // Fallback: open in new tab
      window.open('/CV_BAAZIZ_FullStack-fr.pdf', '_blank');
    }
  };
  
  // Typewriter animations - sequential
  const greeting = useTypewriter("Hey, I'm bwissal 👋", 80);
  const portfolio = useTypewriter("AI portfolio", greeting.isComplete ? 120 : 999999); // Only start after greeting is complete

  // Cards for homepage
  const navigationCards = [
    { title: "Chat", icon: MessageCircle, link: "/chat", color: "text-blue-500" },
    { title: "About", icon: User, link: "/about", color: "text-green-500" },
    { title: "Projects", icon: FolderOpen, link: "/projects", color: "text-purple-500" },
    // { title: "Blog", icon: Code, link: "/blog", color: "text-pink-500" },
    // { title: "Craft", icon: Paintbrush, link: "/craft", color: "text-orange-500" },
    { title: "Contact", icon: Mail, link: "/contact", color: "text-red-500" }
  ];

  if (!mounted) {
    return null;
  }

  return (
    <div className="h-screen bg-background overflow-hidden relative">
      {/* Mobile Top Bar: W. left, theme icon right, CV button below */}
      <div className="sm:hidden px-4 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">W.</span>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
        </div>
        <button
          onClick={handleDownloadCV}
          className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-md"
          aria-label="Download CV"
        >
          <Download className="h-4 w-4" />
          <span className="text-sm font-medium">Curriculum Vitae</span>
        </button>
      </div>
      {/* Background Animation */}
      <CodeBackground />
      
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden sm:block fixed top-6 left-52 z-10 text-2xl font-bold text-primary"
      >
        W.
      </motion.div>

      {/* Theme Toggle */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="hidden sm:flex fixed top-6 right-52 z-30 p-2 rounded-lg bg-background/80 backdrop-blur-sm hover:bg-muted/50 transition-colors shadow-md border border-border"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
      </motion.button>

      {/* CV Download Button */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        onClick={handleDownloadCV}
        className="hidden sm:flex fixed top-6 right-6 z-20 items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-md"
        aria-label="Download CV"
      >
        <Download className="h-4 w-4" />
        <span className="text-sm font-medium">Curriculum Vitae</span>
      </motion.button>

      {/* Main Content */}
      <section className="h-full flex flex-col justify-center items-center px-6 relative z-10">
        {/* Main Content */}
        <div className="w-full max-w-6xl mx-auto text-center">
          {/* Greeting with Typewriter Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8"
          >
            <h1 className="text-lg md:text-xl lg:text-2xl font-medium text-primary mb-4 h-8">
              {greeting.displayText}
              {!greeting.isComplete && <span className="animate-pulse">|</span>}
            </h1>
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-primary h-24 md:h-28 lg:h-32">
              {portfolio.displayText}
              {greeting.isComplete && !portfolio.isComplete && <span className="animate-pulse">|</span>}
            </h2>
          </motion.div>

          {/* Input Field */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-16 flex justify-center"
          >
            <div className="relative w-full max-w-lg">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleGoToChat();
                  }
                }}
                placeholder="Ask me anything..."
                className="w-full px-6 py-4 rounded-full border border-border bg-background/80 backdrop-blur-sm text-primary placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
              />
              <button 
                onClick={handleGoToChat}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>

          {/* Navigation Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-4 gap-2 max-w-2xl mx-auto"
          >
            {navigationCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 * index + 0.9 }}
              >
                <NavigationCard
                title={card.title}
                icon={card.icon}
                link={card.link}
                color={card.color}
              />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Navigation Card Component
function NavigationCard({ title, icon: Icon, link, color }: {
  title: string;
  icon: any;
  link: string;
  color: string;
}) {
  return (
    <Link
      href={link}
      className="group block py-3 px-2 rounded-lg bg-background/80 backdrop-blur-sm hover:bg-muted/50 transition-all duration-300 shadow-md hover:shadow-lg border border-border flex flex-col items-center justify-center"
    >
      <div className="text-center space-y-0.5">
        <Icon className={`h-4 w-4 mx-auto ${color} group-hover:text-primary transition-colors`} />
        <div className="text-[10px] font-medium text-muted-foreground group-hover:text-primary transition-colors">
          {title}
        </div>
      </div>
    </Link>
  );
}
