import { motion } from "framer-motion";
import { Download, FileText, ExternalLink } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Resume = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto max-w-7xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <FileText className="w-20 h-20 mx-auto mb-6 text-primary" />
          <h1 className="text-5xl lg:text-6xl font-bold mb-4">Resume / CV</h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Download my complete professional resume to learn more about my experience, skills, and projects
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="rounded-2xl border border-border bg-card p-12">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Ryan Erick Ngu Javea Fominyen</h2>
                <p className="text-muted-foreground">
                  Full-Stack Developer | UI/UX Designer | Software Engineer
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <span className="text-sm text-muted-foreground">Format</span>
                  <span className="font-medium">PDF</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <span className="text-sm text-muted-foreground">Last Updated</span>
                  <span className="font-medium">January 2025</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm text-muted-foreground">Languages</span>
                  <span className="font-medium">English, French</span>
                </div>
              </div>

              <button
                onClick={() => {
                  // This will trigger the download
                  const link = document.createElement('a');
                  link.href = '/files/ryan-erick-cv.pdf';
                  link.download = 'Ryan-Erick-Resume.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-primary text-primary-foreground hover:shadow-glow transition-all text-lg font-semibold"
              >
                <Download className="w-5 h-5" />
                Download Resume
              </button>

              <p className="text-sm text-muted-foreground mt-6">
                You can also view my professional profiles:
              </p>
              
              <div className="flex gap-4 justify-center mt-4">
                <a
                  href="https://github.com/Ryane23"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  GitHub
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="https://www.linkedin.com/in/ryan-erick-ngu-javea-fominyen-9539591a6/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  LinkedIn
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Quick Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16 grid md:grid-cols-3 gap-6"
          >
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-4xl font-bold text-primary mb-2">5+</h3>
              <p className="text-sm text-muted-foreground">Years Experience</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-4xl font-bold text-primary mb-2">20+</h3>
              <p className="text-sm text-muted-foreground">Projects Completed</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-4xl font-bold text-primary mb-2">15+</h3>
              <p className="text-sm text-muted-foreground">Technologies</p>
            </div>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Resume;
