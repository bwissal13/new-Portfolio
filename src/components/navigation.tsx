"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon, Minimize2, Download } from "lucide-react";
import { useEffect, useState } from "react";

interface NavigationProps {
  onFullScreenToggle?: () => void;
  handleDownloadCV?: () => void;
}

export function Navigation({ onFullScreenToggle, handleDownloadCV }: NavigationProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/20">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: W. logo (desktop) */}
        <div className="hidden sm:block">
          <Link 
            href="/" 
            className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors"
          >
            W.
          </Link>
        </div>
        {/* Right: nav links and theme/fullscreen icons (desktop) */}
        <div className="hidden sm:flex items-center gap-4">
          <Link 
            href="/about" 
            className="text-base text-muted-foreground hover:text-primary transition-colors"
          >
            About
          </Link>
          <Link 
            href="/projects" 
            className="text-base text-muted-foreground hover:text-primary transition-colors"
          >
            Projects
          </Link>
          <Link 
            href="/chat" 
            className="text-base text-muted-foreground hover:text-primary transition-colors"
          >
            Chat
          </Link>
          <Link 
            href="/contact" 
            className="text-base text-muted-foreground hover:text-primary transition-colors"
          >
            Contact
          </Link>
          {handleDownloadCV && (
            <button
              onClick={handleDownloadCV}
              className="hidden sm:flex p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Download CV"
            >
              <Download className="h-4 w-4" />
              <span className="text-sm font-medium">Curriculum Vitae</span>
            </button>
          )}
          {onFullScreenToggle && (
            <button
              onClick={onFullScreenToggle}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle fullscreen"
              style={{ margin: 0 }}
            >
              <Minimize2 className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
        </div>
        {/* Center: W. logo (mobile only) */}
        <div className="flex-1 flex sm:hidden justify-center">
          <Link 
            href="/" 
            className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors"
          >
            W.
          </Link>
        </div>
      </div>
      {/* Mobile nav links: horizontal row under logo */}
      <div className="flex sm:hidden flex-row items-center justify-center gap-5 mt-1 pb-2">
        <Link 
          href="/about" 
          className="text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          About
        </Link>
        <Link 
          href="/projects" 
          className="text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          Projects
        </Link>
        <Link 
          href="/chat" 
          className="text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          Chat
        </Link>
        <Link 
          href="/contact" 
          className="text-xs text-muted-foreground hover:text-primary transition-colors mr-6"
        >
          Contact
        </Link>
        {handleDownloadCV && (
          <button
            onClick={handleDownloadCV}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Download CV"
          >
            <Download className="h-4 w-4" />
            <span className="text-sm font-medium">Curriculum Vitae</span>
          </button>
        )}
      </div>
    </nav>
  );
} 