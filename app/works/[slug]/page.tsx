import Link from "next/link"
import { notFound } from "next/navigation"
import { works, getWork } from "@/lib/works-data"

export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }))
}

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const work = getWork(slug)

  if (!work) {
    notFound()
  }

  const index = works.findIndex((w) => w.slug === slug)
  const next = works[(index + 1) % works.length]

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 sm:px-6 sm:py-6 bg-gradient-to-b from-black/80 to-transparent">
        <nav className="flex items-center justify-between gap-4 text-sm font-mono tracking-wider">
          <Link href="/" className="text-white hover:text-white/60 transition-colors font-semibold">
            STUDIO PIXEL®
          </Link>
          <Link href="/" className="text-white/70 hover:text-white transition-colors text-xs tracking-widest">
            ← 一覧へ戻る
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <div className="relative h-[50vh] sm:h-[60vh] w-full overflow-hidden">
        <img
          src={work.thumbnail || "/placeholder.svg"}
          alt={work.title}
          className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 pb-8 sm:pb-12">
          <div className="container mx-auto">
            <p className="text-white/70 font-mono text-xs sm:text-sm tracking-[0.25em] uppercase mb-3">
              {work.subtitle}
            </p>
            <h1 className="text-white font-mono text-2xl sm:text-4xl md:text-5xl tracking-widest uppercase font-semibold">
              {work.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 max-w-3xl">
        <p className="text-white/90 text-base sm:text-lg leading-loose sm:leading-loose mb-12 sm:mb-16">
          {work.lead}
        </p>

        <div className="space-y-10 sm:space-y-14">
          {work.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-white font-mono text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 pb-3 border-b border-white/10">
                {section.heading}
              </h2>
              <p className="text-white/70 text-sm sm:text-base leading-loose">{section.body}</p>
            </section>
          ))}
        </div>

        <blockquote className="mt-12 sm:mt-16 border-l-2 border-white/20 pl-4 sm:pl-6 py-2">
          <p className="text-white/80 font-mono text-sm sm:text-base italic leading-relaxed">
            {work.closingQuote}
          </p>
        </blockquote>
      </main>

      {/* Next project */}
      <Link
        href={`/works/${next.slug}`}
        className="group block border-t border-white/10 hover:bg-white/5 transition-colors"
      >
        <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-14 flex items-center justify-between">
          <div>
            <p className="text-white/50 font-mono text-xs tracking-[0.25em] uppercase mb-2">次のストーリー</p>
            <p className="text-white font-mono text-lg sm:text-2xl tracking-widest uppercase">{next.title}</p>
          </div>
          <span className="text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all text-2xl">
            →
          </span>
        </div>
      </Link>
    </div>
  )
}
