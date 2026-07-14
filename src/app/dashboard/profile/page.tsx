import ProfilePanel from "@/components/dashboard/profile/ProfilePanel";
import { getAccountLabel } from "@/lib/auth-role";
import { requireDashboardRole } from "@/lib/dashboard-access";

const ProfilePage = async () => {
  const session =
    await requireDashboardRole([
      "admin",
      "customer",
      "restaurant_owner",
    ]);

  return (
    <ProfilePanel
      profile={{
        name:
          session.user.name ||
          "DineSpot User",
        email: session.user.email,
        image:
          session.user.image || null,
        phone:
          session.user.phone || null,
        roleLabel: getAccountLabel(
          session.user,
        ),
        emailVerified: Boolean(
          session.user.emailVerified,
        ),
        joinedAt:
          session.user.createdAt
            ? new Date(
                session.user.createdAt,
              ).toISOString()
            : null,
      }}
    />
  );
};

export default ProfilePage;
