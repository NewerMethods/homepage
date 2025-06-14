
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CV = () => {
  const skills = ["React", "TypeScript", "Node.js", "Tailwind CSS", "Vite", "SQL", "Figma"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className="mb-12">
        <h1 className="text-5xl font-extrabold font-display mb-2">Curriculum Vitae</h1>
        <p className="text-lg text-muted-foreground">A summary of my professional experience, skills, and education.</p>
      </header>

      <div className="space-y-12">
        <Card>
          <CardHeader>
            <CardTitle>Work Experience</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-bold">Senior Frontend Developer</h3>
              <p className="text-muted-foreground">Tech Solutions Inc. | 2022 - Present</p>
              <CardDescription className="mt-2">
                Leading the development of a large-scale e-commerce platform using React and TypeScript. Responsible for architecture, performance optimization, and mentoring junior developers.
              </CardDescription>
            </div>
            <div>
              <h3 className="text-xl font-bold">Software Engineer</h3>
              <p className="text-muted-foreground">Web Innovators | 2019 - 2022</p>
              <CardDescription className="mt-2">
                Developed and maintained client websites and internal tools. Worked across the full stack with a focus on creating engaging user interfaces.
              </CardDescription>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Education</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-xl font-bold">B.Sc. in Computer Science</h3>
            <p className="text-muted-foreground">University of Technology | 2015 - 2019</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <Badge key={skill} variant="secondary" className="text-sm">{skill}</Badge>
            ))}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default CV;
