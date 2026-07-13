"use client";

import { motion } from "motion/react";
import type { IconType } from "react-icons";
import {
  FiClock,
  FiCompass,
  FiLayout,
  FiShield,
} from "react-icons/fi";
import SectionHeader from "../shared/SectionHeader";

type BenefitItem = {
  title: string;
  description: string;
  icon: IconType;
};

const benefitItems: BenefitItem[] = [
  {
    title: "Simple Discovery",
    description:
      "Explore restaurant options through a clean and easy-to-understand interface.",
    icon: FiCompass,
  },
  {
    title: "Clear Information",
    description:
      "View important restaurant details in one organized place before making a decision.",
    icon: FiLayout,
  },
  {
    title: "Convenient Planning",
    description:
      "Plan your dining time without going through unnecessary or confusing steps.",
    icon: FiClock,
  },
  {
    title: "Secure Experience",
    description:
      "Account-based actions and protected pages help create a safer user experience.",
    icon: FiShield,
  },
];

const WhyChooseDineSpot = () => {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-shell">
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeader
            eyebrow="Why DineSpot"
            title="Designed for a better dining journey"
            description="DineSpot focuses on clarity, convenience and a smooth experience across mobile, tablet and desktop devices."
            align="left"
          />

          <div className="grid gap-5 sm:grid-cols-2">
            {benefitItems.map((benefit, index) => {
              const BenefitIcon = benefit.icon;

              return (
                <motion.article
                  key={benefit.title}
                  initial={{
                    opacity: 0,
                    scale: 0.96,
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.25,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.08,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    y: -5,
                  }}
                  className="surface-card min-h-55 rounded-2xl p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-xl text-brand-green dark:bg-green-950 dark:text-green-300">
                    <BenefitIcon />
                  </div>

                  <h3 className="mt-5 text-lg font-extrabold text-slate-900 dark:text-white">
                    {benefit.title}
                  </h3>

                  <p className="muted-text mt-3 text-sm leading-7">
                    {benefit.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseDineSpot;