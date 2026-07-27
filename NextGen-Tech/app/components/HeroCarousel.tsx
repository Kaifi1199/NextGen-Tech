"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

const slides = [
  {
    id: 1,
    eyebrow: "Content operations",
    title: "A sharper way to run your brand online",
    description:
      "Create, publish, and manage the parts of your site that actually drive growth. The platform keeps blogs, messages, and updates in one clear workflow.",
    image: "/images/slide1bannerbg.png",
    metric: "Fast setup",
  },
  {
    id: 2,
    eyebrow: "Trust signals",
    title: "Show your work with clarity and polish",
    description:
      "Present reviews, updates, and internal milestones in a layout that feels composed rather than crowded.",
    image: "/images/plug-f1.png",
    metric: "Clean layouts",
  },
  {
    id: 3,
    eyebrow: "Growth insight",
    title: "Move from reporting noise to useful signals",
    description:
      "Track what people read, what they click, and which channels need attention, without making the interface feel like a dashboard clone.",
    image: "/images/plug-f2.png",
    metric: "Useful metrics",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const copyRef = useRef<HTMLDivElement | null>(null);
  const visualRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!heroRef.current) {
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        ".hero-glow",
        { scale: 0.96, opacity: 0.2 },
        { scale: 1, opacity: 1, duration: 1.1, ease: "power2.out" }
      );
    }, heroRef);

    return () => context.revert();
  }, []);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.fromTo(
        copyRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
      );
      gsap.fromTo(
        visualRef.current,
        { y: 30, opacity: 0.8, rotate: -1 },
        { y: 0, opacity: 1, rotate: 0, duration: 0.8, ease: "power3.out" }
      );
    }, heroRef);

    return () => context.revert();
  }, [current]);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden pb-16 pt-28 sm:pt-32"
      id="home"
    >
      <div className="absolute inset-x-0 top-0 h-[680px] bg-[linear-gradient(180deg,rgba(15,23,42,0.02),rgba(15,118,110,0.06)_50%,transparent)]" />
      <div className="hero-glow absolute left-[-8rem] top-16 h-64 w-64 rounded-full bg-[rgba(14,165,233,0.18)] blur-3xl" />
      <div className="hero-glow absolute right-[-7rem] top-40 h-72 w-72 rounded-full bg-[rgba(15,118,110,0.16)] blur-3xl" />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            ref={copyRef}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="relative z-10 flex flex-col justify-center pt-8 lg:pt-20"
          >
            <span className="section-label mb-4 text-[11px] font-semibold">{slides[current].eyebrow}</span>
            <h1 className="max-w-2xl text-4xl font-semibold leading-[1.05] tracking-tight text-[var(--page-text)] sm:text-5xl lg:text-7xl">
              {slides[current].title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-[var(--page-muted)] sm:text-lg">
              {slides[current].description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#services" className="rounded-full bg-[var(--page-text)] px-6 py-3 text-sm font-medium text-white transition hover:bg-[var(--page-accent)]">
                Explore services
              </a>
              <a href="#contact" className="rounded-full border border-slate-300 px-6 py-3 text-sm font-medium text-[var(--page-text)] transition hover:border-[var(--page-accent)] hover:text-[var(--page-accent)]">
                Start a conversation
              </a>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { label: "Workflow", value: slides[current].metric },
                { label: "Tone", value: "Calm and clear" },
                { label: "Motion", value: "GSAP + Framer" },
              ].map((item) => (
                <div key={item.label} className="hero-float rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-4 backdrop-blur-sm">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">{item.label}</div>
                  <div className="mt-2 text-sm font-medium text-slate-900">{item.value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.div
          ref={visualRef}
          key={slides[current].id}
          initial={{ opacity: 0, scale: 0.96, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: -12 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative flex items-center justify-center pt-6 lg:pt-14"
        >
          <div className="hero-float relative w-full max-w-[620px] overflow-hidden rounded-[32px] border border-slate-200/80 bg-white/75 p-4 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:p-6">
            <div className="absolute left-6 top-6 h-24 w-24 rounded-full bg-[rgba(14,165,233,0.14)] blur-2xl" />
            <div className="absolute right-8 top-8 h-28 w-28 rounded-full bg-[rgba(15,118,110,0.14)] blur-2xl" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[26px] border border-slate-200 bg-slate-50">
              <Image
                src={slides[current].image}
                alt={slides[current].title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-4"
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl items-center justify-center gap-3 px-4 sm:px-6 lg:px-8">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrent(index)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              current === index ? "w-10 bg-[var(--page-accent)]" : "w-2.5 bg-slate-300"
            }`}
            aria-label={`Show slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
