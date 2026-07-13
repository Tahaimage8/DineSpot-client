"use client";


import { motion } from "motion/react";
import { FiChevronDown } from "react-icons/fi";
import SectionHeader from "../shared/SectionHeader";

type FaqItem = {
  question: string;
  answer: string;
};

const faqItems: FaqItem[] = [
  {
    question: "Can visitors explore restaurants without creating an account?",
    answer:
      "Yes. Restaurant listings and restaurant detail pages will be publicly accessible.",
  },
  {
    question: "Is an account required to add a restaurant?",
    answer:
      "Yes. Adding and managing restaurant information will be available only to authenticated users.",
  },
  {
    question: "Can users manage their submitted restaurant information?",
    answer:
      "Authenticated users will be able to view and manage the restaurant entries associated with their accounts.",
  },
  {
    question: "Will DineSpot work on mobile devices?",
    answer:
      "Yes. The application is being designed for mobile, tablet and desktop screen sizes.",
  },
  {
    question: "How will table reservations work?",
    answer:
      "Users will choose a restaurant, reservation date, time and guest number before submitting a reservation request.",
  },
];

const FaqSection = () => {
  return (
    <section className="border-y border-(--surface-border) bg-white/40 py-16 dark:bg-slate-950/30 sm:py-20">
      <div className="container-shell">
        <SectionHeader
          eyebrow="Common Questions"
          title="Frequently asked questions"
          description="Find simple answers about exploring restaurants, accounts and reservation features."
        />

        <motion.div
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
            amount: 0.15,
          }}
          transition={{
            duration: 0.55,
            ease: "easeOut",
          }}
          className="mx-auto mt-10 max-w-3xl space-y-4"
        >
          {faqItems.map((faq) => (
            <details
              key={faq.question}
              className="group surface-card overflow-hidden rounded-2xl shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-5 font-bold text-slate-900 dark:text-white sm:px-6">
                <span>{faq.question}</span>

                <FiChevronDown className="shrink-0 text-xl text-brand-orange transition-transform duration-200 group-open:rotate-180" />
              </summary>

              <div className="border-t border-(--surface-border) px-5 py-5 sm:px-6">
                <p className="muted-text text-sm leading-7">
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FaqSection;