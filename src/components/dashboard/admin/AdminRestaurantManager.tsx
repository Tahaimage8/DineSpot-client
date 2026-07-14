"use client";

import Image from "next/image";
import {
  useMemo,
  useState,
  useTransition,
} from "react";
import {
  FiCheck,
  FiClock,
  FiCoffee,
  FiMapPin,
  FiSearch,
  FiTrash2,
  FiUser,
  FiX,
} from "react-icons/fi";
import { toast } from "react-toastify";

import {
  deleteAdminRestaurant,
  updateRestaurantStatus,
} from "@/lib/actions/restaurants";
import type {
  Restaurant,
  RestaurantStatus,
} from "@/lib/api/restaurants";

type AdminRestaurantManagerProps = {
  initialRestaurants: Restaurant[];
};

type StatusFilter =
  | "all"
  | RestaurantStatus;

const statusStyles: Record<
  RestaurantStatus,
  string
> = {
  pending:
    "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",

  approved:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",

  rejected:
    "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300",
};

const filterOptions: Array<{
  label: string;
  value: StatusFilter;
}> = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "Approved",
    value: "approved",
  },
  {
    label: "Rejected",
    value: "rejected",
  },
];

const AdminRestaurantManager = ({
  initialRestaurants,
}: AdminRestaurantManagerProps) => {
  const [restaurants, setRestaurants] =
    useState<Restaurant[]>(
      initialRestaurants,
    );

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>("all");

  const [
    activeRestaurantId,
    setActiveRestaurantId,
  ] = useState<string | null>(null);

  const [isPending, startTransition] =
    useTransition();

  const filteredRestaurants =
    useMemo(() => {
      const searchValue = search
        .trim()
        .toLowerCase();

      return restaurants.filter(
        (restaurant) => {
          const matchesStatus =
            statusFilter === "all" ||
            restaurant.status ===
              statusFilter;

          const searchableText = [
            restaurant.name,
            restaurant.cuisine,
            restaurant.location,
            restaurant.ownerEmail,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

          const matchesSearch =
            !searchValue ||
            searchableText.includes(
              searchValue,
            );

          return (
            matchesStatus &&
            matchesSearch
          );
        },
      );
    }, [
      restaurants,
      search,
      statusFilter,
    ]);

  const stats = useMemo(() => {
    return {
      total: restaurants.length,

      pending: restaurants.filter(
        (restaurant) =>
          restaurant.status ===
          "pending",
      ).length,

      approved: restaurants.filter(
        (restaurant) =>
          restaurant.status ===
          "approved",
      ).length,

      rejected: restaurants.filter(
        (restaurant) =>
          restaurant.status ===
          "rejected",
      ).length,
    };
  }, [restaurants]);

  const handleStatusChange = (
    restaurantId: string,
    status: RestaurantStatus,
  ) => {
    setActiveRestaurantId(
      restaurantId,
    );

    startTransition(async () => {
      try {
        const result =
          await updateRestaurantStatus(
            restaurantId,
            status,
          );

        if (result.restaurant) {
          setRestaurants(
            (currentRestaurants) =>
              currentRestaurants.map(
                (restaurant) =>
                  restaurant._id ===
                  restaurantId
                    ? result.restaurant!
                    : restaurant,
              ),
          );
        }

        toast.success(result.message);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to update restaurant status.",
        );
      } finally {
        setActiveRestaurantId(null);
      }
    });
  };

  const handleDelete = (
    restaurant: Restaurant,
  ) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${restaurant.name}"?`,
    );

    if (!confirmed) {
      return;
    }

    setActiveRestaurantId(
      restaurant._id,
    );

    startTransition(async () => {
      try {
        const result =
          await deleteAdminRestaurant(
            restaurant._id,
          );

        setRestaurants(
          (currentRestaurants) =>
            currentRestaurants.filter(
              (item) =>
                item._id !==
                restaurant._id,
            ),
        );

        toast.success(result.message);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to delete restaurant.",
        );
      } finally {
        setActiveRestaurantId(null);
      }
    });
  };

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-orange-500">
          Admin Panel
        </p>

        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
          Manage Restaurants
        </h1>

        <p className="muted-text mt-2">
          Review restaurant submissions and
          manage their approval status.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="surface-card p-5">
          <p className="muted-text text-sm">
            Total Restaurants
          </p>

          <p className="mt-2 text-3xl font-bold">
            {stats.total}
          </p>
        </div>

        <div className="surface-card p-5">
          <p className="muted-text text-sm">
            Pending
          </p>

          <p className="mt-2 text-3xl font-bold text-amber-600">
            {stats.pending}
          </p>
        </div>

        <div className="surface-card p-5">
          <p className="muted-text text-sm">
            Approved
          </p>

          <p className="mt-2 text-3xl font-bold text-emerald-600">
            {stats.approved}
          </p>
        </div>

        <div className="surface-card p-5">
          <p className="muted-text text-sm">
            Rejected
          </p>

          <p className="mt-2 text-3xl font-bold text-red-600">
            {stats.rejected}
          </p>
        </div>
      </div>

      <div className="surface-card p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <FiSearch className="muted-text absolute left-4 top-1/2 -translate-y-1/2" />

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value,
                )
              }
              placeholder="Search name, cuisine, location..."
              className="w-full rounded-xl border border-(--border) bg-(--surface) py-3 pl-11 pr-4 outline-none transition focus:border-orange-500"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {filterOptions.map(
              (option) => {
                const isActive =
                  statusFilter ===
                  option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      setStatusFilter(
                        option.value,
                      )
                    }
                    className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                      isActive
                        ? "bg-orange-500 text-white"
                        : "border border-(--border) hover:bg-black/5 dark:hover:bg-white/5"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              },
            )}
          </div>
        </div>
      </div>

      {filteredRestaurants.length ===
      0 ? (
        <div className="surface-card flex min-h-72 flex-col items-center justify-center p-8 text-center">
          <FiCoffee className="muted-text text-5xl" />

          <h2 className="mt-4 text-xl font-bold">
            No restaurants found
          </h2>

          <p className="muted-text mt-2">
            No restaurant matches the
            current search or filter.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 xl:grid-cols-2">
          {filteredRestaurants.map(
            (restaurant) => {
              const isWorking =
                isPending &&
                activeRestaurantId ===
                  restaurant._id;

              return (
                <article
                  key={restaurant._id}
                  className="surface-card overflow-hidden"
                >
                  <div className="relative h-52 bg-black/5 dark:bg-white/5">
                    {restaurant.image ? (
                      <Image
                        src={
                          restaurant.image
                        }
                        alt={restaurant.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1280px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <FiCoffee className="muted-text text-6xl" />
                      </div>
                    )}

                    <span
                      className={`absolute right-4 top-4 rounded-full px-3 py-1 text-sm font-semibold capitalize shadow-sm ${
                        statusStyles[
                          restaurant.status
                        ]
                      }`}
                    >
                      {restaurant.status}
                    </span>
                  </div>

                  <div className="p-5">
                    <h2 className="text-xl font-bold">
                      {restaurant.name}
                    </h2>

                    <div className="muted-text mt-3 space-y-2 text-sm">
                      <p className="flex items-center gap-2">
                        <FiCoffee />
                        {restaurant.cuisine}
                      </p>

                      <p className="flex items-center gap-2">
                        <FiMapPin />
                        {restaurant.location}
                      </p>

                      <p className="flex items-center gap-2 break-all">
                        <FiUser />
                        {restaurant.ownerEmail}
                      </p>

                      <p className="flex items-center gap-2">
                        <FiClock />
                        Submitted{" "}
                        {new Date(
                          restaurant.createdAt,
                        ).toLocaleDateString()}
                      </p>
                    </div>

                    {restaurant.description && (
                      <p className="muted-text mt-4 line-clamp-3 leading-6">
                        {
                          restaurant.description
                        }
                      </p>
                    )}

                    <div className="mt-6 flex flex-wrap gap-2 border-t border-(--border) pt-5">
                      {restaurant.status !==
                        "approved" && (
                        <button
                          type="button"
                          onClick={() =>
                            handleStatusChange(
                              restaurant._id,
                              "approved",
                            )
                          }
                          disabled={
                            isWorking
                          }
                          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <FiCheck />
                          Approve
                        </button>
                      )}

                      {restaurant.status !==
                        "rejected" && (
                        <button
                          type="button"
                          onClick={() =>
                            handleStatusChange(
                              restaurant._id,
                              "rejected",
                            )
                          }
                          disabled={
                            isWorking
                          }
                          className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <FiX />
                          Reject
                        </button>
                      )}

                      {restaurant.status !==
                        "pending" && (
                        <button
                          type="button"
                          onClick={() =>
                            handleStatusChange(
                              restaurant._id,
                              "pending",
                            )
                          }
                          disabled={
                            isWorking
                          }
                          className="inline-flex items-center gap-2 rounded-xl border border-(--border) px-4 py-2.5 text-sm font-semibold transition hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-60 dark:hover:bg-white/5"
                        >
                          <FiClock />
                          Set Pending
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(
                            restaurant,
                          )
                        }
                        disabled={isWorking}
                        className="inline-flex items-center gap-2 rounded-xl border border-red-300 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-500/40 dark:hover:bg-red-500/10"
                      >
                        <FiTrash2 />

                        {isWorking
                          ? "Working..."
                          : "Delete"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            },
          )}
        </div>
      )}
    </section>
  );
};

export default AdminRestaurantManager;