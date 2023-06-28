'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism'
import useTheme from '@/lib/zustand/useTheme'
import dynamic from 'next/dynamic'
import Loader from '../Loader/Loader'

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

function MarkdownUI({ text }: {
    text: string
}) {
    const { isLight } = useTheme()

    return (
        <section className='container'>
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

export default MarkdownUI
