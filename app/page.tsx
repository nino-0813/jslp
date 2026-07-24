"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { WorksGallery } from "@/components/works-gallery"

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { label: "PORTFOLIO", href: "#" },
    { label: "PROJECTS", href: "#" },
    { label: "SERVICES", href: "#" },
    { label: "GET IN TOUCH", href: "#" },
  ]

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 sm:px-6 sm:py-6">
        <nav className="flex items-center justify-between gap-4 text-sm font-mono tracking-wider md:justify-center md:gap-8">
          <a href="#" className="text-white hover:text-white/60 transition-colors font-semibold">
            STUDIO PIXEL®
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="text-white hover:text-white/60 transition-colors">
                {link.label}
              </a>
            ))}
            <button className="w-8 h-8 flex items-center justify-center hover:opacity-60 transition-opacity">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="8" height="8" fill="white" />
                <rect x="12" width="8" height="8" fill="white" />
                <rect y="12" width="8" height="8" fill="white" />
                <rect x="12" y="12" width="8" height="8" fill="white" />
              </svg>
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center text-white"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {/* Mobile menu panel */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
            isMenuOpen ? "max-h-80 opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
          }`}
        >
          <div className="flex flex-col items-start gap-1 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="w-full py-3 text-white/90 hover:text-white transition-colors font-mono tracking-wider text-sm border-b border-white/10 last:border-b-0"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* Works Gallery */}
      <main className="md:pt-32 md:pb-16">
        <WorksGallery />
      </main>
    </div>
  )
}
