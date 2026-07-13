"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import {
  FiArrowRight,
  FiMapPin,
  FiStar,
  FiUsers,
} from "react-icons/fi";
import { GiKnifeFork } from "react-icons/gi";

const Banner = () => {
  return (
    <section className="relative isolate min-h-[65vh] overflow-hidden border-b border-(--surface-border) bg-(--page-background)">
      {/* Background decorations */}
      <div className="absolute -left-32 top-16 -z-10 h-72 w-72 rounded-full bg-orange-300/20 blur-3xl dark:bg-orange-700/10" />

      <div className="absolute -right-32 bottom-0 -z-10 h-80 w-80 rounded-full bg-green-300/20 blur-3xl dark:bg-green-700/10" />

      <div className="container-shell grid min-h-[65vh] items-center gap-12 py-14 lg:grid-cols-2 lg:py-16">
        {/* Left content */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          className="text-center lg:text-left"
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.5,
              delay: 0.1,
            }}
            className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-bold text-brand-orange-dark dark:border-orange-900 dark:bg-orange-950/50 dark:text-orange-300"
          >
            <GiKnifeFork className="text-lg" />
            Discover • Dine • Reserve
          </motion.div>

          <h1 className="mx-auto mt-6 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:mx-0 lg:text-6xl">
            Discover food that makes every{" "}
            <span className="text-brand-orange">moment special</span>
          </h1>

          <p className="muted-text mx-auto mt-6 max-w-xl text-base leading-8 sm:text-lg lg:mx-0">
            Explore trusted restaurants, discover different cuisines and find
            the perfect place for your next meal.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Link
              href="/explore"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-orange px-6 text-sm font-bold text-white shadow-md shadow-orange-500/20 transition-all duration-200 hover:-translate-y-1 hover:bg-brand-orange-dark hover:shadow-lg"
            >
              Explore Restaurants
              <FiArrowRight className="text-lg" />
            </Link>

            <Link
              href="/about"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-300 px-6 text-sm font-bold text-slate-700 transition-all duration-200 hover:-translate-y-1 hover:border-brand-orange hover:bg-orange-50 hover:text-brand-orange-dark dark:border-slate-700 dark:text-slate-200 dark:hover:border-brand-yellow dark:hover:bg-slate-800 dark:hover:text-brand-yellow"
            >
              Learn More
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-semibold text-slate-600 dark:text-slate-300 lg:justify-start">
            <span className="inline-flex items-center gap-2">
              <FiStar className="text-brand-yellow" />
              Trusted ratings
            </span>

            <span className="inline-flex items-center gap-2">
              <FiMapPin className="text-brand-orange" />
              Popular locations
            </span>

            <span className="inline-flex items-center gap-2">
              <FiUsers className="text-brand-green-light dark:text-green-400" />
              Easy reservations
            </span>
          </div>
        </motion.div>

        {/* Right visual */}
        <motion.div
          initial={{
            opacity: 0,
            x: 40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: "easeOut",
          }}
          className="relative mx-auto flex w-full max-w-lg items-center justify-center"
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="surface-card relative flex min-h-95 w-full items-center justify-center overflow-hidden rounded-4xl p-8 shadow-xl shadow-slate-900/10 dark:shadow-black/30"
          >
            <div className="absolute left-0 top-0 h-40 w-40 rounded-br-full bg-orange-100 dark:bg-orange-950/40" />

            <div className="absolute bottom-0 right-0 h-44 w-44 rounded-tl-full bg-green-100 dark:bg-green-950/40" />

            <div className="relative z-10 text-center">
              <motion.div
                animate={{
                  rotate: [0, 2, 0, -2, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mx-auto flex h-44 w-72 items-center justify-center overflow-hidden rounded-3xl  p-4 shadow-lg"
              >
                <Image
                  src="/images/logo.png"
                  alt="DineSpot restaurant discovery platform"
                  width={600}
                  height={320}
                  priority
                  className="h-full w-full object-contain"
                />
              </motion.div>

              <h2 className="mt-7 text-2xl font-extrabold text-slate-900 dark:text-white">
                Your next favorite restaurant
              </h2>

              <p className="muted-text mx-auto mt-3 max-w-sm text-sm leading-6">
                Great food, trusted places and memorable dining experiences in
                one simple platform.
              </p>
            </div>

            {/* Floating rating */}
            <motion.div
              animate={{
                y: [0, -7, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-5 top-6 flex items-center gap-2 rounded-xl border border-yellow-200 bg-white px-3 py-2 text-sm font-bold text-slate-800 shadow-md dark:border-yellow-900 dark:bg-slate-800 dark:text-white"
            >
              <FiStar className="fill-yellow-400 text-yellow-400" />
              Top rated
            </motion.div>

            {/* Floating location */}
            <motion.div
              animate={{
                y: [0, 7, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-6 right-5 flex items-center gap-2 rounded-xl border border-green-200 bg-white px-3 py-2 text-sm font-bold text-slate-800 shadow-md dark:border-green-900 dark:bg-slate-800 dark:text-white"
            >
              <FiMapPin className="text-brand-green-light dark:text-green-400" />
              Near you
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;