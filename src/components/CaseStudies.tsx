import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const caseStudies = [
  {
    title: "BusEase - Smart Transportation Platform",
    description: "Online bus booking system with real-time seat selection, QR code ticketing, and integrated mobile payment solutions (MoMo/Orange Money).",
    tech: ["Next.js", "Node.js", "MongoDB", "Firebase", "QR Integration"],
    outcomes: [
      "Reduced booking time by 70%",
      "Processed 10,000+ transactions",
      "95% customer satisfaction rate"
    ],
    image: "/placeholder.svg"
  },
  {
    title: "TA Global Health - Multi-Tenant Health System",
    description: "Comprehensive Laravel + React system for managing student health records, trauma tracking, and consultation management across multiple schools.",
    tech: ["Laravel", "React", "MySQL", "Multi-tenancy", "RESTful API"],
    outcomes: [
      "Serving 50+ educational institutions",
      "Managing 15,000+ student records",
      "Streamlined health consultation workflow"
    ],
    image: "/placeholder.svg"
  },
  {
    title: "Eagle Multi Consultation Platform",
    description: "Full-featured online consultancy management system with dual admin/client dashboards, appointment scheduling, and document management.",
    tech: ["Laravel", "React", "PostgreSQL", "Real-time Updates"],
    outcomes: [
      "300+ active consultants",
      "Automated scheduling reduced conflicts by 85%",
      "Improved client response time by 60%"
    ],
    image: "/placeholder.svg"
  }
];

const CaseStudies = () => {
  return (
    <section id="case-studies" className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Case Studies</h2>
          <p className="text-muted-foreground text-lg">Deep dives into my most impactful projects</p>
        </motion.div>

        <div className="space-y-12">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-glow"
            >
              <div className="grid md:grid-cols-2 gap-8 p-8">
                {/* Content */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {study.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {study.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {study.tech.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Outcomes */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
                      Key Outcomes
                    </h4>
                    <ul className="space-y-2">
                      {study.outcomes.map((outcome) => (
                        <li key={outcome} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className="flex items-center gap-2 text-primary hover:gap-3 transition-all">
                    View Full Case Study
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Image */}
                <div className="rounded-xl bg-muted/50 aspect-video flex items-center justify-center">
                  <span className="text-muted-foreground">Project Preview</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
