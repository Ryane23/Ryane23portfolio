import { useState } from "react";
import { Mail, Github, Linkedin, Twitter, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isFocused, setIsFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Get in Touch</h2>
          <p className="text-white/50 text-lg">Let's create something amazing together</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-white/60">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setIsFocused("name")}
                  onBlur={() => setIsFocused(null)}
                  className={`w-full px-6 py-4 rounded-xl bg-white/5 border ${
                    isFocused === "name" 
                      ? "border-white/50 shadow-glow" 
                      : "border-white/10"
                  } focus:outline-none transition-all duration-300`}
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-white/60">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setIsFocused("email")}
                  onBlur={() => setIsFocused(null)}
                  className={`w-full px-6 py-4 rounded-xl bg-white/5 border ${
                    isFocused === "email" 
                      ? "border-white/50 shadow-glow" 
                      : "border-white/10"
                  } focus:outline-none transition-all duration-300`}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-white/60">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setIsFocused("message")}
                  onBlur={() => setIsFocused(null)}
                  rows={6}
                  className={`w-full px-6 py-4 rounded-xl bg-white/5 border ${
                    isFocused === "message" 
                      ? "border-white/50 shadow-glow" 
                      : "border-white/10"
                  } focus:outline-none transition-all duration-300 resize-none`}
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 rounded-xl bg-white text-black font-medium hover:shadow-glow-lg transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm p-8">
              <h3 className="text-2xl font-semibold mb-6">Connect with Me</h3>
              
              <div className="space-y-4">
                <a
                  href="mailto:ryan@example.com"
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-white/50">ryan@example.com</p>
                  </div>
                </a>

                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">GitHub</p>
                    <p className="text-sm text-white/50">@ryanerick</p>
                  </div>
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">LinkedIn</p>
                    <p className="text-sm text-white/50">Ryan Erick</p>
                  </div>
                </a>

                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
                    <Twitter className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">Twitter</p>
                    <p className="text-sm text-white/50">@ryanerick</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm p-8">
              <h3 className="text-xl font-semibold mb-4">Current Status</h3>
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white/60">Available for freelance work</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
