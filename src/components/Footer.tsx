import { Mail, Phone, Linkedin, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a href="mailto:erickryan2@gmail.com" className="flex items-center gap-2 hover:text-foreground transition-colors">
                <Mail className="w-4 h-4" />
                erickryan2@gmail.com
              </a>
              <a href="https://wa.me/237652384153" className="flex items-center gap-2 hover:text-foreground transition-colors">
                <Phone className="w-4 h-4" />
                +237 652 384 153
              </a>
              <a href="https://wa.me/237692830376" className="flex items-center gap-2 hover:text-foreground transition-colors">
                <Phone className="w-4 h-4" />
                +237 692 830 376
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/in/ryan-erick-ngu-javea-fominyen-9539591a6/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://github.com/Ryane23" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://twitter.com/RyanErick" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="md:text-right">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Ryan Erick Ngu Javea Fominyen.<br />All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
