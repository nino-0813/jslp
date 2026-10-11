"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { AntarcticaGlobe } from "./antarctica-globe"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

const STRIPE_PAYMENT_URL = "https://buy.stripe.com/dRm14meNs2Tu0ss0rGfrW00"

export function FloatingVoyageCta() {
  const globeContainerRef = useRef<HTMLSpanElement>(null)
  const [globeSize, setGlobeSize] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    const hero = document.getElementById("story-hero")
    if (!hero) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(!entry.isIntersecting),
      { threshold: 0.01 },
    )
    observer.observe(hero)

    return () => observer.disconnect()
  }, [isMobile])

  useEffect(() => {
    const element = globeContainerRef.current
    if (!element) return

    const updateSize = () => setGlobeSize(element.clientWidth)
    updateSize()

    const observer = new ResizeObserver(updateSize)
    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <Link
      href={STRIPE_PAYMENT_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="南極への航海を応援する（Stripeの支払いページを開く）"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? undefined : -1}
      className={cn(
        "group fixed bottom-[max(3.5rem,calc(env(safe-area-inset-bottom)+1rem))] right-[max(1rem,env(safe-area-inset-right))] z-50 flex cursor-pointer items-center gap-2 overflow-hidden rounded-full border border-white/20 bg-black/70 p-1.5 pr-3 shadow-[0_12px_40px_rgba(0,0,0,0.55),0_0_24px_rgba(255,255,255,0.08)] backdrop-blur-xl transition-[opacity,border-color,background-color,transform,box-shadow] duration-300 ease-out hover:border-white/40 hover:bg-black/85 hover:shadow-[0_16px_48px_rgba(0,0,0,0.65),0_0_30px_rgba(255,255,255,0.12)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black motion-reduce:transition-none md:bottom-6 md:right-6 md:gap-3 md:p-2 md:pr-4",
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <span
        ref={globeContainerRef}
        aria-hidden="true"
        className="relative block size-14 shrink-0 overflow-hidden rounded-full border border-white/20 bg-black shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-transform duration-300 ease-out group-hover:scale-[1.04] motion-reduce:transition-none md:size-16"
      >
        <span className="absolute inset-0 flex items-center justify-center">
          <AntarcticaGlobe width={globeSize} height={globeSize} revealFadeMs={700} />
        </span>
        <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-transparent to-black/20" />
      </span>
      <span className="min-w-0 text-left font-mono">
        <span className="block text-[8px] tracking-[0.2em] text-white/45 transition-colors duration-300 group-hover:text-white/65 md:text-[9px]">
          SUPPORT THE VOYAGE
        </span>
        <span className="mt-0.5 block whitespace-nowrap text-[11px] tracking-[0.08em] text-white/90 md:text-xs">
          南極への航海を応援
        </span>
      </span>
      <ArrowUpRight
        aria-hidden="true"
        className="size-3.5 shrink-0 text-white/45 transition-[color,transform] duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/80 motion-reduce:transition-none md:size-4"
        strokeWidth={1.5}
      />
    </Link>
  )
}
