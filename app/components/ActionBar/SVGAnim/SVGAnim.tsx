import { m } from "framer-motion"
import { useState } from "react"
import { svgContainerAnim } from "../variants"
import styles from '../actionBar.module.css'

/**
 * To localize "click" state
 * @param param0 
 * @returns 
 */
export default function SVGAnim({ elements }: {
    elements: {
        clicked: React.ReactElement,
        notClicked: React.ReactElement,
        animated?: React.ReactElement

    }
}) {
    const { clicked, notClicked, animated } = elements
    const [isClicked, setIsClicked] = useState(false)
    return (
        <m.div
            className={styles['svgContainer']}
            variants={svgContainerAnim}
            whileHover='hover'
            whileTap='tap'
            onClick={() => setIsClicked(!isClicked)}
        >
            {isClicked ? clicked : notClicked}
            {isClicked && animated}
        </m.div>
    )
}