
import { motion } from "framer-motion";
import { Book, Rss } from "lucide-react";
import FeatureCard from "@/components/FeatureCard";
import { sectionVariants } from "@/lib/variants";

const FeaturesSection = () => {
  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="grid gap-8 md:grid-cols-2">
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
      </div>
    </motion.section>
  );
};

export default FeaturesSection;
