import { useState, useEffect } from "react";
import { GitHubRepo } from "../types";

interface UseGitHubReposOptions {
  username?: string;
  featured?: string[]; // Array of repository names to feature
}

interface UseGitHubReposReturn {
  repos: GitHubRepo[];
  loading: boolean;
  error: string | null;
  featuredRepos: GitHubRepo[];
}

export const useGitHubRepos = (
  options: UseGitHubReposOptions = {},
): UseGitHubReposReturn => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      if (!options.username) {
        setLoading(false);
        setError("No GitHub username provided");
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://api.github.com/users/${options.username}/repos?sort=updated&per_page=30`,
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
          },
        );

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }

        const data: GitHubRepo[] = await response.json();

        // Filter out forks and sort by stars/updated date
        const filteredRepos = data
          .filter((repo) => !repo.full_name.includes("/"))
          .sort((a, b) => {
            // Prioritize repos with more stars, then by update date
            if (a.stargazers_count !== b.stargazers_count) {
              return b.stargazers_count - a.stargazers_count;
            }
            return (
              new Date(b.updated_at).getTime() -
              new Date(a.updated_at).getTime()
            );
          });

        setRepos(filteredRepos);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch repositories",
        );
        console.error("Error fetching GitHub repos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [options.username]);

  // Get featured repositories
  const featuredRepos = repos
    .filter(
      (repo) =>
        options.featured?.includes(repo.name) ||
        repo.stargazers_count > 0 ||
        repo.description?.length,
    )
    .slice(0, 6);

  return {
    repos,
    loading,
    error,
    featuredRepos,
  };
};

export default useGitHubRepos;
