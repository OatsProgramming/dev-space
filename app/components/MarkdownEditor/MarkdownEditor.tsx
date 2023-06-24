'use client'

import { useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism'
import './markdownEditor.css'
import MarkdownUI from './MarkdownHelper/MarkdownHelper'
import useUI from '@/lib/zustand/useUI'

function MarkdownEditor() {
  const { text, isPreview, isDark, setText, setSelectedText } = useUI()
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
      <MarkdownUI textareaRef={textareadRef} />
      <section className='container'>
        {isPreview ? (
          <ReactMarkdown
            children={text}
            className='markdown'
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <SyntaxHighlighter
                    {...props}
                    children={String(children).replace(/\n$/, '')}
                    style={isDark ? vscDarkPlus : prism}
                    language={match[1]}
                    PreTag="div"
                  />
                ) : (
                  <code {...props} className={className}>
                    {children}
                  </code>
                )
              }
            }}
          />
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
