import { Variants } from "framer-motion"

const statusAnim: Variants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        margin: '0.5rem 0'
    },
    exit: {
        opacity: 0,
    },
}

export { statusAnim }