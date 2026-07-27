'use client';
import React from "react";
import { motion } from "framer-motion";
import { CiMonitor, CiCloud, CiShoppingCart } from "react-icons/ci";
import { MdOutlineSecurity } from "react-icons/md";
import { GiMaterialsScience } from "react-icons/gi";
import { SiMusicbrainz } from "react-icons/si";

const serviceCard = [
  { title: "Software Development", icon: <CiMonitor />, description: "Product-focused interfaces and internal tools built with the same care as the front page." },
  { title: "Cloud & DevOps Services", icon: <CiCloud />, description: "Deployment flows and infrastructure support that stay stable under change." },
  { title: "Cybersecurity", icon: <MdOutlineSecurity />, description: "Practical hardening and access controls for a safer digital surface." },
  { title: "AI & Data Science", icon: <GiMaterialsScience />, description: "Useful reporting and pattern-finding without burying people in dashboards." },
  { title: "E-commerce Solutions", icon: <CiShoppingCart />, description: "Buying journeys, catalogs, and checkout flows designed to feel clear." },
  { title: "IoT Monitoring", icon: <SiMusicbrainz />, description: "A focused view for hardware signals, status updates, and alerts." },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
};

const Services = () => {
  return (
    <section id="services" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="section-title text-center text-3xl font-semibold tracking-tight sm:text-4xl"
      >
        Services shaped for a real product
      </motion.h2>
      <p className="section-copy mx-auto mt-4 max-w-2xl text-center text-base leading-7">
        The public site should feel composed, useful, and intentional. Each service block now reads like a designed component instead of a generic tile.
      </p>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="mt-12 overflow-hidden rounded-[32px] border border-slate-200/80 bg-white/75 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:p-8"
      >
        <motion.div 
          className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {serviceCard.map((data, index) => (
            <motion.div key={index} variants={itemVariants} className="group flex h-full flex-col rounded-[24px] border border-slate-200 bg-white p-6 transition-transform duration-300 hover:-translate-y-1">
              <motion.div 
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-2xl text-[var(--page-accent)] transition-colors duration-300 group-hover:border-[var(--page-accent)] group-hover:bg-[rgba(15,118,110,0.08)]"
              >
                {data.icon}
              </motion.div>
              <strong className="mt-5 text-lg font-semibold text-[var(--page-text)] transition-colors group-hover:text-[var(--page-accent)]">
                {data.title}
              </strong>
              <p className="mt-3 text-sm leading-6 text-[var(--page-muted)]">
                {data.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Services;
