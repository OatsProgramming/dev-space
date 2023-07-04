import { Variants } from "framer-motion"

const statusAnim: Variants = {
    initial: {
        opacity: 0,
        padding: '1rem',
        transformOrigin: 'top',
    },
    animate: {
        opacity: 1,
    },
    exit: {
        opacity: 0,
    },
}

export { statusAnim }