"use client";

import { uploadImage } from "@/lib/actions/upload-image";
import { authClient } from "@/lib/auth-client";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useState,
} from "react";
import { FaStore } from "react-icons/fa";
import {
  FiArrowLeft,
  FiCamera,
  FiEye,
  FiEyeOff,
  FiLoader,
  FiLock,
  FiMail,
  FiPhone,
  FiUser,
  FiUsers,
  FiX,
} from "react-icons/fi";
import { toast } from "react-toastify";

type AccountType =
  | "customer"
  | "restaurant_owner";

type RegisterFormData = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  accountType: AccountType;
};

const initialFormData: RegisterFormData = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  accountType: "customer",
};

const allowedImageTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const maximumImageSize = 2 * 1024 * 1024;

const RegisterPage = () => {
  const router = useRouter();

  const [formData, setFormData] =
    useState<RegisterFormData>(initialFormData);

  const [profileImage, setProfileImage] =
    useState<File | null>(null);

  const [imagePreview, setImagePreview] =
    useState<string>("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [isLoading, setIsLoading] =
    useState(false);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleAccountTypeChange = (
    accountType: AccountType,
  ) => {
    setFormData((previousData) => ({
      ...previousData,
      accountType,
    }));
  };

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedImage = event.target.files?.[0];

    if (!selectedImage) {
      return;
    }

    if (!allowedImageTypes.includes(selectedImage.type)) {
      toast.error(
        "Only JPG, PNG and WebP images are allowed.",
      );

      event.target.value = "";
      return;
    }

    if (selectedImage.size > maximumImageSize) {
      toast.error(
        "The profile image must be smaller than 2 MB.",
      );

      event.target.value = "";
      return;
    }

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setProfileImage(selectedImage);
    setImagePreview(
      URL.createObjectURL(selectedImage),
    );
  };

  const removeImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setProfileImage(null);
    setImagePreview("");
  };

  const validateForm = () => {
    const name = formData.name.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();

    if (!name) {
      toast.error("Full name is required.");
      return false;
    }

    if (name.length < 2) {
      toast.error("Please enter a valid name.");
      return false;
    }

    if (!email) {
      toast.error("Email address is required.");
      return false;
    }

    if (!email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    if (
      phone &&
      !/^\+?[0-9][0-9\s-]{6,18}$/.test(phone)
    ) {
      toast.error("Please enter a valid phone number.");
      return false;
    }

    if (!profileImage) {
      toast.error("Please choose a profile image.");
      return false;
    }

    if (!formData.password) {
      toast.error("Password is required.");
      return false;
    }

    if (formData.password.length < 8) {
      toast.error(
        "Password must contain at least 8 characters.",
      );
      return false;
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      toast.error(
        "Password and confirm password do not match.",
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!validateForm() || !profileImage) {
      return;
    }

    try {
      setIsLoading(true);

      const imageFormData = new FormData();

      imageFormData.append("image", profileImage);

      const uploadResult =
        await uploadImage(imageFormData);

      if (!uploadResult.success || !uploadResult.imageUrl) {
        toast.error(uploadResult.message);
        return;
      }

      const { error } =
        await authClient.signUp.email({
          name: formData.name.trim(),
          email: formData.email
            .trim()
            .toLowerCase(),
          password: formData.password,
          image: uploadResult.imageUrl,
          phone:
            formData.phone.trim() || undefined,
          accountType: formData.accountType,
        });

      if (error) {
        toast.error(
          error.message ||
            "Account creation failed.",
        );
        return;
      }

      toast.success(
        "Account created successfully. Please log in.",
      );

      setFormData(initialFormData);
      removeImage();

      setTimeout(() => {
        router.push("/login");
      }, 800);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong.";

      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative overflow-hidden py-10 sm:py-14">
      <div className="absolute -left-32 top-12 h-72 w-72 rounded-full bg-orange-300/20 blur-3xl dark:bg-orange-700/10" />

      <div className="absolute -right-32 bottom-12 h-72 w-72 rounded-full bg-green-300/20 blur-3xl dark:bg-green-700/10" />

      <div className="container-shell relative">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-brand-orange dark:text-slate-300"
        >
          <FiArrowLeft />
          Back to home
        </Link>

        <div className="grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <motion.aside
            initial={{
              opacity: 0,
              x: -24,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="hidden overflow-hidden rounded-4xl bg-brand-green p-9 text-white lg:block"
          >
            <div className="inline-flex rounded-2xl bg-white p-2">
              <Image
                src="/images/logo.png"
                alt="DineSpot"
                width={200}
                height={90}
                className="h-16 w-44 object-contain"
              />
            </div>

            <h1 className="mt-8 text-3xl font-extrabold leading-tight">
              Create your DineSpot account
            </h1>

            <p className="mt-4 text-sm leading-7 text-white/75">
              Choose the account that matches how you
              want to use DineSpot.
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex items-start gap-3">
                <FiUsers className="mt-1 text-xl text-brand-yellow" />

                <div>
                  <p className="font-bold">
                    Customer account
                  </p>

                  <p className="mt-1 text-sm leading-6 text-white/70">
                    Explore restaurants, reserve tables
                    and share reviews.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FaStore className="mt-1 text-xl text-brand-yellow" />

                <div>
                  <p className="font-bold">
                    Restaurant Owner account
                  </p>

                  <p className="mt-1 text-sm leading-6 text-white/70">
                    Add restaurants and manage your own
                    listings.
                  </p>
                </div>
              </div>
            </div>
          </motion.aside>

          <motion.section
            initial={{
              opacity: 0,
              y: 24,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="surface-card rounded-4xl p-6 shadow-xl sm:p-8"
          >
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-orange">
              Create account
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-slate-950 dark:text-white">
              Join DineSpot
            </h2>

            <p className="muted-text mt-3 text-sm leading-7">
              Enter your information to create a new
              account.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-6"
            >
              <div>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  Profile image
                </p>

                <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-(--surface-border) bg-slate-100 dark:bg-slate-800">
                    {imagePreview ? (
                      <Image
                        src={imagePreview}
                        alt="Profile preview"
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    ) : (
                      <FiUser className="text-3xl text-slate-400" />
                    )}

                    {imagePreview && (
                      <button
                        type="button"
                        onClick={removeImage}
                        aria-label="Remove profile image"
                        className="absolute right-1 top-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-950/75 text-white"
                      >
                        <FiX />
                      </button>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="profileImage"
                      className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 text-sm font-bold text-slate-700 transition hover:border-brand-orange hover:text-brand-orange dark:border-slate-700 dark:text-slate-200"
                    >
                      <FiCamera />
                      Choose image
                    </label>

                    <input
                      id="profileImage"
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleImageChange}
                      className="hidden"
                    />

                    <p className="muted-text mt-2 text-xs">
                      JPG, PNG or WebP. Maximum 2 MB.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <InputField
                  icon={<FiUser />}
                  label="Full name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />

                <InputField
                  icon={<FiMail />}
                  label="Email address"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <InputField
                icon={<FiPhone />}
                label="Phone number (optional)"
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
              />

              <div>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  Choose account type
                </p>

                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <AccountTypeButton
                    title="Customer"
                    description="Explore, reserve and review restaurants."
                    icon={<FiUsers />}
                    isSelected={
                      formData.accountType === "customer"
                    }
                    onClick={() =>
                      handleAccountTypeChange("customer")
                    }
                  />

                  <AccountTypeButton
                    title="Restaurant Owner"
                    description="Add and manage your own restaurant listings."
                    icon={<FaStore />}
                    isSelected={
                      formData.accountType ===
                      "restaurant_owner"
                    }
                    onClick={() =>
                      handleAccountTypeChange(
                        "restaurant_owner",
                      )
                    }
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <PasswordField
                  label="Password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  isVisible={showPassword}
                  onToggle={() =>
                    setShowPassword(
                      (previousValue) =>
                        !previousValue,
                    )
                  }
                />

                <PasswordField
                  label="Confirm password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  isVisible={showConfirmPassword}
                  onToggle={() =>
                    setShowConfirmPassword(
                      (previousValue) =>
                        !previousValue,
                    )
                  }
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-orange px-6 text-sm font-bold text-white transition hover:bg-brand-orange-dark disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <FiLoader className="animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create account"
                )}
              </button>

              <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-bold text-brand-orange hover:underline"
                >
                  Login
                </Link>
              </p>
            </form>
          </motion.section>
        </div>
      </div>
    </main>
  );
};

type InputFieldProps = {
  icon: React.ReactNode;
  label: string;
  name: keyof RegisterFormData;
  type: string;
  placeholder: string;
  value: string;
  onChange: (
    event: ChangeEvent<HTMLInputElement>,
  ) => void;
};

const InputField = ({
  icon,
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
}: InputFieldProps) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-sm font-bold text-slate-800 dark:text-slate-200"
      >
        {label}
      </label>

      <div className="relative mt-2">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </span>

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="h-12 w-full rounded-xl border border-slate-300 bg-transparent pl-11 pr-4 text-sm outline-none transition focus:border-brand-orange focus:ring-4 focus:ring-orange-100 dark:border-slate-700 dark:text-white dark:focus:ring-orange-950"
        />
      </div>
    </div>
  );
};

type PasswordFieldProps = {
  label: string;
  name: "password" | "confirmPassword";
  placeholder: string;
  value: string;
  isVisible: boolean;
  onChange: (
    event: ChangeEvent<HTMLInputElement>,
  ) => void;
  onToggle: () => void;
};

const PasswordField = ({
  label,
  name,
  placeholder,
  value,
  isVisible,
  onChange,
  onToggle,
}: PasswordFieldProps) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-sm font-bold text-slate-800 dark:text-slate-200"
      >
        {label}
      </label>

      <div className="relative mt-2">
        <FiLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

        <input
          id={name}
          name={name}
          type={isVisible ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete="new-password"
          className="h-12 w-full rounded-xl border border-slate-300 bg-transparent pl-11 pr-12 text-sm outline-none transition focus:border-brand-orange focus:ring-4 focus:ring-orange-100 dark:border-slate-700 dark:text-white dark:focus:ring-orange-950"
        />

        <button
          type="button"
          onClick={onToggle}
          aria-label={
            isVisible
              ? "Hide password"
              : "Show password"
          }
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
        >
          {isVisible ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>
    </div>
  );
};

type AccountTypeButtonProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
};

const AccountTypeButton = ({
  title,
  description,
  icon,
  isSelected,
  onClick,
}: AccountTypeButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border p-4 text-left transition ${
        isSelected
          ? "border-brand-orange bg-orange-50 dark:bg-orange-950/30"
          : "border-(--surface-border) hover:border-orange-300"
      }`}
    >
      <span className="text-2xl text-brand-orange">
        {icon}
      </span>

      <span className="mt-3 block font-extrabold text-slate-900 dark:text-white">
        {title}
      </span>

      <span className="muted-text mt-2 block text-xs leading-6">
        {description}
      </span>
    </button>
  );
};

export default RegisterPage;