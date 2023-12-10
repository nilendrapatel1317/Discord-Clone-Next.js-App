"use client";

import { MemberRole } from "@prisma/client";
import { Plus, Settings } from "lucide-react";

import { useModal } from "../../hooks/useModalStore";
import { Tooltip } from "@mui/material";

export const ServerSection = ({
  label,
  role,
  isOwner,
  sectionType,
  channelType,
  server,
}) => {
  const { onOpen } = useModal();
  const isAdmin = role === MemberRole.ADMIN || isOwner;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      { isModerator && sectionType === "channels" && (
        <Tooltip title={`Create ${channelType.toLowerCase()} Channel`} placement="top">
          <button
            onClick={() => onOpen("createChannel", { channelType })}
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
          >
            <Plus className="h-4 w-4" />
          </button>
        </Tooltip>
      )}
      
      {isAdmin && sectionType === "members" && (
        <Tooltip title="Manage Members" placement="top">
          <button
            onClick={() => onOpen("members", { server })}
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
          >
            <Settings className="h-4 w-4" />
          </button>
        </Tooltip>
      )}
    </div>
  );
};
