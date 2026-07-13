"use client";


import { motion } from "motion/react";
import Link from "next/link";
import type { IconType } from "react-icons";
import {
  FiArrowUpRight,
  FiCode,
  FiGithub,
  FiHelpCircle,
  FiMessageCircle,
  FiShield,
  FiUserCheck,
} from "react-icons/fi";
import SectionHeader from "../shared/SectionHeader";

type SupportTopic = {
  title: string;
  description: string;
  icon: IconType;
};

type ContactLink = {
  title: string;
  description: string;
  href: string;
  icon: IconType;
};

const supportTopics: SupportTopic[] = [
  {
    title: "Restaurant Listings",
    description:
      "Get help with adding, viewing or managing restaurant information.",
    icon: FiCode,
  },
  {
    title: "Account Support",
    description:
      "Find assistance related to registration, login and protected account features.",
    icon: FiUserCheck,
  },
  {
    title: "Security Questions",
    description:
      "Report concerns related to account access or application security.",
    icon: FiShield,
  },
  {
    title: "General Questions",
    description:
      "Ask questions about DineSpot features, navigation or the overall platform.",
    icon: FiHelpCircle,
  },
];

const contactLinks: ContactLink[] = [
  {
    title: "Developer Profile",
    description: "View the developer profile and other public projects.",
    href: "https://github.com/Tahaimage8",
    icon: FiGithub,
  },
  {
    title: "DineSpot Client",
    description: "Open the Next.js and TypeScript frontend repository.",
    href: "https://github.com/Tahaimage8/DineSpot-client",
    icon: FiCode,
  },
  {
    title: "DineSpot Server",
    description: "Open the Express and TypeScript backend repository.",
    href: "https://github.com/Tahaimage8/DineSpot-server",
    icon: FiCode,
  },
];

const ContactContent = () => {
  return (
    <main>
      {/* Page banner */}
      <section className="relative overflow-hidden border-b border-(--surface-border) py-16 sm:py-20">
        <div className="absolute -left-28 top-0 h-72 w-72 rounded-full bg-orange-300/20 blur-3xl dark:bg-orange-700/10" />

        <div className="absolute -right-28 bottom-0 h-72 w-72 rounded-full bg-green-300/20 blur-3xl dark:bg-green-700/10" />

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
            <FiMessageCircle />
            Contact DineSpot
          </div>

          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
            How can we{" "}
            <span className="text-brand-orange">help you?</span>
          </h1>

          <p className="muted-text mx-auto mt-6 max-w-2xl text-base leading-8 sm:text-lg">
            Find the appropriate support area or visit the official project
            repositories for technical information and updates.
          </p>
        </motion.div>
      </section>

      {/* Support topics */}
      <section className="py-16 sm:py-20">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Support Areas"
            title="Choose the help you need"
            description="DineSpot support topics are organized to make it easier to identify the correct area."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {supportTopics.map((topic, index) => {
              const TopicIcon = topic.icon;

              return (
                <motion.article
                  key={topic.title}
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
                  }}
                  whileHover={{
                    y: -5,
                  }}
                  className="surface-card min-h-57.5 rounded-2xl p-6 shadow-sm transition-shadow hover:shadow-lg"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-xl text-brand-green dark:bg-green-950 dark:text-green-300">
                    <TopicIcon />
                  </div>

                  <h2 className="mt-5 text-lg font-extrabold text-slate-900 dark:text-white">
                    {topic.title}
                  </h2>

                  <p className="muted-text mt-3 text-sm leading-7">
                    {topic.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Project links */}
      <section className="border-y border-(--surface-border) bg-white/40 py-16 dark:bg-slate-950/30 sm:py-20">
        <div className="container-shell">
          <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHeader
              eyebrow="Project Contact"
              title="Connect through the official repositories"
              description="The public GitHub repositories provide access to the frontend and backend project code."
              align="left"
            />

            <div className="space-y-4">
              {contactLinks.map((contactLink, index) => {
                const ContactIcon = contactLink.icon;

                return (
                  <motion.a
                    key={contactLink.title}
                    href={contactLink.href}
                    target="_blank"
                    rel="noreferrer"
                    initial={{
                      opacity: 0,
                      x: 24,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.2,
                    }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.08,
                    }}
                    className="surface-card group flex items-center gap-4 rounded-2xl p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                  >
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-xl text-brand-orange-dark dark:bg-orange-950 dark:text-orange-300">
                      <ContactIcon />
                    </span>

                    <div className="min-w-0 flex-1">
                      <h2 className="font-extrabold text-slate-900 dark:text-white">
                        {contactLink.title}
                      </h2>

                      <p className="muted-text mt-1 text-sm leading-6">
                        {contactLink.description}
                      </p>
                    </div>

                    <FiArrowUpRight className="shrink-0 text-xl text-slate-400 transition-colors group-hover:text-brand-orange" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contact note */}
      <section className="py-16 sm:py-20">
        <div className="container-shell">
          <div className="surface-card mx-auto max-w-4xl rounded-4xl p-7 text-center shadow-sm sm:p-10">
            <FiMessageCircle className="mx-auto text-4xl text-brand-orange" />

            <h2 className="mt-5 text-2xl font-extrabold text-slate-950 dark:text-white">
              Direct message submission will be added later
            </h2>

            <p className="muted-text mx-auto mt-4 max-w-2xl text-sm leading-7">
              The contact form will be connected during the backend and API
              development phase so submitted messages can be stored and
              managed securely.
            </p>

            <Link
              href="/about"
              className="mt-7 inline-flex h-12 items-center justify-center rounded-xl bg-brand-orange px-6 text-sm font-bold text-white transition-all hover:-translate-y-1 hover:bg-brand-orange-dark"
            >
              Learn More About DineSpot
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactContent;