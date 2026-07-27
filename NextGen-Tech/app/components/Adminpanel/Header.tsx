"use client";
import { UserButton } from "@clerk/nextjs";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CiMail } from "react-icons/ci";
import { FaHome, FaRegImage } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { IoIosMenu } from "react-icons/io";
import { TiMessages } from "react-icons/ti";

export default function Header() {
  const [show, setShow] = useState(false);
  const pathname = usePathname();
  const handleShowMenu = () => setShow(!show);

  useEffect(() => {
    setShow(false);
  }, [pathname]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/admin-panel" && pathname.startsWith(`${href}/`));

  const mobileLinkClassName = (href: string) =>
    `flex items-center gap-3 rounded-full px-4 py-2 text-[18px] font-medium transition ${
      isActive(href)
        ? "border border-emerald-200 bg-emerald-50 text-emerald-700 shadow-sm"
        : "text-slate-900 hover:border hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
    }`;

  return (
    <motion.header
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="text-xl font-semibold tracking-tight text-slate-950">
          NextGen Tech Admin
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <UserButton />
          </div>

          <div className="block sm:hidden">
            <button
              onClick={handleShowMenu}
              className="rounded-full border border-slate-200 p-2 text-slate-900"
            >
              <IoIosMenu size={26} />
            </button>

            <AnimatePresence>
              {show && (
                <motion.div
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="fixed left-0 top-[73px] z-[1000] h-[300px] w-full border-b border-slate-200 bg-white/95 px-5 py-4 shadow-xl"
                >
                  <ul className="flex flex-col items-center gap-5">
                    <li>
                      <Link
                        href="/admin-panel"
                        className={mobileLinkClassName("/admin-panel")}
                      >
                        <FaHome /> Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/admin-panel/messages"
                        className={mobileLinkClassName("/admin-panel/messages")}
                      >
                        <CiMail /> Responses
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/admin-panel/add-blog"
                        className={mobileLinkClassName("/admin-panel/add-blog")}
                      >
                        <FaRegMessage /> Add New Blog
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/admin-panel/blogs"
                        className={mobileLinkClassName("/admin-panel/blogs")}
                      >
                        <TiMessages /> View Blogs
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleShowMenu}
                        className="flex items-center justify-center rounded-full border border-slate-200 p-2 text-slate-700 hover:border-[var(--page-accent)] hover:text-[var(--page-accent)]"
                      >
                        <ImCross />
                      </button>
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
