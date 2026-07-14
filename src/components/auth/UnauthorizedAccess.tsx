"use client";

import { authClient } from "@/lib/auth-client";
import {
  AnimatePresence,
  motion,
} from "motion/react";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  FiAlertTriangle,
  FiLoader,
  FiLock,
  FiLogOut,
  FiShield,
} from "react-icons/fi";

const logoutDelay = 5;

const UnauthorizedAccess = () => {
  const router = useRouter();

  const hasStarted = useRef(false);

  const [secondsLeft, setSecondsLeft] =
    useState(logoutDelay);

  useEffect(() => {
    if (hasStarted.current) {
      return;
    }

    hasStarted.current = true;

    const removeSession = async () => {
      try {
        await authClient.signOut();
      } catch {
        // The user will still be redirected to login.
      }
    };

    void removeSession();

    const countdownInterval = window.setInterval(() => {
      setSecondsLeft((previousSeconds) =>
        previousSeconds > 0
          ? previousSeconds - 1
          : 0,
      );
    }, 1000);

    const redirectTimer = window.setTimeout(() => {
      router.replace("/login?reason=unauthorized");
      router.refresh();
    }, logoutDelay * 1000);

    return () => {
      window.clearInterval(countdownInterval);
      window.clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-10">
      {/* Animated background */}
      <motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute -left-28 -top-28 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, 45, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 9,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute -bottom-32 -right-28 h-112 w-md rounded-full bg-green-500/20 blur-3xl"
      />

      <motion.section
        initial={{
          opacity: 0,
          y: 35,
          scale: 0.92,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.65,
          ease: "easeOut",
        }}
        className="relative z-10 w-full max-w-xl overflow-hidden rounded-4xl border border-white/10 bg-white/10 p-6 text-center shadow-2xl backdrop-blur-xl sm:p-10"
      >
        {/* Shield animation */}
        <div className="relative mx-auto flex h-32 w-32 items-center justify-center">
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute inset-0 rounded-full border-2 border-dashed border-orange-400/60"
          />

          <motion.div
            animate={{
              scale: [1, 1.12, 1],
              boxShadow: [
                "0 0 0 0 rgba(249, 115, 22, 0.25)",
                "0 0 0 22px rgba(249, 115, 22, 0)",
                "0 0 0 0 rgba(249, 115, 22, 0)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="flex h-24 w-24 items-center justify-center rounded-full bg-orange-500 text-4xl text-white"
          >
            <FiShield />
          </motion.div>

          <motion.div
            animate={{
              rotate: [-8, 8, -8],
            }}
            transition={{
              duration: 0.8,
              repeat: Number.POSITIVE_INFINITY,
            }}
            className="absolute -right-1 top-2 flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-xl text-white"
          >
            <FiAlertTriangle />
          </motion.div>
        </div>

        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.25,
          }}
          className="mt-7 text-sm font-bold uppercase tracking-[0.2em] text-orange-400"
        >
          Access Denied
        </motion.p>

        <motion.h1
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.35,
          }}
          className="mt-3 text-3xl font-extrabold text-white sm:text-4xl"
        >
          You are not authorized
        </motion.h1>

        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.45,
          }}
          className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-300"
        >
          Your account does not have permission to access
          this dashboard area. Your session has been
          signed out for security.
        </motion.p>

        <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5">
          <div className="flex items-center justify-center gap-2 text-sm font-bold text-slate-300">
            <FiLogOut className="text-orange-400" />
            Redirecting to login
          </div>

          <div className="mt-4 flex items-center justify-center gap-3">
            <FiLoader className="animate-spin text-xl text-orange-400" />

            <AnimatePresence mode="wait">
              <motion.span
                key={secondsLeft}
                initial={{
                  opacity: 0,
                  scale: 0.5,
                  y: -10,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 1.4,
                  y: 10,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="text-5xl font-black text-white"
              >
                {secondsLeft}
              </motion.span>
            </AnimatePresence>

            <span className="text-sm text-slate-400">
              seconds
            </span>
          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{
                width: "100%",
              }}
              animate={{
                width: "0%",
              }}
              transition={{
                duration: logoutDelay,
                ease: "linear",
              }}
              className="h-full rounded-full bg-linear-to-r from-orange-500 to-red-500"
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
          <FiLock />
          Protected by DineSpot role authorization
        </div>
      </motion.section>
    </main>
  );
};

export default UnauthorizedAccess;