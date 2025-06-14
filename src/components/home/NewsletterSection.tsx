
import { motion } from "framer-motion";
import SubstackEmbed from "@/components/SubstackEmbed";
import { sectionVariants } from "@/lib/variants";

const NewsletterSection = () => {
  return (
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
  );
};

export default NewsletterSection;
