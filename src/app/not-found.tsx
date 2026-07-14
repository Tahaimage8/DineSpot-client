import NotFoundScreen from "@/components/shared/NotFoundScreen";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | DineSpot",
  description:
    "The requested DineSpot page could not be found.",
};

const NotFoundPage = () => {
  return <NotFoundScreen />;
};

export default NotFoundPage;
