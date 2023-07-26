import { useCallback, type RefObject, useEffect, useState } from "react";
import useUI from "@/app/components/MarkdownEditor/hooks/useUI";
import './markdownHelper.css'
import dynamic from "next/dynamic";

// Dont have a loader for this
const UnsplashDialog = dynamic(() =>
    import("../../UnsplashProvider/Dialog/UnsplashDialog")
)

function MarkdownHelper({ textareaRef }: {
    textareaRef: RefObject<HTMLTextAreaElement>
}) {
    const [isOpen, setIsOpen] = useState(false)
    const { selectedText, isDark, isPreview, setIsDark, setIsPreview, setText, setSelectedText } = useUI()

    const addHelper = useCallback((helper: MarkdownHelperTypes) => {
        const textarea = textareaRef.current
        if (!textarea) return
        const text = selectedText || '_INSERT_TEXT_'
        let helperText: string;
        switch (helper) {
            case 'heading1':
            case 'heading2':
            case 'heading3':
            case 'heading4':
            case 'heading5':
            case 'heading6': {
                const size = Number(helper.substring(helper.length - 1, helper.length))
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
                helperText = "\n```[INSERT_LANGUAGE]\n" + text + "\n```\n"
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

        // Set the text
        textarea.setRangeText(helperText)

        // Grab the text (For toggling preview)
        setText(textarea.value)

        // Reset selected text
        setSelectedText("")
    }, [selectedText])

    function toggleTheme() {
        if (isDark) {
            document.body.classList.add('light')
            document.body.classList.remove('dark')
        }
        else {
            document.body.classList.add('dark')
            document.body.classList.remove('light')
        }
        setIsDark(!isDark)
    }

    return (
        <>
            <div className="btns">
                <div className="toggles">
                    <button onPointerDown={toggleTheme}>
                        Toggle Theme
                    </button>
                    <button className={`${!isPreview && 'clicked'}`} onPointerDown={() => setIsPreview(!isPreview)}>
                        {isPreview ? 'Edit' : 'Preview'}
                    </button>
                    <button onPointerDown={() => setText("")}>
                        Clear
                    </button>
                </div>
                <div className="helpers">
                    <select name="heading_size" onPointerDown={(e) => addHelper((e.target as HTMLSelectElement).value as MarkdownHelperTypes)}>
                        <option value="heading1">Heading</option>
                        <option value="heading2">Heading 2</option>
                        <option value="heading3">Heading 3</option>
                        <option value="heading4">Heading 4</option>
                        <option value="heading5">Heading 5</option>
                        <option value="heading6">Heading 6</option>
                    </select>
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
                    <button onClick={() => setIsOpen(true)}>
                        Find Photos
                    </button>
                </div>
            </div>
            {isOpen && (
                <UnsplashDialog
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                />
            )}
        </>
    )
}

export default MarkdownHelper