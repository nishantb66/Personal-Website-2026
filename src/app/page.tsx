"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight, Download, Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { ModeToggle } from "@/components/theme-toggle";
import { EXPERIENCES, PERSONAL_INFO, PROJECTS, SKILLS, SOCIAL_LINKS } from "@/lib/constants";
import "./portfolio.css";

const navigation = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

function Parallax({ children, className = "", distance = 50 }: { children: React.ReactNode; className?: string; distance?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return <motion.div ref={ref} className={className} style={reduced ? undefined : { y }} initial={reduced ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

function Index({ number, label }: { number: string; label: string }) {
  return <div className="p-index"><span>{number} / 04</span><span>{label}</span></div>;
}

function ProjectVisual({ index }: { index: number }) {
  return <div className={`p-project-art p-art-${index}`} aria-hidden="true"><div className="p-art-grid" />{index === 0 ? <div className="p-chat"><div className="p-chat-head">ONGC / INTELLIGENCE SYSTEM <span>● LOCAL</span></div><div className="p-chat-lines"><i /><i /><i /></div><div className="p-chat-input">How can I help you today? <span>↗</span></div></div> : <><div className="p-orbit p-orbit-one" /><div className="p-orbit p-orbit-two" /><div className="p-orbit p-orbit-three" /><div className="p-orbit-core">AI<small>ANALYSIS</small></div><span className="p-data-label p-label-one">INCIDENT<br />DETECTION</span><span className="p-data-label p-label-two">SYSTEM<br />INTELLIGENCE</span></>}<span className="p-art-caption">0{index + 1} / {index === 0 ? "CONVERSATIONAL INTELLIGENCE" : "SAFETY INTELLIGENCE"}</span></div>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroTextY = useTransform(heroProgress, [0, 1], [0, 170]);
  const heroArtY = useTransform(heroProgress, [0, 1], [0, -130]);
  const heroOpacity = useTransform(heroProgress, [0, 0.9], [1, 0]);

  return <main className="portfolio" id="top">
    <motion.div className="p-progress" style={{ scaleX: progress }} />
    <a className="p-skip" href="#about">Skip to content</a>
    <header className="p-header"><Link className="p-logo" href="/" aria-label="Nishant Baruah home">N<span>.</span>B<span>.</span></Link><nav className="p-nav" aria-label="Primary navigation">{navigation.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}</nav><div className="p-header-actions"><span className="p-available"><i /> Available for select projects</span><ModeToggle /><button className="p-menu" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></div>{menuOpen && <nav className="p-mobile-nav" aria-label="Mobile navigation">{navigation.map(item => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}<ArrowUpRight /></a>)}</nav>}</header>
    <section className="p-hero" ref={heroRef} aria-labelledby="hero-heading"><div className="p-hero-grid" /><motion.div className="p-hero-art" aria-hidden="true" style={reduced ? undefined : { y: heroArtY, opacity: heroOpacity }}><div className="p-disc"><div /></div><span className="p-cross p-cross-one">+</span><span className="p-cross p-cross-two">+</span></motion.div><div className="p-hero-meta"><span>INDEPENDENT ENGINEER / PORTFOLIO 2026</span><span>NAVI MUMBAI, INDIA ↗</span></div><motion.div className="p-hero-content" style={reduced ? undefined : { y: heroTextY, opacity: heroOpacity }}><p className="p-kicker"><span className="p-kicker-line" /> TECHNOLOGY. INTENTION. IMPACT.</p><h1 id="hero-heading">Building <em>what&apos;s</em><br /><span>next.</span></h1><div className="p-hero-bottom"><p>I&apos;m <strong>Nishant Baruah</strong> — a tech builder turning complex ideas into purposeful digital systems.</p><a href="#work" className="p-round-link" aria-label="Explore selected work"><ArrowDown /></a></div></motion.div><div className="p-hero-foot"><span>SCROLL TO EXPLORE</span><span>01 — 04</span></div></section>
    <div className="p-marquee" aria-hidden="true"><div>{Array.from({ length: 4 }, (_, i) => <span key={i}>ENGINEERING <b>✦</b> INTELLIGENCE <b>✦</b> EXPERIENCE <b>✦</b> </span>)}</div></div>
    <section className="p-section p-about" id="about" aria-labelledby="about-heading"><Index number="01" label="THE INTRODUCTION" /><div className="p-about-layout"><Parallax className="p-about-side" distance={40}><span>✦</span><small>GOOD IDEAS DESERVE<br />EXCEPTIONAL EXECUTION.</small></Parallax><Parallax className="p-about-main" distance={24}><p className="p-kicker">A LITTLE ABOUT ME</p><h2 id="about-heading">I build with<br /><em>clarity,</em> curiosity,<br />and conviction.</h2><div className="p-about-copy"><p>{PERSONAL_INFO.description}</p><p>From intelligent interfaces to reliable infrastructure, I care about the decisions behind the product as much as the experience in front of it.</p></div><a className="p-text-link" href={PERSONAL_INFO.resumePath} target="_blank" rel="noopener noreferrer">Explore my résumé <Download size={17} /></a></Parallax></div><Parallax className="p-capabilities" distance={18}><span>WHAT I WORK WITH</span><div>{["Software engineering", "AI & machine learning", "Product thinking", "Scalable systems"].map(item => <span key={item}>{item}</span>)}</div></Parallax></section>
    <section className="p-section p-work" id="work" aria-labelledby="work-heading"><Index number="02" label="SELECTED WORK" /><div className="p-heading"><Parallax distance={28}><p className="p-kicker">IDEAS MADE REAL</p><h2 id="work-heading">Selected <em>work.</em></h2></Parallax><Parallax className="p-heading-aside" distance={15}>Practical, ambitious work at the intersection of engineering and intelligence. <span>↓</span></Parallax></div><div className="p-projects">{PROJECTS.map((project, index) => <article className="p-project" key={project.title}><Parallax className="p-project-visual" distance={index === 0 ? 25 : 40}><a href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} project`}><ProjectVisual index={index} /><span className="p-project-open"><ArrowUpRight /></span></a></Parallax><Parallax className="p-project-info" distance={17}><span className="p-project-index">0{index + 1} / {project.year}</span><div><p>{project.company} / FEATURED PROJECT</p><h3>{project.title}</h3><p className="p-project-description">{project.description}</p></div><div className="p-project-tech">{project.tech.map(tech => <span key={tech}>{tech}</span>)}</div></Parallax></article>)}</div><a className="p-all-work" href={SOCIAL_LINKS.github.url} target="_blank" rel="noopener noreferrer">MORE EXPERIMENTS ON GITHUB <ArrowUpRight /></a></section>
    <section className="p-manifesto" aria-label="Approach"><div className="p-manifesto-grid" /><Parallax className="p-manifesto-small" distance={55}><span>THE WAY I SEE IT</span><span>✦</span></Parallax><Parallax className="p-manifesto-statement" distance={30}><p>Technology should feel <em>effortless.</em><br />The thinking behind it never is.</p></Parallax><Parallax className="p-manifesto-end" distance={18}>DESIGNED TO MATTER. BUILT TO LAST. <span>↗</span></Parallax></section>
    <section className="p-section p-experience" id="experience" aria-labelledby="experience-heading"><Index number="03" label="THE JOURNEY" /><div className="p-heading"><Parallax distance={25}><p className="p-kicker">WHERE I&apos;VE MADE AN IMPACT</p><h2 id="experience-heading">A path of <em>progress.</em></h2></Parallax></div><div className="p-experience-list">{EXPERIENCES.map((job, index) => <Parallax className="p-experience-row" distance={index % 2 ? 30 : 18} key={job.company}><span>0{index + 1}</span><div><h3>{job.role}</h3><p>{job.description}</p></div><span>{job.company}</span><span>{job.period}</span><ArrowUpRight /></Parallax>)}</div><Parallax className="p-skill-line" distance={18}><span>TOOLKIT /</span><p>{SKILLS.slice(0, 10).join(" · ")}</p></Parallax></section>
    <section className="p-section p-ai" aria-labelledby="ai-heading"><Parallax className="p-ai-symbol" distance={40}>✦</Parallax><Parallax className="p-ai-copy" distance={25}><p className="p-kicker">BEYOND THE TOOLKIT</p><h2 id="ai-heading">Engineering<br />with <em>intelligence.</em></h2><p>I use AI to expand the space of what&apos;s possible, while keeping human judgment at the center of every decision.</p><Link className="p-text-link" href="/ai-engineering">Explore my approach <ArrowUpRight size={17} /></Link></Parallax><span className="p-ai-note">HUMAN JUDGMENT / MACHINE INTELLIGENCE</span></section>
    <section className="p-contact" id="contact" aria-labelledby="contact-heading"><Index number="04" label="LET&apos;S CONNECT" /><Parallax className="p-contact-main" distance={30}><p className="p-kicker">HAVE SOMETHING IN MIND?</p><h2 id="contact-heading">Let&apos;s make<br /><em>it happen.</em></h2><a href={SOCIAL_LINKS.email.url} className="p-contact-button">Start a conversation <ArrowUpRight /></a></Parallax><div className="p-contact-bottom"><span>IDEAS ARE BETTER IN MOTION.</span><div><a href={SOCIAL_LINKS.linkedin.url} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin /></a><a href={SOCIAL_LINKS.github.url} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github /></a><a href={SOCIAL_LINKS.email.url} aria-label="Email"><Mail /></a></div></div></section>
    <footer className="p-footer"><span>© 2026 NISHANT BARUAH</span><span>BUILT WITH INTENTION <ArrowRight size={12} /></span><a href="#top">BACK TO TOP ↑</a></footer>
  </main>;
}
