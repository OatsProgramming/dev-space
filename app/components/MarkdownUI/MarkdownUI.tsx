'use client'

import remarkGfm from 'remark-gfm'
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism'
import useTheme from '@/app/utils/hooks/useTheme'
import dynamic from 'next/dynamic'
import Loader from '../Loader/Loader'
import styles from './markdownUI.module.css'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

// TODO: skeleton
const SyntaxHighlighter = dynamic(() =>
    import('react-syntax-highlighter/dist/esm/prism'),
    {
        loading: () => (
            <div className='defaultLoader'>
                <Loader />
            </div>
        )
    }
)

export default function MarkdownUI({ text }: {
    text: string
}) {
    const { isLight } = useTheme()

    return (
        <section className='container'>
            <ReactMarkdown
                children={text}
                className={styles['container']}
                remarkPlugins={[remarkGfm]}
                components={{
                    code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                            <SyntaxHighlighter
                                {...props}
                                children={String(children).replace(/\n$/, '')}
                                style={isLight ? vs : vscDarkPlus}
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
        </section>
    )
}