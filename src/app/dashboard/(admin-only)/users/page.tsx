import AdminUserManager from "@/components/dashboard/admin/AdminUserManager";
import { getAdminUsers } from "@/lib/api/users";

const AdminUsersPage = async () => {
  const users = await getAdminUsers();

  return (
    <AdminUserManager
      initialUsers={users}
    />
  );
};

export default AdminUsersPage;
