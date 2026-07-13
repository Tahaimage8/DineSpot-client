"use client";


import { motion } from "motion/react";
import type { IconType } from "react-icons";
import {
  FiCalendar,
  FiCheckCircle,
  FiSearch,
} from "react-icons/fi";
import SectionHeader from "../shared/SectionHeader";

type ProcessStep = {
  number: string;
  title: string;
  description: string;
  icon: IconType;
};

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Explore Restaurants",
    description:
      "Browse restaurant options and discover dining places based on your preferences.",
    icon: FiSearch,
  },
  {
    number: "02",
    title: "Check the Details",
    description:
      "Review restaurant information, available services and dining details before making a choice.",
    icon: FiCheckCircle,
  },
  {
    number: "03",
    title: "Reserve Your Table",
    description:
      "Choose a suitable date, time and guest number to submit your reservation.",
    icon: FiCalendar,
  },
];

const HowItWorks = () => {
  return (
    <section className="border-y border-(--surface-border) bg-white/40 py-16 dark:bg-slate-950/30 sm:py-20">
      <div className="container-shell">
        <SectionHeader
          eyebrow="Simple Process"
          title="How DineSpot works"
          description="Discovering a restaurant and planning your next dining experience can be simple and comfortable."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {processSteps.map((step, index) => {
            const StepIcon = step.icon;

            return (
              <motion.article
                key={step.number}
                initial={{
                  opacity: 0,
                  y: 28,
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
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                className="surface-card relative min-h-70 rounded-2xl p-6 shadow-sm"
              >
                <span className="absolute right-5 top-4 text-4xl font-extrabold text-slate-100 dark:text-slate-800">
                  {step.number}
                </span>

                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-2xl text-brand-orange-dark dark:bg-orange-950 dark:text-orange-300">
                  <StepIcon />
                </div>

                <h3 className="mt-6 text-xl font-extrabold text-slate-900 dark:text-white">
                  {step.title}
                </h3>

                <p className="muted-text mt-3 text-sm leading-7">
                  {step.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;