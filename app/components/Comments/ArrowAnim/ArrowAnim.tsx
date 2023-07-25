import { m } from "framer-motion"
import AnimationProvider from "../../context/AnimationProvider/AnimationProvider"
import { container, item } from "./variants"

export default function ArrowAnim({ children, isLeft, onClick }: {
    children: React.ReactNode,
    /**
     * For left arrow animations.
     */
    isLeft?: true,
    onClick: () => void
}) {
    const arrows = [1, 2, 3]

    return (
        <AnimationProvider>
            <m.span
                onClick={onClick}
                variants={container}
                initial='initial'
                whileHover='hover'
            >
                {isLeft ? (
                    <>
                        {/* TODO: reverse this animation. Cant figure out how rn. */}
                        {arrows.map(arrow => (
                            <m.span
                                key={arrow}
                                variants={item}
                            >
                                ◃
                            </m.span>
                        ))}
                        &nbsp;
                        {children}
                    </>
                ) : (
                    <>
                        {children}
                        &nbsp;
                        {arrows.map(arrow => (
                            <m.span
                                key={arrow}
                                variants={item}
                            >
                                ▹
                            </m.span>
                        ))}
                    </>
                )}
            </m.span>
        </AnimationProvider>
    )
}