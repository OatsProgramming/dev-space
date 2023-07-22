import { Variants } from "framer-motion";

const container: Variants = {
    initial: {},
    hover: {
        transition: {
            staggerChildren: 0.2,
        }
    }
}

const item: Variants = {
    initial: {
        opacity: 0,
    },
    hover: {
        opacity: [0, 1, 1, 1, 0],
        transition: {
            repeat: Infinity,
            repeatDelay: 1,
            duration: 1,    
        }
    },
}

export { container, item }