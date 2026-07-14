"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  FiCalendar,
  FiCheckCircle,
  FiLogOut,
  FiMail,
  FiPhone,
  FiShield,
  FiUser,
} from "react-icons/fi";
import { toast } from "react-toastify";

import { authClient } from "@/lib/auth-client";

type ProfilePanelProps = {
  profile: {
    name: string;
    email: string;
    image?: string | null;
    phone?: string | null;
    roleLabel: string;
    emailVerified: boolean;
    joinedAt?: string | null;
  };
};

const ProfilePanel = ({
  profile,
}: ProfilePanelProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    const result =
      await authClient.signOut();

    if (result.error) {
      toast.error(
        result.error.message ||
          "Failed to sign out.",
      );

      return;
    }

    router.replace("/login");
    router.refresh();
  };

  const joinedDate = profile.joinedAt
    ? new Date(
        profile.joinedAt,
      ).toLocaleDateString()
    : "Not available";

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-orange-500">
          Account Profile
        </p>

        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
          My Profile
        </h1>

        <p className="muted-text mt-2">
          Review the information connected to
          your DineSpot account.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
        <article className="surface-card rounded-2xl p-6 text-center">
          {profile.image ? (
            <Image
              src={profile.image}
              alt={profile.name}
              width={112}
              height={112}
              className="mx-auto h-28 w-28 rounded-full object-cover"
            />
          ) : (
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-orange-100 text-4xl font-bold text-orange-600 dark:bg-orange-500/15 dark:text-orange-300">
              {profile.name
                .charAt(0)
                .toUpperCase() || <FiUser />}
            </div>
          )}

          <h2 className="mt-5 text-2xl font-bold">
            {profile.name}
          </h2>

          <p className="muted-text mt-1 break-all">
            {profile.email}
          </p>

          <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700 dark:bg-orange-500/15 dark:text-orange-300">
            <FiShield />
            {profile.roleLabel}
          </span>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-300 px-5 py-3 font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-500/40 dark:hover:bg-red-500/10"
          >
            <FiLogOut />
            Sign Out
          </button>
        </article>

        <article className="surface-card rounded-2xl p-5 sm:p-6">
          <h2 className="text-xl font-bold">
            Account Information
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[var(--border)] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-500/15 dark:text-orange-300">
                  <FiUser />
                </div>

                <div className="min-w-0">
                  <p className="muted-text text-sm">
                    Full Name
                  </p>

                  <p className="truncate font-semibold">
                    {profile.name}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border)] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-500/15 dark:text-orange-300">
                  <FiMail />
                </div>

                <div className="min-w-0">
                  <p className="muted-text text-sm">
                    Email
                  </p>

                  <p className="break-all font-semibold">
                    {profile.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border)] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-500/15 dark:text-orange-300">
                  <FiPhone />
                </div>

                <div>
                  <p className="muted-text text-sm">
                    Phone
                  </p>

                  <p className="font-semibold">
                    {profile.phone ||
                      "Not provided"}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border)] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-500/15 dark:text-orange-300">
                  <FiCalendar />
                </div>

                <div>
                  <p className="muted-text text-sm">
                    Joined
                  </p>

                  <p className="font-semibold">
                    {joinedDate}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border)] p-4 sm:col-span-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-500/15 dark:text-orange-300">
                  <FiCheckCircle />
                </div>

                <div>
                  <p className="muted-text text-sm">
                    Email Status
                  </p>

                  <p className="font-semibold">
                    {profile.emailVerified
                      ? "Verified"
                      : "Not verified"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-black/5 p-4 dark:bg-white/5">
            <p className="muted-text text-sm leading-6">
              Your dashboard access depends on
              your current account role. A
              blocked account is redirected away
              from all dashboard pages.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default ProfilePanel;
