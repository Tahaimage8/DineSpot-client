"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  type FormEvent,
  useState,
  useTransition,
} from "react";
import {
  FiCalendar,
  FiClock,
  FiPhone,
  FiUsers,
} from "react-icons/fi";
import { toast } from "react-toastify";

import { createReservation } from "@/lib/actions/reservations";

type ReservationFormProps = {
  restaurantId: string;
  restaurantName: string;
  isLoggedIn: boolean;
  canReserve: boolean;
};

const getToday = () => {
  const now = new Date();
  const localDate = new Date(
    now.getTime() -
      now.getTimezoneOffset() * 60_000,
  );

  return localDate
    .toISOString()
    .slice(0, 10);
};

const ReservationForm = ({
  restaurantId,
  restaurantName,
  isLoggedIn,
  canReserve,
}: ReservationFormProps) => {
  const router = useRouter();

  const [reservationDate, setReservationDate] =
    useState("");

  const [reservationTime, setReservationTime] =
    useState("");

  const [guestCount, setGuestCount] =
    useState("2");

  const [phone, setPhone] = useState("");

  const [specialRequest, setSpecialRequest] =
    useState("");

  const [isPending, startTransition] =
    useTransition();

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    startTransition(async () => {
      try {
        const result = await createReservation({
          restaurantId,
          reservationDate,
          reservationTime,
          guestCount: Number(guestCount),
          phone: phone.trim(),
          specialRequest:
            specialRequest.trim(),
        });

        toast.success(result.message);

        setReservationDate("");
        setReservationTime("");
        setGuestCount("2");
        setPhone("");
        setSpecialRequest("");

        router.push(
          "/dashboard/reservations",
        );
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to submit reservation.",
        );
      }
    });
  };

  if (!isLoggedIn) {
    return (
      <aside className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
        <h2 className="text-xl font-bold">
          Reserve a Table
        </h2>

        <p className="muted-text mt-3 leading-7">
          Log in as a customer to reserve a table
          at {restaurantName}.
        </p>

        <Link
          href="/login"
          className="mt-5 inline-flex rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600"
        >
          Login to Reserve
        </Link>
      </aside>
    );
  }

  if (!canReserve) {
    return (
      <aside className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
        <h2 className="text-xl font-bold">
          Reserve a Table
        </h2>

        <p className="muted-text mt-3 leading-7">
          Only customer accounts can create
          restaurant reservations.
        </p>
      </aside>
    );
  }

  return (
    <aside className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
      <h2 className="text-xl font-bold">
        Reserve a Table
      </h2>

      <p className="muted-text mt-2 text-sm">
        Send a reservation request to{" "}
        {restaurantName}.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-4"
      >
        <div>
          <label
            htmlFor="reservationDate"
            className="mb-2 block text-sm font-semibold"
          >
            Date
          </label>

          <div className="relative">
            <FiCalendar className="muted-text absolute left-4 top-1/2 -translate-y-1/2" />

            <input
              id="reservationDate"
              type="date"
              min={getToday()}
              value={reservationDate}
              onChange={(event) =>
                setReservationDate(
                  event.target.value,
                )
              }
              required
              disabled={isPending}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] py-3 pl-11 pr-4 outline-none transition focus:border-orange-500 disabled:opacity-60"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="reservationTime"
            className="mb-2 block text-sm font-semibold"
          >
            Time
          </label>

          <div className="relative">
            <FiClock className="muted-text absolute left-4 top-1/2 -translate-y-1/2" />

            <input
              id="reservationTime"
              type="time"
              value={reservationTime}
              onChange={(event) =>
                setReservationTime(
                  event.target.value,
                )
              }
              required
              disabled={isPending}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] py-3 pl-11 pr-4 outline-none transition focus:border-orange-500 disabled:opacity-60"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="guestCount"
            className="mb-2 block text-sm font-semibold"
          >
            Guests
          </label>

          <div className="relative">
            <FiUsers className="muted-text absolute left-4 top-1/2 -translate-y-1/2" />

            <input
              id="guestCount"
              type="number"
              min={1}
              max={20}
              value={guestCount}
              onChange={(event) =>
                setGuestCount(
                  event.target.value,
                )
              }
              required
              disabled={isPending}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] py-3 pl-11 pr-4 outline-none transition focus:border-orange-500 disabled:opacity-60"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="reservationPhone"
            className="mb-2 block text-sm font-semibold"
          >
            Contact Phone
          </label>

          <div className="relative">
            <FiPhone className="muted-text absolute left-4 top-1/2 -translate-y-1/2" />

            <input
              id="reservationPhone"
              type="tel"
              value={phone}
              onChange={(event) =>
                setPhone(event.target.value)
              }
              placeholder="01XXXXXXXXX"
              required
              disabled={isPending}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] py-3 pl-11 pr-4 outline-none transition focus:border-orange-500 disabled:opacity-60"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="specialRequest"
            className="mb-2 block text-sm font-semibold"
          >
            Special Request
          </label>

          <textarea
            id="specialRequest"
            value={specialRequest}
            onChange={(event) =>
              setSpecialRequest(
                event.target.value,
              )
            }
            rows={4}
            placeholder="Optional request..."
            disabled={isPending}
            className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 outline-none transition focus:border-orange-500 disabled:opacity-60"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending
            ? "Submitting..."
            : "Request Reservation"}
        </button>
      </form>
    </aside>
  );
};

export default ReservationForm;
