"use client";

import { authClient } from "@/lib/auth-client";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  type ChangeEvent,
  type FormEvent,
  useState,
} from "react";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiEye,
  FiEyeOff,
  FiLoader,
  FiLock,
  FiMail,
  FiShield,
  FiUserCheck,
} from "react-icons/fi";
import { toast } from "react-toastify";

type LoginFormData = {
  email: string;
  password: string;
};

const initialFormData: LoginFormData = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const router = useRouter();

  const [formData, setFormData] =
    useState<LoginFormData>(initialFormData);

  const [showPassword, setShowPassword] =
    useState(false);

  const [rememberMe, setRememberMe] =
    useState(true);

  const [isLoading, setIsLoading] =
    useState(false);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const email = formData.email.trim();

    if (!email) {
      toast.error("Email address is required.");
      return false;
    }

    if (!email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    if (!formData.password) {
      toast.error("Password is required.");
      return false;
    }

    if (formData.password.length < 8) {
      toast.error(
        "Password must contain at least 8 characters.",
      );

      return false;
    }

    return true;
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);

      const { error } =
        await authClient.signIn.email({
          email: formData.email
            .trim()
            .toLowerCase(),

          password: formData.password,

          rememberMe,
        });

      if (error) {
        toast.error(
          error.message ||
            "Email or password is incorrect.",
        );

        return;
      }

      toast.success("Welcome back to DineSpot.");

      setFormData(initialFormData);

      router.push("/");
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Login failed. Please try again.";

      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative overflow-hidden py-10 sm:py-14">
      <div className="absolute -left-32 top-12 h-72 w-72 rounded-full bg-orange-300/20 blur-3xl dark:bg-orange-700/10" />

      <div className="absolute -right-32 bottom-12 h-72 w-72 rounded-full bg-green-300/20 blur-3xl dark:bg-green-700/10" />

      <div className="container-shell relative">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-brand-orange dark:text-slate-300"
        >
          <FiArrowLeft />
          Back to home
        </Link>

        <div className="mx-auto grid max-w-5xl items-stretch gap-8 lg:grid-cols-2">
          {/* Left side */}
          <motion.aside
            initial={{
              opacity: 0,
              x: -24,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="hidden overflow-hidden rounded-4xl bg-brand-green p-9 text-white lg:block"
          >
            <div className="inline-flex rounded-2xl bg-white p-2">
              <Image
                src="/images/logo.png"
                alt="DineSpot"
                width={200}
                height={90}
                className="h-16 w-44 object-contain"
              />
            </div>

            <h1 className="mt-8 text-3xl font-extrabold leading-tight">
              Welcome back to DineSpot
            </h1>

            <p className="mt-4 text-sm leading-7 text-white/75">
              Log in to continue exploring restaurants
              and managing your DineSpot account.
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex items-start gap-3">
                <FiCheckCircle className="mt-1 shrink-0 text-xl text-brand-yellow" />

                <div>
                  <p className="font-bold">
                    Customer access
                  </p>

                  <p className="mt-1 text-sm leading-6 text-white/70">
                    View your reservations, reviews and
                    account information.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiUserCheck className="mt-1 shrink-0 text-xl text-brand-yellow" />

                <div>
                  <p className="font-bold">
                    Restaurant Owner access
                  </p>

                  <p className="mt-1 text-sm leading-6 text-white/70">
                    Access and manage your own restaurant
                    information.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiShield className="mt-1 shrink-0 text-xl text-brand-yellow" />

                <div>
                  <p className="font-bold">
                    Secure session
                  </p>

                  <p className="mt-1 text-sm leading-6 text-white/70">
                    Your account session is managed
                    securely through Better Auth.
                  </p>
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Login form */}
          <motion.section
            initial={{
              opacity: 0,
              y: 24,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="surface-card flex flex-col justify-center rounded-4xl p-6 shadow-xl sm:p-9"
          >
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-orange">
              Account Login
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-slate-950 dark:text-white">
              Sign in to your account
            </h2>

            <p className="muted-text mt-3 text-sm leading-7">
              Enter the email and password you used when
              creating your account.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-bold text-slate-800 dark:text-slate-200"
                >
                  Email address
                </label>

                <div className="relative mt-2">
                  <FiMail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    placeholder="Enter your email address"
                    className="h-12 w-full rounded-xl border border-slate-300 bg-transparent pl-11 pr-4 text-sm outline-none transition focus:border-brand-orange focus:ring-4 focus:ring-orange-100 dark:border-slate-700 dark:text-white dark:focus:ring-orange-950"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-bold text-slate-800 dark:text-slate-200"
                >
                  Password
                </label>

                <div className="relative mt-2">
                  <FiLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    id="password"
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="h-12 w-full rounded-xl border border-slate-300 bg-transparent pl-11 pr-12 text-sm outline-none transition focus:border-brand-orange focus:ring-4 focus:ring-orange-100 dark:border-slate-700 dark:text-white dark:focus:ring-orange-950"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (previousValue) =>
                          !previousValue,
                      )
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-brand-orange"
                  >
                    {showPassword ? (
                      <FiEyeOff />
                    ) : (
                      <FiEye />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) =>
                    setRememberMe(
                      event.target.checked,
                    )
                  }
                  className="h-4 w-4 accent-orange-500"
                />

                Keep me signed in
              </label>

              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-orange px-6 text-sm font-bold text-white transition hover:bg-brand-orange-dark disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <FiLoader className="animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Login"
                )}
              </button>

              <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="font-bold text-brand-orange hover:underline"
                >
                  Create an account
                </Link>
              </p>
            </form>
          </motion.section>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;