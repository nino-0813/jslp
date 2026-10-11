"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { AntarcticaGlobe } from "./antarctica-globe"

const STRIPE_PAYMENT_URL = "https://buy.stripe.com/dRm14meNs2Tu0ss0rGfrW00"

export function FloatingVoyageCta() {
  const globeContainerRef = useRef<HTMLSpanElement>(null)
  const [globeSize, setGlobeSize] = useState(0)

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
      aria-label="この航海に参加する（Stripeの支払いページを開く）"
      className="group fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-50 flex items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black md:bottom-6 md:right-6 md:gap-3"
    >
      <span className="rounded-full border border-white/20 bg-black/75 px-3 py-2 text-right font-mono text-[9px] leading-relaxed tracking-[0.14em] text-white/80 shadow-[0_0_24px_rgba(255,255,255,0.08)] backdrop-blur-md transition-colors group-hover:border-white/40 group-hover:text-white md:px-4 md:text-[10px]">
        この航海に
        <br />
        参加する
      </span>
      <span
        ref={globeContainerRef}
        aria-hidden="true"
        className="relative block size-20 shrink-0 overflow-hidden rounded-full border border-white/25 bg-black shadow-[0_0_28px_rgba(255,255,255,0.18)] transition-transform duration-300 group-hover:scale-105 group-active:scale-95 md:size-24"
      >
        <span className="absolute inset-0 flex items-center justify-center">
          <AntarcticaGlobe width={globeSize} height={globeSize} />
        </span>
        <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-transparent to-black/20" />
      </span>
    </Link>
  )
}
