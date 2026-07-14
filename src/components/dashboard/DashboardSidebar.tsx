"use client";

import type { AuthSession } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  FiArrowLeft,
  FiHome,
  FiMenu,
  FiX,
} from "react-icons/fi";
import UserAvatar from "@/components/shared/UserAvatar";

type DashboardSidebarProps = {
  user: AuthSession["user"];
};

const DashboardSidebar = ({
  user,
}: DashboardSidebarProps) => {
  const pathname = usePathname();

  const [isOpen, setIsOpen] =
    useState(false);

  const accountLabel =
    user.role === "admin"
      ? "Admin"
      : user.accountType === "restaurant_owner"
        ? "Restaurant Owner"
        : "Customer";

  return (
    <>
      <button
        type="button"
        onClick={() =>
          setIsOpen((previousValue) => !previousValue)
        }
        className="fixed left-4 top-4 z-50 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green text-xl text-white shadow-lg lg:hidden"
        aria-label="Toggle dashboard sidebar"
      >
        {isOpen ? <FiX /> : <FiMenu />}
      </button>

      {isOpen && (
        <button
          type="button"
          aria-label="Close dashboard sidebar"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-30 bg-slate-950/45 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-(--surface-border) bg-(--surface-background) p-5 transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <Link
          href="/"
          className="text-2xl font-extrabold text-brand-orange"
        >
          DineSpot
        </Link>

        <div className="mt-8 flex items-center gap-3 rounded-2xl border border-(--surface-border) p-3">
          <UserAvatar
            name={user.name}
            image={user.image}
            className="h-12 w-12"
          />

          <div className="min-w-0">
            <p className="truncate font-extrabold text-slate-900 dark:text-white">
              {user.name}
            </p>

            <p className="truncate text-xs text-slate-500 dark:text-slate-400">
              {accountLabel}
            </p>
          </div>
        </div>

        <nav className="mt-8 space-y-2">
          <Link
            href="/dashboard"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition ${
              pathname === "/dashboard"
                ? "bg-orange-100 text-brand-orange-dark dark:bg-orange-950/40 dark:text-orange-300"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >
            <FiHome className="text-lg" />
            Overview
          </Link>
        </nav>

        <div className="mt-auto">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl border border-(--surface-border) px-4 py-3 text-sm font-bold text-slate-600 transition hover:border-orange-300 hover:text-brand-orange dark:text-slate-300"
          >
            <FiArrowLeft />
            Back to DineSpot
          </Link>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;