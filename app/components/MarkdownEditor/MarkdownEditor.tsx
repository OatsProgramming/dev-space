'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './markdownEditor.module.css'
import useUI from '@/app/components/MarkdownEditor/hooks/useUI'
import TextareaProvider from './context/TextareaProvider'
import dynamic from 'next/dynamic'
import mutateFetch from '@/app/utils/fetchers/mutateFetch'
import baseUrl from '@/app/utils/baseUrl'
import styles2 from '@/app/post/components/ActionBar/actionBar.module.css'

import Icon from '../Icon/Icon'
import tools from '@/public/tools'
import AnimationProviderMAX from '../context/AnimationProvider/AnimationProviderMAX'
import { m } from 'framer-motion'
import send from '@/public/send'
import { useRouter } from 'next/navigation'
import notify from '@/lib/toast/toast'


// TODO: add a loading skeleton for this
const MarkdownUI = dynamic(() =>
  import('../MarkdownUI/MarkdownUI')
)

const MarkdownHelper = dynamic(() =>
  import('./MarkdownHelper/MarkdownHelper')
)

export default function MarkdownEditor() {
  const { formData, isPreview, setFormData, setSelectedText } = useUI()
  const [isOpen, setIsOpen] = useState(false)
  const textareadRef = useRef<HTMLTextAreaElement>(null)
  const router = useRouter()

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formData.title || !formData.body) return

    try {
      const res = await notify({
        promise: mutateFetch(`${baseUrl}/api/post`, 'POST', formData),
        type: 'promise',
        messages: {
          pending: 'Creating post...',
          error: 'Failed to create post',
          success: 'Successfully created post! Redirecting...'
        }
      }) as Awaited<ReturnType<typeof mutateFetch<string>>>
   
      const postId = res.data
      router.push(`/post/${postId}`)
    } catch (err) {
      console.error(err)
    }
  }


  return (
    <TextareaProvider textareaRef={textareadRef}>
      <AnimationProviderMAX>
        <m.div
          layout
          layoutDependency={isOpen}
          className={`
            ${styles2['container']}
            ${styles['btnsContainer']}
          `}
        >
          {isOpen ? (
            <MarkdownHelper
              setIsOpen={setIsOpen}
            />
          ) : (
            <div className={styles['initHelpersState']}>
              <button
                onClick={() => setIsOpen(true)}
              >
                Helpers
                <div>
                  <Icon
                    img={tools}
                    alt='Tools icon'
                  />
                </div>
              </button>
              <button onClick={handleSubmit}>
                Submit
                <div>
                  <Icon
                    img={send}
                    alt='Send icon'
                  />
                </div>
              </button>
            </div>
          )}
        </m.div>
      </AnimationProviderMAX>
      <section className={styles['container']}>
        {isPreview ? (
          <MarkdownUI text={formData.title + '\n' + formData.body} />
        ) : (
          <>
            <input
              name='title'
              className={styles['title']}
              placeholder='Top 10 Ways to Optimize Your App With ReactJS'
              value={formData.title.slice(2)}
              onChange={(e) => setFormData({ title: e.target.value })}
              maxLength={120}
            />
            <textarea
              name='body'
              className={styles['body']}
              placeholder="One: providing promises as a prop to a component ``` code block example... ```"
              ref={textareadRef}
              value={formData.body}
              onChange={(e) => setFormData({ body: e.target.value })}
            />
          </>
        )}
      </section>
    </TextareaProvider>
  )
}