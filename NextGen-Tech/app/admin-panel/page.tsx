"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const [data, setData] = useState<any>(false);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/api/dashboard-data", {
        cache: "no-store",
      });
      const res = await data.json();
      setData(res);
    };
    fetchData();
  }, []);
  const cards = [
    {
      title: "Responses",
      count: data?.messagesCount || 0, // Replace with dynamic value later
      route: "/admin-panel/messages",
    },
    {
      title: "Blogs",
      count: data?.blogsCount || 0, // Replace with dynamic value later
      route: "/admin-panel/blogs",
    },
  ];
  return (
    <div className="w-full max-w-full">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="rounded-[28px] border border-slate-200 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-sm"
      >
        <div className="mb-6">
          <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--page-accent)]">Overview</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">Dashboard</h1>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
            A clearer admin surface for quick review, editing, and moderation.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card, index) => (
          <Link
            key={index}
            href={card.route}
            className="block"
          >
            <motion.div
              whileHover={{ y: -4 }}
              className="cursor-pointer rounded-[24px] border border-slate-200 bg-slate-50 p-6 text-center transition-shadow duration-200 hover:shadow-md"
            >
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--page-accent)]">
                {card.title}
              </h2>
              <p className="text-4xl font-semibold text-slate-950">{card.count}</p>
            </motion.div>
          </Link>
        ))}
        </div>
      </motion.div>
    </div>
  );
}
