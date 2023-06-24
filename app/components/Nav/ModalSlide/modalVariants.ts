import type { Variants } from "framer-motion"

const leftSide: Variants = {
    initial: {
        x: -100,
        originX: 'left',
        left: 0,
        zIndex: 100,
    },
    animate: {
        x: 0,
        backdropFilter: 'blur(6px)'
    },
    exit: {
        x: -100,
    },
}

const rightSide: Variants = {
    initial: {
        x: 100,
        originX: 'right',
        right: 0,
    },
    animate: {
        x: 0,
    },
    exit: {
        x: 100,
    },
}

const backdrop: Variants = {
    initial: {
        opacity: 0,
        backdropFilter: 'blur(0)',
    },
    animate: {
        opacity: 1,
        backdropFilter: 'blur(1.5px)',
    },
    exit: {
        opacity: 0,
        backdropFilter: 'blur(0)',
    }
}

export { rightSide, leftSide, backdrop }