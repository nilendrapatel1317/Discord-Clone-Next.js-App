import React from "react";
import { initialProfile } from "@/lib/initialProfile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { Tab, TabList, TabPanel, Tabs } from "@mui/joy";
import { InitialModal } from "@/components/modals/initialModal";
import { JoinServerModel } from "@/components/modals/joinServerModal";
import Image from "next/image";

const page = async () => {
  const user = await currentUser();

  const profile = await initialProfile();

  // console.log(profile);

  // const updateProfile = await db.profile.update({
  //   where: {
  //     id: profile.id,
  //   },
  //   data: {
  //     username: "nilendra123",
  //   },
  // });

  const server = await db.server.findFirst({
    where: {
      profileId: profile.id,
    },
  });
  // console.log(server )

  const member = await db.member.findFirst({
    where: {
      profileId: profile.id,
    },
  });
  // console.log(member )

  if (server || member) {
    return redirect(`/servers/${server?.id || member?.serverId}`);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-5 w-full h-full pb-12 sm:pb-2">
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
        <JoinServerModel user={user}  />
        <InitialModal user={user} />
      </div>
    </div>
  );
};

export default page;
