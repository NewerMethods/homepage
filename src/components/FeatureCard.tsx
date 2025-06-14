
import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

const FeatureCard = ({ icon, title, description, href }: FeatureCardProps) => {
  return (
    <Card className="flex flex-col text-center hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="items-center pb-4">
        <div className="bg-primary/10 p-4 rounded-full mb-4 text-primary glow">
          {icon}
        </div>
        <CardTitle className="font-display">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter className="flex-col">
        <Button asChild className="w-full">
          <Link to={href}>
            View Page <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FeatureCard;
