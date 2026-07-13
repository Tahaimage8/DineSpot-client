"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { FiArrowRight, FiUserPlus } from "react-icons/fi";
import { GiKnifeFork } from "react-icons/gi";

const FinalCta = () => {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-shell">
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          className="relative overflow-hidden rounded-4xl  px-6 py-12 text-center text-black dark:text-white shadow-xl sm:px-10 sm:py-16"
        >
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />

          <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-brand-yellow/20 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-3xl">
            <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-2xl text-brand-yellow">
              <GiKnifeFork />
            </div>

            <h2 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Discover your next dining experience with DineSpot
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-black dark:text-white/75">
              Explore restaurant options and create an account to access
              personalized and protected features.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/explore"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-orange px-6 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-1 hover:bg-brand-orange-dark"
              >
                Explore Restaurants
                <FiArrowRight />
              </Link>

              <Link
                href="/register"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/25 bg-brand-green  dark:bg-white/10 px-6 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:text-brand-green"
              >
                <FiUserPlus />
                Create Account
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCta;