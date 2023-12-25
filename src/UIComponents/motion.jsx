import React from 'react'
import { motion } from 'framer-motion'

export default function Motion({ children, item = false, ...props }) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 2,
                delayChildren: 0.1,
            },
        },
    }

    const itemVarients = {
        hidden: { translateX: 5, opacity: 0 },
        visible: {
            translateX: 0,
            opacity: 1,
        }
    };

    let starter = item ? {
        variants: itemVarients,
    } : {
        initial: 'hidden',
        whileInView: 'visible',
        variants: containerVariants,
    }

    return (
        <motion.div
            {...starter}
            {...props}
        >{children}</motion.div >
    )
}
