"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { toast } from "react-toastify";

import {
  createRestaurant,
  deleteRestaurant,
  updateRestaurant,
} from "@/lib/actions/restaurants";
import { uploadImage } from "@/lib/actions/upload-image";
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

const allowedImageTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const maximumImageSize = 2 * 1024 * 1024;

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
  const imageInputRef =
    useRef<HTMLInputElement>(null);

  const [restaurant, setRestaurant] =
    useState<Restaurant | null>(
      initialRestaurant,
    );

  const [formData, setFormData] =
    useState<RestaurantFormState>(
      getRestaurantForm(initialRestaurant),
    );

  const [selectedImage, setSelectedImage] =
    useState<File | null>(null);

  const [imagePreview, setImagePreview] =
    useState(initialRestaurant?.image || "");

  const [isEditing, setIsEditing] =
    useState(!initialRestaurant);

  const [isPending, startTransition] =
    useTransition();

  useEffect(() => {
    return () => {
      if (imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

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

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const image = event.target.files?.[0];

    if (!image) {
      return;
    }

    if (!allowedImageTypes.includes(image.type)) {
      toast.error(
        "Only JPG, PNG and WebP images are allowed.",
      );

      event.target.value = "";
      return;
    }

    if (image.size > maximumImageSize) {
      toast.error(
        "The image must be smaller than 2 MB.",
      );

      event.target.value = "";
      return;
    }

    setSelectedImage(image);
    setImagePreview(
      URL.createObjectURL(image),
    );
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview("");

    setFormData((currentData) => ({
      ...currentData,
      image: "",
    }));

    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const resetImage = (
    currentRestaurant: Restaurant | null,
  ) => {
    setSelectedImage(null);
    setImagePreview(
      currentRestaurant?.image || "",
    );

    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const handleCancel = () => {
    setFormData(
      getRestaurantForm(restaurant),
    );

    resetImage(restaurant);
    setIsEditing(false);
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    startTransition(async () => {
      try {
        let imageUrl =
          formData.image.trim();

        if (selectedImage) {
          const imageFormData =
            new FormData();

          imageFormData.append(
            "image",
            selectedImage,
          );

          const uploadResult =
            await uploadImage(
              imageFormData,
            );

          if (
            !uploadResult.success ||
            !uploadResult.imageUrl
          ) {
            throw new Error(
              uploadResult.message,
            );
          }

          imageUrl =
            uploadResult.imageUrl;
        }

        const restaurantData: RestaurantInput =
          {
            name: formData.name.trim(),
            cuisine:
              formData.cuisine.trim(),
            location:
              formData.location.trim(),
            description:
              formData.description.trim(),
            phone: formData.phone.trim(),
            email: formData.email.trim(),
            image: imageUrl,
          };

        const result = restaurant
          ? await updateRestaurant(
              restaurant._id,
              restaurantData,
            )
          : await createRestaurant(
              restaurantData,
            );

        if (result.restaurant) {
          setRestaurant(
            result.restaurant,
          );

          setFormData(
            getRestaurantForm(
              result.restaurant,
            ),
          );

          resetImage(
            result.restaurant,
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
        resetImage(null);
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

  const openEditForm = () => {
    setFormData(
      getRestaurantForm(restaurant),
    );

    resetImage(restaurant);
    setIsEditing(true);
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
              disabled={isPending}
              className="w-full rounded-xl border border-(--border) bg-(--surface) px-4 py-3 outline-none transition focus:border-orange-500 disabled:opacity-60"
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
              disabled={isPending}
              className="w-full rounded-xl border border-(--border) bg-(--surface) px-4 py-3 outline-none transition focus:border-orange-500 disabled:opacity-60"
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
              disabled={isPending}
              className="w-full rounded-xl border border-(--border) bg-(--surface) px-4 py-3 outline-none transition focus:border-orange-500 disabled:opacity-60"
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
              disabled={isPending}
              className="w-full rounded-xl border border-(--border) bg-(--surface) px-4 py-3 outline-none transition focus:border-orange-500 disabled:opacity-60"
            />
          </div>

          <div className="sm:col-span-2">
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
              disabled={isPending}
              className="w-full rounded-xl border border-(--border) bg-(--surface) px-4 py-3 outline-none transition focus:border-orange-500 disabled:opacity-60"
            />
          </div>

          <div className="sm:col-span-2">
            <p className="mb-2 block text-sm font-semibold">
              Restaurant Image
            </p>

            <div className="rounded-2xl border border-dashed border-(--border) p-4">
              {imagePreview ? (
                <div className="relative h-56 overflow-hidden rounded-xl sm:h-72">
                  <Image
                    src={imagePreview}
                    alt="Restaurant preview"
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                </div>
              ) : (
                <div className="flex h-44 items-center justify-center rounded-xl bg-black/5 text-center dark:bg-white/5">
                  <div>
                    <p className="font-semibold">
                      No image selected
                    </p>

                    <p className="muted-text mt-1 text-sm">
                      JPG, PNG or WebP,
                      maximum 2 MB
                    </p>
                  </div>
                </div>
              )}

              <input
                ref={imageInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
                disabled={isPending}
                className="hidden"
              />

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() =>
                    imageInputRef.current?.click()
                  }
                  disabled={isPending}
                  className="rounded-xl bg-emerald-700 px-5 py-2.5 font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {imagePreview
                    ? "Change Image"
                    : "Choose Image"}
                </button>

                {imagePreview && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    disabled={isPending}
                    className="rounded-xl border border-red-300 px-5 py-2.5 font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-60 dark:border-red-500/40 dark:hover:bg-red-500/10"
                  >
                    Remove Image
                  </button>
                )}
              </div>

              {selectedImage && (
                <p className="muted-text mt-3 text-sm">
                  Selected:{" "}
                  {selectedImage.name}
                </p>
              )}
            </div>
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
              disabled={isPending}
              className="w-full resize-none rounded-xl border border-(--border) bg-(--surface) px-4 py-3 outline-none transition focus:border-orange-500 disabled:opacity-60"
            />
          </div>

          <div className="flex flex-wrap gap-3 sm:col-span-2">
            <button
              type="submit"
              disabled={isPending}
              className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending
                ? "Uploading & Saving..."
                : restaurant
                  ? "Update Restaurant"
                  : "Submit Restaurant"}
            </button>

            {restaurant && (
              <button
                type="button"
                onClick={handleCancel}
                disabled={isPending}
                className="rounded-xl border border-(--border) px-6 py-3 font-semibold transition hover:bg-black/5 disabled:opacity-60 dark:hover:bg-white/5"
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

          {restaurant.status === "pending" && (
            <div className="mt-6 rounded-xl bg-amber-50 p-4 text-sm text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
              Your restaurant is waiting for
              admin approval.
            </div>
          )}

          {restaurant.status === "rejected" && (
            <div className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-300">
              Your restaurant was rejected.
              Update the information and contact
              the administrator if necessary.
            </div>
          )}

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={openEditForm}
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