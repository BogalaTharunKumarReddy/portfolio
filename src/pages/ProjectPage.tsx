import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Lightbulb,
  PlayCircle,
  Target,
  Wrench,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { accentGradient } from "@/components/ui/accent";
import { Seo } from "@/components/seo/Seo";
import { Badge } from "@/components/ui/Badge";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLink } from "@/components/ui/SectionLink";
import { ProjectDemo } from "@/components/demos/ProjectDemo";
import { getProject, projects } from "@/data/projects";
import { cn } from "@/lib/cn";
import NotFound from "./NotFound";

export default function ProjectPage() {
  const { slug = "" } = useParams();
  const project = getProject(slug);
  if (!project) return <NotFound />;

  const { caseStudy } = project;
  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length]!;

  return (
    <article aria-labelledby="project-title" className="pb-24 pt-32">
      <Seo
        title={project.title}
        description={project.summary}
        path={`/projects/${project.slug}`}
      />

      <Container>
        <Link
          to={{ pathname: "/", hash: "#projects" }}
          className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-brand-cyan"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All projects
        </Link>

        <header
          className={cn(
            "relative mt-6 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br p-8 sm:p-12",
            accentGradient[project.accent],
          )}
        >
          <div
            aria-hidden="true"
            className="bg-grid absolute inset-0 opacity-50"
          />
          <div className="relative max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <Badge>{project.category}</Badge>
              <Badge className="border-white/15 bg-white/5 text-slate-300">
                {project.status}
              </Badge>
            </div>
            <h1
              id="project-title"
              className="mt-5 text-4xl font-bold sm:text-5xl"
            >
              {project.title}
            </h1>
            <p className="mt-4 text-xl text-slate-200">{project.tagline}</p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tech stack">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-brand-blue/20 bg-brand-blue/[0.06] px-3 py-1 font-mono text-xs text-slate-200"
                >
                  {tech}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink
                href="#demo"
                trailingIcon={
                  <PlayCircle className="h-4 w-4" aria-hidden="true" />
                }
              >
                Try the live demo
              </ButtonLink>
              {project.links.live && (
                <ButtonLink
                  href={project.links.live}
                  external
                  variant="secondary"
                  trailingIcon={
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  }
                >
                  Deployed site
                </ButtonLink>
              )}
              {project.links.github && (
                <ButtonLink
                  href={project.links.github}
                  external
                  variant="secondary"
                  leadingIcon={<GithubIcon className="h-4 w-4" />}
                >
                  Source code
                </ButtonLink>
              )}
            </div>
          </div>
        </header>

        <section
          id="demo"
          aria-labelledby="demo-title"
          className="mt-12 scroll-mt-28"
        >
          <Reveal>
            <h2
              id="demo-title"
              className="flex items-center gap-3 text-2xl font-semibold"
            >
              <PlayCircle
                className="h-6 w-6 text-brand-cyan"
                aria-hidden="true"
              />{" "}
              Live demo
            </h2>
          </Reveal>
          <div className="mt-6">
            <ProjectDemo slug={project.slug} />
          </div>
        </section>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-12">
            <Reveal>
              <h2 className="text-2xl font-semibold">Overview</h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-300">
                {caseStudy.overview}
              </p>
            </Reveal>

            <Reveal>
              <h2 className="flex items-center gap-3 text-2xl font-semibold">
                <Target
                  className="h-6 w-6 text-brand-cyan"
                  aria-hidden="true"
                />{" "}
                The problem
              </h2>
              <p className="mt-4 leading-relaxed text-slate-300">
                {caseStudy.problem}
              </p>
            </Reveal>

            <section aria-labelledby="approach-title">
              <Reveal>
                <h2 id="approach-title" className="text-2xl font-semibold">
                  Approach
                </h2>
              </Reveal>
              <ol className="mt-6 space-y-4">
                {caseStudy.approach.map((step, i) => (
                  <li key={step.title}>
                    <Reveal delay={i * 0.05}>
                      <GlassCard className="flex gap-4 p-5">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-cyan/10 font-mono text-sm text-brand-cyan">
                          {i + 1}
                        </span>
                        <div>
                          <h3 className="font-semibold">{step.title}</h3>
                          <p className="mt-1 text-sm leading-relaxed text-slate-400">
                            {step.text}
                          </p>
                        </div>
                      </GlassCard>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="challenges-title">
              <Reveal>
                <h2
                  id="challenges-title"
                  className="flex items-center gap-3 text-2xl font-semibold"
                >
                  <Wrench
                    className="h-6 w-6 text-brand-cyan"
                    aria-hidden="true"
                  />{" "}
                  Challenges and solutions
                </h2>
              </Reveal>
              <ul className="mt-6 space-y-4">
                {caseStudy.challenges.map((item) => (
                  <li key={item.challenge}>
                    <Reveal>
                      <GlassCard className="p-5">
                        <p className="font-semibold text-white">
                          {item.challenge}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-slate-400">
                          <span className="font-medium text-brand-cyan">
                            Solution:{" "}
                          </span>
                          {item.solution}
                        </p>
                      </GlassCard>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="learned-title">
              <Reveal>
                <h2
                  id="learned-title"
                  className="flex items-center gap-3 text-2xl font-semibold"
                >
                  <Lightbulb
                    className="h-6 w-6 text-brand-cyan"
                    aria-hidden="true"
                  />{" "}
                  What I learned
                </h2>
              </Reveal>
              <ul className="mt-6 space-y-3">
                {caseStudy.learnings.map((text) => (
                  <li key={text} className="flex gap-3 text-slate-300">
                    <CheckCircle2
                      className="mt-1 h-5 w-5 shrink-0 text-brand-teal"
                      aria-hidden="true"
                    />
                    {text}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside
            className="space-y-6 lg:sticky lg:top-28 lg:self-start"
            aria-label="Project summary"
          >
            <GlassCard className="p-6">
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
                My role
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                {caseStudy.role}
              </p>
            </GlassCard>
            <GlassCard className="p-6">
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
                Key features
              </h2>
              <ul className="mt-4 space-y-3">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-3 text-sm text-slate-300"
                  >
                    <Icon
                      name="sparkles"
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </GlassCard>
            <GlassCard className="p-6">
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
                Next steps
              </h2>
              <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-slate-400">
                {caseStudy.next.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </GlassCard>
          </aside>
        </div>

        <nav
          aria-label="More projects"
          className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8"
        >
          <SectionLink
            sectionId="contact"
            className="text-sm text-slate-400 hover:text-brand-cyan"
          >
            Interested in working together?
          </SectionLink>
          <Link
            to={`/projects/${next.slug}`}
            className="group inline-flex items-center gap-3 text-right text-lg font-semibold hover:text-brand-cyan"
          >
            <span>
              <span className="block font-mono text-xs font-normal uppercase tracking-widest text-slate-400">
                Next project
              </span>
              {next.title}
            </span>
            <ArrowRight
              className="h-5 w-5 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </nav>
      </Container>
    </article>
  );
}
