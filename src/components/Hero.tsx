import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ryanProfile from "@/assets/ryan-profile.png";

const Hero = () => {
  const [typedText, setTypedText] = useState("");
  const fullText = "Full-Stack Developer. UI/UX Designer. Software Engineer.";
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-20">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Profile Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative group order-2 lg:order-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-foreground/10 to-transparent rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
            <div className="relative aspect-[3/4] max-w-md mx-auto rounded-3xl border border-border overflow-hidden bg-card backdrop-blur-sm group-hover:shadow-glow-lg transition-all duration-500">
              <motion.img 
                src={ryanProfile} 
                alt="Ryan Erick - Full-Stack Developer" 
                className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-700"
                whileHover={{ scale: 1.05 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Right: Text */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="space-y-6 lg:space-y-8 order-1 lg:order-2"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-muted-foreground">Active</span>
            </motion.div>

            <div className="space-y-3 lg:space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight"
              >
                Ryan Erick
              </motion.h1>
              
              <div className="h-12 sm:h-14 lg:h-16 flex items-center">
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-lg sm:text-xl lg:text-2xl text-muted-foreground font-light"
                >
                  {typedText}
                  <span className="inline-block w-0.5 h-5 sm:h-6 bg-foreground/80 ml-1 animate-blink" />
                </motion.p>
              </div>
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl"
            >
              I build innovative web and mobile apps that solve real-world problems.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <a 
                href="#projects"
                className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-primary text-primary-foreground font-medium hover:shadow-glow-lg transition-all duration-300 hover:scale-105 text-center"
              >
                View Projects
              </a>
              <a 
                href="#contact"
                className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl border border-border hover:bg-secondary transition-all duration-300 hover:shadow-glow text-center"
              >
                Get in Touch
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
