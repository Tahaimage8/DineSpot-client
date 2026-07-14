"use client";

import {
  useMemo,
  useState,
  useTransition,
} from "react";
import {
  FiCalendar,
  FiClock,
  FiCoffee,
  FiMail,
  FiPhone,
  FiSearch,
  FiTrash2,
  FiUsers,
} from "react-icons/fi";
import { toast } from "react-toastify";

import { deleteAdminReservation } from "@/lib/actions/reservations";
import type {
  Reservation,
  ReservationStatus,
} from "@/lib/api/reservations";

type AdminReservationsProps = {
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

const AdminReservations = ({
  initialReservations,
}: AdminReservationsProps) => {
  const [reservations, setReservations] =
    useState(initialReservations);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>("all");

  const [activeId, setActiveId] =
    useState<string | null>(null);

  const [isPending, startTransition] =
    useTransition();

  const filteredReservations =
    useMemo(() => {
      const searchValue = search
        .trim()
        .toLowerCase();

      return reservations.filter(
        (reservation) => {
          const matchesStatus =
            statusFilter === "all" ||
            reservation.status ===
              statusFilter;

          const searchableText = [
            reservation.restaurantName,
            reservation.customerName,
            reservation.customerEmail,
            reservation.phone,
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
      reservations,
      search,
      statusFilter,
    ]);

  const handleDelete = (
    reservation: Reservation,
  ) => {
    const confirmed = window.confirm(
      `Delete the reservation for "${reservation.customerName}" at "${reservation.restaurantName}"?`,
    );

    if (!confirmed) {
      return;
    }

    setActiveId(reservation._id);

    startTransition(async () => {
      try {
        const result =
          await deleteAdminReservation(
            reservation._id,
          );

        setReservations(
          (currentReservations) =>
            currentReservations.filter(
              (item) =>
                item._id !==
                reservation._id,
            ),
        );

        toast.success(result.message);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to delete reservation.",
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
          Admin Panel
        </p>

        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
          Manage Reservations
        </h1>

        <p className="muted-text mt-2">
          Review all reservations across the
          platform.
        </p>
      </div>

      <div className="surface-card space-y-4 p-4 sm:p-5">
        <div className="relative">
          <FiSearch className="muted-text absolute left-4 top-1/2 -translate-y-1/2" />

          <input
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search restaurant, customer, email or phone..."
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] py-3 pl-11 pr-4 outline-none transition focus:border-orange-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
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
      </div>

      {filteredReservations.length === 0 ? (
        <div className="surface-card flex min-h-72 flex-col items-center justify-center p-8 text-center">
          <FiCalendar className="muted-text text-5xl" />

          <h2 className="mt-4 text-xl font-bold">
            No reservations found
          </h2>

          <p className="muted-text mt-2">
            Matching platform reservations will
            appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 xl:grid-cols-2">
          {filteredReservations.map(
            (reservation) => {
              const isWorking =
                isPending &&
                activeId ===
                  reservation._id;

              return (
                <article
                  key={reservation._id}
                  className="surface-card p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 className="flex items-center gap-2 text-xl font-bold">
                        <FiCoffee className="text-orange-500" />
                        {
                          reservation.restaurantName
                        }
                      </h2>

                      <p className="muted-text mt-2">
                        {
                          reservation.customerName
                        }
                      </p>

                      <p className="muted-text mt-1 flex items-center gap-2 text-sm">
                        <FiMail />
                        {
                          reservation.customerEmail
                        }
                      </p>
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

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(
                        reservation,
                      )
                    }
                    disabled={isWorking}
                    className="mt-5 inline-flex items-center gap-2 rounded-xl border border-red-300 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-500/40 dark:hover:bg-red-500/10"
                  >
                    <FiTrash2 />
                    {isWorking
                      ? "Deleting..."
                      : "Delete Reservation"}
                  </button>
                </article>
              );
            },
          )}
        </div>
      )}
    </section>
  );
};

export default AdminReservations;
