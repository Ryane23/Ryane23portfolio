import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";

const blogPosts = [
  {
    title: "Building Scalable Web Applications with Next.js",
    date: "2025-01-15",
    excerpt: "Exploring best practices for creating performant and scalable web applications using Next.js 14 and TypeScript.",
    readTime: "5 min read",
    slug: "building-scalable-nextjs-apps"
  },
  {
    title: "The Future of UI/UX Design in 2025",
    date: "2025-01-10",
    excerpt: "How AI and motion design are reshaping the landscape of modern user interfaces and user experiences.",
    readTime: "7 min read",
    slug: "future-of-ui-ux-2025"
  },
  {
    title: "From Concept to Production: My BusEase Journey",
    date: "2025-01-05",
    excerpt: "A deep dive into the development process of BusEase, from initial concept to real-world implementation.",
    readTime: "10 min read",
    slug: "busease-journey"
  }
];

const Blog = () => {
  return (
    <section id="blog" className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Blog & Insights</h2>
          <p className="text-muted-foreground text-lg">Thoughts on development, design, and innovation</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group rounded-2xl border border-border bg-card p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-glow"
            >
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
              </div>

              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                {post.title}
              </h3>

              <p className="text-muted-foreground mb-4 leading-relaxed">
                {post.excerpt}
              </p>

              <button className="text-sm font-medium text-primary hover:underline">
                Read More →
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
