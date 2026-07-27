"use client";
import { UserButton } from "@clerk/nextjs";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Blogs", href: "#blogs" },
  { label: "Contact", href: "#contact" },
];

export default function Header({ user, customClass = "" }: any) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const menuRef = useRef<HTMLElement | null>(null);
  const isNoTransparent = customClass.includes("no-transparent");

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 50);
      setHidden(currentY > lastScrollY && currentY > 100);
      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const syncUser = async () => {
      if (user) {
        try {
          await fetch('/api/users/sync', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              clerkId: user.id,
              email: user.primaryEmailAddress?.emailAddress,
              firstName: user.firstName,
              lastName: user.lastName,
              imageUrl: user.imageUrl,
            }),
          });
        } catch (error) {
          console.error('Failed to sync user', error);
        }
      }
    };
    syncUser();
  }, [user]);

  useEffect(() => {
    if (!headerRef.current) {
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: -16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    }, headerRef);

    return () => context.revert();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!menuRef.current) {
      return;
    }

    const context = gsap.context(() => {
      if (isMobileMenuOpen) {
        gsap.fromTo(
          menuRef.current,
          { x: 28, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.35, ease: "power2.out" }
        );
      }
    }, menuRef);

    return () => context.revert();
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const router = useRouter();
  const pathname = usePathname();
  const useDarkHeader = isNoTransparent;

  const navHref = (href: string) => (pathname === "/" ? href : `/${href}`);

  const headerShellClass = useDarkHeader
    ? "bg-slate-950/95 text-white border-b border-white/10 shadow-[0_16px_40px_rgba(2,6,23,0.22)]"
    : scrolled
      ? "bg-white/95 text-slate-950 border-b border-slate-200/80 shadow-sm"
      : "bg-white/88 text-slate-950 border-b border-slate-200/70 shadow-sm";

  const navLinkClass = useDarkHeader
    ? "text-sm font-medium text-slate-200 transition-colors hover:text-white"
    : "text-sm font-medium text-slate-700 transition-colors hover:text-[var(--page-accent)]";

  const actionButtonClass = useDarkHeader
    ? "rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:border-white/25 hover:bg-white/10"
    : "rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-current transition hover:border-[var(--page-accent)] hover:text-[var(--page-accent)]";

  const handleLogoClick = () => {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 z-[102] w-full transition-all duration-300 backdrop-blur-xl ${headerShellClass} ${hidden ? "-translate-y-full" : ""}`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div
            onClick={handleLogoClick}
            className={`cursor-pointer text-lg font-semibold tracking-wide ${useDarkHeader ? "text-white" : "text-[var(--page-accent)]"}`}
          >
            NextGen Tech
          </div>

          <ul className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <li key={item.label}>
                <a href={navHref(item.href)} className={navLinkClass}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {user ? (
            <div className="hidden items-center gap-3 md:flex">
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: {
                      height: "40px",
                      width: "40px",
                    },
                  },
                }}
              />
              {user?.primaryEmailAddress?.emailAddress === process.env.NEXT_PUBLIC_ADMIN_EMAIL && (
                <Link href="/admin-panel" className={`rounded-full px-4 py-2 text-sm font-medium transition ${useDarkHeader ? "border border-white/15 bg-white/10 text-white hover:bg-white/15" : "border border-slate-200 bg-slate-950 text-white hover:border-slate-950 hover:bg-slate-900"}`}>
                  Admin Panel
                </Link>
              )}
            </div>
          ) : (
            <div className="hidden items-center gap-3 md:flex">
              <Link href="/sign-in" className={actionButtonClass}>
                Login
              </Link>
              <Link href="/sign-up" className={`rounded-full px-4 py-2 text-sm font-medium text-white transition ${useDarkHeader ? "bg-white/15 hover:bg-white/20" : "bg-[var(--page-text)] hover:bg-[var(--page-accent)]"}`}>
                Signup
              </Link>
            </div>
          )}

          <button
            type="button"
            className="inline-flex flex-col gap-1.5 rounded-full border border-current/10 p-3 md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
          >
            <span className="h-0.5 w-5 bg-current"></span>
            <span className="h-0.5 w-5 bg-current"></span>
            <span className="h-0.5 w-5 bg-current"></span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[101] bg-slate-950/40 backdrop-blur-sm md:hidden"
            onClick={toggleMobileMenu}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.aside
            ref={menuRef}
            initial={{ x: 48, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 48, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed right-0 top-0 z-[102] flex h-full w-[82vw] max-w-sm flex-col border-l border-slate-200 bg-white px-6 py-8 text-slate-900 shadow-2xl md:hidden"
          >
            <div className="mb-10 flex items-center justify-between">
              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--page-accent)]">Menu</span>
              <button type="button" onClick={toggleMobileMenu} className="text-sm text-slate-500">Close</button>
            </div>
            <nav className="flex flex-1 flex-col gap-5">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={navHref(item.href)}
                  onClick={toggleMobileMenu}
                  className="border-b border-slate-200 pb-4 text-lg font-medium"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="mt-8 grid gap-3">
              <Link href="/sign-in" className="rounded-full border border-slate-300 px-4 py-3 text-center text-sm font-medium">
                Login
              </Link>
              <Link href="/sign-up" className="rounded-full bg-[var(--page-text)] px-4 py-3 text-center text-sm font-medium text-white">
                Signup
              </Link>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
