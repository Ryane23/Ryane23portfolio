import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Star, GitFork, Loader2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  fork: boolean;
}

const ProjectsPage = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/Ryane23/repos?sort=updated&per_page=100');
        
        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }

        const data: GitHubRepo[] = await response.json();
        
        // Filter out forks and sort by stars
        const filteredRepos = data
          .filter(repo => !repo.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count);
        
        setRepos(filteredRepos);
      } catch (error) {
        console.error('Error fetching repos:', error);
        toast({
          title: "Error",
          description: "Failed to load GitHub repositories. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [toast]);

  const getLanguageColor = (language: string | null) => {
    const colors: { [key: string]: string } = {
      'JavaScript': 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30',
      'TypeScript': 'bg-blue-500/20 text-blue-500 border-blue-500/30',
      'Python': 'bg-green-500/20 text-green-500 border-green-500/30',
      'PHP': 'bg-purple-500/20 text-purple-500 border-purple-500/30',
      'Java': 'bg-red-500/20 text-red-500 border-red-500/30',
      'HTML': 'bg-orange-500/20 text-orange-500 border-orange-500/30',
      'CSS': 'bg-pink-500/20 text-pink-500 border-pink-500/30',
      'Dart': 'bg-cyan-500/20 text-cyan-500 border-cyan-500/30',
    };
    return language ? colors[language] || 'bg-primary/10 text-primary border-primary/20' : 'bg-muted/10 text-muted-foreground border-muted/20';
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto max-w-7xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl lg:text-6xl font-bold mb-4">GitHub Projects</h1>
          <p className="text-xl text-muted-foreground mb-4">
            Explore my open-source contributions and personal projects
          </p>
          <a 
            href="https://github.com/Ryane23"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:underline mb-16"
          >
            <Github className="w-5 h-5" />
            Visit my GitHub profile
            <ExternalLink className="w-4 h-4" />
          </a>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : repos.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No repositories found.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repos.map((repo, index) => (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-2xl border border-border bg-card p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-glow flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold flex-1 line-clamp-1">
                      {repo.name}
                    </h3>
                    {repo.language && (
                      <span className={`text-xs px-2 py-1 rounded-full border ${getLanguageColor(repo.language)}`}>
                        {repo.language}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-3">
                    {repo.description || "No description available"}
                  </p>

                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {repo.topics.slice(0, 3).map((topic) => (
                        <span
                          key={topic}
                          className="text-xs px-2 py-1 rounded-full bg-muted/50 text-muted-foreground"
                        >
                          #{topic}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-4 h-4" />
                      {repo.forks_count}
                    </span>
                  </div>

                  <div className="flex gap-3 mt-auto">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-all"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:shadow-glow transition-all"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Demo
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectsPage;
