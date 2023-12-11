import { currentProfile } from "@/lib/currentProfile";
import React from "react";
import { UserAvatar } from "../Extra/userAvatar";
import { Tooltip } from "@mui/material";

export const ServerFooter = async () => {
  const profile = await currentProfile();

  return (
    <div>
      <div className="overflow-x-hidden me-2 px-3 flex gap-1 items-center h-12">
        <UserAvatar
          src={profile.imageUrl}
          className="h-8 w-8 md:h-8 md:w-8 mr-2"
        />
        <div>
          <Tooltip title={profile.name} placement="right">
          <p className="font-semibold text-md text-black dark:text-white">
              {profile.name.length > 25
                ? `${profile.name.slice(0, 25)}...`
                : profile.name}
            </p>
          </Tooltip>
          <Tooltip title={profile.email} placement="right">
            <p className="font-normal text-xs text-zinc-600 dark:text-zinc-400">
              {profile.email.length > 25
                ? `${profile.email.slice(0, 25)}...`
                : profile.email}
            </p>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};
