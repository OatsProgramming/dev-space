import { Variants } from "framer-motion";

const container: Variants = {
    initial: {
        scaleY: 0,
        height: 0,
        origin: 'top center',
        right: '2rem',
        scaleX: 0.01,
    },
    animate: {
        scaleY: 1,
        scaleX: 1,
        height: '',
        transition: {
            ease: 'anticipate',
            when: 'beforeChildren',
            staggerChildren: 0.1,
        }
    },
    exit: {
        height: 0,
        right: '',  
        opacity: [1, 0.5],
        scaleX: [1, 0.01],
        scaleY: [1,  1, 0.1, 0],
    },
}

const item: Variants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            ease: 'easeIn'
        }
    },
    exit: {
        opacity: 0,
    }
}

export { container, item }