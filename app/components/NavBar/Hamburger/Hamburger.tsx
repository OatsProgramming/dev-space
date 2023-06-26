'use client'

import { useState } from "react"
import styles from './hamburger.module.css'
import ModalSlide from "../ModalSlide/ModalSlide"
import Link from "next/link"
import postEx from "@/lib/toyData/postEx"
import PostCard from "../../PostCard/PostCard"
import logo from "@/public/logo"

export default function Hamburger() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className={styles['container']}>
            <div onClick={() => setIsOpen(true)} className='svgContainer' style={{ border: '1px solid $primary' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                </svg>
            </div>
            <ModalSlide isOpen={isOpen} setIsOpen={setIsOpen} isLeft>
                <div className={styles['slideContent']}>
                    <div className='logo'>
                        <img 
                            src={logo}
                            alt="logo"
                        />
                    </div>
                    <div onPointerDown={() => setIsOpen(false)} className={styles['close']}>
                        X
                    </div>
                    <Link href='/'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z" />
                        </svg>
                        Home
                    </Link>
                    <Link href='/'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
                        </svg>
                        Following
                    </Link>
                    <Link href='/'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016zm6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
                            <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z" />
                        </svg>
                        Explore
                    </Link>
                    <br />
                    <h1>Your Top Posts</h1>
                    <hr />
                    <br />
                    <div className={styles['posts']}>
                        {postEx.map(post => (
                            <div key={post.id}>
                                <PostCard post={post} />
                            </div>
                        ))}
                    </div>
                    <br />
                    <hr />
                    <br />
                    <footer>
                        © 2023 DevSpace 
                    </footer>
                </div>
            </ModalSlide>
        </div>
    )
}