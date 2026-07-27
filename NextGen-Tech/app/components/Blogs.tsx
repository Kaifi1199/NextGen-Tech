'use client';
import React, { useEffect, useState } from 'react';
import { IoMdEye } from "react-icons/io";
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import Image from "next/image";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4 } }
};

const Blogs = () => {
  const [data, setData] = useState<any>([]);
  const router = useRouter();

  const activeBlogs = data?.filter((blog: any) => blog.status === "active");

  const handleUpdateView = async (id: string) => {
    try {
      const response = await fetch(`/api/update-views/${id}`, {
        method: "PATCH"
      });
      if (response?.ok) {
        router.push("/blogs/" + id);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogsData = await fetch('/api/blogs', {
        cache: "no-store"
      });
      const data = await blogsData.json();
      setData(data);
    };
    fetchBlogs();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8" id="blogs">
      <div className="rounded-[32px] border border-slate-200/80 bg-white/75 px-5 py-10 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="section-title text-center text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          Latest writing and updates
        </motion.h2>
        <p className="section-copy mx-auto mt-4 max-w-2xl text-center text-base leading-7">
          Blog entries are presented with more space, softer borders, and a stronger editorial hierarchy.
        </p>
        <motion.div 
          className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {activeBlogs?.map((blog: any, index: number) => (
            <motion.div 
              key={index} 
              variants={cardVariants}
              whileHover={{ y: -4 }}
              className="group flex cursor-pointer flex-col gap-5 overflow-hidden rounded-[26px] border border-slate-200 bg-white transition-transform duration-300 md:flex-row"
              onClick={() => handleUpdateView(blog._id)}
            >
              <div className="relative min-h-[220px] w-full overflow-hidden md:w-[38%]">
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={`/images/blogs/${blog.image}`}
                    alt={blog.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 38vw"
                    className="object-cover"
                  />
                </motion.div>
              </div>
              <div className="flex flex-1 flex-col justify-center p-6">
                <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--page-accent)]">Blog post</div>
                <h3 className="mt-3 text-2xl font-semibold leading-tight text-[var(--page-text)] transition-colors duration-300 group-hover:text-[var(--page-accent)]">
                  {blog.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-[var(--page-muted)]">
                  {blog?.shortDescription?.length > 60
                    ? blog?.shortDescription?.slice(0, 60) + "..."
                    : blog?.shortDescription}
                </p>
                <small className="mt-5 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  <IoMdEye className="h-[18px] w-[18px] text-[var(--page-accent)]" /> {blog.views} views
                </small>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Blogs;
