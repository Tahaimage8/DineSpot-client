import AdminRestaurantManager from "@/components/dashboard/admin/AdminRestaurantManager";
import { getAdminRestaurants } from "@/lib/api/restaurants";

const AdminRestaurantsPage =
  async () => {
    const restaurants =
      await getAdminRestaurants();

    return (
      <AdminRestaurantManager
        initialRestaurants={
          restaurants
        }
      />
    );
  };

export default AdminRestaurantsPage;