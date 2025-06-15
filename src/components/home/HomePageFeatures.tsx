
import FeatureCard from "@/components/FeatureCard";
import { BookUser, Rss, FileText } from "lucide-react";

const features = [
  {
    icon: <BookUser size={28} />,
    title: "CV",
    description: "Discover my professional journey, skills, and experience.",
    href: "/cv",
  },
  {
    icon: <Rss size={28} />,
    title: "Substack",
    description: "Read my thoughts on technology, development, and more.",
    href: "/substack",
  },
  {
    icon: <FileText size={28} />,
    title: "Reports",
    description: "In-depth analysis and reports on the energy sector.",
    href: "/reports",
  },
];

const HomePageFeatures = () => {
  return (
    <section className="text-center">
      <h2 className="text-4xl font-extrabold font-display mb-4">Explore My Work</h2>
      <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
        Here are some of the key sections of my personal site. Feel free to dive in.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            href={feature.href}
          />
        ))}
      </div>
    </section>
  );
};

export default HomePageFeatures;
