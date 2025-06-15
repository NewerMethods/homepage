import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { pageAnimationVariants, sectionVariants } from "@/lib/variants";

const CV = () => {
  const skills = ["React", "TypeScript", "Node.js", "Tailwind CSS", "Vite", "SQL", "Figma"];

  return (
    <motion.div
      variants={pageAnimationVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <header className="mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <PageHeader title="Curriculum Vitae" description="A summary of my professional experience, skills, and education." />
          </div>
          <a href="/cv.pdf" download="cv.pdf" className="shrink-0">
            <Button>
              <Download className="mr-2" />
              Download PDF
            </Button>
          </a>
        </div>
      </header>

      <div className="space-y-12">
        <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
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
        </motion.div>

        <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-xl font-bold">B.Sc. in Computer Science</h3>
              <p className="text-muted-foreground">University of Technology | 2015 - 2019</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
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
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CV;
