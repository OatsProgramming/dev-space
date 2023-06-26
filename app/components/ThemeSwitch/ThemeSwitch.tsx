'use client'

import { useEffect, useState } from 'react'

export default function ThemeSwitch() {
    const [isLight, setisLight] = useState(false)

    // Manual change
    function toggleTheme() {
        const html = document.documentElement
        html.classList.toggle('lightMode')
        setisLight(!isLight)
    }

    // Auto change (based on system)
    useEffect(() => {
        const html = document.documentElement
        const media = window.matchMedia('(prefers-color-scheme: light)')

        function changeTheme() {
            if (media.matches) {
                html.classList.add('lightMode')
                setisLight(true)
            }
            else {
                html.classList.remove('lightMode')
                setisLight(false)
            }
        }
        changeTheme() // set initial

        media.addEventListener('change', changeTheme)
        return () => {
            media.removeEventListener('change', changeTheme)
        }
    }, [])

    return (
        <div className='svgContainer' onClick={toggleTheme}>
            {isLight ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8.5 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 11a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm5-5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm-11 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9.743-4.036a.5.5 0 1 1-.707-.707.5.5 0 0 1 .707.707zm-7.779 7.779a.5.5 0 1 1-.707-.707.5.5 0 0 1 .707.707zm7.072 0a.5.5 0 1 1 .707-.707.5.5 0 0 1-.707.707zM3.757 4.464a.5.5 0 1 1 .707-.707.5.5 0 0 1-.707.707z" />
                </svg>
            )}
        </div>
    )
}