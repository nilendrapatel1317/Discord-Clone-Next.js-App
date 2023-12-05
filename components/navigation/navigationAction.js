"use client";

import { Plus } from "lucide-react";
import Tooltip from "@mui/material/Tooltip";
import { useModal } from "@/hooks/useModalStore";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

export const NavigationAction = () => {
  const { onOpen } = useModal();
  return (
    <div>
      <Link href="/" >
        <div className="flex p-1 h-[40px] w-[40px] sm:h-[45px] sm:w-[45px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
          <Image
            src="/appLogo.png"
            alt="logo"
            width={40}
            height={40}
            className="dark:invert"
          />
        </div>
      </Link>
      <Separator className="h-[2px] my-3 bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <Tooltip title="Add a server" placement="right">
        <button
          onClick={() => onOpen("createServer")}
          className="group flex items-center"
        >
          <div className="flex h-[40px] w-[40px] sm:h-[45px] sm:w-[45px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
            <Plus
              className="group-hover:text-white transition text-emerald-500"
              size={25}
            />
          </div>
        </button>
      </Tooltip>
    </div>
  );
};
