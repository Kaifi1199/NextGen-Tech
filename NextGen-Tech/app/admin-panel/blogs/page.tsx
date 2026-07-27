"use client";
import BlogsTable from "@/app/components/Tables/BlogsTable";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const response = await fetch("/api/blogs",{
        cache : "no-store"
      });
      const data = await response.json();
      setData(data);
      setLoading(false);
    };
    getData();
  }, []);
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="w-full max-w-full"
    >
      <div className="mb-4 rounded-[22px] border border-slate-200 bg-white/80 px-5 py-4 shadow-[0_16px_40px_rgba(15,23,42,0.05)] backdrop-blur-sm">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--page-accent)]">Content</div>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Published blogs</h1>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-600">
            Review, edit, activate, or remove articles.
          </p>
        </div>
      </div>
      <BlogsTable data={data} loading={loading} />
    </motion.section>
  );
}
