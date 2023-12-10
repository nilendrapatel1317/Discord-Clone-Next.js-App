import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ChatHeader } from "../../../../../../../components/chat/chatHeader";
import { ChannelType } from "@prisma/client";
import { ChatInput } from "@/components/chat/chatInput";
import { ChatMessages } from "@/components/chat/chatMessages";
import { MediaRoom } from "@/components/Extra/media-room";

const ChannelIdPage = async ({ params }) => {
  const profile = await currentProfile();

  let isOwner = profile.owner === true;

  if (!profile) {
    return redirectToSignIn();
  }

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
  });

  if (!channel || (!member && !isOwner)) {
    redirect("/");
  }

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        name={channel.name}
        serverId={channel.serverId}
        type="channel"
      />
      {channel.type === ChannelType.TEXT && (
        <>
          <ChatMessages
            member={member}
            name={channel.name}
            chatId={channel.id}
            type="channel"
            apiUrl="/api/messages"
            socketUrl="/api/socket/messages"
            socketQuery={{
              channelId: channel.id,
              serverId: channel.serverId,
            }}
            paramKey="channelId"
            paramValue={channel.id}
            isOwner
          />
          <ChatInput
            name={channel.name}
            type="channel"
            apiUrl="/api/socket/messages"
            query={{
              channelId: channel.id,
              serverId: channel.serverId,
            }}
          />
        </>
      )}
      {channel.type === ChannelType.AUDIO &&
        (isOwner && !member ? (
          <div className=" flex items-center justify-center h-full">
            <p className="text-center text-2xl sm:w-2/3">
              Beta Nilendra 😉 <br className="sm:hidden" /> Jada hoshiyar ban
              raha hai. <br /> Bina kisi server ko join kiye tu bas dekh sakta
              hai. <br />
              Lekin participate nhi kar sakta . <br />
              Samja ki nhi 🤣😂
            </p>
            {/* <p className="text-center text-2xl sm:w-1/2">
              "I know you are the Owner of Discord App. But you are not allowed
              to join this room before you join the server."
            </p> */}
          </div>
        ) : (
          <MediaRoom chatId={channel.id} video={false} audio={true} />
        ))}
      {channel.type === ChannelType.VIDEO &&
        (isOwner && !member ? (
          <div className=" flex items-center justify-center h-full">
            <p className="text-center text-2xl sm:w-2/3">
              Beta Nilendra 😉 <br className="sm:hidden" /> Jada hoshiyar ban
              raha hai. <br /> Bina kisi server ko join kiye tu bas dekh sakta
              hai. <br />
              Lekin participate nhi kar sakta . <br />
              Samja ki nhi 🤣😂
            </p>
            {/* <p className="text-center text-2xl sm:w-1/2">
              "I know you are the Owner of Discord App. But you are not allowed
              to join this room before you join the server."
            </p> */}
          </div>
        ) : (
          <MediaRoom chatId={channel.id} video={true} audio={true} />
        ))}
    </div>
  );
};

export async function generateMetadata({ params }) {
  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
    include: {
      server: true,
    },
  });

  const serverName =
    channel?.server.name.length > 10
      ? `${channel?.server.name.slice(0, 10)}..`
      : channel?.server.name;
  const channelName = channel?.name;
  return {
    title: `Discord | ${serverName} | ${channelName}`,
  };
}

export default ChannelIdPage;
