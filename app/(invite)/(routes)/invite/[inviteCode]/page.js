import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { currentProfile } from "@/lib/currentProfile";

const InviteCodePage = async ({ params }) => {
  const profile = await currentProfile();
  // console.log(profile)
  if (!profile) {
    return redirectToSignIn();
  }

  if (!params.inviteCode) {
    return redirect("/");
  }
  // console.log(params.inviteCode)
  const clickedServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
    },
    include: {
      members: true,
    },
  })
  // console.log(clickedServer)

  const existingMember = await db.member.findFirst({
    where: {
      profileId: profile.id,
    },
  })
  // console.log(existingMember)

  const memberExistInClickedServer = clickedServer.members.some(
    (member) => member.profileId === profile.id
  )
  // console.log(memberExistInClickedServer)

  if (memberExistInClickedServer) {
    return redirect(`/servers/${clickedServer.id}`);
  }

  const server = await db.server.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: [
          {
            profileId: profile.id,
          },
        ],
      },
    },
  });
  // console.log(server)

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return null;
};

export default InviteCodePage;
