"use client";

import {
  authClient,
  type AuthSession,
} from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  FiChevronDown,
  FiHome,
  FiLayout,
  FiLoader,
  FiLogOut,
} from "react-icons/fi";
import { toast } from "react-toastify";
import UserAvatar from "./UserAvatar";

type UserDropdownProps = {
  user: AuthSession["user"];
};

const getAccountLabel = (
  user: AuthSession["user"],
) => {
  if (user.role === "admin") {
    return "Admin";
  }

  if (user.accountType === "restaurant_owner") {
    return "Restaurant Owner";
  }

  return "Customer";
};

const UserDropdown = ({
  user,
}: UserDropdownProps) => {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] =
    useState(false);

  const accountLabel = getAccountLabel(user);

  useEffect(() => {
    const handleOutsideClick = (
      event: MouseEvent,
    ) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target as Node,
        )
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick,
    );

    document.addEventListener(
      "keydown",
      handleEscape,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick,
      );

      document.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, []);

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

      setIsOpen(false);
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
    <div
      ref={dropdownRef}
      className="relative"
    >
      <button
        type="button"
        onClick={() =>
          setIsOpen((previousValue) => !previousValue)
        }
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="flex items-center gap-2 rounded-full border border-(--surface-border) bg-(--surface-background) p-1.5 pr-3 transition hover:border-orange-300"
      >
        <UserAvatar
          name={user.name}
          image={user.image}
          className="h-9 w-9"
        />

        <div className="hidden max-w-32 text-left xl:block">
          <p className="truncate text-sm font-extrabold text-slate-900 dark:text-white">
            {user.name}
          </p>

          <p className="truncate text-xs text-slate-500 dark:text-slate-400">
            {accountLabel}
          </p>
        </div>

        <FiChevronDown
          className={`text-slate-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-3 w-72 overflow-hidden rounded-2xl border border-(--surface-border) bg-(--surface-background) shadow-xl"
        >
          <div className="border-b border-(--surface-border) p-4">
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

                <p className="truncate text-sm text-slate-500 dark:text-slate-400">
                  {user.email}
                </p>
              </div>
            </div>

            <span className="mt-3 inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-brand-orange-dark dark:bg-orange-950 dark:text-orange-300">
              {accountLabel}
            </span>
          </div>

          <div className="p-2">
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-slate-700 transition hover:bg-orange-50 hover:text-brand-orange dark:text-slate-200 dark:hover:bg-orange-950/40"
            >
              <FiLayout className="text-lg" />
              Dashboard
            </Link>

            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-slate-700 transition hover:bg-orange-50 hover:text-brand-orange dark:text-slate-200 dark:hover:bg-orange-950/40"
            >
              <FiHome className="text-lg" />
              Back to Home
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-bold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 dark:hover:bg-red-950/30"
            >
              {isLoggingOut ? (
                <FiLoader className="animate-spin text-lg" />
              ) : (
                <FiLogOut className="text-lg" />
              )}

              {isLoggingOut
                ? "Logging out..."
                : "Logout"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;