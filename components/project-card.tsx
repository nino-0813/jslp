"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import type { Work } from "@/lib/works-data"

interface ProjectCardProps {
  work: Work
  isHovered: boolean
  onHoverChange: (hovered: boolean) => void
  isMobile?: boolean
}

export function ProjectCard({ work, isHovered, onHoverChange, isMobile }: ProjectCardProps) {
  return (
    <Link
      href={`/works/${work.slug}`}
      className={cn(
        "group relative rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden w-full block",
        isMobile ? "cursor-pointer" : "cursor-none",
        "transition-all duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
        "h-[320px] sm:h-[420px] md:h-[600px]",
        isHovered ? "shadow-2xl shadow-white/10" : "opacity-90",
      )}
      onMouseEnter={() => !isMobile && onHoverChange(true)}
      onMouseLeave={() => !isMobile && onHoverChange(false)}
    >
      {/* Thumbnail Image */}
      <div className="absolute inset-0">
        <img
          src={work.thumbnail || "/placeholder.svg"}
          alt={work.title}
          className={cn(
            "w-full h-full object-cover transition-all duration-700",
            isHovered ? "scale-105 grayscale-0 brightness-100" : "grayscale brightness-75",
          )}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 p-4 sm:p-8",
          "transition-all duration-700",
        )}
      >
        {/* Glassmorphic card */}
        <div
          className={cn(
            "relative backdrop-blur-xl bg-black/20 rounded-2xl p-4 sm:p-6 border border-white/10",
            "shadow-2xl",
            "transition-all duration-700 ease-out",
          )}
        >
          <div className="space-y-1 text-left">
            <h3 className="text-white font-mono text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase font-medium leading-relaxed">
              {work.title}
            </h3>
            <p className="text-white/80 font-mono text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase leading-relaxed">
              {work.subtitle}
            </p>
            <div
              className={cn(
                "grid transition-all duration-700 ease-out",
                isHovered || isMobile ? "grid-rows-[1fr] opacity-100 pt-3 mt-3" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden border-t border-white/10">
                <p className="text-white/60 font-mono text-xs leading-relaxed pt-3">{work.summary}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
