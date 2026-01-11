"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Sparkles, Mail, ArrowUpRight } from "lucide-react";
import { AI_ENGINEERING } from "@/lib/constants";

export default function AIEngineeringPage() {
    return (
        <main className="min-h-screen bg-background">
            {/* Noise overlay */}
            <div className="noise" />

            {/* Back button */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="fixed top-6 left-4 md:left-6 lg:left-12 z-50"
            >
                <Link
                    href="/"
                    className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 backdrop-blur-sm border border-border hover:border-primary/30 transition-all duration-300"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    <span className="text-sm font-medium">Back</span>
                </Link>
            </motion.div>

            {/* Main content */}
            <div className="relative max-w-6xl mx-auto px-4 md:px-6 lg:px-12 py-20 md:py-32">
                {/* Decorative gradient orbs */}
                <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-accent-2/10 rounded-full blur-[100px] pointer-events-none" />

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-20 md:mb-32"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <Sparkles className="w-5 h-5 text-primary" />
                        <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
                            {AI_ENGINEERING.subtitle}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
                        {AI_ENGINEERING.title}
                    </h1>
                </motion.div>

                {/* Content sections */}
                <div className="space-y-16 md:space-y-24 relative z-10">
                    {AI_ENGINEERING.sections.map((section, index) => {
                        if (section.type === "hero") {
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="max-w-4xl"
                                >
                                    <p className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                                        {section.text}
                                    </p>
                                </motion.div>
                            );
                        }

                        if (section.type === "highlight") {
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="relative"
                                >
                                    <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-primary/30" />
                                    <div className="pl-8 md:pl-12 py-8 md:py-12 bg-primary/5 border border-primary/20 rounded-2xl">
                                        <p className="text-xl md:text-2xl lg:text-3xl font-semibold leading-relaxed text-primary">
                                            {section.text}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        }

                        if (section.type === "conclusion") {
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="max-w-5xl pt-12 md:pt-16"
                                >
                                    <div className="space-y-6">
                                        <p className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                                            {section.main}
                                        </p>
                                        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                                            {section.sub}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        }

                        // Regular paragraph
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="max-w-4xl"
                            >
                                <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-muted-foreground">
                                    {section.text}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Discussion CTA - Unique and Professional */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-32"
                >
                    <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/5 via-background to-background p-1">
                        {/* Gradient border effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5 opacity-50" />

                        <div className="relative bg-background rounded-3xl p-8 md:p-12 lg:p-16">
                            {/* Decorative corner accent */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />

                            <div className="relative z-10 max-w-3xl">
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                                            Let's discuss engineering with AI
                                        </h3>
                                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                                            Curious about my approach? Want to explore how AI amplifies engineering capabilities?
                                            I'm always open to meaningful conversations about building better systems.
                                        </p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
                                        <a
                                            href="mailto:nishantbaruah3@gmail.com?subject=Discussion: Engineering with AI"
                                            className="group inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-primary text-primary-foreground rounded-full font-medium transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:scale-105"
                                        >
                                            <Mail className="w-5 h-5" />
                                            <span>Email Me</span>
                                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                        </a>

                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                            <span>Usually respond within 24 hours</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Bottom navigation */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-12 pt-8 border-t border-border"
                >
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <Link
                            href="/"
                            className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                            Back to Home
                        </Link>

                        <Link
                            href="/#work"
                            className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            View My Work
                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
