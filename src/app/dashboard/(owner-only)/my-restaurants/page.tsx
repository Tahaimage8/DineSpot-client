import OwnerRestaurantPanel from "@/components/dashboard/owner/OwnerRestaurantPanel";
import { getMyRestaurants } from "@/lib/api/restaurants";

const MyRestaurantsPage = async () => {
  const restaurants =
    await getMyRestaurants();

  const restaurant =
    restaurants[0] || null;

  return (
    <OwnerRestaurantPanel
      initialRestaurant={restaurant}
    />
  );
};

export default MyRestaurantsPage;