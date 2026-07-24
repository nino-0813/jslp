"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { works } from "@/lib/works-data"
import { AntarcticaGlobe } from "./antarctica-globe"

const SLIDE_COUNT = works.length + 1

export function MobileSwipeGallery() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return

    const updateSize = () => setSize({ width: el.clientWidth, height: el.clientHeight })
    updateSize()
    window.addEventListener("resize", updateSize)

    const onScroll = () => {
      const index = Math.round(el.scrollLeft / el.clientWidth)
      setActiveIndex(index)
    }
    el.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      window.removeEventListener("resize", updateSize)
      el.removeEventListener("scroll", onScroll)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0 bg-black">
      <div
        ref={scrollerRef}
        className="flex h-[100dvh] w-screen overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {/* Slide 0 — Antarctica globe */}
        <section className="relative h-[100dvh] w-screen shrink-0 snap-center flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <AntarcticaGlobe width={size.width} height={size.height} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
          <div className="relative z-10 text-center px-8 pointer-events-none">
            <p className="text-white/60 font-mono text-xs tracking-[0.3em] uppercase mb-4">CREFAN PROJECT</p>
            <h1 className="text-white font-mono text-2xl tracking-widest uppercase leading-relaxed [text-wrap:balance]">
              一人の女性が、南極を目指す
            </h1>
          </div>
          <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-2 text-white/50 pointer-events-none">
            <span className="font-mono text-[10px] tracking-[0.35em] uppercase">Swipe to explore</span>
            <span className="animate-bounce-x text-lg leading-none">→</span>
          </div>
        </section>

        {/* Slides 1–5 — the five stories */}
        {works.map((work) => (
          <Link
            key={work.id}
            href={`/works/${work.slug}`}
            className="relative h-[100dvh] w-screen shrink-0 snap-center block"
          >
            <img
              src={work.thumbnail || "/placeholder.svg"}
              alt={work.title}
              className="absolute inset-0 w-full h-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
            <div className="absolute bottom-16 left-0 right-0 px-6">
              <p className="text-white/70 font-mono text-xs tracking-[0.25em] uppercase mb-2">{work.subtitle}</p>
              <h2 className="text-white font-mono text-2xl tracking-widest uppercase mb-3">{work.title}</h2>
              <p className="text-white/60 text-sm leading-relaxed">{work.summary}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Dot progress indicator */}
      <div className="absolute bottom-5 left-0 right-0 flex items-center justify-center gap-2 pointer-events-none">
        {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === activeIndex ? "w-5 bg-white" : "w-1.5 bg-white/30",
            )}
          />
        ))}
      </div>
    </div>
  )
}
