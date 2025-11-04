import { motion } from "framer-motion";
import { GraduationCap, Award, Download } from "lucide-react";

const education = [
  {
    year: "2023 - Present",
    institution: "African Institute of Computer Sciences (IAI- Cameroon)",
    degree: "Bachelor in Software Engineering and DTS ",
    description: "Specialized in full-stack development,  and software architecture."
  },
  {
    year: "2021",
    institution: "Christ The King Comprehensive College Yaounde - Soa",
    degree: "Advanced Level Certificate",
    description: "Focused on Mathematics, Computer Science, and Physics."
  },
   {
    year: "2017",
    institution: "Franky Comprehensive High School - Obili",
    degree: "Ordinary Level Certificate",
    description: "Focused on Mathematics, Computer Science, and Physics."
  }
];

const accomplishments = [
  {
    title: "TIC Summit 2025",
    description: "Helped as an organiser of the Technology and Innovation Summit",
    icon: "🏆"
  },
  {
    title: "Software Engineering Diploma",
    description: "Earned DTS, Bachelor's (Licence), and Engineering Diploma in Computer Science & Software Engineering.",
    icon: "💻"
  },
  {
    title: "Aspire Leaders Program",
    description: "Undergoing the Aspire Leaders Program at Aspire Institute, developing leadership, strategic thinking, and professional growth skills to drive impact and excellence.",
    icon: "⭐"
  },
 {
    title: "TIC Summit Volunteer & Mentor",
    description: "Volunteered for TIC Summit 2025 and 2026, supporting event organization, mentoring young innovators, and facilitating Google Meet mentorship sessions to empower future tech leaders.",
    icon: "🤝"
 },
 {
  title: "Youth Tech & Innovation Activist",
  description: "Actively involved in promoting technology adoption, youth empowerment, and innovation culture through events, workshops, and community initiatives.",
  icon: "💡"
},
{
  title: "LinkedIn Professional Milestone",
  description: "Built a professional LinkedIn network of 500+ industry connections, fostering opportunities, mentorship, and personal development within the global tech ecosystem.",
  icon: "📎"
}, 
{
  title: "AMKAY Association — Youth Development Volunteer",
  description: "Supported youth empowerment and community development activities, contributing to impactful programs that promote education, innovation, and personal growth.",
  icon: "🕊️"
}
];

const Education = () => {
  return (
    <section id="education" className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Education Timeline */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">Education</h2>
            <p className="text-muted-foreground text-lg">My academic journey</p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

            <div className="space-y-12">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative pl-0 md:pl-20"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 top-6 w-4 h-4 rounded-full bg-primary border-4 border-background hidden md:block" />

                  <div className="group rounded-2xl border border-border bg-card p-8 hover:border-primary/50 hover:shadow-glow transition-all duration-500">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <span className="text-sm text-muted-foreground mb-2 block">{edu.year}</span>
                        <h3 className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {edu.degree}
                        </h3>
                        <p className="text-lg text-muted-foreground mb-3">{edu.institution}</p>
                        <p className="text-muted-foreground leading-relaxed">{edu.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Accomplishments */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">Accomplishments</h2>
            <p className="text-muted-foreground text-lg">Achievements and certifications</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {accomplishments.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group rounded-2xl border border-border bg-card p-6 hover:border-primary/50 hover:shadow-glow hover:-translate-y-2 transition-all duration-500"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Download CV Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <a
              href="/files/ryan-erick-cv.pdf"
              download
              className="group flex items-center gap-3 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-medium hover:shadow-glow-lg transition-all duration-300 hover:scale-105"
            >
              <Download className="w-5 h-5 group-hover:animate-bounce" />
              Download CV
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;
