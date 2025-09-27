'use client'

import { useEffect, useState } from 'react'

// offset: sticky header height
// lead: this is how much earlier the change should happen
export function useScrollSpy(selectors: string[], offset = 80, lead = 120) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    if (!selectors.length) return

    const elements = selectors
      .map((sel) => document.querySelector(sel))
      .filter(Boolean) as HTMLElement[]

    if (!elements.length) return

    const update = () => {
      // chose the last element which top is <= offset + lead
      // it has reached the top of the viewport
      let current: HTMLElement | null = elements[0] ?? null
      for (const el of elements) {
        const top = el.getBoundingClientRect().top
        if (top <= offset + lead) {
          current = el
        } else {
          break
        }
      }
      if (current) setActiveId(`#${current.id}`)
    }

    // first run
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [selectors, offset, lead])

  return activeId
}
