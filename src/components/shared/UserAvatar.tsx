import Image from "next/image";

type UserAvatarProps = {
  name: string;
  image?: string | null;
  className?: string;
};

const getInitials = (name: string) => {
  const words = name
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2);

  return words
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
};

const UserAvatar = ({
  name,
  image,
  className = "h-10 w-10",
}: UserAvatarProps) => {
  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-orange-200 bg-orange-100 font-extrabold text-brand-orange-dark dark:border-orange-900 dark:bg-orange-950 dark:text-orange-300 ${className}`}
    >
      {image ? (
        <Image
          src={image}
          alt={`${name} profile`}
          width={80}
          height={80}
          className="h-full w-full object-cover"
        />
      ) : (
        <span>{getInitials(name) || "U"}</span>
      )}
    </div>
  );
};

export default UserAvatar;