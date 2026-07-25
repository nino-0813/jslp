"use client"

import { MobileSwipeGallery } from "./mobile-swipe-gallery"
import { DesktopStory } from "./desktop-story"
import { useIsMobile } from "@/hooks/use-mobile"

export function WorksGallery() {
  const isMobile = useIsMobile()

  if (isMobile) {
    return <MobileSwipeGallery />
  }

  return <DesktopStory />
}
