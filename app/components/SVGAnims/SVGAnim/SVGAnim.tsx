import { m } from "framer-motion"
import { useState } from "react"
import styles from '../svgAnims.module.css'
import { svgContainerAnim } from "../variants"

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