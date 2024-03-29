'use client'
import { ReactNode, useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

type RevealLeftToRightProps = {
    children: JSX.Element | ReactNode
    width?: 'w-full' | 'w-fit'
}

export default function RevealBottomToTop({children, width = 'w-fit'}: RevealLeftToRightProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    const mainControls = useAnimation()

    useEffect(() => {
        if (isInView) {
            mainControls.start('visible')
        }

    }, [isInView])

    return (
        <div ref={ref} className={`relative overflow-visible ${width}`}>
            <motion.div
                variants={{
                    hidden: {opacity: 0, y: 20},
                    visible: {opacity: 1, y: 0},
                }}
                initial='hidden'
                animate={mainControls}
                transition={{duration: 0.5}}
            >
                {children}
            </motion.div>
        </div>
    )
}