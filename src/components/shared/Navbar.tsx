"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  FiLogIn,
  FiMenu,
  FiUserPlus,
  FiX,
} from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";

type NavigationItem = {
  label: string;
  href: string;
};

const navigationItems: NavigationItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Explore",
    href: "/explore",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActiveRoute = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen((previousState) => !previousState);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-(--surface-border) bg-(--page-background)">
      <nav
        className="container-shell"
        aria-label="DineSpot primary navigation"
      >
        <div className="flex h-19 items-center justify-between gap-4">
          {/* Brand */}
          <Link
            href="/"
            onClick={closeMobileMenu}
            aria-label="Go to DineSpot homepage"
            className="shrink-0 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange"
          >
            <span className="flex items-center rounded-xl  px-2 py-1 shadow-sm">
              <Image
                src="/images/logo.png"
                alt="DineSpot"
                width={210}
                height={100}
                priority
                className="h-12 w-36.25 object-contain sm:w-41.25"
              />
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 lg:flex">
            {navigationItems.map((item) => {
              const isActive = isActiveRoute(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-orange-50 text-brand-orange-dark dark:bg-orange-950/50 dark:text-orange-300"
                      : "text-slate-600 hover:bg-slate-100 hover:text-brand-green dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-brand-yellow"
                  }`}
                >
                  {item.label}

                  {isActive && (
                    <span className="absolute inset-x-4 -bottom-4.25 h-0.5 rounded-full bg-brand-orange dark:bg-brand-yellow" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle />

            <Link
              href="/login"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-brand-orange hover:bg-orange-50 hover:text-brand-orange-dark dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-brand-yellow dark:hover:bg-slate-800 dark:hover:text-brand-yellow"
            >
              <FiLogIn className="text-lg" />
              Login
            </Link>

            <Link
              href="/register"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-brand-orange px-5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-brand-orange-dark hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange dark:text-white"
            >
              <FiUserPlus className="text-lg" />
              Sign Up
            </Link>
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />

            <button
              type="button"
              onClick={handleMenuToggle}
              aria-label={
                isMenuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-xl text-slate-700 shadow-sm transition-colors hover:border-brand-orange hover:text-brand-orange dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-brand-yellow dark:hover:text-brand-yellow"
            >
              {isMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div
            id="mobile-navigation"
            className="border-t border-slate-200 py-4 dark:border-slate-800 lg:hidden"
          >
            <div className="flex flex-col gap-2">
              {navigationItems.map((item) => {
                const isActive = isActiveRoute(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileMenu}
                    aria-current={isActive ? "page" : undefined}
                    className={`rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-orange-50 text-brand-orange-dark dark:bg-orange-950/50 dark:text-orange-300"
                        : "text-slate-600 hover:bg-slate-100 hover:text-brand-green dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-brand-yellow"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <div className="mt-2 grid grid-cols-2 gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
                <Link
                  href="/login"
                  onClick={closeMobileMenu}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-orange hover:text-brand-orange dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                >
                  <FiLogIn className="text-lg" />
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={closeMobileMenu}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-brand-orange px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-orange-dark"
                >
                  <FiUserPlus className="text-lg" />
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;