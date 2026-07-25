"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { works } from "@/lib/works-data"
import { AntarcticaGlobe } from "./antarctica-globe"

const SLIDE_COUNT = works.length + 2

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

        {/* Final slide — join the voyage */}
        <section className="relative h-[100dvh] w-screen shrink-0 snap-center flex flex-col items-center justify-center overflow-hidden px-8">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 30%, rgba(255,255,255,0.08), transparent 60%), #000",
            }}
          />

          <div className="relative z-10 flex flex-col items-center text-center max-w-xs">
            <div className="flex items-center gap-2 mb-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <span key={i} className="flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
                  {i < 2 && <span className="w-6 mx-1 border-t border-dashed border-white/25" />}
                </span>
              ))}
            </div>

            <p className="text-white/60 font-mono text-xs tracking-[0.3em] uppercase mb-4">JOIN THE VOYAGE</p>
            <h2 className="text-white font-mono text-2xl tracking-widest uppercase leading-relaxed mb-6 [text-wrap:balance]">
              この航海に、
              <br />
              あなたも乗り込みませんか
            </h2>
            <p className="text-white/70 text-sm leading-loose mb-10">
              クレファンは、一人の女性の衝動から始まった小さな航海です。10万円の種から始まり、共感してくれる一人ひとりとの繋がりで大きくなっていきます。あなたも支援者として、この物語に加わってください。
            </p>

            <Link
              href="#"
              className="w-full py-4 rounded-full bg-white text-black font-mono text-xs tracking-[0.25em] uppercase font-medium hover:bg-white/90 transition-colors"
            >
              クレファンを支援する
            </Link>
            <Link
              href="#"
              className="mt-4 text-white/50 hover:text-white/80 transition-colors font-mono text-xs tracking-[0.25em] uppercase"
            >
              問い合わせる
            </Link>
          </div>
        </section>
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
