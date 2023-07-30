'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './markdownEditor.module.css'
import useUI from '@/app/components/MarkdownEditor/hooks/useUI'
import MarkdownHelper from './MarkdownHelper/MarkdownHelper'
import TextareaProvider from './context/TextareaProvider'
import dynamic from 'next/dynamic'

// TODO: add a loading skeleton for this
const MarkdownUI = dynamic(() => 
  import('../MarkdownUI/MarkdownUI')
)

export default function MarkdownEditor() {
  const { text, isPreview, setText, setSelectedText } = useUI()
  const textareadRef = useRef<HTMLTextAreaElement>(null)

  // Get selected text (if any)
  // This is to encapsulate the text in markdown syntax
  useEffect(() => {
    const textarea = textareadRef.current
    if (!textarea) return

    function handleSelect() {
      if (!textarea) return
      const selectionStart = textarea.selectionStart;
      const selectionEnd = textarea.selectionEnd;

      const selectedText = textarea.value.substring(selectionStart, selectionEnd)

      setSelectedText(selectedText)
    }

    textarea.addEventListener('selectionchange', handleSelect)
    return () => {
      textarea.removeEventListener('selectionchange', handleSelect)
    }
  }, [textareadRef.current])

  return (
    <TextareaProvider textareaRef={textareadRef}>
      <MarkdownHelper />
      <section className={styles['container']}>
        {isPreview ? (
          <MarkdownUI text={text} />
        ) : (
          <textarea
            className={styles['editing']}
            ref={textareadRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        )}
      </section>
    </TextareaProvider>
  )
}