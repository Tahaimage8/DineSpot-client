"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  type ChangeEvent,
  type FormEvent,
  useState,
  useTransition,
} from "react";
import { toast } from "react-toastify";

import {
  createRestaurant,
  deleteRestaurant,
  updateRestaurant,
} from "@/lib/actions/restaurants";
import type {
  Restaurant,
  RestaurantInput,
  RestaurantStatus,
} from "@/lib/api/restaurants";

type OwnerRestaurantPanelProps = {
  initialRestaurant: Restaurant | null;
};

type RestaurantFormState = {
  name: string;
  cuisine: string;
  location: string;
  description: string;
  phone: string;
  email: string;
  image: string;
};

const emptyForm: RestaurantFormState = {
  name: "",
  cuisine: "",
  location: "",
  description: "",
  phone: "",
  email: "",
  image: "",
};

const getRestaurantForm = (
  restaurant: Restaurant | null,
): RestaurantFormState => {
  if (!restaurant) {
    return emptyForm;
  }

  return {
    name: restaurant.name || "",
    cuisine: restaurant.cuisine || "",
    location: restaurant.location || "",
    description: restaurant.description || "",
    phone: restaurant.phone || "",
    email: restaurant.email || "",
    image: restaurant.image || "",
  };
};

const statusStyle: Record<
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

const OwnerRestaurantPanel = ({
  initialRestaurant,
}: OwnerRestaurantPanelProps) => {
  const router = useRouter();

  const [restaurant, setRestaurant] =
    useState<Restaurant | null>(
      initialRestaurant,
    );

  const [formData, setFormData] =
    useState<RestaurantFormState>(
      getRestaurantForm(initialRestaurant),
    );

  const [isEditing, setIsEditing] =
    useState(!initialRestaurant);

  const [isPending, startTransition] =
    useTransition();

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setFormData(
      getRestaurantForm(restaurant),
    );

    setIsEditing(false);
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const restaurantData: RestaurantInput = {
      name: formData.name.trim(),
      cuisine: formData.cuisine.trim(),
      location: formData.location.trim(),
      description:
        formData.description.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      image: formData.image.trim(),
    };

    startTransition(async () => {
      try {
        const result = restaurant
          ? await updateRestaurant(
              restaurant._id,
              restaurantData,
            )
          : await createRestaurant(
              restaurantData,
            );

        if (result.restaurant) {
          setRestaurant(result.restaurant);

          setFormData(
            getRestaurantForm(
              result.restaurant,
            ),
          );
        }

        setIsEditing(false);

        toast.success(result.message);

        router.refresh();
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Something went wrong.",
        );
      }
    });
  };

  const handleDelete = () => {
    if (!restaurant) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete your restaurant?",
    );

    if (!confirmed) {
      return;
    }

    startTransition(async () => {
      try {
        const result =
          await deleteRestaurant(
            restaurant._id,
          );

        setRestaurant(null);
        setFormData(emptyForm);
        setIsEditing(true);

        toast.success(result.message);

        router.refresh();
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to delete restaurant.",
        );
      }
    });
  };

  if (isEditing) {
    return (
      <section className="surface-card mx-auto max-w-4xl p-5 sm:p-7">
        <div className="mb-7">
          <p className="text-sm font-semibold text-orange-500">
            Restaurant Owner
          </p>

          <h1 className="mt-1 text-2xl font-bold text-(--foreground) sm:text-3xl">
            {restaurant
              ? "Update Restaurant"
              : "Add Your Restaurant"}
          </h1>

          <p className="muted-text mt-2">
            {restaurant
              ? "Update your restaurant information."
              : "Submit your restaurant for admin approval."}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-5 sm:grid-cols-2"
        >
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold"
            >
              Restaurant Name
            </label>

            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter restaurant name"
              required
              className="w-full rounded-xl border border-(--border) bg-(--surface) px-4 py-3 outline-none transition focus:border-orange-500"
            />
          </div>

          <div>
            <label
              htmlFor="cuisine"
              className="mb-2 block text-sm font-semibold"
            >
              Cuisine
            </label>

            <input
              id="cuisine"
              name="cuisine"
              value={formData.cuisine}
              onChange={handleChange}
              placeholder="Bangladeshi, Italian..."
              required
              className="w-full rounded-xl border border-(--border) bg-(--surface) px-4 py-3 outline-none transition focus:border-orange-500"
            />
          </div>

          <div>
            <label
              htmlFor="location"
              className="mb-2 block text-sm font-semibold"
            >
              Location
            </label>

            <input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Dhaka, Bangladesh"
              required
              className="w-full rounded-xl border border-(--border) bg-(--surface) px-4 py-3 outline-none transition focus:border-orange-500"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-semibold"
            >
              Phone
            </label>

            <input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="01XXXXXXXXX"
              className="w-full rounded-xl border border-(--border) bg-(--surface) px-4 py-3 outline-none transition focus:border-orange-500"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold"
            >
              Restaurant Email
            </label>

            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="restaurant@example.com"
              className="w-full rounded-xl border border-(--border) bg-(--surface) px-4 py-3 outline-none transition focus:border-orange-500"
            />
          </div>

          <div>
            <label
              htmlFor="image"
              className="mb-2 block text-sm font-semibold"
            >
              Image URL
            </label>

            <input
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://i.ibb.co/..."
              className="w-full rounded-xl border border-(--border) bg-(--surface) px-4 py-3 outline-none transition focus:border-orange-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-semibold"
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write a short description..."
              rows={5}
              className="w-full resize-none rounded-xl border border-(--border) bg-(--surface) px-4 py-3 outline-none transition focus:border-orange-500"
            />
          </div>

          <div className="flex flex-wrap gap-3 sm:col-span-2">
            <button
              type="submit"
              disabled={isPending}
              className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending
                ? "Saving..."
                : restaurant
                  ? "Update Restaurant"
                  : "Submit Restaurant"}
            </button>

            {restaurant && (
              <button
                type="button"
                onClick={handleCancel}
                disabled={isPending}
                className="rounded-xl border border-(--border) px-6 py-3 font-semibold transition hover:bg-black/5 dark:hover:bg-white/5"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>
    );
  }

  if (!restaurant) {
    return null;
  }

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-orange-500">
          Restaurant Owner
        </p>

        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
          My Restaurant
        </h1>

        <p className="muted-text mt-2">
          View and manage your restaurant
          information.
        </p>
      </div>

      <article className="surface-card overflow-hidden">
        {restaurant.image && (
          <div className="relative h-56 w-full sm:h-72">
            <Image
              src={restaurant.image}
              alt={restaurant.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 900px"
            />
          </div>
        )}

        <div className="p-5 sm:p-7">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <h2 className="text-2xl font-bold">
                {restaurant.name}
              </h2>

              <p className="muted-text mt-1">
                {restaurant.cuisine} •{" "}
                {restaurant.location}
              </p>
            </div>

            <span
              className={`w-fit rounded-full px-3 py-1 text-sm font-semibold capitalize ${
                statusStyle[restaurant.status]
              }`}
            >
              {restaurant.status}
            </span>
          </div>

          {restaurant.description && (
            <p className="muted-text mt-5 leading-7">
              {restaurant.description}
            </p>
          )}

          <div className="mt-6 grid gap-4 border-t border-(--border) pt-5 sm:grid-cols-2">
            <div>
              <p className="muted-text text-sm">
                Phone
              </p>

              <p className="mt-1 font-semibold">
                {restaurant.phone ||
                  "Not provided"}
              </p>
            </div>

            <div>
              <p className="muted-text text-sm">
                Email
              </p>

              <p className="mt-1 font-semibold">
                {restaurant.email ||
                  "Not provided"}
              </p>
            </div>

            <div>
              <p className="muted-text text-sm">
                Owner Email
              </p>

              <p className="mt-1 font-semibold">
                {restaurant.ownerEmail}
              </p>
            </div>

            <div>
              <p className="muted-text text-sm">
                Submitted
              </p>

              <p className="mt-1 font-semibold">
                {new Date(
                  restaurant.createdAt,
                ).toLocaleDateString()}
              </p>
            </div>
          </div>

          {restaurant.status ===
            "pending" && (
            <div className="mt-6 rounded-xl bg-amber-50 p-4 text-sm text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
              Your restaurant is waiting for
              admin approval.
            </div>
          )}

          {restaurant.status ===
            "rejected" && (
            <div className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-300">
              Your restaurant was rejected.
              Update the information and contact
              the administrator if necessary.
            </div>
          )}

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                setFormData(
                  getRestaurantForm(
                    restaurant,
                  ),
                );

                setIsEditing(true);
              }}
              disabled={isPending}
              className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:opacity-60"
            >
              Edit Restaurant
            </button>

            <button
              type="button"
              onClick={handleDelete}
              disabled={isPending}
              className="rounded-xl border border-red-300 px-6 py-3 font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-60 dark:border-red-500/40 dark:hover:bg-red-500/10"
            >
              {isPending
                ? "Deleting..."
                : "Delete Restaurant"}
            </button>
          </div>
        </div>
      </article>
    </section>
  );
};

export default OwnerRestaurantPanel;