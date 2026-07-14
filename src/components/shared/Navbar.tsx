/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import {
  usePathname,
  useRouter,
} from "next/navigation";
import {
  useEffect,
  useState,
} from "react";
import {
  FiLayout,
  FiLoader,
  FiLogIn,
  FiLogOut,
  FiMenu,
  FiUserPlus,
  FiX,
} from "react-icons/fi";
import { toast } from "react-toastify";
import ThemeToggle from "./ThemeToggle";
import UserAvatar from "./UserAvatar";
import UserDropdown from "./UserDropdown";

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
  const router = useRouter();

  const {
    data: session,
    isPending,
  } = authClient.useSession();

  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  const [isLoggingOut, setIsLoggingOut] =
    useState(false);

  const user = session?.user;

  const accountLabel =
    user?.role === "admin"
      ? "Admin"
      : user?.accountType === "restaurant_owner"
        ? "Restaurant Owner"
        : "Customer";

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const isActiveRoute = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);

      const { error } = await authClient.signOut();

      if (error) {
        toast.error(
          error.message || "Logout failed.",
        );

        return;
      }

      setIsMenuOpen(false);
      toast.success("You have been logged out.");

      router.push("/");
      router.refresh();
    } catch {
      toast.error("Logout failed. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-(--surface-border) bg-(--page-background)">
      <div className="container-shell">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link
            href="/"
            className="shrink-0 rounded-xl  px-2 py-1"
          >
            <Image
              src="/images/logo.png"
              alt="DineSpot"
              width={180}
              height={70}
              priority
              className="h-14 w-36 object-contain sm:w-40"
            />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navigationItems.map((item) => {
              const isActive =
                isActiveRoute(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-xl px-4 py-2 text-sm font-bold transition ${
                    isActive
                      ? "text-brand-orange"
                      : "text-slate-600 hover:bg-orange-50 hover:text-brand-orange dark:text-slate-300 dark:hover:bg-orange-950/30"
                  }`}
                >
                  {item.label}

                  {isActive && (
                    <span className="absolute inset-x-4 -bottom-1 h-0.5 rounded-full bg-brand-orange" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle />

            {isPending ? (
              <div className="h-11 w-40 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
            ) : user ? (
              <UserDropdown user={user} />
            ) : (
              <>
                <Link
                  href="/login"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-(--surface-border) px-4 text-sm font-bold text-slate-700 transition hover:border-orange-300 hover:text-brand-orange dark:text-slate-200"
                >
                  <FiLogIn />
                  Login
                </Link>

                <Link
                  href="/register"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-brand-orange px-4 text-sm font-bold text-white transition hover:bg-brand-orange-dark"
                >
                  <FiUserPlus />
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />

            <button
              type="button"
              onClick={() =>
                setIsMenuOpen(
                  (previousValue) => !previousValue,
                )
              }
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-(--surface-border) text-xl text-slate-700 dark:text-slate-200"
            >
              {isMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="border-t border-(--surface-border) py-4 lg:hidden">
            <nav className="space-y-1">
              {navigationItems.map((item) => {
                const isActive =
                  isActiveRoute(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block rounded-xl px-4 py-3 text-sm font-bold transition ${
                      isActive
                        ? "bg-orange-50 text-brand-orange dark:bg-orange-950/30"
                        : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-4 border-t border-(--surface-border) pt-4">
              {isPending ? (
                <div className="h-20 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
              ) : user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 rounded-2xl border border-(--surface-border) p-3">
                    <UserAvatar
                      name={user.name}
                      image={user.image}
                      className="h-12 w-12"
                    />

                    <div className="min-w-0">
                      <p className="truncate font-extrabold text-slate-900 dark:text-white">
                        {user.name}
                      </p>

                      <p className="truncate text-sm text-slate-500 dark:text-slate-400">
                        {user.email}
                      </p>

                      <p className="mt-1 text-xs font-bold text-brand-orange">
                        {accountLabel}
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/dashboard"
                    className="flex h-11 items-center justify-center gap-2 rounded-xl bg-brand-orange px-4 text-sm font-bold text-white"
                  >
                    <FiLayout />
                    Dashboard
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-red-200 px-4 text-sm font-bold text-red-600 disabled:opacity-60 dark:border-red-900"
                  >
                    {isLoggingOut ? (
                      <FiLoader className="animate-spin" />
                    ) : (
                      <FiLogOut />
                    )}

                    {isLoggingOut
                      ? "Logging out..."
                      : "Logout"}
                  </button>
                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  <Link
                    href="/login"
                    className="flex h-11 items-center justify-center gap-2 rounded-xl border border-(--surface-border) text-sm font-bold text-slate-700 dark:text-slate-200"
                  >
                    <FiLogIn />
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="flex h-11 items-center justify-center gap-2 rounded-xl bg-brand-orange text-sm font-bold text-white"
                  >
                    <FiUserPlus />
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;