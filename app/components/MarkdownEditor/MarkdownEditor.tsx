'use client'

import { useEffect, useRef } from 'react'
import './markdownEditor.css'
import useUI from '@/lib/zustand/useUI'
import MarkdownHelper from './MarkdownHelper/MarkdownHelper'
import dynamic from 'next/dynamic'
import Loader from '../Loader/Loader'

const MarkdownUI = dynamic(() =>
  import('../MarkdownUI/MarkdownUI'),
  {
    loading: () => (
      <div className='defaultLoader' style={{ height: '80dvh' }}>
        <Loader />
      </div>
    )
  }
)

function MarkdownEditor() {
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
    <>
      <MarkdownHelper textareaRef={textareadRef} />
      <section className='container'>
        {isPreview ? (
          <MarkdownUI text={text} />
        ) : (
          <textarea
            ref={textareadRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        )}
      </section>
    </>
  )
}

export default MarkdownEditor
