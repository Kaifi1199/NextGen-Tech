import Header from "../components/Adminpanel/Header";
import Sidebar from "../components/Adminpanel/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc,#eef3f8_42%,#e9eef5)] text-slate-900">
      <Header />
      <main className="mx-auto flex max-w-7xl items-start gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <Sidebar />
        <div className="min-w-0 flex-1">{children}</div>
      </main>
    </div>
  );
}
