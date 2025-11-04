import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const experiences = [
 {
    company: "TIC Foundation",
    role: "Full-Stack Developer Intern",
    location: "Cameroon",
    period: "2022 - Present",
    description: "Working on digital solutions for educational and community initiatives. Responsible for full-stack development, UI/UX design, and implementing key features.",
    achievements: [
      "Built web applications for community projects",
      "Created responsive and user-friendly interfaces",
      "Assisted in mentoring junior developers",
      "Implemented basic database and real-time features"
    ],
    technologies: ["React", "Node.js", "MongoDB", "Firebase", "Tailwind CSS"]
},
{
  company: "Hydra",
  role: "Software Development Intern",
  location: "Cameroon",
  period: "2023",
  description: "Contributed to software development projects and supported the technical team in coding and testing tasks.",
  achievements: [
    "Developed simple modules and features",
    "Assisted in testing and debugging code",
    "Collaborated with team members on projects"
  ],
  technologies: ["JavaScript", "HTML", "CSS", "PHP"]
},
{
  company: "Codeva Technology",
  role: "Software Development Intern",
  location: "Cameroon",
  period: "2023",
  description: "Supported development of web projects, learning best practices and coding standards in a professional environment.",
  achievements: [
    "Worked on small web development tasks",
    "Assisted in front-end and back-end implementation",
    "Participated in team code reviews"
  ],
  technologies: ["React", "Node.js", "MySQL", "CSS"]
},
{
  company: "Ryans and Sons",
  role: "Project Lead — Project EAGLE",
  location: "Cameroon",
  period: "2023 - Present",
  description: "Leading Project EAGLE, focusing on team collaboration, code management, and delivering secure software solutions.",
  achievements: [
    "Managed code access and team branches",
    "Structured project repositories and database",
    "Coordinated team development tasks",
    "Ensured secure coding practices"
  ],
  technologies: ["Git", "PHP", "MySQL", "JavaScript"]
},
{
  company: "TIC Foundation",
  role: "TIC Summit Volunteer & Mentor",
  location: "Cameroon",
  period: "2025 - 2026",
  description: "Supported the TIC Summit events by volunteering on-site and mentoring participants online via Google Meet and other platforms.",
  achievements: [
    "Assisted with event logistics and setup",
    "Guided and mentored participants during sessions",
    "Managed virtual sessions and provided technical support",
    "Ensured smooth coordination between speakers and attendees"
  ],
  technologies: ["Google Meet", "Microsoft Office", "Zoom"]
},
{
  company: "Kidefind",
  role: "Partnership Coordinator",
  location: "Cameroon",
  period: "2022 - Present",
  description: "Responsible for developing and managing partnerships to support youth-focused initiatives and community programs.",
  achievements: [
    "Established partnerships with local organizations and stakeholders",
    "Contributed to initiatives helping more than two orphanages",
    "Coordinated collaboration efforts for community projects",
    "Supported event planning and outreach programs"
  ],
  technologies: ["Microsoft Office", "Google Workspace"]
},
{
  company: "Amkay",
  role: "Volunteer / Team Member",
  location: "Cameroon",
  period: "2022 - Present",
  description: "Participated in community development and youth empowerment initiatives organized by the Amkay association.",
  achievements: [
    "Assisted in organizing youth development events",
    "Provided support for outreach and mentoring programs",
    "Helped coordinate community service projects",
    "Collaborated with team members to achieve project goals"
  ],
  technologies: ["Microsoft Office", "Google Workspace"]
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
