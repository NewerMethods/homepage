
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import AboutSection from "@/components/home/AboutSection";
import NewsletterSection from "@/components/home/NewsletterSection";

const Index = () => {
  return (
    <div className="space-y-24 md:space-y-32 mb-16">
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <NewsletterSection />
    </div>
  );
};

export default Index;
