import Image from "next/image";
import Link from "next/link";
import {
  notFound,
  redirect,
} from "next/navigation";
import {
  FiArrowLeft,
  FiCoffee,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";

import ReservationForm from "@/components/reservations/ReservationForm";
import RestaurantReviews from "@/components/reviews/RestaurantReviews";
import { getRestaurantById } from "@/lib/api/restaurants";
import { getRestaurantReviews } from "@/lib/api/reviews";
import { getEffectiveUserType } from "@/lib/auth-role";
import { getUserSession } from "@/lib/core/session";

type RestaurantDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const RestaurantDetailsPage = async ({
  params,
}: RestaurantDetailsPageProps) => {
  const { id } = await params;

  const [
    restaurant,
    reviewData,
    session,
  ] = await Promise.all([
    getRestaurantById(id).catch(
      () => null,
    ),
    getRestaurantReviews(id).catch(
      () => ({
        reviews: [],
        summary: {
          averageRating: 0,
          reviewCount: 0,
        },
      }),
    ),
    getUserSession(),
  ]);

  if (session?.user?.isBlocked) {
    redirect("/blocked");
  }

  if (!restaurant) {
    notFound();
  }

  const userType = session?.user
    ? getEffectiveUserType(session.user)
    : null;

  return (
    <main className="container-shell py-10 sm:py-14">
      <Link
        href="/explore"
        className="muted-text inline-flex items-center gap-2 font-semibold transition hover:text-orange-500"
      >
        <FiArrowLeft />
        Back to Restaurants
      </Link>

      <article className="surface-card mt-6 overflow-hidden">
        <div className="relative h-72 bg-black/5 sm:h-96 lg:h-[480px] dark:bg-white/5">
          {restaurant.image ? (
            <Image
              src={restaurant.image}
              alt={restaurant.name}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <FiCoffee className="muted-text text-8xl" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-10">
            <p className="font-semibold text-orange-300">
              {restaurant.cuisine}
            </p>

            <h1 className="mt-2 text-3xl font-bold sm:text-5xl">
              {restaurant.name}
            </h1>

            <p className="mt-3 flex items-center gap-2 text-white/90">
              <FiMapPin />
              {restaurant.location}
            </p>

            {reviewData.summary
              .reviewCount > 0 && (
              <p className="mt-3 font-semibold text-amber-300">
                {reviewData.summary.averageRating.toFixed(
                  1,
                )}{" "}
                / 5 from{" "}
                {
                  reviewData.summary
                    .reviewCount
                }{" "}
                {reviewData.summary
                  .reviewCount === 1
                  ? "review"
                  : "reviews"}
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_360px] lg:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-500">
              About the Restaurant
            </p>

            <h2 className="mt-3 text-2xl font-bold">
              Discover {restaurant.name}
            </h2>

            <p className="muted-text mt-4 whitespace-pre-line leading-8">
              {restaurant.description ||
                "Restaurant description has not been provided yet."}
            </p>

            <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
              <h2 className="text-xl font-bold">
                Restaurant Information
              </h2>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-500/15 dark:text-orange-300">
                    <FiCoffee />
                  </div>

                  <div>
                    <p className="muted-text text-sm">
                      Cuisine
                    </p>

                    <p className="mt-1 font-semibold">
                      {restaurant.cuisine}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-500/15 dark:text-orange-300">
                    <FiMapPin />
                  </div>

                  <div>
                    <p className="muted-text text-sm">
                      Location
                    </p>

                    <p className="mt-1 font-semibold">
                      {restaurant.location}
                    </p>
                  </div>
                </div>

                {restaurant.phone && (
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-500/15 dark:text-orange-300">
                      <FiPhone />
                    </div>

                    <div>
                      <p className="muted-text text-sm">
                        Phone
                      </p>

                      <a
                        href={`tel:${restaurant.phone}`}
                        className="mt-1 block font-semibold transition hover:text-orange-500"
                      >
                        {restaurant.phone}
                      </a>
                    </div>
                  </div>
                )}

                {restaurant.email && (
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-500/15 dark:text-orange-300">
                      <FiMail />
                    </div>

                    <div className="min-w-0">
                      <p className="muted-text text-sm">
                        Email
                      </p>

                      <a
                        href={`mailto:${restaurant.email}`}
                        className="mt-1 block break-all font-semibold transition hover:text-orange-500"
                      >
                        {restaurant.email}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <ReservationForm
            restaurantId={restaurant._id}
            restaurantName={
              restaurant.name
            }
            isLoggedIn={Boolean(
              session?.user,
            )}
            canReserve={
              userType === "customer"
            }
          />
        </div>
      </article>

      <RestaurantReviews
        reviewData={reviewData}
      />
    </main>
  );
};

export default RestaurantDetailsPage;
