import { Variants } from "framer-motion";

// Note to self: READ YOUR NOTES (notebook)
const container: Variants = {
    // x & y suggested; not top left bottom right
    initial: {
        y: 100,
    },
    animate: {
        y: -64, // compensate for initial bottom (check css module)
    },
    exit: {
        y: 100,
        transition: {
            ease: 'backIn'
        }
    }
}

const svgContainerAnim: Variants = {
    hover: {
        scale: 0.95,
    },
    tap: {
        scale: 0.85,
    }
}

const star: Variants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: [0, 1, 1, 1, 0],
        rotate: [0, 360],
        y: [0, -100, -100, -100, -120],
    }
}

const bookmark: Variants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
    }
}

const modalContainer: Variants = {
    initial: {
        opacity: 0,
        transformOrigin: 'bottom center',
        scaleY: 0,
    },
    animate: {
        opacity: 1,
        scaleY: 1,
        transition: {
            when: 'beforeChildren',
            staggerChildren: 0.1
        }
    },
    // This will do for now
    exit: {
        opacity: 0,
        // scaleY: 0,
        transition: {
            duration: 0.2,
        }
    }
}

// There is no exit animations available to stagger (?)
const modalItems: Variants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
    }
}

export { container, svgContainerAnim, star, bookmark, modalContainer, modalItems }