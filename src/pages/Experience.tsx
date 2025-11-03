import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const experiences = [
  {
    company: "TIC Foundation",
    role: "Full-Stack Developer",
    location: "Cameroon",
    period: "2022 - Present",
    description: "Leading development of digital solutions for educational and community-focused initiatives. Responsible for full-stack development, UI/UX design, and technical architecture decisions.",
    achievements: [
      "Developed and deployed multiple web applications serving 1000+ users",
      "Implemented responsive design systems improving user engagement by 40%",
      "Led technical workshops and mentored junior developers",
      "Integrated payment systems and real-time features"
    ],
    technologies: ["React", "Node.js", "MongoDB", "Firebase", "Tailwind CSS"]
  },
  {
    company: "Hydra Company",
    role: "Software Engineer",
    location: "Cameroon",
    period: "2021 - 2022",
    description: "Contributed to enterprise-level software solutions, focusing on backend development and API integration. Worked on scalable systems and database optimization.",
    achievements: [
      "Built RESTful APIs handling 10,000+ daily requests",
      "Optimized database queries reducing response time by 60%",
      "Implemented automated testing increasing code coverage to 85%",
      "Collaborated with cross-functional teams on product development"
    ],
    technologies: ["PHP", "Laravel", "MySQL", "React", "Bootstrap"]
  }
];

const Experience = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto max-w-7xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl lg:text-6xl font-bold mb-4">Professional Experience</h1>
          <p className="text-xl text-muted-foreground mb-16">
            Building innovative solutions and leading development initiatives
          </p>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="rounded-2xl border border-border bg-card p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-glow"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{exp.role}</h2>
                    <h3 className="text-xl text-primary mb-4">{exp.company}</h3>
                  </div>
                  <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {exp.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Key Achievements
                  </h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1">▸</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Skills Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16"
          >
            <div className="rounded-2xl border border-border bg-card p-8">
              <h2 className="text-2xl font-semibold mb-6">Professional Skills</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 text-primary">Technical Leadership</h3>
                  <p className="text-sm text-muted-foreground">
                    Leading development teams, code reviews, and technical decision-making
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 text-primary">Project Management</h3>
                  <p className="text-sm text-muted-foreground">
                    Agile methodologies, sprint planning, and stakeholder communication
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 text-primary">System Architecture</h3>
                  <p className="text-sm text-muted-foreground">
                    Designing scalable systems, microservices, and API architecture
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 text-primary">Database Design</h3>
                  <p className="text-sm text-muted-foreground">
                    Optimization, schema design, and performance tuning
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 text-primary">DevOps</h3>
                  <p className="text-sm text-muted-foreground">
                    CI/CD pipelines, cloud deployment, and containerization
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 text-primary">Mentorship</h3>
                  <p className="text-sm text-muted-foreground">
                    Training junior developers and conducting technical workshops
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Experience;
