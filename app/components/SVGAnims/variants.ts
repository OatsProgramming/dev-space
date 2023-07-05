import { Variants } from "framer-motion"

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

export { svgContainerAnim, star, bookmark }