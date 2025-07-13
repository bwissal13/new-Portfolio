"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Maximize, Minimize } from 'lucide-react';
import { AIChat } from '@/components/ai-chat';
import { ConditionalNavigation } from '@/components/conditional-navigation';

function ChatPageContent() {
  const searchParams = useSearchParams();
  const [initialMessage, setInitialMessage] = useState<string>("");
  const [showFullChat, setShowFullChat] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    // Get the initial message from URL parameters
    const message = searchParams.get('message');
    if (message) {
      setInitialMessage(decodeURIComponent(message));
    }
    
    // Show the chat interface after a brief delay for smooth transition
    setTimeout(() => setShowFullChat(true), 500);
  }, [searchParams]);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  // Full-screen mode
  if (isFullScreen) {
    return (
      <div className="min-h-screen bg-background">
        {/* Full-screen toggle button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleFullScreen}
          className="fixed top-6 right-6 z-50 p-3 rounded-lg bg-background/80 backdrop-blur-sm hover:bg-muted/50 transition-colors shadow-md border border-border"
          aria-label="Exit full screen"
        >
          <Minimize className="h-5 w-5" />
        </motion.button>
        {/* Full-screen chat */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="h-screen"
        >
          {showFullChat && (
            <div className="h-full">
              <AIChat 
                isOpen={true} 
                onToggle={() => setShowFullChat(false)}
                initialMessage={initialMessage}
                fullScreen={true}
              />
            </div>
          )}
        </motion.div>
      </div>
    );
  }

  // Normal card mode
  return (
    <div className="min-h-screen bg-background">
      <ConditionalNavigation isChatFullScreen={isFullScreen} />
      {/* Floating expand button under nav when chat is collapsed */}
      {!showFullChat && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowFullChat(true)}
          className="fixed left-6 top-20 z-50 p-3 rounded-lg bg-background/80 backdrop-blur-sm hover:bg-muted/50 transition-colors shadow-md border border-border flex items-center gap-2"
          aria-label="Expand chat"
        >
          <Maximize className="h-5 w-5" />
          <span className="text-sm font-medium">Open Chat</span>
        </motion.button>
      )}
      {/* Enhanced Chat Interface */}
      {showFullChat && (
        <div className="pt-20 px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 mt-12 flex items-center justify-between"
            >
              <div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 text-primary">
                  AI Chat Assistant
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mb-16">
                  Ask me anything about my projects, skills, and experience
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-card border border-border rounded-xl shadow-lg overflow-hidden relative"
              style={{ height: 'calc(100vh - 240px)' }}
            >
              {/* Expand button in top-right of card */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleFullScreen}
                className="absolute top-4 right-4 z-10 p-3 rounded-lg bg-background/80 backdrop-blur-sm hover:bg-muted/50 transition-colors shadow-md border border-border"
                aria-label="Expand to full screen"
              >
                <Maximize className="h-5 w-5" />
              </motion.button>
              <div className="h-full">
                <AIChat 
                  isOpen={true} 
                  onToggle={() => setShowFullChat(false)}
                  initialMessage={initialMessage}
                  fullScreen={true}
                />
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}

export function ChatPageClient() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading chat...</p>
        </div>
      </div>
    }>
      <ChatPageContent />
    </Suspense>
  );
} 