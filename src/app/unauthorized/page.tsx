
import UnauthorizedAccess from "@/components/auth/UnauthorizedAccess";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unauthorized Access",
  description:
    "You do not have permission to access this DineSpot dashboard area.",
};

const UnauthorizedPage = () => {
  return <UnauthorizedAccess />;
};

export default UnauthorizedPage;