import Image from "next/image";
import Link from "next/link";
import {
  FiArrowUpRight,
  FiMapPin,
  FiMessageCircle,
} from "react-icons/fi";
import { FaGithub } from "react-icons/fa";

type FooterLink = {
  label: string;
  href: string;
};

const quickLinks: FooterLink[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Explore Restaurants",
    href: "/explore",
  },
  {
    label: "About DineSpot",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

const accountLinks: FooterLink[] = [
  {
    label: "Login",
    href: "/login",
  },
  {
    label: "Create Account",
    href: "/register",
  },
  {
    label: "Privacy Policy",
    href: "/privacy",
  },
  {
    label: "Terms and Conditions",
    href: "/terms",
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-green-800 bg-brand-green text-white dark:border-slate-800 dark:bg-slate-950">
      <div className="container-shell">
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-12 lg:py-16">
          {/* Brand section */}
          <div>
            <Link
              href="/"
              aria-label="Go to DineSpot homepage"
              className="inline-flex overflow-hidden rounded-xl  p-1"
            >
              <Image
                src="/images/logo.png"
                alt="DineSpot"
                width={600}
                height={320}
                className="h-14 w-47.5 scale-[1.12] object-cover object-center"
              />
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/70">
              DineSpot helps food lovers discover trusted restaurants, explore
              different cuisines and reserve tables through one simple
              platform.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="https://github.com/Tahaimage8"
                target="_blank"
                rel="noreferrer"
                aria-label="Visit developer GitHub profile"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-xl transition-all duration-200 hover:border-brand-yellow hover:bg-brand-yellow hover:text-brand-green"
              >
                <FaGithub />
              </a>

              <a
                href="https://github.com/Tahaimage8/DineSpot-client"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 text-sm font-semibold transition-all duration-200 hover:border-brand-yellow hover:bg-brand-yellow hover:text-brand-green"
              >
                Client Repository
                <FiArrowUpRight />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h2 className="text-base font-bold text-white">Quick Links</h2>

            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex text-sm text-white/70 transition-colors duration-200 hover:text-brand-yellow"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account links */}
          <div>
            <h2 className="text-base font-bold text-white">Account</h2>

            <ul className="mt-5 space-y-3">
              {accountLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex text-sm text-white/70 transition-colors duration-200 hover:text-brand-yellow"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact section */}
          <div>
            <h2 className="text-base font-bold text-white">Get in Touch</h2>

            <div className="mt-5 space-y-4">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-brand-yellow">
                  <FiMapPin className="text-lg" />
                </span>

                <div>
                  <p className="text-sm font-semibold text-white">Location</p>
                  <p className="mt-1 text-sm text-white/70">
                    Dhaka, Bangladesh
                  </p>
                </div>
              </div>

              <Link
                href="/contact"
                className="flex items-start gap-3 rounded-xl transition-opacity duration-200 hover:opacity-80"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-brand-yellow">
                  <FiMessageCircle className="text-lg" />
                </span>

                <div>
                  <p className="text-sm font-semibold text-white">
                    Customer Support
                  </p>

                  <p className="mt-1 text-sm text-white/70">
                    Send us a message
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} DineSpot. All rights reserved.</p>

          <p>
            Discover <span className="text-brand-yellow">•</span> Dine{" "}
            <span className="text-brand-yellow">•</span> Reserve
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;