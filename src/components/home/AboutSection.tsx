
import { motion } from "framer-motion";
import { sectionVariants } from "@/lib/variants";

const AboutSection = () => {
  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="order-2 md:order-1 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold font-display">About My Work</h2>
          <p className="text-muted-foreground">
            This website serves as my digital portfolio and blog. It's built with React, Vite, and Tailwind CSS, showcasing my skills in modern web development. The design is clean, responsive, and animated with Framer Motion for a smooth user experience.
          </p>
          <p className="text-muted-foreground">
            Explore my CV, read my articles on Substack, or check out the real-time UK energy dashboard I built. It's a living project, so expect more features and content to come!
          </p>
        </div>
        <div className="order-1 md:order-2">
          <img
            src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1200"
            alt="Developer workspace"
            className="rounded-lg object-cover w-full h-full aspect-[4/3] shadow-lg"
          />
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
