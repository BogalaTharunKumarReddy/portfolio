import { useState } from "react";
import { ExternalLink, GitFork, Star } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { useGithub } from "@/hooks/useGithub";
import type { GithubRepo } from "@/lib/github";

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

/** Repos that are already showcased above (matched by link or name), hidden, or the profile README. */
function isDuplicate(repo: GithubRepo): boolean {
  const name = norm(repo.name);
  if (name === norm(profile.githubUsername)) return true;
  if (profile.githubHiddenRepos.some((h) => norm(h) === name)) return true;
  return projects.some((p) => {
    const link = p.links.github?.toLowerCase().replace(/\/$/, "");
    return (
      link === repo.html_url.toLowerCase() ||
      norm(p.slug) === name ||
      norm(p.title) === name
    );
  });
}

/** GitHub's auto-generated social preview for a repo; hidden if it fails to load. */
function RepoPreview({ repo }: { repo: GithubRepo }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <img
      src={`https://opengraph.githubassets.com/1/${profile.githubUsername}/${repo.name}`}
      alt={`${repo.name} repository preview`}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="aspect-[2/1] w-full object-cover"
    />
  );
}

function prettify(name: string): string {
  return name.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Auto-synced list: any new public, non-fork repository on GitHub appears here
 * the next time the page loads, with no code change or redeploy.
 */
export function GithubProjects() {
  const { state } = useGithub(profile.githubUsername);
  if (state.status !== "success") return null;
  const repos = state.data.repos.filter((r) => !isDuplicate(r)).slice(0, 6);
  if (repos.length === 0) return null;

  return (
    <div className="min-w-0">
      <h3 className="font-display text-2xl font-semibold">More from GitHub</h3>
      <p className="mt-2 text-sm text-slate-400">
        Public repositories synced automatically. A new repo shows up here on its own.
      </p>
      <ul className="mt-5 grid gap-4 sm:grid-cols-2">
        {repos.map((repo, i) => (
          <li key={repo.id} className="relative">
            <Reveal delay={(i % 3) * 0.06} className="h-full">
              <GlassCard className="flex h-full flex-col overflow-hidden">
                <RepoPreview repo={repo} />
                <div className="flex flex-1 flex-col p-5">
                  <h4 className="flex items-center gap-2 font-semibold">
                    <GithubIcon className="h-4 w-4 shrink-0 text-brand-cyan" />
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="truncate after:absolute after:inset-0 after:content-[''] hover:text-brand-cyan"
                    >
                      {prettify(repo.name)}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </h4>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm text-slate-400">
                    {repo.description ??
                      "No description yet. Open the repository to read the code."}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                    {repo.language && <span>{repo.language}</span>}
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5" aria-hidden="true" />{" "}
                      {repo.stargazers_count}
                      <span className="sr-only"> stars</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="h-3.5 w-3.5" aria-hidden="true" />{" "}
                      {repo.forks_count}
                      <span className="sr-only"> forks</span>
                    </span>
                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-10 ml-auto inline-flex items-center gap-1 text-brand-cyan hover:underline"
                      >
                        Live{" "}
                        <ExternalLink className="h-3 w-3" aria-hidden="true" />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    )}
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}
