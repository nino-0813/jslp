"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { AntarcticaGlobe } from "./antarctica-globe"
import { Reveal } from "./reveal"
import { whyAntarcticaSections, authorBio, aboutSections } from "@/lib/why-antarctica"

function SectionTimeline({ sections }: { sections: { heading: string; body: string }[] }) {
  return (
    <div className="relative space-y-16 pl-8">
      <div className="absolute left-[3px] top-2 bottom-2 border-l border-dashed border-white/15" />
      {sections.map((section, i) => (
        <Reveal key={section.heading} delay={Math.min(i * 60, 300)} as="section" className="relative">
          <span className="absolute -left-8 top-[9px] w-[7px] h-[7px] rounded-full bg-white/40" />
          <h3 className="text-white font-mono text-sm tracking-[0.2em] uppercase mb-5 pb-4 border-b border-white/10">
            {section.heading}
          </h3>
          <p className="text-white/75 text-base lg:text-lg leading-[2] whitespace-pre-line">{section.body}</p>
        </Reveal>
      ))}
    </div>
  )
}

export function DesktopStory() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [heroSize, setHeroSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const update = () => setHeroSize({ width: el.clientWidth, height: el.clientHeight })
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  return (
    <div className="bg-black">
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <AntarcticaGlobe width={heroSize.width} height={heroSize.height} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
        <div className="relative z-10 text-center px-8">
          <p className="text-white/60 font-mono text-xs tracking-[0.4em] uppercase mb-6">CREFAN PROJECT</p>
          <h1 className="text-white font-mono text-4xl lg:text-5xl tracking-widest uppercase leading-relaxed">
            一人の女性が、南極を目指す
          </h1>
        </div>
        <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-2 text-white/50">
          <span className="font-mono text-[10px] tracking-[0.35em] uppercase">Scroll</span>
          <span className="animate-bounce text-lg leading-none">↓</span>
        </div>
      </section>

      {/* Why Antarctica */}
      <section className="relative">
        <div className="relative h-[70vh] w-full overflow-hidden">
          <img
            src="/jasmine-hokkaido.jpg"
            alt="澤口真里佳"
            className="absolute inset-0 w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-16">
            <div className="container mx-auto max-w-3xl">
              <Reveal>
                <p className="text-white/70 font-mono text-xs tracking-[0.3em] uppercase mb-4">WHY ANTARCTICA</p>
                <h2 className="text-white font-mono text-3xl lg:text-4xl tracking-widest leading-relaxed">
                  なぜ、南極を目指すのか
                </h2>
              </Reveal>
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-3xl px-6 py-20 lg:py-28">
          <SectionTimeline sections={whyAntarcticaSections} />
        </div>
      </section>

      {/* About */}
      <section className="relative border-t border-white/10">
        <div className="relative h-[70vh] w-full overflow-hidden">
          <img
            src="/jasmine-shibuya.jpg"
            alt={authorBio.name}
            className="absolute inset-0 w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-16">
            <div className="container mx-auto max-w-3xl">
              <Reveal>
                <p className="text-white/70 font-mono text-xs tracking-[0.3em] uppercase mb-4">ABOUT</p>
                <h2 className="text-white font-mono text-3xl lg:text-4xl tracking-widest leading-relaxed">
                  {authorBio.name}
                </h2>
              </Reveal>
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-3xl px-6 py-20 lg:py-28">
          <Reveal>
            <p className="text-white/75 text-base lg:text-lg leading-loose whitespace-pre-line mb-20">
              {authorBio.body}
            </p>
          </Reveal>

          <SectionTimeline sections={aboutSections} />
        </div>
      </section>

      {/* Support */}
      <section className="relative border-t border-white/10 py-28 lg:py-36 px-8 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at 50% 30%, rgba(255,255,255,0.08), transparent 60%), #000",
          }}
        />
        <div className="relative z-10 max-w-lg mx-auto text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-2 mb-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <span key={i} className="flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
                  {i < 3 && <span className="w-8 mx-1 border-t border-dashed border-white/25" />}
                </span>
              ))}
            </div>
            <p className="text-white/60 font-mono text-xs tracking-[0.3em] uppercase mb-6">JOIN THE VOYAGE</p>
            <h2 className="text-white font-mono text-3xl lg:text-4xl tracking-widest uppercase leading-relaxed mb-8">
              この航海に、
              <br />
              あなたも乗り込みませんか
            </h2>
            <p className="text-white/70 text-base leading-loose mb-12">
              クレファンは、一人の女性の衝動から始まった小さな航海です。10万円の種から始まり、共感してくれる一人ひとりとの繋がりで大きくなっていきます。あなたも支援者として、この物語に加わってください。
            </p>
            <div className="flex flex-col items-center gap-4">
              <Link
                href="https://donate.stripe.com/dRm14meNs2Tu0ss0rGfrW00"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 rounded-full bg-white text-black font-mono text-xs tracking-[0.25em] uppercase font-medium hover:bg-white/90 transition-colors"
              >
                クレファンを支援する
              </Link>
              <Link
                href="https://note.com/guuzenno_sawady"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 rounded-full border border-white/30 text-white font-mono text-xs tracking-[0.25em] uppercase font-medium hover:border-white/60 hover:bg-white/5 transition-colors"
              >
                noteで記事を読む
              </Link>
              <Link
                href="#"
                className="text-white/50 hover:text-white/80 transition-colors font-mono text-xs tracking-[0.25em] uppercase"
              >
                問い合わせる
              </Link>
              <Link
                href="/tokushoho"
                className="mt-4 text-white/30 hover:text-white/60 transition-colors font-mono text-[10px] tracking-[0.2em] uppercase"
              >
                特定商取引法に基づく表記
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
