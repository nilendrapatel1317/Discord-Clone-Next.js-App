import React from "react";
import { initialProfile } from "@/lib/initialProfile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { InitialModal } from "@/components/modals/initialModal";

const page = async () => {
  const profile = await initialProfile();

  console.log(profile);

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
    <>
      {/* {updateProfile()} */}
      <InitialModal />
    </>
  );
};

export default page;
