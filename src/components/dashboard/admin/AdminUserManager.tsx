"use client";

import {
  useMemo,
  useState,
  useTransition,
} from "react";
import {
  FiMail,
  FiSearch,
  FiShield,
  FiUser,
  FiUsers,
} from "react-icons/fi";
import { toast } from "react-toastify";

import {
  updateAdminUserAccountType,
  updateAdminUserRole,
} from "@/lib/actions/users";
import type {
  AdminUser,
  UserAccountType,
  UserRole,
} from "@/lib/api/users";

type AdminUserManagerProps = {
  initialUsers: AdminUser[];
};

type RoleFilter =
  | "all"
  | UserRole;

type AccountTypeFilter =
  | "all"
  | UserAccountType;

const roleLabels: Record<
  UserRole,
  string
> = {
  user: "User",
  admin: "Admin",
};

const accountTypeLabels: Record<
  UserAccountType,
  string
> = {
  customer: "Customer",
  restaurant_owner:
    "Restaurant Owner",
};

const AdminUserManager = ({
  initialUsers,
}: AdminUserManagerProps) => {
  const [users, setUsers] =
    useState(initialUsers);

  const [search, setSearch] =
    useState("");

  const [roleFilter, setRoleFilter] =
    useState<RoleFilter>("all");

  const [
    accountTypeFilter,
    setAccountTypeFilter,
  ] =
    useState<AccountTypeFilter>("all");

  const [activeUserId, setActiveUserId] =
    useState<string | null>(null);

  const [isPending, startTransition] =
    useTransition();

  const filteredUsers = useMemo(() => {
    const searchValue = search
      .trim()
      .toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        !searchValue ||
        [user.name, user.email]
          .join(" ")
          .toLowerCase()
          .includes(searchValue);

      const matchesRole =
        roleFilter === "all" ||
        user.role === roleFilter;

      const matchesAccountType =
        accountTypeFilter === "all" ||
        user.accountType ===
          accountTypeFilter;

      return (
        matchesSearch &&
        matchesRole &&
        matchesAccountType
      );
    });
  }, [
    users,
    search,
    roleFilter,
    accountTypeFilter,
  ]);

  const stats = useMemo(
    () => ({
      total: users.length,
      admins: users.filter(
        (user) => user.role === "admin",
      ).length,
      customers: users.filter(
        (user) =>
          user.role !== "admin" &&
          user.accountType ===
            "customer",
      ).length,
      owners: users.filter(
        (user) =>
          user.role !== "admin" &&
          user.accountType ===
            "restaurant_owner",
      ).length,
    }),
    [users],
  );

  const replaceUser = (
    updatedUser: AdminUser,
  ) => {
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user._id === updatedUser._id
          ? updatedUser
          : user,
      ),
    );
  };

  const handleRoleChange = (
    user: AdminUser,
    role: UserRole,
  ) => {
    if (role === user.role) {
      return;
    }

    const confirmed = window.confirm(
      `Change ${user.name || user.email} to ${roleLabels[role]}?`,
    );

    if (!confirmed) {
      return;
    }

    setActiveUserId(user._id);

    startTransition(async () => {
      try {
        const result =
          await updateAdminUserRole(
            user._id,
            role,
          );

        if (result.user) {
          replaceUser(result.user);
        }

        toast.success(result.message);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to update user role.",
        );
      } finally {
        setActiveUserId(null);
      }
    });
  };

  const handleAccountTypeChange = (
    user: AdminUser,
    accountType: UserAccountType,
  ) => {
    if (accountType === user.accountType) {
      return;
    }

    const confirmed = window.confirm(
      `Change ${user.name || user.email} to ${accountTypeLabels[accountType]}?`,
    );

    if (!confirmed) {
      return;
    }

    setActiveUserId(user._id);

    startTransition(async () => {
      try {
        const result =
          await updateAdminUserAccountType(
            user._id,
            accountType,
          );

        if (result.user) {
          replaceUser(result.user);
        }

        toast.success(result.message);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to update account type.",
        );
      } finally {
        setActiveUserId(null);
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
          Manage Users
        </h1>

        <p className="muted-text mt-2">
          View registered users and update their
          role or account type.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="surface-card p-5">
          <p className="muted-text text-sm">
            Total Users
          </p>
          <p className="mt-2 text-3xl font-bold">
            {stats.total}
          </p>
        </div>

        <div className="surface-card p-5">
          <p className="muted-text text-sm">
            Customers
          </p>
          <p className="mt-2 text-3xl font-bold">
            {stats.customers}
          </p>
        </div>

        <div className="surface-card p-5">
          <p className="muted-text text-sm">
            Restaurant Owners
          </p>
          <p className="mt-2 text-3xl font-bold">
            {stats.owners}
          </p>
        </div>

        <div className="surface-card p-5">
          <p className="muted-text text-sm">
            Admins
          </p>
          <p className="mt-2 text-3xl font-bold">
            {stats.admins}
          </p>
        </div>
      </div>

      <div className="surface-card grid gap-4 p-4 sm:p-5 lg:grid-cols-[1fr_180px_220px]">
        <div className="relative">
          <FiSearch className="muted-text absolute left-4 top-1/2 -translate-y-1/2" />

          <input
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search name or email..."
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] py-3 pl-11 pr-4 outline-none transition focus:border-orange-500"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(event) =>
            setRoleFilter(
              event.target.value as RoleFilter,
            )
          }
          className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 outline-none transition focus:border-orange-500"
        >
          <option value="all">
            All Roles
          </option>
          <option value="user">
            User
          </option>
          <option value="admin">
            Admin
          </option>
        </select>

        <select
          value={accountTypeFilter}
          onChange={(event) =>
            setAccountTypeFilter(
              event.target
                .value as AccountTypeFilter,
            )
          }
          className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 outline-none transition focus:border-orange-500"
        >
          <option value="all">
            All Account Types
          </option>
          <option value="customer">
            Customer
          </option>
          <option value="restaurant_owner">
            Restaurant Owner
          </option>
        </select>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="surface-card flex min-h-64 flex-col items-center justify-center p-8 text-center">
          <FiUsers className="muted-text text-5xl" />

          <h2 className="mt-4 text-xl font-bold">
            No users found
          </h2>

          <p className="muted-text mt-2">
            No registered user matches the current
            search or filters.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 xl:grid-cols-2">
          {filteredUsers.map((user) => {
            const isWorking =
              isPending &&
              activeUserId === user._id;

            const displayName =
              user.name || "Unnamed User";

            const firstLetter = displayName
              .charAt(0)
              .toUpperCase();

            return (
              <article
                key={user._id}
                className="surface-card p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-100 text-lg font-bold text-orange-600 dark:bg-orange-500/15 dark:text-orange-300">
                      {firstLetter || <FiUser />}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="truncate text-lg font-bold">
                          {displayName}
                        </h2>

                        {user.isCurrentUser && (
                          <span className="rounded-full bg-orange-100 px-2.5 py-1 text-xs font-semibold text-orange-700 dark:bg-orange-500/15 dark:text-orange-300">
                            You
                          </span>
                        )}
                      </div>

                      <p className="muted-text mt-1 flex items-center gap-2 break-all text-sm">
                        <FiMail className="shrink-0" />
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-300"
                        : "bg-slate-100 text-slate-700 dark:bg-slate-500/15 dark:text-slate-300"
                    }`}
                  >
                    <FiShield />
                    {roleLabels[user.role]}
                  </span>
                </div>

                <div className="muted-text mt-5 grid gap-3 text-sm sm:grid-cols-2">
                  <p>
                    <span className="font-semibold text-[var(--foreground)]">
                      Account:
                    </span>{" "}
                    {
                      accountTypeLabels[
                        user.accountType
                      ]
                    }
                  </p>

                  <p>
                    <span className="font-semibold text-[var(--foreground)]">
                      Joined:
                    </span>{" "}
                    {user.createdAt
                      ? new Date(
                          user.createdAt,
                        ).toLocaleDateString()
                      : "Not available"}
                  </p>
                </div>

                <div className="mt-5 grid gap-4 border-t border-[var(--border)] pt-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor={`role-${user._id}`}
                      className="mb-2 block text-sm font-semibold"
                    >
                      Role
                    </label>

                    <select
                      id={`role-${user._id}`}
                      value={user.role}
                      onChange={(event) =>
                        handleRoleChange(
                          user,
                          event.target
                            .value as UserRole,
                        )
                      }
                      disabled={
                        isWorking ||
                        user.isCurrentUser
                      }
                      className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 outline-none transition focus:border-orange-500 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <option value="user">
                        User
                      </option>
                      <option value="admin">
                        Admin
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor={`account-${user._id}`}
                      className="mb-2 block text-sm font-semibold"
                    >
                      Account Type
                    </label>

                    <select
                      id={`account-${user._id}`}
                      value={user.accountType}
                      onChange={(event) =>
                        handleAccountTypeChange(
                          user,
                          event.target
                            .value as UserAccountType,
                        )
                      }
                      disabled={
                        isWorking ||
                        user.role === "admin"
                      }
                      className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 outline-none transition focus:border-orange-500 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <option value="customer">
                        Customer
                      </option>
                      <option value="restaurant_owner">
                        Restaurant Owner
                      </option>
                    </select>
                  </div>
                </div>

                {isWorking && (
                  <p className="muted-text mt-3 text-sm">
                    Updating user...
                  </p>
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default AdminUserManager;
