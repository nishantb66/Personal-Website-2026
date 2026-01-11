"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ArrowDown, Mail, Linkedin, Github, Download, MapPin, Calendar, Briefcase, Building2 } from "lucide-react";
import { ModeToggle } from "@/components/theme-toggle";
import { PERSONAL_INFO, SKILLS, SOCIAL_LINKS, PROJECTS, EXPERIENCES } from "@/lib/constants";

// Custom cursor component with trail
function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      setTrail((prevTrail) => {
        const newTrail = [...prevTrail, { x: e.clientX, y: e.clientY }];
        return newTrail.slice(-3);
      });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", updatePosition);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    const hoverables = document.querySelectorAll("a, button, [data-hover]");
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverStart);
      el.addEventListener("mouseleave", handleHoverEnd);
    });

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
      });
    };
  }, []);

  return (
    <>
      {trail.map((point, i) => (
        <motion.div
          key={i}
          className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference hidden md:block"
          initial={{ x: point.x - 4, y: point.y - 4 }}
          animate={{ x: point.x - 4, y: point.y - 4, opacity: 0.3 - i * 0.1, scale: 1 - i * 0.2 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-2 h-2 rounded-full bg-white" />
        </motion.div>
      ))}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        animate={{ x: position.x - (isHovering ? 24 : 8), y: position.y - (isHovering ? 24 : 8), scale: isVisible ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 600, damping: 30 }}
      >
        <motion.div
          className="rounded-full bg-white"
          animate={{ width: isHovering ? 48 : 16, height: isHovering ? 48 : 16, opacity: isHovering ? 0.5 : 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        />
      </motion.div>
    </>
  );
}

// Animated text reveal
function AnimatedText({ children, className = "", delay = 0 }: { children: string; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const words = children.split(" ");

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : { y: "100%" }}
            transition={{ duration: 0.5, delay: delay + i * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// Section component
function Section({ id, children, className = "", dark = false }: { id: string; children: React.ReactNode; className?: string; dark?: boolean }) {
  return (
    <section id={id} className={`relative min-h-screen w-full ${dark ? 'bg-primary text-primary-foreground' : ''} ${className}`}>
      {children}
    </section>
  );
}

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const sections = ["hero", "about", "work", "experience", "contact"];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const newSection = Math.floor((scrollY + windowHeight / 2) / windowHeight);
      setCurrentSection(Math.min(newSection, sections.length - 1));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections.length]);

  const handleMobileNav = () => setMobileMenuOpen(false);

  return (
    <>
      <CustomCursor />
      <div className="noise" />
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-primary origin-left z-50" style={{ scaleX }} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 px-4 py-4 md:px-6 md:py-6 lg:px-12">
        <div className="flex items-center justify-between">
          <Link href="/" className="relative group" data-hover>
            <span className="text-sm font-medium tracking-wide">NISHANT B.</span>
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-current transition-all duration-300 group-hover:w-full" />
          </Link>

          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {sections.slice(1).map((section, i) => (
                <a key={section} href={`#${section}`} className="relative text-xs font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors group" data-hover>
                  <span className="mr-2 text-[10px]">0{i + 1}</span>
                  {section}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-current transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors" data-hover aria-label="Toggle menu">
              <motion.div animate={{ rotate: mobileMenuOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
                {mobileMenuOpen ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                )}
              </motion.div>
            </button>
            <ModeToggle />
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="md:hidden overflow-hidden">
              <div className="pt-4 pb-2 space-y-1">
                {sections.slice(1).map((section, i) => (
                  <a key={section} href={`#${section}`} onClick={handleMobileNav} className="block px-4 py-3 rounded-lg text-sm font-medium uppercase tracking-wider hover:bg-secondary transition-colors" data-hover>
                    <span className="text-muted-foreground mr-3">0{i + 1}</span>{section}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Section indicator */}
      <div className="fixed right-6 md:right-12 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-4">
        {sections.map((section, i) => (
          <a key={section} href={`#${section}`} className="group relative" data-hover>
            <motion.div className="w-2 h-2 rounded-full border border-foreground/30 transition-all duration-300" animate={{ scale: currentSection === i ? 1.5 : 1, backgroundColor: currentSection === i ? "var(--foreground)" : "transparent" }} />
            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{section}</span>
          </a>
        ))}
      </div>

      <div ref={containerRef}>
        {/* Hero Section */}
        <Section id="hero" className="flex flex-col justify-center px-4 md:px-6 lg:px-12 xl:px-24">
          <div className="max-w-7xl mx-auto w-full pt-24 md:pt-32 pb-16 md:pb-20 relative">
            <div className="space-y-6 md:space-y-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex items-center gap-3" style={{ y: useTransform(scrollYProgress, [0, 0.2], [0, -50]) }}>
                <motion.span className="w-8 md:w-12 h-[1px] bg-foreground" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.4, duration: 0.6 }} />
                <span className="text-xs md:text-sm font-medium tracking-widest uppercase text-muted-foreground">{PERSONAL_INFO.role}</span>
              </motion.div>

              <motion.div className="space-y-2 md:space-y-4" style={{ y: useTransform(scrollYProgress, [0, 0.2], [0, -30]) }}>
                <h1 className="display-xl"><AnimatedText delay={0.3}>{PERSONAL_INFO.name}</AnimatedText></h1>
                <h1 className="display-xl text-muted-foreground/30"><AnimatedText delay={0.4}>{PERSONAL_INFO.lastName}</AnimatedText></h1>
              </motion.div>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed" style={{ y: useTransform(scrollYProgress, [0, 0.2], [0, -20]), opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}>
                {PERSONAL_INFO.description}
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4 md:gap-6 pt-6 md:pt-8" style={{ y: useTransform(scrollYProgress, [0, 0.2], [0, -10]), opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}>
                <a href="#work" className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-primary text-primary-foreground rounded-full font-medium transition-all duration-300 hover:gap-5 hover:shadow-xl text-sm md:text-base" data-hover>
                  View Work<ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
                </a>
                <a href="#contact" className="group inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-300 text-sm md:text-base" data-hover>
                  <span>Let's talk</span><ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </motion.div>
            </div>
          </div>
        </Section>

        {/* About Section */}
        <Section id="about" className="flex items-center px-4 md:px-6 lg:px-12 xl:px-24 py-20 md:py-32">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">
              <div className="space-y-6 md:space-y-8">
                <div className="flex items-center gap-3">
                  <span className="text-xs md:text-sm font-medium tracking-widest uppercase text-muted-foreground">01</span>
                  <span className="w-8 md:w-12 h-[1px] bg-muted-foreground" />
                  <span className="text-xs md:text-sm font-medium tracking-widest uppercase text-muted-foreground">About</span>
                </div>
                <h2 className="display-md"><AnimatedText>Building digital experiences that matter</AnimatedText></h2>
                <div className="space-y-4 md:space-y-6 text-sm md:text-base text-muted-foreground leading-relaxed">
                  <p>I'm a BTech Computer Engineering student at NMIMS with a passion for crafting elegant solutions to complex problems. My expertise spans backend development, machine learning, and cloud architecture.</p>
                  <p>Through multiple internships at industry leaders like BPCL, ONGC, and Mahindra, I've developed production-ready systems that drive real business impact.</p>
                </div>
                <div className="flex items-center gap-3 md:gap-4 pt-2 md:pt-4">
                  <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-xs md:text-sm text-muted-foreground">{PERSONAL_INFO.location}</span>
                </div>

                {/* AI Engineering Link */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                  className="pt-6 md:pt-8"
                >
                  <Link
                    href="/ai-engineering"
                    className="group inline-flex items-center gap-3 px-5 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-full font-medium transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
                    data-hover
                  >
                    <span className="text-sm md:text-base bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                      Engineering with AI
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-primary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Link>
                </motion.div>
              </div>

              <div className="space-y-6 md:space-y-8">
                <h3 className="text-xs md:text-sm font-medium tracking-widest uppercase text-muted-foreground">Technologies</h3>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {SKILLS.map((skill, i) => (
                    <motion.span key={skill} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} viewport={{ once: true }} className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm border border-border rounded-full hover:bg-secondary transition-colors cursor-default" data-hover>
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Work Section - Large Text Professional Cards */}
        <Section id="work" dark className="py-20 md:py-32">
          <div className="px-4 md:px-6 lg:px-12 xl:px-24">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-3 mb-12 md:mb-16">
                <span className="text-xs md:text-sm font-medium tracking-widest uppercase text-primary-foreground/60">02</span>
                <span className="w-8 md:w-12 h-[1px] bg-primary-foreground/30" />
                <span className="text-xs md:text-sm font-medium tracking-widest uppercase text-primary-foreground/60">Selected Work</span>
              </div>

              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                {PROJECTS.map((project, i) => (
                  <motion.a
                    key={i}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="group block"
                    data-hover
                  >
                    <div
                      className="relative h-[350px] md:h-[400px] rounded-2xl overflow-hidden p-6 md:p-10 flex flex-col justify-between transition-all duration-500 hover:shadow-2xl"
                      style={{
                        background: `linear-gradient(135deg, ${project.color}15 0%, ${project.color}05 100%)`,
                        border: `1px solid ${project.color}30`
                      }}
                    >
                      {/* Hover gradient overlay */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: `linear-gradient(135deg, ${project.color}25 0%, ${project.color}10 100%)` }}
                      />

                      {/* Top row */}
                      <div className="relative z-10 flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-primary-foreground/60" />
                          <span className="text-xs font-medium tracking-widest uppercase text-primary-foreground/70">{project.company}</span>
                        </div>
                        <div
                          className="px-3 py-1 rounded-full text-xs font-medium tracking-wider text-primary-foreground"
                          style={{ backgroundColor: `${project.color}40` }}
                        >
                          {project.year}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="relative z-10 space-y-4">
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground leading-tight group-hover:translate-x-2 transition-transform duration-300">
                          {project.title}
                        </h3>
                        <p className="text-sm md:text-base text-primary-foreground/70 leading-relaxed max-w-md">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {project.tech.map((t) => (
                            <span
                              key={t}
                              className="text-xs px-3 py-1 rounded-full border text-primary-foreground/80"
                              style={{ borderColor: `${project.color}50`, backgroundColor: `${project.color}20` }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        {/* View project indicator */}
                        <div className="flex items-center gap-2 pt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                          <span className="text-sm font-medium text-primary-foreground/80">View Project</span>
                          <ArrowUpRight className="w-4 h-4 text-primary-foreground/80" />
                        </div>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Experience Section - Minimal Elegant Design */}
        <Section id="experience" className="py-20 md:py-32">
          <div className="px-4 md:px-6 lg:px-12 xl:px-24">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-3 mb-16 md:mb-24">
                <span className="text-xs md:text-sm font-medium tracking-widest uppercase text-muted-foreground">03</span>
                <span className="w-8 md:w-12 h-[1px] bg-muted-foreground" />
                <span className="text-xs md:text-sm font-medium tracking-widest uppercase text-muted-foreground">Experience</span>
              </div>

              <div className="space-y-0">
                {EXPERIENCES.map((exp, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="group relative"
                  >
                    {/* Main content row */}
                    <div className="py-8 md:py-12 border-t border-border/50 hover:border-primary/30 transition-colors cursor-default">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">

                        {/* Company & Period */}
                        <div className="md:col-span-4 flex flex-col gap-2">
                          <div className="flex items-center gap-3">
                            <span className="text-lg md:text-xl font-medium text-primary">
                              {exp.company}
                            </span>
                            {exp.current && (
                              <span className="px-2 py-0.5 text-[10px] font-semibold bg-green-500/10 text-green-500 rounded-full border border-green-500/20">
                                NOW
                              </span>
                            )}
                          </div>
                          <span className="text-xs md:text-sm text-muted-foreground">
                            {exp.period}
                          </span>
                        </div>

                        {/* Role - Large Typography */}
                        <div className="md:col-span-8">
                          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight group-hover:translate-x-2 transition-transform duration-300">
                            {exp.role}
                          </h3>
                          <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-xl leading-relaxed">
                            {exp.description}
                          </p>
                        </div>
                      </div>

                      {/* Hover line accent */}
                      <motion.div
                        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary to-primary/30"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>
                ))}

                {/* Final border line */}
                <div className="border-t border-border/50" />
              </div>
            </div>
          </div>
        </Section>

        {/* Contact Section */}
        <Section id="contact" dark className="flex items-center justify-center px-4 md:px-6 lg:px-12 xl:px-24 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-10 md:space-y-12">
            <div className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center justify-center gap-3">
                <span className="text-xs md:text-sm font-medium tracking-widest uppercase opacity-60">04</span>
                <span className="w-8 md:w-12 h-[1px] bg-current opacity-30" />
                <span className="text-xs md:text-sm font-medium tracking-widest uppercase opacity-60">Contact</span>
              </motion.div>

              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }} className="display-lg">
                Let's build something great together
              </motion.h2>

              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }} className="text-base md:text-lg opacity-60 max-w-xl mx-auto">
                I'm currently available for new opportunities. Whether you have a project in mind or just want to chat, feel free to reach out.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} viewport={{ once: true }} className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
              <a href={SOCIAL_LINKS.linkedin.url} target="_blank" rel="noopener noreferrer" className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 md:px-8 py-3 md:py-4 border border-current rounded-full font-medium transition-all hover:bg-white hover:text-black text-sm md:text-base" data-hover>
                <Linkedin className="w-5 h-5" />
                Connect on LinkedIn
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
              <a href={PERSONAL_INFO.resumePath} download className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-white text-black rounded-full font-medium transition-all hover:bg-white/90 text-sm md:text-base" data-hover>
                <Download className="w-5 h-5" />
                Download Resume
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} viewport={{ once: true }} className="flex items-center justify-center gap-6 md:gap-8 pt-8 md:pt-12">
              <a href={SOCIAL_LINKS.linkedin.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity" data-hover>
                <Linkedin className="w-4 h-4" />
                {SOCIAL_LINKS.linkedin.label}
              </a>
              <span className="w-1 h-1 rounded-full bg-current opacity-30" />
              <a href={SOCIAL_LINKS.github.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity" data-hover>
                <Github className="w-4 h-4" />
                {SOCIAL_LINKS.github.label}
              </a>
              <span className="w-1 h-1 rounded-full bg-current opacity-30" />
              <a href={SOCIAL_LINKS.email.url} className="flex items-center gap-2 text-sm uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity" data-hover>
                <Mail className="w-4 h-4" />
                {SOCIAL_LINKS.email.label}
              </a>
            </motion.div>
          </div>
        </Section>

        {/* Footer */}
        <footer className="bg-primary text-primary-foreground px-4 md:px-6 lg:px-12 xl:px-24 py-6 md:py-8 border-t border-white/10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 text-center">
            <span className="text-xs md:text-sm opacity-60">© 2025 Nishant Baruah. All rights reserved.</span>
          </div>
        </footer>
      </div>
    </>
  );
}
