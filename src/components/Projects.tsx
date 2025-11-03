import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "BusEase",
    description: "Smart transportation solution revolutionizing urban mobility with real-time tracking and seamless payments.",
    tags: ["React", "Node.js", "MongoDB", "GPS API"],
    status: "In Development"
  },
  {
    title: "Portfolio Studio",
    description: "Modern portfolio builder helping creatives showcase their work with stunning, customizable templates.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    status: "Completed"
  },
  {
    title: "Task Flow",
    description: "Minimalist task management app designed for focus and productivity in a distraction-free environment.",
    tags: ["React", "Firebase", "Material-UI"],
    status: "Completed"
  },
  {
    title: "Design System Pro",
    description: "Comprehensive design system and component library for building consistent, accessible web applications.",
    tags: ["React", "Storybook", "CSS-in-JS"],
    status: "Archive"
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground text-lg">Building solutions that matter</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-8 hover:border-accent transition-all duration-500 hover:shadow-glow hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute top-0 right-0 m-6">
                <span className={`text-xs px-3 py-1 rounded-full border ${
                  project.status === "In Development" 
                    ? "border-green-400/30 bg-green-400/10 text-green-400"
                    : project.status === "Completed"
                    ? "border-border bg-secondary text-muted-foreground"
                    : "border-border bg-muted text-muted-foreground"
                }`}>
                  {project.status}
                </span>
              </div>

              <div className="space-y-4 mb-6">
                <h3 className="text-2xl font-semibold group-hover:text-foreground transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="text-xs px-3 py-1 rounded-full bg-muted border border-border text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Github className="w-4 h-4" />
                  Code
                </button>
                <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
