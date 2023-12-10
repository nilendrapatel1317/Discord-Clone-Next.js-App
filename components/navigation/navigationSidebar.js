import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/currentProfile";
import { db } from "../../lib/db";
import { NavigationAction } from "./navigationAction";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationItem } from "@/components/navigation/navigationItem";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/theme/ModeToggle";
import { Tooltip } from "@mui/material";
import { PowerIcon } from "lucide-react";

export const NavigationSidebar = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const servers = await db.server.findMany({
    include: {
      members: true,
    },
  });

  const filteredServers = servers
    .map((server) => {
      // Check if the user is the owner
      const isOwner = profile.owner === true;

      // If the user is the owner, return the server as is
      if (isOwner) {
        return server;
      }

      // If not the owner, filter members based on profileId
      const membersWithProfile = server.members.filter(
        (member) => member.profileId === profile.id
      );

      // Return a new object with filtered members
      return {
        ...server,
        members : isOwner ? null : membersWithProfile,
      };
    })
    .filter((server) => server.members.length > 0);

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] bg-[#E3E5E8] py-3">
      <NavigationAction />
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <ScrollArea className="flex-1 w-full">
        {filteredServers.map((server) => (
          <div key={server.id} className="mb-4">
            <NavigationItem
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
          </div>
        ))}
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <Tooltip title="Switch Theme" placement="right">
          <div>
            <ModeToggle />
          </div>
        </Tooltip>
        <SignOutButton className="cursor-pointer" appearance={{}}>
          <Tooltip title="Sign Out" placement="right">
            <PowerIcon />
          </Tooltip>
        </SignOutButton>
      </div>
    </div>
  );
};
