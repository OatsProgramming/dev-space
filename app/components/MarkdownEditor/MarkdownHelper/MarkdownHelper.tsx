'use client'

import { useCallback, useState } from "react";
import useUI from "@/app/components/MarkdownEditor/hooks/useUI";
import dynamic from "next/dynamic";
import { getTextarea } from "../context/TextareaProvider";
import Dropdown from "../../Dropdown/Dropdown";
import styles from './markdownHelper.module.css'

// Dont have a loader for this
const UnsplashDialog = dynamic(() =>
    import("../../UnsplashDialog/UnsplashDialog")
)

export default function MarkdownHelper({ setIsOpen }: {
    setIsOpen: (isOpen: boolean) => void
}) {
    const textarea = getTextarea()
    if (!textarea) return

    const [isUnsplashOpen, setUnsplashOpen] = useState(false)
    const { selectedText, isPreview, setIsPreview, setFormData, setSelectedText } = useUI()

    const headingSizes: MarkdownHelperTypes[] = [
        'heading_1',
        'heading_2',
        'heading_3',
        'heading_4',
        'heading_5',
        'heading_6'
    ]

    const addHelper = useCallback((helper: MarkdownHelperTypes) => {
        const text = selectedText || '_INSERT_TEXT_'
        let helperText: string;
        switch (helper) {
            case 'heading_1':
            case 'heading_2':
            case 'heading_3':
            case 'heading_4':
            case 'heading_5':
            case 'heading_6': {
                const size = Number(helper.charAt(helper.length - 1))
                const headingSize = "#".repeat(size)
                helperText = `\n${headingSize} ${text}\n`
                break;
            }
            case 'italic': {
                helperText = ` *${text}*`
                break;
            }
            case 'bold': {
                helperText = ` **${text}**`
                break;
            }
            case 'code': {
                helperText = " `" + text + "` "
                break;
            }
            case 'codeBlock': {
                helperText = "\n```INSERT_LANGUAGE\n" + text + "\n```\n"
                break;
            }
            case 'quote': {
                helperText = `\n> ${text}`
                break;
            }
            case 'multiQuote': {
                helperText = `\n> ${text}\n> \n> `
                break;
            }
            case 'unorderItem': {
                helperText = `- ${text}`
                break;
            }
            case 'blankLine': {
                helperText = `\n&nbsp;\\${selectedText ? `\n${selectedText}` : ''}`
                break;
            }
            default: {
                throw new Error("Unknown Helper")
            }
        }

        // Place the text at wherever the caret is currently is
        textarea.setRangeText(helperText)

        // To see the preview, setFormData({ body }) for MarkdownUI
        setFormData({ body: textarea.value })

        // Reset selected text
        setSelectedText("")
    }, [selectedText])

    // TODO: make own modal for this...?
    const clearContent = useCallback(() => {
        const clr = confirm("Are you sure you want to delete the entire thing?")
        if (clr) setFormData({ title: '', body: '' })
    }, [])

    return (
        <>
            <div className={styles['toggles']}>
                <button className={`${!isPreview && 'clicked'}`} onPointerDown={() => setIsPreview(!isPreview)}>
                    {isPreview ? 'Edit' : 'Preview'}
                </button>
                <button onPointerDown={clearContent}>
                    Clear
                </button>
                <button onClick={() => setIsOpen(false)}>
                    Close
                </button>
            </div>
            <div className={styles['helpers']}>
                <Dropdown
                    name="Heading Sizes"
                    items={headingSizes}
                    setChange={addHelper}
                />
                <button onPointerDown={() => addHelper('italic')}>
                    Italic
                </button>
                <button onPointerDown={() => addHelper('bold')}>
                    Bold
                </button>
                <button onPointerDown={() => addHelper('code')}>
                    Code
                </button>
                <button onPointerDown={() => addHelper('codeBlock')}>
                    Code Block
                </button>
                <button onPointerDown={() => addHelper('quote')}>
                    Quote
                </button>
                <button onPointerDown={() => addHelper('multiQuote')}>
                    Multi Quote
                </button>
                <button onPointerDown={() => addHelper('unorderItem')}>
                    Unordered Item
                </button>
                <button onPointerDown={() => addHelper('blankLine')}>
                    Blank line
                </button>
                {/* This is set to position: fixed... supposed to be relative to viewport but yet its showing otherwise */}
                {/* Going to use UnsplashDialog directly to try and circumvent the issue */}
                {/* <UnsplashProvider /> */}
                <button onClick={() => setUnsplashOpen(true)}>
                    Find Photos
                </button>
            </div>
            {/* This is fine: wont ever open unless isOpen: true first */}
            {isUnsplashOpen && (
                <UnsplashDialog
                    setIsOpen={setUnsplashOpen}
                />
            )}
        </>
    )
}