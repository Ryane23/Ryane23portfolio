import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GuestbookEntry {
  id: number;
  name: string;
  message: string;
  date: string;
}

const initialEntries: GuestbookEntry[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    message: "Amazing portfolio! Your projects are truly inspiring. Keep up the great work!",
    date: "2025-01-18"
  },
  {
    id: 2,
    name: "Michael Chen",
    message: "BusEase looks fantastic. Would love to collaborate on similar projects!",
    date: "2025-01-17"
  },
  {
    id: 3,
    name: "Emma Williams",
    message: "Your UI/UX work is outstanding. The attention to detail is impressive!",
    date: "2025-01-16"
  }
];

const Guestbook = () => {
  const [entries, setEntries] = useState<GuestbookEntry[]>(initialEntries);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !message.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const newEntry: GuestbookEntry = {
      id: Date.now(),
      name: name.trim(),
      message: message.trim(),
      date: new Date().toISOString().split('T')[0]
    };

    setEntries([newEntry, ...entries]);
    setName("");
    setMessage("");
    
    toast({
      title: "Thank you!",
      description: "Your message has been added to the guestbook."
    });
  };

  return (
    <section id="guestbook" className="py-20 px-6 bg-card/50">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Guestbook</h2>
          <p className="text-muted-foreground text-lg">Leave a message and be part of my journey</p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="mb-12 rounded-2xl border border-border bg-card p-6"
        >
          <div className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                maxLength={50}
              />
              <p className="text-xs text-muted-foreground mt-1 text-right">
                {name.length}/50 characters
              </p>
            </div>
            <div>
              <textarea
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                rows={4}
                maxLength={200}
              />
              <p className="text-xs text-muted-foreground mt-1 text-right">
                {message.length}/200 characters
              </p>
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:shadow-glow transition-all"
            >
              <Send className="w-4 h-4" />
              Sign Guestbook
            </button>
          </div>
        </motion.form>

        {/* Entries */}
        <div className="space-y-4">
          {entries.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between mb-2">
                    <h4 className="font-semibold">{entry.name}</h4>
                    <span className="text-xs text-muted-foreground">
                      {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{entry.message}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Guestbook;
