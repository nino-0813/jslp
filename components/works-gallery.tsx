"use client"

import { useState } from "react"
import { ProjectCard } from "./project-card"
import { CustomCursor } from "./custom-cursor"
import { Reveal } from "./reveal"
import { MobileSwipeGallery } from "./mobile-swipe-gallery"
import { useIsMobile } from "@/hooks/use-mobile"
import { works } from "@/lib/works-data"
import { cn } from "@/lib/utils"

export function WorksGallery() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const isMobile = useIsMobile()

  if (isMobile) {
    return <MobileSwipeGallery />
  }

  return (
    <>
      <CustomCursor isActive={hoveredId !== null} />

      {/* Journey line — 5 waypoints, one voyage */}
      <div className="container mx-auto px-4 sm:px-6 mb-8 sm:mb-12">
        <Reveal className="max-w-2xl mx-auto">
          <div className="flex items-center">
            {works.map((work, i) => (
              <div key={work.id} className="flex items-center flex-1 last:flex-none">
                <span className="relative shrink-0 w-2 h-2 rounded-full bg-white/50">
                  <span className="absolute inset-0 rounded-full bg-white/30 animate-ping [animation-duration:3s]" />
                </span>
                {i < works.length - 1 && (
                  <span className="flex-1 mx-1.5 sm:mx-2 border-t border-dashed border-white/25" />
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-white/30 font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase mt-3">
            5つの物語、ひとつの航海
          </p>
        </Reveal>
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-stretch">
          {works.map((work, i) => (
            <Reveal
              key={work.id}
              delay={i * 120}
              className={cn("md:min-w-[180px]", hoveredId === work.id ? "md:flex-[2]" : "md:flex-[0.8]")}
            >
              <ProjectCard
                work={work}
                isHovered={hoveredId === work.id}
                onHoverChange={(hovered) => setHoveredId(hovered ? work.id : null)}
                isMobile={isMobile}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </>
  )
}
