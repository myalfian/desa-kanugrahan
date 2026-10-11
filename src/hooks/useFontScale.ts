import { useSyncExternalStore } from 'react'

export type FontScale = 'base' | 'lg' | 'xl'
const KEY = 'kanugrahan:font-scale'
const ORDER: FontScale[] = ['base', 'lg', 'xl']

/* Store global mini — semua kontrol (utility bar & drawer) tetap sinkron. */
let current: FontScale = readInitial()
const listeners = new Set<() => void>()

function readInitial(): FontScale {
  if (typeof window === 'undefined') return 'base'
  const saved = localStorage.getItem(KEY) as FontScale | null
  const value = saved && ORDER.includes(saved) ? saved : 'base'
  apply(value)
  return value
}

function apply(value: FontScale) {
  const html = document.documentElement
  if (value === 'base') html.removeAttribute('data-font')
  else html.setAttribute('data-font', value)
}

function set(value: FontScale) {
  current = value
  apply(value)
  localStorage.setItem(KEY, value)
  listeners.forEach((l) => l())
}

const subscribe = (l: () => void) => {
  listeners.add(l)
  return () => {
    listeners.delete(l)
  }
}

/** Pengatur ukuran huruf global (A− / A / A+) — persist di localStorage. */
export function useFontScale() {
  const scale = useSyncExternalStore(subscribe, () => current, () => 'base' as FontScale)
  const step = (dir: 1 | -1) => set(ORDER[Math.min(Math.max(ORDER.indexOf(current) + dir, 0), ORDER.length - 1)])
  return { scale, increase: () => step(1), decrease: () => step(-1), reset: () => set('base') }
}
