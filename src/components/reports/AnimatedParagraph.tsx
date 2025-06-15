
import { motion } from 'framer-motion';
import React from 'react';

const paragraphVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const AnimatedParagraph = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.p
      variants={paragraphVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.p>
  );
};
