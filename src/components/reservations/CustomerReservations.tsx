"use client";

import Image from "next/image";
import {
  useMemo,
  useState,
  useTransition,
} from "react";
import {
  FiCalendar,
  FiClock,
  FiCoffee,
  FiMapPin,
  FiPhone,
  FiUsers,
  FiXCircle,
} from "react-icons/fi";
import { toast } from "react-toastify";

import { cancelReservation } from "@/lib/actions/reservations";
import type {
  Reservation,
  ReservationStatus,
} from "@/lib/api/reservations";

type CustomerReservationsProps = {
  initialReservations: Reservation[];
};

type StatusFilter =
  | "all"
  | ReservationStatus;

const statusStyles: Record<
  ReservationStatus,
  string
> = {
  pending:
    "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  confirmed:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  rejected:
    "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300",
  cancelled:
    "bg-slate-200 text-slate-700 dark:bg-slate-500/20 dark:text-slate-300",
  completed:
    "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300",
};

const filters: Array<{
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
    label: "Confirmed",
    value: "confirmed",
  },
  {
    label: "Completed",
    value: "completed",
  },
  {
    label: "Cancelled",
    value: "cancelled",
  },
  {
    label: "Rejected",
    value: "rejected",
  },
];

const CustomerReservations = ({
  initialReservations,
}: CustomerReservationsProps) => {
  const [reservations, setReservations] =
    useState(initialReservations);

  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>("all");

  const [activeId, setActiveId] =
    useState<string | null>(null);

  const [isPending, startTransition] =
    useTransition();

  const filteredReservations =
    useMemo(() => {
      if (statusFilter === "all") {
        return reservations;
      }

      return reservations.filter(
        (reservation) =>
          reservation.status ===
          statusFilter,
      );
    }, [reservations, statusFilter]);

  const handleCancel = (
    reservation: Reservation,
  ) => {
    const confirmed = window.confirm(
      `Cancel your reservation at "${reservation.restaurantName}"?`,
    );

    if (!confirmed) {
      return;
    }

    setActiveId(reservation._id);

    startTransition(async () => {
      try {
        const result =
          await cancelReservation(
            reservation._id,
          );

        if (result.reservation) {
          setReservations(
            (currentReservations) =>
              currentReservations.map(
                (item) =>
                  item._id ===
                  reservation._id
                    ? result.reservation!
                    : item,
              ),
          );
        }

        toast.success(result.message);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to cancel reservation.",
        );
      } finally {
        setActiveId(null);
      }
    });
  };

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-orange-500">
          Customer Dashboard
        </p>

        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
          My Reservations
        </h1>

        <p className="muted-text mt-2">
          Track and manage your restaurant
          reservations.
        </p>
      </div>

      <div className="surface-card flex flex-wrap gap-2 p-4">
        {filters.map((filter) => {
          const isActive =
            statusFilter === filter.value;

          return (
            <button
              key={filter.value}
              type="button"
              onClick={() =>
                setStatusFilter(
                  filter.value,
                )
              }
              className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                isActive
                  ? "bg-orange-500 text-white"
                  : "border border-[var(--border)] hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      {filteredReservations.length === 0 ? (
        <div className="surface-card flex min-h-72 flex-col items-center justify-center p-8 text-center">
          <FiCalendar className="muted-text text-5xl" />

          <h2 className="mt-4 text-xl font-bold">
            No reservations found
          </h2>

          <p className="muted-text mt-2">
            Your matching reservations will
            appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 xl:grid-cols-2">
          {filteredReservations.map(
            (reservation) => {
              const canCancel = [
                "pending",
                "confirmed",
              ].includes(
                reservation.status,
              );

              const isWorking =
                isPending &&
                activeId ===
                  reservation._id;

              return (
                <article
                  key={reservation._id}
                  className="surface-card overflow-hidden"
                >
                  <div className="grid sm:grid-cols-[180px_1fr]">
                    <div className="relative min-h-44 bg-black/5 dark:bg-white/5">
                      {reservation.restaurantImage ? (
                        <Image
                          src={
                            reservation.restaurantImage
                          }
                          alt={
                            reservation.restaurantName
                          }
                          fill
                          className="object-cover"
                          sizes="180px"
                        />
                      ) : (
                        <div className="flex h-full min-h-44 items-center justify-center">
                          <FiCoffee className="muted-text text-5xl" />
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h2 className="text-xl font-bold">
                            {
                              reservation.restaurantName
                            }
                          </h2>

                          {reservation.restaurantLocation && (
                            <p className="muted-text mt-1 flex items-center gap-2 text-sm">
                              <FiMapPin />
                              {
                                reservation.restaurantLocation
                              }
                            </p>
                          )}
                        </div>

                        <span
                          className={`rounded-full px-3 py-1 text-sm font-semibold capitalize ${
                            statusStyles[
                              reservation.status
                            ]
                          }`}
                        >
                          {reservation.status}
                        </span>
                      </div>

                      <div className="muted-text mt-5 grid gap-3 text-sm sm:grid-cols-2">
                        <p className="flex items-center gap-2">
                          <FiCalendar />
                          {
                            reservation.reservationDate
                          }
                        </p>

                        <p className="flex items-center gap-2">
                          <FiClock />
                          {
                            reservation.reservationTime
                          }
                        </p>

                        <p className="flex items-center gap-2">
                          <FiUsers />
                          {
                            reservation.guestCount
                          }{" "}
                          guest
                          {reservation.guestCount ===
                          1
                            ? ""
                            : "s"}
                        </p>

                        <p className="flex items-center gap-2">
                          <FiPhone />
                          {reservation.phone}
                        </p>
                      </div>

                      {reservation.specialRequest && (
                        <div className="mt-4 rounded-xl bg-black/5 p-3 text-sm dark:bg-white/5">
                          <p className="font-semibold">
                            Special Request
                          </p>

                          <p className="muted-text mt-1">
                            {
                              reservation.specialRequest
                            }
                          </p>
                        </div>
                      )}

                      {canCancel && (
                        <button
                          type="button"
                          onClick={() =>
                            handleCancel(
                              reservation,
                            )
                          }
                          disabled={isWorking}
                          className="mt-5 inline-flex items-center gap-2 rounded-xl border border-red-300 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-500/40 dark:hover:bg-red-500/10"
                        >
                          <FiXCircle />
                          {isWorking
                            ? "Cancelling..."
                            : "Cancel Reservation"}
                        </button>
                      )}
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

export default CustomerReservations;
