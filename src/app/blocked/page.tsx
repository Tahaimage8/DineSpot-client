import BlockedAccess from "@/components/auth/BlockedAccess";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Blocked",
  description:
    "This DineSpot account is currently blocked.",
};

const BlockedPage = () => {
  return <BlockedAccess />;
};

export default BlockedPage;
