import Banner from "@/components/home/Banner";
import FaqSection from "@/components/home/FaqSection";
import FeaturedRestaurants from "@/components/home/FeaturedRestaurants";
import FinalCta from "@/components/home/FinalCta";
import HowItWorks from "@/components/home/HowItWorks";
import WhyChooseDineSpot from "@/components/home/WhyChooseDineSpot";
import type { Restaurant } from "@/lib/api/restaurants";
import { getRestaurants } from "@/lib/api/restaurants";

const HomePage = async () => {
  const restaurants: Restaurant[] =
    await getRestaurants().catch(() => []);

  return (
    <>
      <Banner />

      <FeaturedRestaurants
        restaurants={restaurants}
      />

      <HowItWorks />

      <WhyChooseDineSpot />

      <FaqSection />

      <FinalCta />
    </>
  );
};

export default HomePage;