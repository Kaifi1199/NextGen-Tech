import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { FiChevronDown } from "react-icons/fi";
import { toast } from "react-toastify";
import ConfirmationModal from "../Modals/ConfirmationModal";
import Pagination from "../Pagination";
import Link from "next/link";
import Spinner from "../Spinner";
import { motion } from "framer-motion";

export default function BlogsTable({ data, loading }: any) {
  const [showModal, setShowModal] = useState(false);
  const [updatingStatusId, setUpdatingStatusId] = useState<string | null>(null);
  const [items, setItems] = useState<any[]>([]);
  const [paginatedData, setPaginatedData] = useState<any[]>([]);
  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);
  const [pageRange, setPageRange] = useState({ start: 0, end: 10 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setItems(data ?? []);
  }, [data]);

  useEffect(() => {
    setPaginatedData(items.slice(pageRange.start, pageRange.end));
  }, [items, pageRange]);

  const handlePageChange = (start: number, end: number) => {
    setPageRange({ start, end });
  };

  const handleShowModal = (id: string) => {
    setSelectedDeleteId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDeleteId(null);
  };

  const handleDelete = async () => {
    const previousItems = items;
    try {
      const response = await fetch(`/api/blogs?id=${selectedDeleteId}`, {
        method: "DELETE",
      });
      if (response?.ok) {
        toast.success("Blog deleted successfully");
        const nextItems = previousItems.filter((item) => item._id !== selectedDeleteId);
        setItems(nextItems);
        setPaginatedData(nextItems.slice(pageRange.start, pageRange.end));
        handleCloseModal();
      } else {
        toast.error("Failed to delete blog");
        setItems(previousItems);
        handleCloseModal();
      }
    } catch (error) {
      toast.error("Failed to delete blog");
      setItems(previousItems);
      setPaginatedData(previousItems.slice(pageRange.start, pageRange.end));
      handleCloseModal();
    }
  };

  const handleStatusChange = async (id: any, value: any) => {
    setUpdatingStatusId(id);
    const previousItems = items;
    const nextItems = items.map((item) =>
      item._id === id ? { ...item, status: value } : item
    );
    setItems(nextItems);
    setPaginatedData(nextItems.slice(pageRange.start, pageRange.end));
    try {
      const response = await fetch(`/api/update-blog/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: value }),
      });
      if (response?.ok) {
        const isActive = value === "active";
        toast.success(
          <div className="flex items-start gap-3">
            <div className={`mt-0.5 h-2.5 w-2.5 rounded-full ${isActive ? "bg-emerald-500" : "bg-amber-500"}`} />
            <div>
              <div className="font-semibold text-slate-950">
                Blog status updated
              </div>
              <div className="text-sm text-slate-600">
                It is now marked as {isActive ? "active" : "inactive"}.
              </div>
            </div>
          </div>,
          {
            icon: false,
            className: `${isActive ? "!border-emerald-200" : "!border-amber-200"}`,
          }
        );
      } else {
        setItems(previousItems);
        setPaginatedData(previousItems.slice(pageRange.start, pageRange.end));
        toast.error(
          <div>
            <div className="font-semibold text-slate-950">
              Could not update status
            </div>
            <div className="text-sm text-slate-600">
              The limit for active blogs may have been reached.
            </div>
          </div>,
          { icon: false, className: "!border-amber-200" }
        );
      }
    } catch (error) {
      setItems(previousItems);
      setPaginatedData(previousItems.slice(pageRange.start, pageRange.end));
      toast.error(
        <div>
          <div className="font-semibold text-slate-950">Update failed</div>
          <div className="text-sm text-slate-600">
            The status was restored to its previous value.
          </div>
        </div>,
        { icon: false, className: "!border-rose-200" }
      );
    } finally {
      setUpdatingStatusId(null);
    }
  };

  return (
    <div className="w-full max-w-full overflow-x-auto rounded-[18px] border border-slate-200 bg-white/90 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-sm">
      <div className="container">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-950 text-white text-left">
              <th className="px-4 py-3 text-sm font-medium">No.</th>
              <th className="px-4 py-3 text-sm font-medium">Title</th>
              <th className="px-4 py-3 text-sm font-medium">Status</th>
              <th className="px-4 py-3 text-sm font-medium">Created At</th>
              <th className="px-4 py-3 text-sm font-medium text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  <Spinner />
                </td>
              </tr>
            ) : paginatedData?.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No Blogs found.
                </td>
              </tr>
            ) : (
              paginatedData.map((item: any, index: number) => (
                <motion.tr
                  key={item._id || index}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={index % 2 === 0 ? "bg-white" : "bg-slate-50"}
                >
                  <td className="px-4 py-3 text-sm text-slate-700">{index + 1}</td>
                  <td className="px-4 py-3 text-sm text-slate-900">
                    <div className="max-w-[320px] whitespace-normal font-medium leading-6">
                      {item?.title}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="relative inline-flex">
                      <select
                        value={item.status}
                        onChange={(e) =>
                          handleStatusChange(item._id, e.target.value)
                        }
                        disabled={updatingStatusId === item?._id}
                        className={`min-w-[130px] appearance-none rounded-full border px-4 py-2.5 pr-10 text-sm font-medium outline-none transition-all duration-200 focus:shadow-[0_0_0_4px_rgba(15,118,110,0.12)] disabled:cursor-not-allowed disabled:opacity-70 ${
                          item.status === "active"
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:border-emerald-300 hover:bg-emerald-100"
                            : "border-rose-200 bg-rose-50 text-rose-700 hover:border-rose-300 hover:bg-rose-100"
                        }`}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                      <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700">
                    {item?.createdAt?.slice(0, 10)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap justify-center gap-2">
                      <Link
                        href={`/admin-panel/add-blog?id=${item?._id}`}
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-[var(--page-accent)] hover:text-[var(--page-accent)]"
                      >
                        <FaPencil />
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleShowModal(item._id)}
                        className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700 transition hover:border-rose-300 hover:bg-rose-100"
                      >
                        <FaTrash />
                        Delete
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>

        {!loading && data?.length > 0 && (
          <Pagination
            totalItems={data.length}
            itemsPerPage={10}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      {mounted &&
        createPortal(
          <ConfirmationModal
            show={showModal}
            onHide={handleCloseModal}
            handleDelete={handleDelete}
            title="Delete blog"
            description="Are you sure you want to delete this blog post?"
            confirmLabel="Delete"
          />,
          document.body
        )}
    </div>
  );
}