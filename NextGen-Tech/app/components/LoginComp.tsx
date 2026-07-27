"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const LoginComp = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
    >
      <div className="relative overflow-hidden rounded-[32px] border border-slate-200/80 bg-slate-950 px-6 py-14 text-center text-white shadow-[0_20px_80px_rgba(15,23,42,0.12)] sm:px-10 lg:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(15,118,110,0.18),transparent_28%)]" />
        <Image
          src="/images/cta-line.png"
          alt=""
          fill
          aria-hidden="true"
          className="pointer-events-none absolute left-[-2rem] top-1/2 hidden h-auto w-auto -translate-y-1/2 opacity-40 sm:block"
          style={{ objectFit: "contain" }}
        />
        <Image
          src="/images/cta-line2.png"
          alt=""
          fill
          aria-hidden="true"
          className="pointer-events-none absolute right-[-2rem] top-1/2 hidden h-auto w-auto -translate-y-1/2 opacity-40 sm:block"
          style={{ objectFit: "contain" }}
        />

        <div className="relative z-10 mx-auto max-w-3xl">
          <div className="section-label text-[11px] font-semibold text-cyan-200">Call to action</div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
            Use the platform with a clearer starting point.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300">
            A cleaner entry area gives people two obvious paths and keeps the rest of the page from feeling noisy.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {/* <a href="/sign-in" className="rounded-full bg-white px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-100">
              Log in
            </a>
            <a href="/sign-up" className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition hover:border-white hover:bg-white/10">
              Create account
            </a> */}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default LoginComp;
