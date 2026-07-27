"use client";
import React from 'react';
import { motion, Variants } from 'framer-motion';

const statusCard = [
  { title: "5k+", subtitle: "Active users", detail: "People publishing and responding without friction." },
  { title: "500+", subtitle: "Downloads", detail: "Assets and updates moving through the platform." },
  { title: "4.9", subtitle: "Satisfaction", detail: "A clear interface that stays out of the way." },
  { title: "24/7", subtitle: "Availability", detail: "Always on for blogs, messages, and admin work." }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, type: 'spring', stiffness: 100 } }
};

const StatusCards = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <motion.div 
        className="grid gap-px overflow-hidden rounded-[30px] border border-slate-200/80 bg-slate-200/80 md:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {statusCard.map((data, index) => {
          return (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              className="group cursor-default bg-white/90 px-6 py-8 sm:px-8 sm:py-10"
            >
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--page-accent)]">Metric</div>
              <h2 className="mt-4 text-4xl font-semibold leading-none text-[var(--page-text)] sm:text-5xl">
                {data.title}
              </h2>
              <p className="mt-4 text-base font-medium text-[var(--page-text)]">
                {data.subtitle}
              </p>
              <p className="mt-3 text-sm leading-6 text-[var(--page-muted)]">
                {data.detail}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default StatusCards;
