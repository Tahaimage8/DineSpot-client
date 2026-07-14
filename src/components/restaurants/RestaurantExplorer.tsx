"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  FiArrowRight,
  FiCoffee,
  FiMapPin,
  FiPhone,
  FiSearch,
} from "react-icons/fi";

import type { Restaurant } from "@/lib/api/restaurants";

type RestaurantExplorerProps = {
  restaurants: Restaurant[];
};

const RestaurantExplorer = ({
  restaurants,
}: RestaurantExplorerProps) => {
  const [search, setSearch] = useState("");
  const [cuisine, setCuisine] = useState("all");
  const [location, setLocation] =
    useState("all");

  const cuisines = useMemo(() => {
    return Array.from(
      new Set(
        restaurants
          .map((restaurant) =>
            restaurant.cuisine.trim(),
          )
          .filter(Boolean),
      ),
    ).sort();
  }, [restaurants]);

  const locations = useMemo(() => {
    return Array.from(
      new Set(
        restaurants
          .map((restaurant) =>
            restaurant.location.trim(),
          )
          .filter(Boolean),
      ),
    ).sort();
  }, [restaurants]);

  const filteredRestaurants = useMemo(() => {
    const searchValue = search
      .trim()
      .toLowerCase();

    return restaurants.filter((restaurant) => {
      const searchableText = [
        restaurant.name,
        restaurant.cuisine,
        restaurant.location,
        restaurant.description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !searchValue ||
        searchableText.includes(searchValue);

      const matchesCuisine =
        cuisine === "all" ||
        restaurant.cuisine === cuisine;

      const matchesLocation =
        location === "all" ||
        restaurant.location === location;

      return (
        matchesSearch &&
        matchesCuisine &&
        matchesLocation
      );
    });
  }, [
    restaurants,
    search,
    cuisine,
    location,
  ]);

  const resetFilters = () => {
    setSearch("");
    setCuisine("all");
    setLocation("all");
  };

  return (
    <section className="container-shell py-12 sm:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
          Explore DineSpot
        </p>

        <h1 className="mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl">
          Find Your Next Favorite Restaurant
        </h1>

        <p className="muted-text mx-auto mt-4 max-w-2xl leading-7">
          Browse approved restaurants and find
          the perfect place based on cuisine and
          location.
        </p>
      </div>

      <div className="surface-card mt-10 p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_220px_220px]">
          <div className="relative">
            <FiSearch className="muted-text absolute left-4 top-1/2 -translate-y-1/2 text-lg" />

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search restaurants..."
              className="w-full rounded-xl border border-(--border) bg-(--surface) py-3 pl-11 pr-4 outline-none transition focus:border-orange-500"
            />
          </div>

          <select
            value={cuisine}
            onChange={(event) =>
              setCuisine(event.target.value)
            }
            className="rounded-xl border border-(--border) bg-(--surface) px-4 py-3 outline-none transition focus:border-orange-500"
          >
            <option value="all">
              All Cuisines
            </option>

            {cuisines.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>

          <select
            value={location}
            onChange={(event) =>
              setLocation(event.target.value)
            }
            className="rounded-xl border border-(--border) bg-(--surface) px-4 py-3 outline-none transition focus:border-orange-500"
          >
            <option value="all">
              All Locations
            </option>

            {locations.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="muted-text text-sm">
            Showing{" "}
            <span className="font-semibold text-(--foreground)">
              {filteredRestaurants.length}
            </span>{" "}
            restaurant
            {filteredRestaurants.length === 1
              ? ""
              : "s"}
          </p>

          {(search ||
            cuisine !== "all" ||
            location !== "all") && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-sm font-semibold text-orange-500 transition hover:text-orange-600"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {filteredRestaurants.length === 0 ? (
        <div className="surface-card mt-8 flex min-h-80 flex-col items-center justify-center p-8 text-center">
          <FiCoffee className="muted-text text-6xl" />

          <h2 className="mt-5 text-2xl font-bold">
            No restaurants found
          </h2>

          <p className="muted-text mt-2 max-w-md">
            No approved restaurant matches your
            current search and filters.
          </p>

          <button
            type="button"
            onClick={resetFilters}
            className="mt-6 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredRestaurants.map(
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

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-bold">
                        {restaurant.name}
                      </h2>

                      <p className="mt-1 font-medium text-orange-500">
                        {restaurant.cuisine}
                      </p>
                    </div>

                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                      Open
                    </span>
                  </div>

                  <div className="muted-text mt-4 space-y-2 text-sm">
                    <p className="flex items-center gap-2">
                      <FiMapPin />
                      {restaurant.location}
                    </p>

                    {restaurant.phone && (
                      <p className="flex items-center gap-2">
                        <FiPhone />
                        {restaurant.phone}
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
      )}
    </section>
  );
};

export default RestaurantExplorer;