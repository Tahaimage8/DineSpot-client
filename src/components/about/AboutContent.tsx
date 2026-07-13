"use client";


import { motion } from "motion/react";
import Link from "next/link";
import type { IconType } from "react-icons";
import {
  FiArrowRight,
  FiCheckCircle,
  FiCompass,
  FiHeart,
  FiLayout,
  FiShield,
} from "react-icons/fi";
import { GiKnifeFork } from "react-icons/gi";
import SectionHeader from "../shared/SectionHeader";

type PlatformValue = {
  title: string;
  description: string;
  icon: IconType;
};

const platformValues: PlatformValue[] = [
  {
    title: "Simple Discovery",
    description:
      "DineSpot is designed to help users explore restaurant options through a clean and understandable interface.",
    icon: FiCompass,
  },
  {
    title: "Clear Information",
    description:
      "Restaurant details are presented in an organized format so users can make informed dining choices.",
    icon: FiLayout,
  },
  {
    title: "Secure Experience",
    description:
      "Protected pages and account-based actions help create a safer experience for registered users.",
    icon: FiShield,
  },
  {
    title: "User-Focused Design",
    description:
      "Every section is designed with responsive layouts, consistent spacing and accessible interactions.",
    icon: FiHeart,
  },
];

const AboutContent = () => {
  return (
    <main>
      {/* Page banner */}
      <section className="relative overflow-hidden border-b border-(--surface-border) py-16 sm:py-20">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-orange-300/20 blur-3xl dark:bg-orange-700/10" />

        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-green-300/20 blur-3xl dark:bg-green-700/10" />

        <motion.div
          initial={{
            opacity: 0,
            y: 24,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          className="container-shell relative text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-bold text-brand-orange-dark dark:border-orange-900 dark:bg-orange-950/50 dark:text-orange-300">
            <GiKnifeFork />
            About DineSpot
          </div>

          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-5xl">
            Making restaurant discovery{" "}
            <span className="text-brand-orange">
              simple and enjoyable
            </span>
          </h1>

          <p className="muted-text mx-auto mt-6 max-w-2xl text-base leading-8 sm:text-lg">
            DineSpot is a restaurant discovery and reservation platform
            designed to connect users with dining places through a clean,
            responsive and convenient experience.
          </p>
        </motion.div>
      </section>

      {/* Mission section */}
      <section className="py-16 sm:py-20">
        <div className="container-shell grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{
              opacity: 0,
              x: -30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.55,
              ease: "easeOut",
            }}
          >
            <SectionHeader
              eyebrow="Our Purpose"
              title="A better way to plan your dining experience"
              description="DineSpot brings restaurant exploration, detailed information and table reservation into one organized platform."
              align="left"
            />

            <div className="mt-7 space-y-4">
              {[
                "Explore restaurant options through a responsive interface.",
                "View important restaurant information before making a choice.",
                "Use protected account features for personal actions.",
                "Manage restaurant entries through a structured dashboard.",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 text-sm leading-7 text-slate-600 dark:text-slate-300"
                >
                  <FiCheckCircle className="mt-1 shrink-0 text-lg text-brand-green-light dark:text-green-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.55,
              ease: "easeOut",
            }}
            className="surface-card rounded-4xl p-7 shadow-lg sm:p-10"
          >
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-2xl text-brand-orange-dark dark:bg-orange-950 dark:text-orange-300">
              <GiKnifeFork />
            </div>

            <h2 className="mt-6 text-2xl font-extrabold text-slate-950 dark:text-white">
              Discover • Dine • Reserve
            </h2>

            <p className="muted-text mt-4 leading-8">
              The platform focuses on providing a smooth journey from
              discovering a restaurant to viewing its details and submitting a
              reservation request.
            </p>

            <div className="mt-7 rounded-2xl border border-green-200 bg-green-50 p-5 dark:border-green-900 dark:bg-green-950/30">
              <p className="font-bold text-brand-green dark:text-green-300">
                Built with modern web technologies
              </p>

              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                DineSpot uses Next.js, TypeScript, Express, MongoDB and a
                responsive component-based architecture.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values section */}
      <section className="border-y border-(--surface-border) bg-white/40 py-16 dark:bg-slate-950/30 sm:py-20">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Our Approach"
            title="What guides the DineSpot experience"
            description="The platform is developed around clarity, consistency, security and ease of use."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {platformValues.map((value, index) => {
              const ValueIcon = value.icon;

              return (
                <motion.article
                  key={value.title}
                  initial={{
                    opacity: 0,
                    y: 24,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.08,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    y: -5,
                  }}
                  className="surface-card min-h-62.5 rounded-2xl p-6 shadow-sm transition-shadow hover:shadow-lg"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-xl text-brand-orange-dark dark:bg-orange-950 dark:text-orange-300">
                    <ValueIcon />
                  </div>

                  <h3 className="mt-5 text-lg font-extrabold text-slate-900 dark:text-white">
                    {value.title}
                  </h3>

                  <p className="muted-text mt-3 text-sm leading-7">
                    {value.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* About CTA */}
      <section className="py-16 sm:py-20">
        <div className="container-shell">
          <div className="rounded-4xl bg-brand-green dark:border-slate-800 dark:bg-slate-950 px-6 py-12 text-center text-white sm:px-10">
            <h2 className="text-3xl font-extrabold">
              Start exploring with DineSpot
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/75">
              Discover restaurant options and learn how DineSpot can make your
              dining journey more convenient.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/explore"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-orange px-6 text-sm font-bold text-white transition-all hover:-translate-y-1 hover:bg-brand-orange-dark"
              >
                Explore Restaurants
                <FiArrowRight />
              </Link>

              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/25 bg-white/10 px-6 text-sm font-bold transition-all hover:bg-white hover:text-brand-green"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutContent;