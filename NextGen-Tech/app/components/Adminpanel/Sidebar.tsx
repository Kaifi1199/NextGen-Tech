"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { CiMail } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { TiMessages } from "react-icons/ti";

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || (href !== "/admin-panel" && pathname.startsWith(`${href}/`));

  const linkClassName = (href: string) =>
    `flex items-center gap-4 rounded-2xl px-4 py-3 text-[16px] font-medium transition ${
      isActive(href)
        ? "border border-emerald-200 bg-emerald-50 text-emerald-700 shadow-sm"
        : "text-slate-700 hover:border hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
    }`;

  return (
    <motion.aside
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45 }}
      className="hidden h-fit w-[280px] shrink-0 self-start rounded-[28px] border border-slate-200 bg-white/80 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-sm md:block md:sticky md:top-24"
    >
      <div className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--page-accent)]">Navigation</div>
      <ul className="space-y-3">
        <li>
          <Link
            href="/admin-panel"
            className={linkClassName("/admin-panel")}
          >
            <FaHome /> Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/admin-panel/messages"
            className={linkClassName("/admin-panel/messages")}
          >
            <CiMail /> Responses
          </Link>
        </li>
        <li>
          <Link
            href="/admin-panel/add-blog"
            className={linkClassName("/admin-panel/add-blog")}
          >
            <FaRegMessage /> Add New Blog
          </Link>
        </li>
        <li>
          <Link
            href="/admin-panel/blogs"
            className={linkClassName("/admin-panel/blogs")}
          >
            <TiMessages /> View Blogs
          </Link>
        </li>
      </ul>
    </motion.aside>
  );
}
