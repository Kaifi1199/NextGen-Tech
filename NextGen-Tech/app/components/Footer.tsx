import React from "react";
import { GrFacebookOption } from "react-icons/gr";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io";
import { SiIndeed } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-950 px-4 py-16 text-white sm:px-6 lg:px-8" id="contact">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
        <div>
          <h3 className="text-2xl font-semibold tracking-tight text-white">NextGen Tech</h3>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
            A content platform built for growing businesses that want their public site to feel calm, sharp, and useful.
          </p>
          <div className="mt-6 flex gap-3">
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-[var(--page-accent)] hover:bg-[var(--page-accent)]"
                >
                  <GrFacebookOption />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-[var(--page-accent)] hover:bg-[var(--page-accent)]"
                >
                  <FaXTwitter />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-[var(--page-accent)] hover:bg-[var(--page-accent)]"
                >
                  <IoLogoInstagram />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-[var(--page-accent)] hover:bg-[var(--page-accent)]"
                >
                  <SiIndeed />
                </a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">Features</h4>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li>Editorial blog tools</li>
            <li>Customer message handling</li>
            <li>Clean admin workflows</li>
            <li>Responsive public pages</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">Company</h4>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li>About us</li>
            <li>Privacy policy</li>
            <li>Latest news</li>
            <li>Support</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">Get in touch</h4>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li><a href="tel:+923346510599" className="transition hover:text-white">+92 334 6510599</a></li>
            <li><a href="https://wa.me/923346510599" target="_blank" rel="noopener noreferrer" className="transition hover:text-white">WhatsApp</a></li>
            <li><a href="mailto:2004mkaif@gmail.com" className="transition hover:text-white">2004mkaif@gmail.com</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
