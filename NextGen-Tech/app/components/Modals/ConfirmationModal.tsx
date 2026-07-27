export default function ConfirmationModal({
  show,
  onHide,
  handleDelete,
  title = "Delete item",
  description = "Are you sure you want to delete this item?",
  confirmLabel = "Delete",
}: any) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.22)]">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
          <button
            onClick={onHide}
            className="grid h-9 w-9 place-items-center rounded-full text-xl font-bold text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          >
            &times;
          </button>
        </div>
        <div className="py-6 text-center">
          <p className="mb-6 text-sm leading-6 text-slate-600">
            {description}
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={handleDelete}
              className="rounded-full bg-rose-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-rose-700 focus:outline-none focus:ring-4 focus:ring-rose-200"
            >
              {confirmLabel}
            </button>
            <button
              onClick={onHide}
              className="rounded-full bg-slate-100 px-5 py-2.5 text-sm font-medium text-slate-800 transition hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-slate-200"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
