const techStack = [
  { name: "React", icon: "⚛️" },
  { name: "TypeScript", icon: "📘" },
  { name: "Node.js", icon: "🟢" },
  { name: "Python", icon: "🐍" },
  { name: "MongoDB", icon: "🍃" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "Tailwind", icon: "🎨" },
  { name: "Next.js", icon: "▲" },
  { name: "Firebase", icon: "🔥" },
  { name: "Docker", icon: "🐳" },
  { name: "Git", icon: "📦" },
  { name: "Figma", icon: "🎯" },
];

const TechStack = () => {
  return (
    <section className="py-20 px-6 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Tech Arsenal</h2>
          <p className="text-muted-foreground text-lg">Tools I work with daily</p>
        </div>

        <div className="relative">
          {/* Scrolling tech icons */}
          <div className="flex gap-6 animate-marquee whitespace-nowrap py-8">
            {[...techStack, ...techStack].map((tech, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-4 px-8 py-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-accent hover:shadow-glow transition-all duration-300 group"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  minWidth: "fit-content"
                }}
              >
                <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                  {tech.icon}
                </span>
                <span className="text-lg font-medium">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Gradient overlays for fade effect */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default TechStack;
