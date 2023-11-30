import React from "react";
import { initialProfile } from "@/lib/initialProfile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import InitialModel from "@/components/modals/initialModel";

const page = async () => {
  const profile = await initialProfile();

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

  return <InitialModel />;
};

export default page;
