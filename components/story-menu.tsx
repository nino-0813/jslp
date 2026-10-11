"use client"

import { useState } from "react"
import Link from "next/link"
import * as Dialog from "@radix-ui/react-dialog"
import { ArrowUpRight, Menu, X } from "lucide-react"

const MENU_ITEMS = [
  {
    label: "南極への航海を応援",
    eyebrow: "SUPPORT THE VOYAGE",
    href: "https://buy.stripe.com/dRm14meNs2Tu0ss0rGfrW00",
  },
  {
    label: "なぜ南極に行きたいのかnote",
    eyebrow: "READ THE STORY",
    href: "https://note.com/guuzenno_sawady/n/n7bf19031d9f2",
  },
  {
    label: "2026年10月 全国行脚",
    eyebrow: "JAPAN TOUR 2026",
    href: "https://jasmine-zenkoku-2026.takulabo.chatgpt.site/",
  },
] as const

export function StoryMenu() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="メニューを開く"
          className="fixed right-[max(1rem,env(safe-area-inset-right))] top-[max(1rem,env(safe-area-inset-top))] z-40 flex size-12 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/65 text-white/80 shadow-[0_8px_28px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-[border-color,background-color,color,transform] duration-300 ease-out hover:border-white/40 hover:bg-black/85 hover:text-white active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black motion-reduce:transition-none md:right-6 md:top-6 md:size-14"
        >
          <Menu aria-hidden="true" className="size-5 md:size-6" strokeWidth={1.5} />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 motion-reduce:animate-none" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-[min(92vw,390px)] flex-col border-l border-white/15 bg-black/95 px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(6rem,calc(env(safe-area-inset-top)+5rem))] shadow-[-24px_0_80px_rgba(0,0,0,0.55)] outline-none data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right data-[state=closed]:duration-200 data-[state=open]:duration-300 motion-reduce:animate-none md:px-9">
          <Dialog.Title className="font-mono text-xs tracking-[0.3em] text-white/50">
            JOURNEY MENU
          </Dialog.Title>
          <Dialog.Description className="mt-3 text-sm leading-relaxed text-white/65">
            南極へ向かう物語の、その先へ。
          </Dialog.Description>

          <nav aria-label="関連リンク" className="mt-10 border-t border-white/15">
            {MENU_ITEMS.map((item, index) => (
              <Dialog.Close asChild key={item.href}>
                <Link
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-24 items-center gap-4 border-b border-white/15 py-5 text-white transition-colors duration-300 hover:bg-white/[0.04] focus-visible:bg-white/[0.04] focus-visible:outline-none motion-reduce:transition-none"
                >
                  <span className="font-mono text-[10px] tabular-nums tracking-[0.2em] text-white/35">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-[9px] tracking-[0.18em] text-white/40">
                      {item.eyebrow}
                    </span>
                    <span className="mt-1.5 block text-sm tracking-[0.06em] text-white/90 md:text-base">
                      {item.label}
                    </span>
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 shrink-0 text-white/40 transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/80 motion-reduce:transition-none"
                    strokeWidth={1.5}
                  />
                </Link>
              </Dialog.Close>
            ))}
          </nav>

          <p className="mt-auto font-mono text-[9px] tracking-[0.24em] text-white/25">CREFUN PROJECT · EPISODE 01</p>

          <Dialog.Close asChild>
            <button
              type="button"
              aria-label="メニューを閉じる"
              className="absolute right-[max(1rem,env(safe-area-inset-right))] top-[max(1rem,env(safe-area-inset-top))] flex size-12 cursor-pointer items-center justify-center rounded-full border border-white/20 text-white/80 transition-[border-color,background-color,color,transform] duration-300 hover:border-white/40 hover:bg-white/5 hover:text-white active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white motion-reduce:transition-none md:right-6 md:top-6 md:size-14"
            >
              <X aria-hidden="true" className="size-5 md:size-6" strokeWidth={1.5} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
