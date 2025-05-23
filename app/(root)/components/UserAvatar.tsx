// app/components/UserAvatar.tsx
"use client";

import Image from "next/image";

const UserAvatar = ({ image }: { image?: string | null }) => {
  if (!image) {
    return <div className="w-10 h-10 bg-gray-400 rounded-full" />;
  }
  console.log("User image URL:", image);

  return (
    <Image
      src={image}
      alt="User Avatar"
      width={40}
      height={40}
      className="rounded-full"
      priority
    />
  );
};

export default UserAvatar;
