"use client";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import DOMPurify from "dompurify";
import Spinner from "@/app/components/Spinner";
import { useUser } from "@clerk/nextjs";
export default function Page() {
  const params = useParams();
  const id = params?.id;
  const [blog, setBlog] = useState<any>(null);
  console.log("blog", blog);
  const { user } = useUser();
  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        const res = await fetch(`/api/blogs/${id}`, {
          cache: "no-store",
        });
        const data = await res.json();
        setBlog(data);
      };
      fetchBlog();
    }
  }, [id]);
  if (!blog)
    return (
      <div className="blog-detail-page text-center">
        <Spinner />
      </div>
    );
  return (
    <>
      <Header user={user} />
      <div className="max-w-[800px] mx-auto mt-20 p-4 font-sans h-[100vh]">
        <Link
          href="/"
          className="flex items-center gap-1 text-gray-700 hover:text-black mb-4 text-base font-medium"
        >
          <BiChevronLeft size={20} />
          <span>Back to Home</span>
        </Link>

        <div className="bg-white rounded-xl shadow-md p-8 text-left">
          <img
            src={`/images/blogs/${blog.image}`}
            alt={blog.title}
            className="w-full max-h-[400px] object-cover rounded-lg mb-6"
          />
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">
            {blog.title}
          </h1>
          <p className="text-gray-700 mb-4">{blog?.shortDescription}</p>
          <div
            className="text-gray-600 text-base leading-relaxed whitespace-pre-wrap"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(blog.description),
            }}
          />
        </div>
      </div>

      <Footer />
    </>
  );
}
