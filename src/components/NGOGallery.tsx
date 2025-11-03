import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";

const ngoProjects = [
  {
    title: "Kidefind Youth Development Initiative",
    organization: "Kidefind",
    description: "Empowering youth through technology education and skill development programs. Leading initiatives that bridge the digital divide in underserved communities.",
    image: "/images/ngo/kidefind.jpg",
    role: "Co-Founder & Lead Developer"
  },
  {
    title: "Amkay Foundation Programs",
    organization: "Amkay Foundation",
    description: "Supporting educational initiatives and community development projects. Building platforms that connect donors with impactful causes.",
    image: "/images/ngo/amkay.jpg",
    role: "Technology Advisor"
  },
  {
    title: "TIC Summit 2025",
    organization: "Technology & Innovation Conference",
    description: "Participated in Africa's premier technology summit, showcasing innovative solutions for social impact and sustainable development.",
    image: "/images/ngo/tic-summit.jpg",
    role: "Participant & Speaker"
  },
  {
    title: "Community Tech Workshops",
    organization: "Kidefind",
    description: "Organizing free coding workshops and tech mentorship programs for young developers across Cameroon.",
    image: "/images/ngo/workshop.jpg",
    role: "Workshop Facilitator"
  }
];

const NGOGallery = () => {
  const [selectedProject, setSelectedProject] = useState<typeof ngoProjects[0] | null>(null);

  return (
    <section id="ngo" className="py-20 px-6 bg-gradient-to-b from-background to-card/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">NGO & Impact Work</h2>
          <p className="text-muted-foreground text-lg">
            Using technology for social good and community empowerment
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {ngoProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedProject(project)}
              className="group relative rounded-2xl overflow-hidden border border-border hover:border-primary/50 cursor-pointer transition-all duration-500 hover:shadow-glow aspect-video"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
              <div className="absolute inset-0 bg-muted group-hover:scale-110 transition-transform duration-700" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <p className="text-xs text-primary mb-2">{project.organization}</p>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
              </div>

              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                <ExternalLink className="w-5 h-5" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full rounded-2xl border border-border bg-card p-8"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <p className="text-sm text-primary mb-2">{selectedProject.organization}</p>
                <h3 className="text-3xl font-bold mb-2">{selectedProject.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">Role: {selectedProject.role}</p>
              </div>

              <div className="aspect-video rounded-xl bg-muted mb-6" />

              <p className="text-muted-foreground leading-relaxed">
                {selectedProject.description}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default NGOGallery;
