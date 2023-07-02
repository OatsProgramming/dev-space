'use client'

import { useRef } from "react"
import styles from './nav.module.css'
import { useMotionValueEvent, useScroll } from "framer-motion"

export default function Nav({
  children,
}: {
  children: React.ReactNode
}) {
  const navRef = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()

  // Nav disappear (down) / reappear (up)
  useMotionValueEvent(scrollY, 'velocityChange', (latest) => {
    const upThreshold = -500
    const downThreshold = 500
    const nav = navRef.current
    if (!nav) return

    else if (latest <= upThreshold) {
      nav.style.top = "0px"
    }
    else if (latest >= downThreshold) {
      nav.style.top = ""
    }
  })

  // Backdrop blur
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const nav = navRef.current
    if (!nav) return
    else if (latest > 0) {
      nav.style.backdropFilter = 'blur(15px)'
      nav.style.boxShadow = 'var(--subtleGlow)'
    }
    else {
      nav.style.backdropFilter = 'blur(0px)'
      nav.style.boxShadow = ''
    }
  })

  return (
    <nav ref={navRef} className={styles['nav']}>
      {children}
    </nav>
  )
}