import type { Variants } from "framer-motion"

const leftSide: Variants = {
    initial: {
        x: -500,
        originX: 'left',
        left: 0,
        zIndex: 100,
    },
    animate: {
        x: 0,
        backdropFilter: 'blur(15px)'
    },
    exit: {
        x: -500,
    },
}

const rightSide: Variants = {
    initial: {
        x: 500,
        originX: 'right',
        right: 0,
    },
    animate: {
        x: 0,
        backdropFilter: 'blur(15px)'
    },
    exit: {
        x: 500,
    },
}

const backdrop: Variants = {
    initial: {
        opacity: 0,
        backdropFilter: 'blur(0)',
    },
    animate: {
        opacity: 1,
        backdropFilter: 'blur(2px)',
    },
    exit: {
        opacity: 0,
        backdropFilter: 'blur(0)',
    }
}

export { rightSide, leftSide, backdrop }