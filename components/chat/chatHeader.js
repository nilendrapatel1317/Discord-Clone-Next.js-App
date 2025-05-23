import { Hash, Info } from "lucide-react";

import { MobileToggle } from "@/components/theme/mobileToggle";
import { UserAvatar } from "@/components/Extra/userAvatar";
import { SocketIndicator } from "@/components/Extra/socketIndicator";

import { ChatVideoButton } from "./chatVideoButton";
import Link from "next/link";
import { Tooltip } from "@mui/material";

export const ChatHeader = ({ serverId, name, type, imageUrl }) => {
  return (
    <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
      <MobileToggle serverId={serverId} />
      {type === "channel" && (
        <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />
      )}
      {type === "conversation" && (
        <UserAvatar src={imageUrl} className="h-8 w-8 md:h-8 md:w-8 mr-2" />
      )}
      <p className="font-semibold text-md text-black dark:text-white">{name}</p>
      <div className="ml-auto flex items-center">
        {type === "conversation" && <ChatVideoButton />}
        <SocketIndicator />
      </div>
      <Tooltip title="About Developer">
        <Link
          href="/about"
        >
          <Info className="w-5 h-5 ms-2 text-zinc-500 dark:text-zinc-400" />
        </Link>
      </Tooltip>
    </div>
  );
};
