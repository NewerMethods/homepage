
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center pt-10 md:pt-16"
    >
      <h1 className="text-5xl md:text-7xl font-extrabold font-display bg-clip-text text-transparent bg-gradient-to-r from-primary to-cyan-400 mb-4">
        Your Name
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
        I'm a passionate developer creating modern and responsive web applications. Welcome to my personal space where I share my work, thoughts, and discoveries.
      </p>
      <Button asChild size="lg" className="glow">
        <a href="mailto:your.email@example.com">Get in Touch</a>
      </Button>
    </motion.section>
  );
};

export default HeroSection;
