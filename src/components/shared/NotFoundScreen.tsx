"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiArrowLeft,
  FiCompass,
  FiHome,
} from "react-icons/fi";

const NotFoundScreen = () => {
  const pathname = usePathname();

  const isDashboardPath =
    pathname.startsWith("/dashboard");

  return (
    <main className="container-shell flex min-h-[75vh] items-center justify-center py-16">
      <section className="surface-card relative w-full max-w-3xl overflow-hidden rounded-3xl p-6 text-center sm:p-10 lg:p-14">
        <div className="absolute -left-16 -top-16 h-44 w-44 rounded-full bg-orange-500/10 blur-2xl" />

        <div className="absolute -bottom-20 -right-16 h-52 w-52 rounded-full bg-green-700/10 blur-2xl" />

        <div className="relative">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-orange-100 text-3xl text-orange-600 dark:bg-orange-500/15 dark:text-orange-300">
            <FiCompass />
          </div>

          <p className="mt-7 text-7xl font-extrabold tracking-tight text-orange-500 sm:text-8xl">
            404
          </p>

          <h1 className="mt-4 text-2xl font-bold sm:text-4xl">
            Page not found
          </h1>

          <p className="muted-text mx-auto mt-4 max-w-xl leading-7">
            The page you are looking for does not
            exist, may have been moved, or the URL
            may be incorrect.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              <FiHome />
              Go to Home
            </Link>

            {isDashboardPath ? (
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] px-6 py-3 font-semibold transition hover:bg-black/5 dark:hover:bg-white/5"
              >
                <FiArrowLeft />
                Back to Dashboard
              </Link>
            ) : (
              <Link
                href="/explore"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] px-6 py-3 font-semibold transition hover:bg-black/5 dark:hover:bg-white/5"
              >
                <FiArrowLeft />
                Explore Restaurants
              </Link>
            )}
          </div>

          <div className="mt-8 rounded-2xl bg-black/5 px-4 py-3 text-sm dark:bg-white/5">
            <span className="muted-text">
              Requested path:
            </span>{" "}

            <span className="break-all font-semibold">
              {pathname}
            </span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NotFoundScreen;
