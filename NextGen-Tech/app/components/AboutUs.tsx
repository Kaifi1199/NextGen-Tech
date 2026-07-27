'use client';
import Image from "next/image";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const teamMembers = [
  { name: "Muhammad Abdullah", role: "UX Designer", img: "/images/member2.png" },
  { name: "Maryam Sameen", role: "Head of Marketting", img: "/images/member1.png" },
  { name: "Muhammad Kaif", role: "SEO Specialist", img: "/images/member4.png" },
  { name: "Amy Jackson", role: "Creative Director", img: "/images/member3.png" },
  { name: "Eva Green", role: "Creative developer", img: "/images/member6.png" },
  { name: "Frank White", role: "Managing Director", img: "/images/member7.png" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function AboutUs() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="rounded-[32px] border border-slate-200/80 bg-white/75 px-5 py-10 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:px-8">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="section-title text-center text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          The team behind the work
        </motion.h2>
        <p className="section-copy mx-auto mt-4 max-w-2xl text-center text-base leading-7">
          A calmer team section gives the page room to breathe while still showing the people shaping the product.
        </p>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
        >
          {teamMembers.map((member, index) => (
            <motion.div 
              key={index} 
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="group overflow-hidden rounded-[26px] border border-slate-200 bg-white p-5 text-center transition-transform duration-300"
            >
              <div className="mb-5 flex justify-center">
                <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 250 }}>
                  <Image
                    src={member.img}
                    alt={member.name}
                    width={120}
                    height={120}
                    className="h-[120px] w-[120px] rounded-full object-cover ring-1 ring-slate-200 transition-transform duration-300 group-hover:ring-[var(--page-accent)]"
                  />
                </motion.div>
              </div>
              <h3 className="text-lg font-semibold text-[var(--page-text)]">
                {member.name}
              </h3>
              <p className="mt-2 text-sm text-[var(--page-muted)]">{member.role}</p>
              <div className="mt-5 flex justify-center gap-3 text-base text-slate-500">
                {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn].map((Icon, i) => (
                  <motion.div key={i} whileHover={{ scale: 1.1, color: "#0f766e" }} className="cursor-pointer rounded-full border border-slate-200 p-2 transition-colors duration-300">
                    <Icon />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
