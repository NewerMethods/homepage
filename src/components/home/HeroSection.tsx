
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const HeroSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center pt-10 md:pt-16 flex flex-col items-center"
    >
      <Avatar className="w-32 h-32 mb-8 border-4 border-primary/20 shadow-lg">
        <AvatarImage src="/placeholder.svg" alt="Your Name" />
        <AvatarFallback>YN</AvatarFallback>
      </Avatar>
      <h1 className="text-5xl md:text-7xl font-extrabold font-display bg-clip-text text-transparent bg-gradient-to-r from-primary to-cyan-400 mb-4">
        Your Name
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
        I'm a passionate developer creating modern and responsive web applications. Welcome to my personal space where I share my work, thoughts, and discoveries.
      </p>
    </motion.section>
  );
};

export default HeroSection;
