import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { currentProfile } from "@/lib/currentProfile";

const InviteCodePage = async ({ params }) => {
  console.log(params);

  // Get the current user's profile
  const profile = await currentProfile();

  // If the user is not authenticated, redirect them to sign in
  if (!profile) {
    return redirectToSignIn();
  }

  // If no invite code is provided in the URL, redirect to the homepage
  if (!params.inviteCode) {
    return redirect("/");
  }

  // Find the server with the given invite code
  const clickedServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
    },
    include: {
      members: true,
    },
  });

  // If the server with the invite code doesn't exist, handle accordingly
  if (!clickedServer) {
    return redirect("/");
  }

  // Check if the current user is already a member of the clicked server
  const existingMember = await db.member.findFirst({
    where: {
      profileId: profile.id,
      serverId: clickedServer.id,
    },
  });

  // If the user is already a member, redirect them to the server
  if (existingMember) {
    return redirect(`/servers/${clickedServer.id}`);
  }

  // If the invite link is valid, create a new member for the current user in the server
  const newMember = await db.member.create({
    data: {
      profileId: profile.id,
      serverId: clickedServer.id,
    },
  });

  // If the new member is created successfully, redirect the user to the server
  if (newMember) {
    return redirect(`/servers/${clickedServer.id}`);
  }

  const memberExistInClickedServer = clickedServer.members.some(
    (member) => member.profileId === profile.id
  );
  // console.log(memberExistInClickedServer)

  if (memberExistInClickedServer) {
    return redirect(`/servers/${clickedServer.id}`);
  }


  // If any other conditions are not met, handle accordingly
  return redirect("/");
};

export default InviteCodePage;
