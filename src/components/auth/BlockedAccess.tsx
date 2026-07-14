"use client";

import { authClient } from "@/lib/auth-client";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import {
  FiHome,
  FiLock,
  FiLogOut,
} from "react-icons/fi";

const BlockedAccess = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();

    router.replace("/login");
    router.refresh();
  };

  return (
    <main className="container-shell flex min-h-screen items-center justify-center py-12">
      <motion.section
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="surface-card w-full max-w-lg rounded-3xl p-7 text-center sm:p-10"
      >
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-3xl text-red-600 dark:bg-red-500/15 dark:text-red-300">
          <FiLock />
        </div>

        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-red-500">
          Account Blocked
        </p>

        <h1 className="mt-3 text-3xl font-bold">
          Access is currently restricted
        </h1>

        <p className="muted-text mt-4 leading-7">
          Your account has been blocked by an
          administrator. You cannot access the
          dashboard or restaurant details while
          the account is blocked.
        </p>

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() =>
              router.replace("/")
            }
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] px-5 py-3 font-semibold transition hover:bg-black/5 dark:hover:bg-white/5"
          >
            <FiHome />
            Go to Home
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            <FiLogOut />
            Sign Out
          </button>
        </div>
      </motion.section>
    </main>
  );
};

export default BlockedAccess;
