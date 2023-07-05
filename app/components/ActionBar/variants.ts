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

export { container, modalContainer, modalItems }