import RestaurantExplorer from "@/components/restaurants/RestaurantExplorer";
import type { Restaurant } from "@/lib/api/restaurants";
import { getRestaurants } from "@/lib/api/restaurants";

const ExplorePage = async () => {
  let restaurants: Restaurant[] = [];

  try {
    const restaurantData =
      await getRestaurants();

    restaurants = Array.isArray(
      restaurantData,
    )
      ? restaurantData
      : [];
  } catch (error) {
    console.error(
      "Failed to load restaurants:",
      error,
    );
  }

  return (
    <RestaurantExplorer
      restaurants={restaurants}
    />
  );
};

export default ExplorePage;