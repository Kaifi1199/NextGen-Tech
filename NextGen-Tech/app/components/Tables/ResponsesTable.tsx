"use client";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { toast } from "react-toastify";
import ConfirmationModal from "@/app/components/Modals/ConfirmationModal";
import Pagination from "@/app/components/Pagination";
import Spinner from "@/app/components/Spinner";
import { motion } from "framer-motion";

export default function ResponsesTable({ data, loading }: any) {
  const [showModal, setShowModal] = useState(false);
  const [loadingRead, setLoadingRead] = useState<string | null>(null);
  const [items, setItems] = useState<any[]>([]);
  const [paginatedData, setPaginatedData] = useState<any[]>([]);
  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);
  const [pageRange, setPageRange] = useState({ start: 0, end: 10 });

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
      const response = await fetch(`/api/messages?id=${selectedDeleteId}`, {
        method: "DELETE",
      });
      if (response?.ok) {
        toast.success("Message deleted successfully");
        const nextItems = previousItems.filter((item) => item._id !== selectedDeleteId);
        setItems(nextItems);
        setPaginatedData(nextItems.slice(pageRange.start, pageRange.end));
        handleCloseModal();
      }
    } catch (error) {
      toast.error("Failed to delete message");
      setItems(previousItems);
      handleCloseModal();
    }
  };

  const handleMarkAsRead = async (id: any) => {
    setLoadingRead(id);
    const previousItems = items;
    const nextItems = items.map((item) =>
      item._id === id ? { ...item, isRead: true } : item
    );
    setItems(nextItems);
    setPaginatedData(nextItems.slice(pageRange.start, pageRange.end));
    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ isRead: true }),
      });
      if (response?.ok) {
        toast.success("Message marked as read successfully");
      } else {
        setItems(previousItems);
        setPaginatedData(previousItems.slice(pageRange.start, pageRange.end));
        toast.error("Failed to mark message as read");
      }
    } catch (error) {
      setItems(previousItems);
      setPaginatedData(previousItems.slice(pageRange.start, pageRange.end));
      toast.error("Failed to mark message as read");
    } finally {
      setLoadingRead(null);
    }
  };

  return (
    <div className="w-full">
      <div className="container">
        <div className="w-full overflow-x-auto rounded-[28px] border border-slate-200 bg-white/80 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-sm">
          <table className="w-full border-collapse border-spacing-0">
            <thead>
              <tr className="bg-slate-950 text-white">
                <th className="px-4 py-3 text-center text-sm font-medium">
                  No.
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium">
                  Name
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium">
                  Email
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium">
                  Subject
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium">
                  Message
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium">
                  Date
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium">
                  Mark as Read
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={12} className="text-center py-4">
                    <Spinner />
                  </td>
                </tr>
              ) : paginatedData?.length === 0 ? (
                <tr>
                  <td colSpan={12} className="text-center py-4">
                    No messages found.
                  </td>
                </tr>
              ) : (
                paginatedData.map((item: any, index: number) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={index % 2 === 0 ? "bg-white" : "bg-slate-50"}
                  >
                    <td className="px-4 py-3 text-center text-sm text-slate-700">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-slate-900">
                      {item?.name}
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-slate-900">
                      {item?.email}
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-slate-900">
                      {item?.subject}
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-slate-700">
                      <span title={item?.message}>
                        {item?.message?.length > 20
                          ? `${item?.message?.slice(0, 20)}...`
                        : item?.message}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-slate-700">
                      {item?.createdAt?.slice(0, 10)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {item?.isRead ? (
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">Read</span>
                      ) : (
                        <button
                          onClick={() => handleMarkAsRead(item?._id)}
                          className="rounded-full bg-[var(--page-text)] px-3 py-1 text-sm text-white transition hover:bg-[var(--page-accent)] disabled:opacity-60"
                          disabled={loadingRead === item?._id}
                        >
                          {loadingRead === item?._id ? (
                            <Spinner />
                          ) : (
                            "Mark as Read"
                          )}
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div
                        onClick={() => handleShowModal(item?._id)}
                        className="flex cursor-pointer justify-center gap-2 text-rose-600 transition hover:text-rose-800"
                      >
                        <FaTrash />
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
      </div>

      <ConfirmationModal
        show={showModal}
        onHide={handleCloseModal}
        handleDelete={handleDelete}
        title="Delete response"
        description="Are you sure you want to delete this response?"
        confirmLabel="Delete"
      />
    </div>
  );
}
