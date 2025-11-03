import { useState, useEffect } from "react";
import { Headphones, Code, Dumbbell, Music } from "lucide-react";

const activities = [
  {
    icon: Headphones,
    title: "Listening to Nemzzz",
    description: "Vibing to the latest tracks",
    emoji: "🎧"
  },
  {
    icon: Code,
    title: "Building BusEase",
    description: "Developing smart transport solutions",
    emoji: "💻"
  },
  {
    icon: Dumbbell,
    title: "Football Training",
    description: "Practicing drills and techniques",
    emoji: "⚽"
  },
  {
    icon: Music,
    title: "Exploring New Music",
    description: "Discovering fresh sounds",
    emoji: "🎵"
  }
];

const NowDoing = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activities.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const current = activities[currentIndex];
  const Icon = current.icon;

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Now Doing</h2>
          <p className="text-muted-foreground text-lg">Live from Ryan's world</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card/50 backdrop-blur-sm p-12">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-foreground/50 to-transparent animate-pulse" />
            
            <div className="relative space-y-6 animate-fade-in" key={currentIndex}>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
                  <Icon className="w-10 h-10 text-foreground/80" strokeWidth={1.5} />
                </div>
                <div className="text-6xl">{current.emoji}</div>
              </div>

              <div className="space-y-2">
                <h3 className="text-3xl font-semibold">{current.title}</h3>
                <p className="text-xl text-muted-foreground">{current.description}</p>
              </div>

              {/* Activity indicator dots */}
              <div className="flex gap-2 pt-6">
                {activities.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? "w-12 bg-foreground" 
                        : "w-1 bg-foreground/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NowDoing;
