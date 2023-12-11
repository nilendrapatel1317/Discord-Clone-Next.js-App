import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/currentProfile";
import { db } from "../../lib/db";
import { NavigationAction } from "./navigationAction";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationItem } from "@/components/navigation/navigationItem";
import { SignOutButton, UserButton, currentUser } from "@clerk/nextjs";
import { ModeToggle } from "@/components/theme/ModeToggle";
import { Tooltip } from "@mui/material";
import { Plus, PowerIcon } from "lucide-react";
import { Button } from "../ui/button";
import { JoinServerModel } from "../modals/joinServerModal";

export const NavigationSidebar = async () => {
  const profile = await currentProfile();

  const clerkUser = await currentUser();

  const updateUser = await db.profile.update({
    where: {
      id: profile?.id,
    },
    data: {
      userId: clerkUser?.id,
      name: `${clerkUser?.firstName} ${clerkUser?.lastName}`,
      imageUrl: clerkUser?.imageUrl,
      email: clerkUser?.emailAddresses[0].emailAddress,
    },
  });

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
      const membersWithProfile = server.members.filter(
        (member) => member.profileId === profile.id
      );

      return {
        ...server,
        members: membersWithProfile,
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
      <div className="pb-1 flex flex-col items-center gap-y-2">
        <Tooltip title="Join Server" placement="right">
          <Button
            className="bg-transparent border-0"
            variant="outline"
            size="icon"
          >
            <JoinServerModel user={profile} from="sidebar" />
          </Button>
        </Tooltip>
        <Tooltip title="Switch Theme" placement="right">
          <ModeToggle />
        </Tooltip>
        {/* <SignOutButton className="cursor-pointer" appearance={{}}>
          <Tooltip title="Sign Out" placement="right">
            <PowerIcon />
          </Tooltip>
        </SignOutButton> */}
        <Tooltip title="Your Account" placement="right">
          <div>
            <UserButton
              afterSignOutUrl="/sign-in"
              appearance={{
                elements: {
                  avatarBox: "h-[40px] w-[40px] sm:h-[45px] sm:w-[45px]",
                },
              }}
            />
          </div>
        </Tooltip>
      </div>
    </div>
  );
};
