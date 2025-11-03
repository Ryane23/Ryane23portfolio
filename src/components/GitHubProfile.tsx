import { motion } from "framer-motion";
import { Github, ExternalLink, GitFork, Star } from "lucide-react";

const GitHubProfile = () => {
  // These would be fetched from the GitHub API
  const githubData = {
    username: "ryanerick",
    bio: "Full-Stack Developer | Building innovative solutions",
    profilePic: "/placeholder.svg",
    repoCount: 24,
    followers: 156,
    following: 89,
    profileUrl: "https://github.com/ryanerick"
  };

  const featuredRepos = [
    {
      name: "BusEase",
      description: "Smart transportation booking platform",
      stars: 45,
      forks: 12,
      language: "TypeScript"
    },
    {
      name: "TA-Global-Health",
      description: "Multi-tenant health management system",
      stars: 32,
      forks: 8,
      language: "PHP"
    },
    {
      name: "Portfolio-Studio",
      description: "Modern portfolio builder",
      stars: 28,
      forks: 15,
      language: "JavaScript"
    }
  ];

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
                <div className="w-24 h-24 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                  <Github className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="font-bold text-xl mb-2">@{githubData.username}</h3>
                <p className="text-sm text-muted-foreground mb-4">{githubData.bio}</p>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                <div>
                  <div className="font-bold text-lg">{githubData.repoCount}</div>
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
                href={githubData.profileUrl}
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
            {featuredRepos.map((repo, index) => (
              <motion.div
                key={repo.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl border border-border bg-card p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-glow"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-lg">{repo.name}</h4>
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/10 border border-primary/20">
                    {repo.language}
                  </span>
                </div>

                <p className="text-muted-foreground mb-4">{repo.description}</p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {repo.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-4 h-4" />
                    {repo.forks}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubProfile;
