import { motion } from "framer-motion";
import { Github, ExternalLink, GitFork, Star, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface GitHubUser {
  login: string;
  bio: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  name: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
}

const GitHubProfile = () => {
  const GITHUB_USERNAME = "Ryane23";
  const [githubData, setGithubData] = useState<GitHubUser | null>(null);
  const [featuredRepos, setFeaturedRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        
        // Fetch user profile
        const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        if (!userResponse.ok) {
          throw new Error('Failed to fetch GitHub profile');
        }
        const userData: GitHubUser = await userResponse.json();
        setGithubData(userData);

        // Fetch repositories
        const reposResponse = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`
        );
        if (!reposResponse.ok) {
          throw new Error('Failed to fetch repositories');
        }
        const reposData: GitHubRepo[] = await reposResponse.json();
        
        // Filter and sort repos by stars, get top 3
        const topRepos = reposData
          .filter(repo => !repo.name.includes('fork'))
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 3);
        
        setFeaturedRepos(topRepos);
        setError(null);
      } catch (err) {
        console.error('Error fetching GitHub data:', err);
        setError('Failed to load GitHub data');
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);


  if (loading) {
    return (
      <section id="github" className="py-20 px-6 bg-card/50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary" />
            <p className="mt-4 text-muted-foreground">Loading GitHub profile...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || !githubData) {
    return (
      <section id="github" className="py-20 px-6 bg-card/50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-destructive">{error || 'Failed to load GitHub data'}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="github" className="py-20 px-6 bg-card/50">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">GitHub Activity</h2>
          <p className="text-muted-foreground text-lg">Open source contributions and projects</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="rounded-2xl border border-border bg-card p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="w-24 h-24 rounded-full bg-muted mx-auto mb-4 overflow-hidden">
                  {githubData.avatar_url ? (
                    <img 
                      src={githubData.avatar_url} 
                      alt={githubData.name || githubData.login}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Github className="w-12 h-12 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-xl mb-2">
                  {githubData.name || `@${githubData.login}`}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {githubData.bio || "Full-Stack Developer"}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                <div>
                  <div className="font-bold text-lg">{githubData.public_repos}</div>
                  <div className="text-xs text-muted-foreground">Repos</div>
                </div>
                <div>
                  <div className="font-bold text-lg">{githubData.followers}</div>
                  <div className="text-xs text-muted-foreground">Followers</div>
                </div>
                <div>
                  <div className="font-bold text-lg">{githubData.following}</div>
                  <div className="text-xs text-muted-foreground">Following</div>
                </div>
              </div>

              <a
                href={githubData.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:shadow-glow transition-all"
              >
                View GitHub Profile
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Featured Repos */}
          <div className="lg:col-span-2 space-y-4">
            {featuredRepos.length > 0 ? (
              featuredRepos.map((repo, index) => (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-2xl border border-border bg-card p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-glow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-lg hover:text-primary transition-colors"
                    >
                      {repo.name}
                    </a>
                    {repo.language && (
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 border border-primary/20">
                        {repo.language}
                      </span>
                    )}
                  </div>

                  <p className="text-muted-foreground mb-4">
                    {repo.description || "No description available"}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-4 h-4" />
                      {repo.forks_count}
                    </span>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center text-muted-foreground py-8">
                No featured repositories available
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubProfile;
