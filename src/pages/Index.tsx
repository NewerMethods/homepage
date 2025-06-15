
import HeroSection from "@/components/home/HeroSection";
import HomePageFeatures from "@/components/home/HomePageFeatures";
import AboutSection from "@/components/home/AboutSection";
import NewsletterSection from "@/components/home/NewsletterSection";

const Index = () => {
  return (
    <div className="space-y-24 md:space-y-32 mb-16">
      <HeroSection />
      <HomePageFeatures />
      <AboutSection />
      <NewsletterSection />
    </div>
  );
};

export default Index;

