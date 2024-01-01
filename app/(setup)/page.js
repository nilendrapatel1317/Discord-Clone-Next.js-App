import React from "react";
import { initialProfile } from "@/lib/initialProfile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { InitialModal } from "@/components/modals/initialModal";
import { JoinServerModel } from "@/components/modals/joinServerModal";
import Image from "next/image";
import { PopularServer } from "@/components/server/popularServer";
import { Tooltip } from "@mui/material";
import Link from "next/link";
import { Info } from "lucide-react";

const page = async () => {
  const user = await currentUser();

  const profile = await initialProfile();

  const server = await db.server.findFirst({
    where: {
      profileId: profile.id,
    },
  });

  const allServer = await db.server.findMany({
    include: {
      members: {
        include: {
          profile: true,
        },
      },
    },
  });

  const member = await db.member.findFirst({
    where: {
      profileId: profile.id,
    },
  });

  if (server || member) {
    return redirect(`/servers/${server?.id || member?.serverId}`);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-5 w-full h-fit pt-5 pb-12 sm:pb-2">
      <Link href="/about" className="underline">
        About Developer (ME)
      </Link>
      <div className="py-20 flex flex-col items-center">
        <div className="flex flex-col items-center text-center -space-y-5 mb-5">
          <Image
            src="/appLogo.png"
            alt="logo"
            width={200}
            height={200}
            className="invert-0 dark:invert"
          />
          <h1 className="text-5xl sm:text-7xl font-bold">Discord Server</h1>
        </div>
        <div className="space-x-5">
          <InitialModal user={user} />
          <span className="text-lg">OR</span>
          <JoinServerModel user={user} />
        </div>
      </div>
      <div className="w-full p-5">
        <h1 className="text-3xl font-bold mb-5">Popular Servers</h1>
        <PopularServer allServer={allServer} />
      </div>
    </div>
  );
};

export default page;
