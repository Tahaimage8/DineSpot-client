


import AboutContent from "@/src/components/about/AboutContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about DineSpot, its purpose and its approach to restaurant discovery and reservations.",
};

const AboutPage = () => {
  return <AboutContent />;
};

export default AboutPage;