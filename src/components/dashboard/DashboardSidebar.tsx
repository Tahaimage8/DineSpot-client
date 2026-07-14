"use client";

import UserAvatar from "@/components/shared/UserAvatar";
import { adminNavigation } from "@/components/dashboard/navigation/admin-navigation";
import { customerNavigation } from "@/components/dashboard/navigation/customer-navigation";
import type { DashboardNavigationItem } from "@/components/dashboard/navigation/navigation-types";
import { ownerNavigation } from "@/components/dashboard/navigation/owner-navigation";
import type { AuthSession } from "@/lib/auth-client";
import {
  getAccountLabel,
  getEffectiveUserType,
  type EffectiveUserType,
} from "@/lib/auth-role";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  FiArrowLeft,
  FiMenu,
  FiX,
} from "react-icons/fi";

type DashboardSidebarProps = {
  user: AuthSession["user"];
};

const getNavigationItems = (
  userType: EffectiveUserType,
): DashboardNavigationItem[] => {
  if (userType === "admin") {
    return adminNavigation;
  }

  if (userType === "restaurant_owner") {
    return ownerNavigation;
  }

  return customerNavigation;
};

const DashboardSidebar = ({
  user,
}: DashboardSidebarProps) => {
  const pathname = usePathname();

  const [isOpen, setIsOpen] =
    useState(false);

  const userType = getEffectiveUserType(user);
  const accountLabel = getAccountLabel(user);

  const navigationItems =
    getNavigationItems(userType);

  const isActiveRoute = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        onClick={() =>
          setIsOpen(
            (previousValue) => !previousValue,
          )
        }
        aria-label="Toggle dashboard sidebar"
        aria-expanded={isOpen}
        className="fixed left-4 top-4 z-50 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green text-xl text-white shadow-lg lg:hidden"
      >
        {isOpen ? <FiX /> : <FiMenu />}
      </button>

      {isOpen && (
        <button
          type="button"
          aria-label="Close dashboard sidebar"
          onClick={closeSidebar}
          className="fixed inset-0 z-30 bg-slate-950/50 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-screen w-72 flex-col border-r border-(--surface-border) bg-(--surface-background) p-5 shadow-xl transition-transform duration-300 lg:sticky lg:top-0 lg:translate-x-0 lg:shadow-none ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={closeSidebar}
          className="flex items-center gap-3 rounded-2xl border border-(--surface-border)  p-2"
        >
          <Image
            src="/images/logo.png"
            alt="DineSpot"
            width={150}
            height={60}
            priority
            className="h-12 w-32 object-contain"
          />
        </Link>

        {/* User */}
        <div className="mt-6 rounded-2xl border border-(--surface-border) bg-slate-50 p-4 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <UserAvatar
              name={user.name}
              image={user.image}
              className="h-12 w-12"
            />

            <div className="min-w-0">
              <p className="truncate font-extrabold text-slate-900 dark:text-white">
                {user.name}
              </p>

              <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">
                {user.email}
              </p>
            </div>
          </div>

          <span className="mt-4 inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-brand-orange-dark dark:bg-orange-950 dark:text-orange-300">
            {accountLabel}
          </span>
        </div>

        {/* Navigation */}
        <div className="mt-7">
          <p className="px-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
            Dashboard Menu
          </p>

          <nav className="mt-3 space-y-1.5">
            {navigationItems.map((item) => {
              const ItemIcon = item.icon;
              const isActive = isActiveRoute(
                item.href,
              );

              if (item.disabled) {
                return (
                  <div
                    key={item.href}
                    aria-disabled="true"
                    className="flex cursor-not-allowed items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-slate-400 opacity-70 dark:text-slate-500"
                  >
                    <ItemIcon className="text-lg" />

                    <span className="flex-1">
                      {item.label}
                    </span>

                    <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                      Soon
                    </span>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeSidebar}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition ${
                    isActive
                      ? "bg-orange-100 text-brand-orange-dark dark:bg-orange-950/40 dark:text-orange-300"
                      : "text-slate-600 hover:bg-slate-100 hover:text-brand-orange dark:text-slate-300 dark:hover:bg-slate-800"
                  }`}
                >
                  <ItemIcon className="text-lg" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom link */}
        <div className="mt-auto pt-6">
          <Link
            href="/"
            onClick={closeSidebar}
            className="flex items-center justify-center gap-2 rounded-xl border border-(--surface-border) px-4 py-3 text-sm font-bold text-slate-600 transition hover:border-orange-300 hover:text-brand-orange dark:text-slate-300"
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