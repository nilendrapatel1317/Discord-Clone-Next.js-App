import { currentProfile } from "@/lib/currentProfile";
import React from "react";
import { UserAvatar } from "../Extra/userAvatar";

export const ServerFooter = async () => {
  const profile = await currentProfile();
  console.log(profile);
  return (
    <div>
      <div className="overflow-x-hidden me-2 px-3 flex gap-1 items-center h-12">
        <UserAvatar src={profile.imageUrl} className="h-8 w-8 md:h-8 md:w-8 mr-2" />
        <div>
        <p className="font-semibold text-md text-black dark:text-white">
          {profile.name}
        </p>
        <p className="font-normal text-xs text-zinc-600 dark:text-zinc-400">
          {profile.email}
        </p>
        </div>
      </div>
    </div>
  );
};
