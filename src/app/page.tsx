"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  X,
  Sparkles,
  Briefcase,
} from "lucide-react";
import {
  EXPERIENCES,
  PERSONAL_INFO,
  PROJECTS,
  SKILLS,
  SOCIAL_LINKS,
} from "@/lib/constants";

const sections = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const projectImages = ["/projects/chatbot.jpg", "/projects/accident-analysis.jpg"];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 32 });

  return (
    <main className="page-shell">
      <motion.div
        className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left bg-gradient-to-r from-accent via-primary to-accent"
        style={{ scaleX }}
      />

      <header className="fixed left-0 right-0 top-0 z-50 px-3 py-3 md:px-6 md:py-5">
        <div className="container-tight panel flex items-center justify-between px-4 py-3 md:px-6">
          <Link href="/" className="text-sm font-semibold tracking-[0.17em] uppercase">
            Nishant Baruah
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {sections.map((section) => (
              <a key={section.id} href={`#${section.id}`} className="nav-link">
                {section.label}
              </a>
            ))}
          </nav>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-full border border-white/15 p-2 md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {menuOpen && (
          <div className="container-tight panel mt-2 p-3 md:hidden">
            <div className="flex flex-col gap-1">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                >
                  {section.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <section className="relative overflow-hidden px-3 pb-16 pt-32 md:px-6 md:pb-24 md:pt-40">
        <div className="orb orb-gold right-[-9%] top-16" />
        <div className="orb orb-teal left-[-13%] top-32" />

        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <span className="kicker">{PERSONAL_INFO.role}</span>

            <div className="space-y-5">
              <h1 className="display-hero">
                Building resilient systems,
                <br />
                <span className="font-serif italic text-primary">
                  engineered for impact.
                </span>
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                I design and build backend architectures, ML-enabled products, and
                modern web platforms that prioritize reliability, performance, and
                business outcomes.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a href="#work" className="cta-primary inline-flex items-center gap-2">
                View selected work <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={PERSONAL_INFO.resumePath}
                download
                className="cta-ghost inline-flex items-center gap-2"
              >
                <Download className="h-4 w-4" /> Resume
              </a>
              <Link href="/ai-engineering" className="cta-ghost inline-flex items-center gap-2">
                <Sparkles className="h-4 w-4" /> Engineering with AI
              </Link>
            </div>

            <div className="grid gap-4 pt-4 md:grid-cols-3">
              <div className="panel p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Base
                </p>
                <p className="mt-1 text-sm leading-relaxed">{PERSONAL_INFO.location}</p>
              </div>
              <div className="panel p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Focus
                </p>
                <p className="mt-1 text-sm leading-relaxed">
                  Scalable APIs, automation, data-rich product systems
                </p>
              </div>
              <div className="panel p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Current role
                </p>
                <p className="mt-1 text-sm leading-relaxed">Backend Developer at LenDenClub</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="px-3 py-16 md:px-6 md:py-24">
        <div className="container-tight grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <span className="kicker">About</span>
            <h2 className="display-xl">A technical builder with product-first discipline.</h2>
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              I&apos;m a Computer Engineering student at NMIMS who enjoys turning
              complex requirements into reliable production systems. My internship
              work across fintech and enterprise organizations taught me to balance
              speed, quality, and maintainability from day one.
            </p>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" /> {PERSONAL_INFO.location}
            </div>
          </div>

          <div className="panel p-6 md:p-8">
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Core stack
            </p>
            <div className="flex flex-wrap gap-2.5">
              {SKILLS.map((skill) => (
                <span key={skill} className="chip">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="px-3 py-16 md:px-6 md:py-24">
        <div className="container-tight space-y-10">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div className="space-y-4">
              <span className="kicker">Selected Work</span>
              <h2 className="display-xl">
                Projects where architecture meets
                <span className="font-serif italic text-primary"> practical intelligence</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Each project focuses on measurable outcomes, robust implementation,
              and clear product utility.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {PROJECTS.map((project, index) => (
              <motion.a
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="panel group overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: index * 0.1 }}
              >
                <div className="relative h-52 overflow-hidden md:h-60">
                  <Image
                    src={projectImages[index]}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/35 to-transparent" />
                </div>

                <div className="space-y-4 p-5 md:p-6">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    <span>{project.company}</span>
                    <span>{project.year}</span>
                  </div>

                  <h3 className="display-lg">{project.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className="chip">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                    Explore project <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="px-3 py-16 md:px-6 md:py-24">
        <div className="container-tight space-y-10">
          <div className="space-y-4">
            <span className="kicker">Experience</span>
            <h2 className="display-xl">Professional journey across enterprise and product teams.</h2>
          </div>

          <div className="relative border-l border-border/80 pl-5 md:pl-8">
            {EXPERIENCES.map((experience, index) => (
              <motion.article
                key={`${experience.company}-${experience.role}`}
                className="relative mb-6 panel p-5 md:p-7"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <span className="absolute -left-[1.87rem] top-8 hidden h-2.5 w-2.5 rounded-full bg-accent md:block" />

                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <Briefcase className="h-3.5 w-3.5" /> {experience.company}
                  </span>
                  <span>{experience.period}</span>
                  {experience.current && (
                    <span className="rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold text-primary-foreground">
                      Current
                    </span>
                  )}
                </div>
                <h3 className="mt-3 text-xl font-semibold md:text-2xl">{experience.role}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {experience.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="px-3 pb-14 pt-16 md:px-6 md:pb-20 md:pt-24">
        <div className="container-tight panel p-6 md:p-10">
          <div className="space-y-5">
            <span className="kicker">Contact</span>
            <h2 className="display-xl">Let&apos;s design and ship something that lasts.</h2>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              I&apos;m open to internships, full-time engineering opportunities, and
              high-ownership freelance projects where product quality matters.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <a
              href={SOCIAL_LINKS.email.url}
              className="cta-ghost inline-flex items-center justify-center gap-2"
            >
              <Mail className="h-4 w-4" /> Email
            </a>
            <a
              href={SOCIAL_LINKS.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-ghost inline-flex items-center justify-center gap-2"
            >
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
            <a
              href={SOCIAL_LINKS.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-ghost inline-flex items-center justify-center gap-2"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a
              href={PERSONAL_INFO.resumePath}
              download
              className="cta-primary inline-flex items-center justify-center gap-2"
            >
              <Download className="h-4 w-4" /> Resume
            </a>
          </div>

          <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
            <span className="accent-dot" /> Usually replies within 24 hours
          </div>
        </div>
      </section>

      <footer className="px-3 pb-8 md:px-6 md:pb-10">
        <div className="container-tight flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-5 text-xs text-muted-foreground">
          <p>© 2026 Nishant Baruah</p>
          <p>Crafted with Next.js and a systems-first design mindset.</p>
        </div>
      </footer>
    </main>
  );
}
