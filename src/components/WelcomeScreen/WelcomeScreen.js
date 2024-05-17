import React from 'react';
import { motion } from 'framer-motion';
import s from './WelcomeScreen.module.scss';

export default function WelcomeScreen() {
    const containerVariants = {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
        },
    };
    return (
        <motion.div
            className={s.WelcomeScreen}
            initial='initial'
            animate='animate'
            variants={containerVariants}
            transition={{ duration: 2 }}
        >
            <motion.h1
                className={s.Title}
                initial='initial'
                animate='animate'
                variants={containerVariants}
                transition={{ duration: 2 }}
            > Welcome to the <span>ex-book change!</span></motion.h1>
        </motion.div>
    );
};

