'use client'

import { useState } from "react"
import styles from './hamburger.module.css'
import ModalSlide from "../ModalSlide/ModalSlide"

export default function Hamburger() {
    const [isOpen, setIsOpen] = useState(false)
    
    return (
        <div className={styles['container']}>
            <div onClick={() => setIsOpen(true)} className='svgContainer' style={{ border: '1px solid $primary'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                </svg>
            </div>
            <ModalSlide isOpen={isOpen} isLeft>
                <div>Hello world</div>
                <button onClick={() => setIsOpen(false)}>
                    Close
                </button>
            </ModalSlide>
        </div>
    )
}