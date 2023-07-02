import type { Variants } from "framer-motion"

const container: Variants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    },
    exit: {
        opacity: 0,
    }
}

const item = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1
    },
}

export { container, item } 