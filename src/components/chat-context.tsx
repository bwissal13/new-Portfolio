"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface ChatContextType {
  isChatCollapsed: boolean;
  isChatFullScreen: boolean;
  setChatCollapsed: (collapsed: boolean) => void;
  setChatFullScreen: (fullScreen: boolean) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isChatCollapsed, setIsChatCollapsed] = useState(false);
  const [isChatFullScreen, setIsChatFullScreen] = useState(false);

  return (
    <ChatContext.Provider value={{
      isChatCollapsed,
      isChatFullScreen,
      setChatCollapsed: setIsChatCollapsed,
      setChatFullScreen: setIsChatFullScreen,
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
} 