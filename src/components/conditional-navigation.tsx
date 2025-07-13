"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "./navigation";
import { useChatContext } from "./chat-context";

export function ConditionalNavigation({ onFullScreenToggle }: { onFullScreenToggle?: () => void }) {
  const pathname = usePathname();
  const { isChatCollapsed, isChatFullScreen } = useChatContext();
  
  // Don't show navigation on homepage, or when chat is expanded/fullscreen, or when chat is collapsed
  if (pathname === '/' || (pathname.startsWith('/chat') && (isChatFullScreen || isChatCollapsed))) {
    return null;
  }
  
  return <Navigation onFullScreenToggle={onFullScreenToggle} />;
} 