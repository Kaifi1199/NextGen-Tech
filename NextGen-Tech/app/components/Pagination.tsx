"use client";

import { useState, useEffect } from "react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage?: number;
  onPageChange: (startIndex: number, endIndex: number) => void;
}

export default function Pagination({
  totalItems,
  itemsPerPage = 10,
  onPageChange,
}: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  useEffect(() => {
    setCurrentPage((current) => {
      if (totalPages === 0) return 1;
      return Math.min(current, totalPages);
    });
  }, [totalPages]);

  useEffect(() => {
    onPageChange(startIndex, endIndex);
  }, [currentPage, startIndex, endIndex]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const visiblePages = Array.from({ length: totalPages }, (_, index) => index + 1).filter(
    (page) => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1
  );

  return (
    <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-3">
      <div className="pl-2 text-sm font-medium text-slate-600">
        Showing {startIndex + 1}-{endIndex} of {totalItems}
      </div>
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-white/80 px-2 py-2 shadow-sm">
        <button
          onClick={() => goToPage(1)}
          disabled={currentPage === 1}
          className={`rounded-full border px-3 py-1.5 text-sm font-medium transition
        ${
          currentPage === 1
            ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
            : "bg-white text-[var(--page-accent)] border-[var(--page-accent)] hover:bg-[var(--page-accent)] hover:text-white"
        }
      `}
        >
          First
        </button>
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`rounded-full border px-3 py-1.5 text-sm font-medium transition
        ${
          currentPage === 1
            ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
            : "bg-white text-[var(--page-accent)] border-[var(--page-accent)] hover:bg-[var(--page-accent)] hover:text-white"
        }
      `}
        >
          Prev
        </button>
        <div className="flex items-center gap-2">
          {visiblePages.map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`min-w-10 rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                page === currentPage
                  ? "border-[var(--page-accent)] bg-[var(--page-accent)] text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-[var(--page-accent)] hover:text-[var(--page-accent)]"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`rounded-full border px-3 py-1.5 text-sm font-medium transition
        ${
          currentPage === totalPages
            ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
            : "bg-white text-[var(--page-accent)] border-[var(--page-accent)] hover:bg-[var(--page-accent)] hover:text-white"
        }
      `}
        >
          Next
        </button>
        <button
          onClick={() => goToPage(totalPages)}
          disabled={currentPage === totalPages}
          className={`rounded-full border px-3 py-1.5 text-sm font-medium transition
        ${
          currentPage === totalPages
            ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
            : "bg-white text-[var(--page-accent)] border-[var(--page-accent)] hover:bg-[var(--page-accent)] hover:text-white"
        }
      `}
        >
          Last
        </button>
      </div>
    </div>
  );
}
