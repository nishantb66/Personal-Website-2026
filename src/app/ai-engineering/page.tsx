"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Mail } from "lucide-react";
import { ModeToggle } from "@/components/theme-toggle";
import { AI_ENGINEERING, SOCIAL_LINKS } from "@/lib/constants";
import "../portfolio.css";

export default function AIEngineeringPage() {
  return <main className="portfolio p-article-page">
    <header className="p-header"><Link className="p-logo" href="/" aria-label="Nishant Baruah home">N<span>.</span>B<span>.</span></Link><nav className="p-nav" aria-label="Page navigation"><Link href="/#work">Work</Link><Link href="/#experience">Experience</Link><Link href="/#contact">Contact</Link></nav><div className="p-header-actions"><ModeToggle /></div></header>
    <div className="p-article-shell"><div className="p-article-top"><Link href="/" className="p-article-back"><ArrowLeft size={16} /> BACK TO HOME</Link><span>AN EXPLORATION / 2026</span></div>
      <motion.section className="p-article-hero" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }}><p className="p-kicker">BEYOND THE TOOLKIT / 001</p><h1>Engineering<br />with <em>intelligence.</em></h1><p>How I use AI to think deeper, move faster, and build with purpose.</p><span className="p-article-sigil">✦</span></motion.section>
      <div className="p-article-grid"><aside><span>MY PERSPECTIVE</span><span>01 — 06</span></aside><div className="p-article-body">{AI_ENGINEERING.sections.map((section, index) => section.type === "conclusion" ? <motion.blockquote key={index} className="p-article-quote" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><span>✦</span><p>{section.main}</p><small>{section.sub}</small></motion.blockquote> : <motion.div key={index} className={`p-article-block p-article-${section.type}`} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .6 }}><span>0{index + 1}</span><p>{section.text}</p></motion.div>)}</div></div>
      <section className="p-article-contact"><p className="p-kicker">CONTINUE THE CONVERSATION</p><h2>Let&apos;s build something<br /><em>meaningful.</em></h2><a href={SOCIAL_LINKS.email.url} className="p-contact-button">Get in touch <Mail size={17} /></a><Link href="/#work" className="p-text-link">View selected work <ArrowUpRight size={17} /></Link></section>
    </div><footer className="p-footer"><span>© 2026 NISHANT BARUAH</span><Link href="/">BACK TO HOME ↑</Link></footer>
  </main>;
}
