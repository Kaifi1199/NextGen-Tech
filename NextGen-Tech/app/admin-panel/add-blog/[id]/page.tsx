"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import Spinner from "../../../components/Spinner";
import { motion } from "framer-motion";

const AddBlogForm = dynamic(
    () => import("../../../components/Adminpanel/AddBlogForm"),
    { ssr: false }
);

export default function Page() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="w-full"
        >
            <Suspense fallback={<Spinner />}>
                <AddBlogForm />
            </Suspense>
        </motion.div>
    );
}