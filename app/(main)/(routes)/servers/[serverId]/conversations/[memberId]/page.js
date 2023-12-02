import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { getOrCreateConversation } from "@/lib/conversation";
import { currentProfile } from "@/lib/currentProfile";
import { ChatHeader } from "@/components/chat/chatHeader";
import { ChatMessages } from "@/components/chat/chatMessages";
import { ChatInput } from "@/components/chat/chatInput";
import { MediaRoom } from "@/components/Extra/media-room";
import { currentProfilePages } from "@/lib/currentProfilePages";

const MemberIdPage = async ({ params, searchParams }) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const currentMember = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
    include: {
      profile: true,
    },
  });

  if (!currentMember) {
    return redirect("/");
  }

  const conversation = await getOrCreateConversation(
    currentMember.id,
    params.memberId
  );

  if (!conversation) {
    return redirect(`/servers/${params.serverId}`);
  }

  const { memberOne, memberTwo } = conversation;

  const otherMember =
    memberOne.profileId === profile.id ? memberTwo : memberOne;

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        imageUrl={otherMember.profile.imageUrl}
        name={otherMember.profile.name}
        serverId={params.serverId}
        type="conversation"
      />
      {searchParams.video && (
        <MediaRoom chatId={conversation.id} video={true} audio={true} />
      )}
      {!searchParams.video && (
        <>
          <ChatMessages
            member={currentMember}
            name={otherMember.profile.name}
            chatId={conversation.id}
            type="conversation"
            apiUrl="/api/direct-messages"
            paramKey="conversationId"
            paramValue={conversation.id}
            socketUrl="/api/socket/direct-messages"
            socketQuery={{
              conversationId: conversation.id,
            }}
          />
          <ChatInput
            name={otherMember.profile.name}
            type="conversation"
            apiUrl="/api/socket/direct-messages"
            query={{
              conversationId: conversation.id,
            }}
          />
        </>
      )}
    </div>
  );
};

export async function generateMetadata({ params }) {
  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
    },
  });
  const serverName = server.name;

  const currentMember = await db.member.findFirst({
    where: {
      serverId: params.serverId,
    },
    include: {
      profile: true,
    },
  });
  const conversation = await getOrCreateConversation(
    currentMember.id,
    params.memberId
  );
  const { memberOne, memberTwo } = conversation;

  const otherMember =
    memberOne.profileId === currentMember.id ? memberOne : memberTwo;

  return {
    title: `Discord | ${serverName} | ${otherMember.profile.name || "Member Chat Room"} `,
  };
}
export default MemberIdPage;
