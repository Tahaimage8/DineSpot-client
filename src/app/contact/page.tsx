

import ContactContent from "@/src/components/contact/ContactContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Find DineSpot support information and access the official project repositories.",
};

const ContactPage = () => {
  return <ContactContent />;
};

export default ContactPage;
