'use client';
import React, { useState } from "react";
import Image from "next/image";
import contactImage from "@/public/images/contactUs.webp";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import { motion } from "framer-motion";

const ContactUs = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    subject: Yup.string().required("Subject is required"),
    message: Yup.string().required("Message is required"),
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const data = formik.values;
    setLoading(true);
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (response?.ok) {
        toast.success("Message sent successfully");
        formik.resetForm();
        setLoading(false);
      }
    } catch (error) {
      toast.error("Failed to send message");
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid items-center gap-8 rounded-[32px] border border-slate-200/80 bg-white/75 px-5 py-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-sm lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50 p-6"
        >
          <div className="absolute left-[-4rem] top-[-4rem] h-40 w-40 rounded-full bg-[rgba(14,165,233,0.12)] blur-3xl" />
          <div className="absolute bottom-[-4rem] right-[-4rem] h-44 w-44 rounded-full bg-[rgba(15,118,110,0.12)] blur-3xl" />
          <Image
            src={contactImage}
            alt="Contact"
            width={500}
            height={400}
            className="relative z-10 h-auto w-full object-contain"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="rounded-[28px] border border-slate-200 bg-white p-6 sm:p-8"
        >
          <div className="section-label text-[11px] font-semibold">Contact</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--page-text)]">Let us know what you want to build</h2>
          <p className="section-copy mt-4 max-w-xl text-base leading-7">
            Use this form for product questions, collaboration, or anything that needs a thoughtful reply.
          </p>
          <form onSubmit={formik.handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Your Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[var(--page-accent)]"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="mt-1 text-sm text-red-500">{formik.errors.name}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[var(--page-accent)]"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="Enter subject"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[var(--page-accent)]"
                value={formik.values.subject}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.subject && formik.errors.subject && (
                <p className="mt-1 text-sm text-red-500">{formik.errors.subject}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Message</label>
              <textarea
                name="message"
                placeholder="Write your message"
                rows={4}
                className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[var(--page-accent)]"
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.message && formik.errors.message && (
                <p className="mt-1 text-sm text-red-500">{formik.errors.message}</p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="rounded-full bg-[var(--page-text)] px-6 py-3 text-sm font-medium text-white transition hover:bg-[var(--page-accent)] disabled:opacity-50"
              >
                {loading ? <Spinner /> : "Send"}
              </button>
              <span className="text-sm text-slate-500">We normally reply within one business day.</span>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactUs;
