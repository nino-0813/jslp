"use client"

import { useState } from "react"
import { ProjectCard } from "./project-card"
import { CustomCursor } from "./custom-cursor"
import { useIsMobile } from "@/hooks/use-mobile"
import { works } from "@/lib/works-data"

export function WorksGallery() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const isMobile = useIsMobile()

  return (
    <>
      {!isMobile && <CustomCursor isActive={hoveredId !== null} />}
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-stretch">
          {works.map((work) => (
            <ProjectCard
              key={work.id}
              work={work}
              isHovered={hoveredId === work.id}
              onHoverChange={(hovered) => setHoveredId(hovered ? work.id : null)}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </>
  )
}
