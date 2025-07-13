"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "./navigation";

export function ConditionalNavigation({ onFullScreenToggle, isChatFullScreen }: { onFullScreenToggle?: () => void; isChatFullScreen?: boolean }) {
  const pathname = usePathname();
  
  // Don't show navigation on homepage, or when chat is expanded/fullscreen
  if (pathname === '/' || (pathname.startsWith('/chat') && isChatFullScreen)) {
    return null;
  }
  
  return <Navigation onFullScreenToggle={onFullScreenToggle} />;
} 