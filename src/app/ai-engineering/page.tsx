"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Mail,
  Sparkles,
  Brain,
  ShieldCheck,
  Cpu,
} from "lucide-react";
import { AI_ENGINEERING } from "@/lib/constants";

export default function AIEngineeringPage() {
  return (
    <main className="page-shell min-h-screen px-3 pb-12 pt-24 md:px-6 md:pb-20 md:pt-28">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Link href="/" className="cta-ghost inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="panel overflow-hidden p-6 md:p-10"
        >
          <span className="kicker">{AI_ENGINEERING.subtitle}</span>
          <h1 className="mt-5 display-xl">{AI_ENGINEERING.title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
            I treat AI as a collaborator that strengthens engineering judgment,
            not as a shortcut that replaces it.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="panel p-4">
              <Brain className="h-5 w-5 text-accent" />
              <p className="mt-2 text-sm font-medium">Deeper reasoning</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Use AI to explore alternatives, edge cases, and constraints faster.
              </p>
            </div>
            <div className="panel p-4">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <p className="mt-2 text-sm font-medium">Engineering accountability</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Every AI output is reviewed for correctness, reliability, and fit.
              </p>
            </div>
            <div className="panel p-4">
              <Cpu className="h-5 w-5 text-accent" />
              <p className="mt-2 text-sm font-medium">Execution speed</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Shift time from repetitive implementation to architecture decisions.
              </p>
            </div>
          </div>
        </motion.section>

        <section className="mt-8 space-y-5">
          {AI_ENGINEERING.sections.map((section, index) => {
            if (section.type === "conclusion") {
              return (
                <motion.article
                  key={`${section.type}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45 }}
                  className="panel p-6 md:p-8"
                >
                  <p className="display-lg">{section.main}</p>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">
                    {section.sub}
                  </p>
                </motion.article>
              );
            }

            if (section.type === "highlight") {
              return (
                <motion.article
                  key={`${section.type}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45 }}
                  className="rounded-3xl border border-primary/35 bg-primary/10 p-6 md:p-8"
                >
                  <p className="text-lg leading-relaxed text-primary md:text-xl">
                    {section.text}
                  </p>
                </motion.article>
              );
            }

            return (
              <motion.article
                key={`${section.type}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className="panel p-6 md:p-8"
              >
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                  <Sparkles className="h-3.5 w-3.5" />
                  {section.type}
                </div>
                <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                  {section.text}
                </p>
              </motion.article>
            );
          })}
        </section>

        <section className="mt-8 panel p-6 md:p-8">
          <h2 className="display-lg">Discuss systems, product, and AI engineering.</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            If you&apos;re building AI-assisted products and care about engineering
            quality, I&apos;d love to connect.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="mailto:nishantbaruah3@gmail.com?subject=Discussion%20about%20Engineering%20with%20AI"
              className="cta-primary inline-flex items-center gap-2"
            >
              <Mail className="h-4 w-4" /> Email me
            </a>
            <Link href="/#work" className="cta-ghost inline-flex items-center gap-2">
              View selected work <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
