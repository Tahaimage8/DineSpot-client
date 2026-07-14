import Image from "next/image";
import Link from "next/link";
import {
  FiArrowRight,
  FiCoffee,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";

import type { Restaurant } from "@/lib/api/restaurants";
import SectionHeader from "@/components/shared/SectionHeader";

type FeaturedRestaurantsProps = {
  restaurants: Restaurant[];
};

const FeaturedRestaurants = ({
  restaurants,
}: FeaturedRestaurantsProps) => {
  const featuredRestaurants =
    restaurants.slice(0, 3);

  return (
    <section className="py-16 sm:py-20">
      <div className="container-shell">
        <SectionHeader
          eyebrow="Discover Restaurants"
          title="Restaurants You Can Explore"
          description="Browse recently approved restaurants and view their real information before choosing your next dining place."
        />

        {featuredRestaurants.length === 0 ? (
          <div className="surface-card mt-10 flex min-h-72 flex-col items-center justify-center p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-500 dark:bg-orange-500/15">
              <FiCoffee className="text-3xl" />
            </div>

            <h3 className="mt-5 text-xl font-bold">
              No restaurants available yet
            </h3>

            <p className="muted-text mt-2 max-w-md">
              Approved restaurants will appear
              here after they are added to the
              platform.
            </p>
          </div>
        ) : (
          <>
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {featuredRestaurants.map(
                (restaurant) => (
                  <article
                    key={restaurant._id}
                    className="surface-card group overflow-hidden"
                  >
                    <div className="relative h-56 bg-black/5 dark:bg-white/5">
                      {restaurant.image ? (
                        <Image
                          src={restaurant.image}
                          alt={restaurant.name}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <FiCoffee className="muted-text text-6xl" />
                        </div>
                      )}
                    </div>

                    <div className="p-5 sm:p-6">
                      <h3 className="text-xl font-bold">
                        {restaurant.name}
                      </h3>

                      <p className="mt-1 font-semibold text-orange-500">
                        {restaurant.cuisine}
                      </p>

                      <div className="muted-text mt-4 space-y-2 text-sm">
                        <p className="flex items-start gap-2">
                          <FiMapPin className="mt-0.5 shrink-0" />

                          <span>
                            {restaurant.location}
                          </span>
                        </p>

                        {restaurant.phone && (
                          <p className="flex items-center gap-2">
                            <FiPhone className="shrink-0" />

                            <span>
                              {restaurant.phone}
                            </span>
                          </p>
                        )}
                      </div>

                      {restaurant.description && (
                        <p className="muted-text mt-4 line-clamp-3 leading-6">
                          {restaurant.description}
                        </p>
                      )}

                      <Link
                        href={`/explore/${restaurant._id}`}
                        className="mt-6 inline-flex items-center gap-2 font-semibold text-orange-500 transition hover:gap-3 hover:text-orange-600"
                      >
                        View Restaurant

                        <FiArrowRight />
                      </Link>
                    </div>
                  </article>
                ),
              )}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
              >
                Explore All Restaurants

                <FiArrowRight />
              </Link>

              {restaurants.length > 3 && (
                <p className="muted-text mt-3 text-sm">
                  More restaurants are available
                  on the Explore page.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedRestaurants;