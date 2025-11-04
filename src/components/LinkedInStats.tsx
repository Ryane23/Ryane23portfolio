import { motion } from "framer-motion";
import { Linkedin, Users, TrendingUp, Award } from "lucide-react";
import { useEffect, useState } from "react";

const LinkedInStats = () => {
  const [followers, setFollowers] = useState(0);
  const targetFollowers = 1250; // Update this with your actual follower count

  // Animate the follower count
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = targetFollowers / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetFollowers) {
        setFollowers(targetFollowers);
        clearInterval(timer);
      } else {
        setFollowers(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      icon: Users,
      label: "Followers",
      value: followers.toLocaleString(),
      color: "text-blue-500"
    },
    {
      icon: TrendingUp,
      label: "Connections",
      value: "500+",
      color: "text-green-500"
    },
    {
      icon: Award,
      label: "Recommendations",
      value: "15+",
      color: "text-purple-500"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="mt-12"
    >
      <div className="rounded-2xl border border-border bg-card p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#0A66C2] flex items-center justify-center">
            <Linkedin className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">LinkedIn Presence</h2>
            <p className="text-sm text-muted-foreground">Professional Network & Growth</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="relative group"
            >
              <div className="rounded-xl border border-border bg-background/50 p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-lg bg-background flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                
                {/* Animated gradient line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6"
        >
          <a
            href="https://www.linkedin.com/in/ryan-erick-ngu-javea-fominyen-9539591a6/" // Update with your actual LinkedIn URL
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0A66C2] hover:bg-[#004182] text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#0A66C2]/30"
          >
            <Linkedin className="w-5 h-5" />
            Connect on LinkedIn
            <TrendingUp className="w-4 h-4 ml-1" />
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LinkedInStats;
