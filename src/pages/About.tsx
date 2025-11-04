import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import LinkedInStats from "@/components/LinkedInStats";

const About = () => {
  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const birthDate = new Date("2001-10-16"); // Update with actual birth date
  const age = calculateAge(birthDate);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto max-w-7xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl lg:text-6xl font-bold mb-8">About Me</h1>
          
          <div className="grid lg:grid-cols-2 gap-12 mt-12">
            {/* Personal Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div className="rounded-2xl border border-border bg-card p-8">
                <h2 className="text-2xl font-semibold mb-6">Personal Information</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="text-lg font-medium">Ryan Erick Ngu Javea Fominyen</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Age</p>
                    <p className="text-lg font-medium">{age} years old</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date of Birth</p>
                    <p className="text-lg font-medium">{birthDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Nationality</p>
                    <p className="text-lg font-medium">Cameroonian 🇨🇲</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="text-lg font-medium">Cameroon</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <div className="rounded-2xl border border-border bg-card p-8">
                <h2 className="text-2xl font-semibold mb-6">Education</h2>
                <div className="space-y-6">
                  <div className="border-l-2 border-primary pl-4">
                    <h3 className="text-lg font-semibold">IAI Cameroon</h3>
                    <p className="text-sm text-muted-foreground mb-2">Higher Education in Software Engineering</p>
                    <p className="text-xs text-muted-foreground">Focus on Full-Stack Development and Software Architecture</p>
                  </div>
                  <div className="border-l-2 border-primary pl-4">
                    <h3 className="text-lg font-semibold">TIC Foundation</h3>
                    <p className="text-sm text-muted-foreground mb-2">Technical Training</p>
                    <p className="text-xs text-muted-foreground">Specialized in Web Technologies and Development Practices</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Biography */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12"
          >
            <div className="rounded-2xl border border-border bg-card p-8">
              <h2 className="text-2xl font-semibold mb-6">My Story</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  I'm Ryan Erick Ngu Javea Fominyen, a passionate Full-Stack Developer, UI/UX Designer, 
                  and Software Engineer from Cameroon. My journey in technology began with a curiosity 
                  about how digital solutions can transform real-world problems into innovative opportunities.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Throughout my education at IAI Cameroon and TIC Foundation, I've developed a strong 
                  foundation in both frontend and backend technologies. My expertise spans across modern 
                  frameworks like React, Next.js, Laravel, and Django, allowing me to build comprehensive 
                  solutions from concept to deployment.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Beyond coding, I'm deeply passionate about creating intuitive user experiences and 
                  contributing to social causes through technology. I believe in building applications 
                  that not only solve problems but also make a positive impact on communities.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  When I'm not coding, you'll find me listening to music, playing football, or working 
                  with NGOs like Kidefind Youth Development Initiative and Amkay Foundation to create 
                  opportunities for others.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Skills Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <div className="rounded-2xl border border-border bg-card p-8">
              <h2 className="text-2xl font-semibold mb-6">Core Competencies</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-primary">Frontend</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>React & Next.js</li>
                    <li>React Native</li>
                    <li>TypeScript</li>
                    <li>Tailwind CSS</li>
                    <li>Flutter</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-primary">Backend</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Node.js & Express</li>
                    <li>Laravel & PHP</li>
                    <li>Django</li>
                    <li>MongoDB</li>
                    <li>MySQL</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-primary">Design</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>UI/UX Design</li>
                    <li>Responsive Design</li>
                    <li>Design Systems</li>
                    <li>Prototyping</li>
                    <li>User Research</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* LinkedIn Stats */}
          <LinkedInStats />
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
