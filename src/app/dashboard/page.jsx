import AdminDashboardHome from "@/components/dashboard/home/AdminDashboardHome";
import CustomerDashboardHome from "@/components/dashboard/home/CustomerDashboardHome";
import RestaurantOwnerDashboardHome from "@/components/dashboard/home/RestaurantOwnerDashboardHome";
import { auth } from "@/lib/auth";
import { getEffectiveUserType } from "@/lib/auth-role";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  const userType = getEffectiveUserType(
    session.user,
  );

  if (userType === "admin") {
    return (
      <AdminDashboardHome user={session.user} />
    );
  }

  if (userType === "restaurant_owner") {
    return (
      <RestaurantOwnerDashboardHome
        user={session.user}
      />
    );
  }

  return (
    <CustomerDashboardHome user={session.user} />
  );
};

export default DashboardPage;