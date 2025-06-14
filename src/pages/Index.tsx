
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Twitter } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center min-h-full text-center"
    >
      <div className="relative mb-8">
        <img
          src="/placeholder.svg" // Replace with your image
          alt="Your Name"
          className="w-40 h-40 rounded-full object-cover border-4 border-primary glow"
        />
      </div>
      <h1 className="text-5xl md:text-7xl font-extrabold font-display bg-clip-text text-transparent bg-gradient-to-r from-primary to-cyan-400 mb-4">
        Your Name
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
        I'm a passionate developer creating modern and responsive web applications. Welcome to my personal space where I share my work, thoughts, and discoveries.
      </p>
      <div className="flex gap-4 mb-8">
        <Button asChild variant="default" size="lg" className="glow">
          <Link to="/cv">View My CV</Link>
        </Button>
        <Button asChild variant="secondary" size="lg">
          <a href="mailto:your.email@example.com">Get in Touch</a>
        </Button>
      </div>
      <div className="flex gap-6">
        <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Github size={24} /></a>
        <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin size={24} /></a>
        <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Twitter size={24} /></a>
      </div>
    </motion.div>
  );
};

export default Index;
