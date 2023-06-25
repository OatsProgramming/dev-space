'use client'

import { useRef, useEffect } from "react"
import styles from './nav.module.css'

// Purely for the blur effect...
export default function Nav({
  children,
}: {
  children: React.ReactNode
}) {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    function handleChange(e: Event) {
      const nav = navRef.current
      if (!nav) return 
      else if (window.scrollY > 0) {
        nav.style.backdropFilter = 'blur(5px)'
      }
      else {
        nav.style.backdropFilter = 'blur(0px)'
      }
    }

    window.addEventListener('scroll', handleChange)
    return () => {
      window.removeEventListener('scroll', handleChange)
    }
  }, [navRef])

  return (
    <nav ref={navRef} className={styles['nav']}>
      {children}
    </nav>
  )
}