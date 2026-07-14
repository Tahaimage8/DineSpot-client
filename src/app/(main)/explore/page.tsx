import RestaurantExplorer from "@/components/restaurants/RestaurantExplorer";
import { getRestaurants } from "@/lib/api/restaurants";

const ExplorePage = async () => {
  const restaurants =
    await getRestaurants();

  return (
    <RestaurantExplorer
      restaurants={restaurants}
    />
  );
};

export default ExplorePage;