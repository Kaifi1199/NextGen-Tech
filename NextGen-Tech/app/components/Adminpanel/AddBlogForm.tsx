"use client";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import dynamic from "next/dynamic";
import Spinner from "../Spinner";
import { motion } from "framer-motion";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

export default function Page() {
  const editor = useRef(null);
  const id = useSearchParams().get("id");
  const [blog, setBlog] = useState<any>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    shortDescription: Yup.string()
      .required("Short Description is required")
      .max(60, "Description can be max 60 characters"),
    content: Yup.string().required("Content is required"),
  });

  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        const res = await fetch(`/api/blogs/${id}`);
        const data = await res.json();
        setBlog(data);
      };
      fetchBlog();
    }
  }, [id]);

  const handleSubmit = async () => {
    const { title, image, content, shortDescription } = formik.values;
    const formData = new FormData();
    formData.append("title", title);
    if (image instanceof File) {
      formData.append("image", image);
    } else if (id && blog?.image) {
      formData.append("existingImage", blog.image);
    }
    formData.append("description", content);
    formData.append("shortDescription", shortDescription);

    try {
      setLoading(true);
      const endpoint = id ? `/api/blogs/${id}` : "/api/blogs";
      const response = await fetch(endpoint, {
        method: id ? "PATCH" : "POST",
        body: formData,
      });
      if (response?.ok) {
        toast.success(`Blog ${id ? "updated" : "added"} successfully`);
        formik.resetForm();
        router.push("/admin-panel/blogs");
      }
    } catch (error) {
      toast.error("Error uploading blog");
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  const formik:any = useFormik({
    initialValues: {
      title: blog?.title || "",
      image: null,
      content: blog?.description || "",
      shortDescription: blog?.shortDescription || "",
    },
    validationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="mx-auto w-full max-w-4xl"
    >
      <div className="rounded-[28px] border border-slate-200 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-sm sm:p-8">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              {id ? "Edit Blog" : "Add New Blog"}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
              Keep titles, short descriptions, and content focused and readable.
            </p>
          </div>
        </div>

        <Suspense fallback={<Spinner />}>
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">

            <div className="flex flex-col">
              <label htmlFor="title" className="font-medium mb-2">
                Blog Title
              </label>
              <input
                type="text"
                id="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                name="title"
                onBlur={formik.handleBlur}
                placeholder="Enter blog title"
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-[var(--page-accent)]"
              />
              {formik.touched.title && formik.errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.title}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="image" className="font-medium mb-2">
                Blog Image
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                name="image"
                onChange={(e: any) =>
                  formik.setFieldValue("image", e.target.files[0])
                }
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900"
              />
              {formik.touched.image && formik.errors.image && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.image}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="shortDescription" className="font-medium mb-2">
                Blog Short Description
              </label>
              <input
                type="text"
                id="shortDescription"
                name="shortDescription"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.shortDescription}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-[var(--page-accent)]"
              />
              {formik.touched.shortDescription &&
                formik.errors.shortDescription && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.shortDescription}
                  </p>
                )}
            </div>

            <div className="flex flex-col">
              <label className="font-medium mb-2">Blog Content</label>
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <JoditEditor
                  ref={editor}
                  value={formik.values.content}
                  onChange={(newContent) =>
                    formik.setFieldValue("content", newContent)
                  }
                />
              </div>
              {formik.touched.content && formik.errors.content && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.content}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="max-w-xs rounded-full bg-[var(--page-text)] px-6 py-3 font-medium text-white transition hover:bg-[var(--page-accent)]"
            >
              {loading ? <Spinner /> : "Save Blog"}
            </button>
          </form>
        </Suspense>
      </div>
    </motion.section>
  );
}
