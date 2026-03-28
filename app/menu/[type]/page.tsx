'use client'

import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { MenuData, MenuCategory } from '@/types/menu'
import { menuService } from '@/lib/services/menuService'

/* ──────────────── helpers ──────────────── */
const fmt = (n: number) =>
  n === 0 ? 'Consultar' : n.toFixed(2).replace('.', ',') + ' €'

/* ──────────────── page component ──────────────── */
export default function MenuPage({ params }: { params: { type: string } }) {
  const isTapas = params.type === 'tapas'
  const label = isTapas ? 'Tapas' : 'Media Ración'

  const [menu, setMenu] = useState<MenuData | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('')
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})
  const navRef = useRef<HTMLElement>(null)

  /* fetch menu data */
  useEffect(() => {
    menuService.getMenu().then(setMenu)
  }, [])

  /* intersection observer for active category highlighting */
  useEffect(() => {
    if (!menu) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveCategory(e.target.id)
        })
      },
      { threshold: 0.2, rootMargin: '-120px 0px -60% 0px' }
    )
    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [menu])

  /* scroll nav pill into view */
  useEffect(() => {
    if (!activeCategory || !navRef.current) return
    const btn = navRef.current.querySelector(`[data-cat="${activeCategory}"]`) as HTMLElement | null
    btn?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [activeCategory])

  if (!menu) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d0d0d]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-amber-200/60 text-sm tracking-widest uppercase">Cargando carta…</p>
        </div>
      </div>
    )
  }

  const sorted = [...menu.categories].sort((a, b) => a.order - b.order)

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white overflow-x-hidden"
         style={{ cursor: 'auto' }}>
      {/* ─── Hero header ─── */}
      <header className="relative pt-12 pb-8 px-6 text-center overflow-hidden">
        {/* decorative blur circles */}
        <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-amber-600/10 blur-[100px] pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-amber-50">
            {menu.barName}
          </h1>
          <div className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/40 bg-amber-500/10">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-sm font-medium text-amber-300 tracking-wider uppercase">
              {label}
            </span>
          </div>
        </motion.div>
        {/* thin separator */}
        <div className="mt-6 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
      </header>

      {/* ─── Sticky category nav ─── */}
      <nav
        ref={navRef}
        className="sticky top-0 z-40 bg-[#0d0d0d]/90 backdrop-blur-md border-b border-white/5"
      >
        <div className="flex gap-1 px-4 py-2.5 overflow-x-auto scrollbar-hide">
          {sorted.map((cat) => (
            <button
              key={cat.id}
              data-cat={`cat-${cat.id}`}
              onClick={() => {
                sectionRefs.current[`cat-${cat.id}`]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
                activeCategory === `cat-${cat.id}`
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/25'
                  : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70'
              }`}
            >
              {cat.icon && <span className="mr-1">{cat.icon}</span>}
              {cat.name}
            </button>
          ))}
        </div>
      </nav>

      {/* ─── Menu sections ─── */}
      <div className="px-5 pb-24 max-w-lg mx-auto">
        {sorted.map((cat, ci) => (
          <section
            key={cat.id}
            id={`cat-${cat.id}`}
            ref={(el) => { sectionRefs.current[`cat-${cat.id}`] = el }}
            className="pt-8"
          >
            {/* category title */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="flex items-center gap-3 mb-5"
            >
              {cat.icon && (
                <span className="text-2xl">{cat.icon}</span>
              )}
              <h2 className="text-xl font-bold text-amber-50 tracking-tight">
                {cat.name}
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-amber-500/30 to-transparent" />
            </motion.div>

            {/* items */}
            <div className="flex flex-col gap-0.5">
              {cat.items
                .sort((a, b) => a.order - b.order)
                .map((item, i) => {
                  const price = isTapas ? item.priceTapa : item.priceMedia
                  // If the item has same price or we're showing "tapas" view, show the tapa price
                  // For medias, show priceMedia unless samePrice
                  const displayPrice = item.samePrice ? item.priceTapa : price

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-20px' }}
                      transition={{ duration: 0.35, delay: i * 0.04 }}
                      className="group flex items-baseline gap-2 py-3 px-2 rounded-lg hover:bg-white/[0.03] transition-colors"
                    >
                      <span className="text-sm text-amber-100/90 leading-snug flex-1">
                        {item.name}
                      </span>
                      {/* dotted leader */}
                      <span className="flex-1 border-b border-dotted border-white/10 min-w-[2rem] self-end mb-1" />
                      <span className={`text-sm font-semibold tracking-wide whitespace-nowrap ${
                        displayPrice === 0
                          ? 'text-amber-400/70 text-xs italic'
                          : 'text-amber-400'
                      }`}>
                        {fmt(displayPrice)}
                      </span>
                    </motion.div>
                  )
                })}
            </div>
          </section>
        ))}
      </div>

      {/* ─── Bottom bar: switch type ─── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-2 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/95 to-transparent pointer-events-none">
        <div className="pointer-events-auto max-w-lg mx-auto">
          <a
            href={isTapas ? '/menu/medias' : '/menu/tapas'}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm font-medium tracking-wide transition-all hover:bg-amber-500/20 hover:border-amber-500/50 active:scale-[0.98]"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            Ver carta de {isTapas ? 'Medias Raciones' : 'Tapas'}
          </a>
        </div>
      </div>

      {/* hide scrollbar in nav */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        /* Override portfolio cursor on menu pages */
        .min-h-screen * { cursor: auto !important; }
      `}</style>
    </div>
  )
}
