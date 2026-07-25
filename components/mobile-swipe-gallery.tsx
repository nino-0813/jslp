"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { AntarcticaGlobe } from "./antarctica-globe"
import { Reveal } from "./reveal"
import { whyAntarcticaSections, whyAntarcticaClosing, authorBio } from "@/lib/why-antarctica"

const SLIDE_COUNT = 3

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
        {/* Slide 1 — Top: Antarctica globe */}
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

        {/* Slide 2 — Why Antarctica: the full story (internally scrolls vertically) */}
        <section className="relative h-[100dvh] w-screen shrink-0 snap-center overflow-y-auto overflow-x-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="min-h-full px-6 pt-24 pb-20">
            <Reveal>
              <p className="text-white/50 font-mono text-xs tracking-[0.3em] uppercase mb-3">WHY ANTARCTICA</p>
              <h1 className="text-white font-mono text-2xl tracking-widest leading-relaxed mb-14 [text-wrap:balance]">
                なぜ、南極を
                <br />
                目指すのか
              </h1>
            </Reveal>

            <div className="relative space-y-14 pl-5">
              <div className="absolute left-[3px] top-2 bottom-2 border-l border-dashed border-white/15" />
              {whyAntarcticaSections.map((section, i) => (
                <Reveal key={section.heading} delay={Math.min(i * 60, 300)} as="section" className="relative">
                  <span className="absolute -left-5 top-[6px] w-[6px] h-[6px] rounded-full bg-white/40" />
                  <h2 className="text-white font-mono text-xs tracking-[0.2em] uppercase mb-4 pb-3 border-b border-white/10">
                    {section.heading}
                  </h2>
                  <p className="text-white/75 text-[15px] leading-[2] whitespace-pre-line">{section.body}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={300}>
              <p className="text-white/85 font-mono text-sm leading-loose whitespace-pre-line mt-16 pt-10 border-t border-white/10">
                {whyAntarcticaClosing}
              </p>
            </Reveal>

            <Reveal delay={400}>
              <div className="mt-14 rounded-2xl bg-white/5 border border-white/10 p-6">
                <p className="text-white font-mono text-sm tracking-widest mb-3">{authorBio.name}</p>
                <p className="text-white/60 text-xs leading-loose whitespace-pre-line">{authorBio.body}</p>
              </div>
            </Reveal>

            <div className="mt-16 flex flex-col items-center gap-2 text-white/40">
              <span className="font-mono text-[10px] tracking-[0.35em] uppercase">Next: Support</span>
              <span className="animate-bounce-x text-lg leading-none">→</span>
            </div>
          </div>
        </section>

        {/* Slide 3 — Support: join the voyage */}
        <section className="relative h-[100dvh] w-screen shrink-0 snap-center flex flex-col items-center justify-center overflow-hidden px-8">
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at 50% 30%, rgba(255,255,255,0.08), transparent 60%), #000",
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
            <Link
              href="/tokushoho"
              className="mt-8 text-white/30 hover:text-white/60 transition-colors font-mono text-[10px] tracking-[0.2em] uppercase"
            >
              特定商取引法に基づく表記
            </Link>
          </div>
        </section>
      </div>

      {/* Dot progress indicator */}
      <div className="absolute bottom-5 left-0 right-0 flex items-center justify-center gap-2 pointer-events-none z-10">
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
