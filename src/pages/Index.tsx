
import { motion } from "framer-motion";
import { Book, Rss, LayoutDashboard } from "lucide-react";
import FeatureCard from "@/components/FeatureCard";
import SubstackEmbed from "@/components/SubstackEmbed";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="space-y-24 md:space-y-32 mb-16">
      {/* Hero Section */}
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

      {/* Features Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="grid gap-8 md:grid-cols-3">
          <FeatureCard
            icon={<Book size={32} />}
            title="My CV"
            description="A detailed look at my professional journey, skills, and accomplishments."
            href="/cv"
          />
          <FeatureCard
            icon={<Rss size={32} />}
            title="Substack"
            description="My thoughts on tech, development, and everything in between."
            href="/substack"
          />
          <FeatureCard
            icon={<LayoutDashboard size={32} />}
            title="Energy Dashboard"
            description="A live dashboard visualizing UK's energy consumption and carbon intensity."
            href="/dashboard"
          />
        </div>
      </motion.section>

      {/* Banner and About Section */}
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

      {/* Substack Embed Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-8">Subscribe to my Substack newsletter to get my latest articles delivered directly to your inbox.</p>
            <SubstackEmbed />
        </div>
      </motion.section>
    </div>
  );
};

export default Index;
