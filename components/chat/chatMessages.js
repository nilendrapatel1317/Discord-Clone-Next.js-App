"use client";

import { format } from "date-fns";
import { Fragment, useEffect, useRef } from "react";
import { Loader2, ServerCrash } from "lucide-react";
import { useChatQuery } from "@/hooks/useChatQuery";
import { ChatWelcome } from "@/components/chat/chatWelcome";
import { ChatItem } from "@/components/chat/chatItem";
import { useChatSocket } from "@/hooks/useChatSocket";
import Image from "next/image";

const DATE_FORMAT = "d MMM yyyy, HH:mm";

export const ChatMessages = ({
  name,
  member,
  chatId,
  apiUrl,
  socketUrl,
  socketQuery,
  paramKey,
  paramValue,
  type,
}) => {
  const queryKey = `chat:${chatId}`;
  const addKey = `chat:${chatId}:messages`;
  const updateKey = `chat:${chatId}:messages:update`;

  const chatRef = useRef(null);
  const bottomRef = useRef(null);

  const { data, status } = useChatQuery({
    queryKey,
    apiUrl,
    paramKey,
    paramValue,
  });
  useChatSocket({ queryKey, addKey, updateKey });

  useEffect(() => {
    // Scroll to bottom whenever new messages are received
    scrollToBottom();
  }, [data]);

  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (status === "loading") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading messages...
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Something went wrong!
        </p>
      </div>
    );
  }

  return (
    <div ref={chatRef} className="relative flex-1 flex flex-col py-4 overflow-y-auto">
      {data && <ChatWelcome type={type} name={name} />}
      <div className="flex flex-col-reverse mt-auto">
        {data?.pages?.map((group, i) => (
          <Fragment key={i}>
            {group?.items.map((message) => (
              <ChatItem
                key={message?.id}
                id={message?.id}
                currentMember={member}
                member={message?.member}
                content={message?.content}
                fileUrl={message?.fileUrl}
                deleted={message?.deleted}
                timestamp={format(new Date(message?.createdAt), DATE_FORMAT)}
                isUpdated={message?.updatedAt !== message?.createdAt}
                socketUrl={socketUrl}
                socketQuery={socketQuery}
              />
            ))}
          </Fragment>
        ))}
      </div>
      <div ref={bottomRef} />

      <div className="fixed top-0 left-0 w-full h-full  flex items-center justify-center pointer-events-none">
        <Image src={'/appLogo.png'} alt="App Logo" width={500} height={500} className="sm:ml-64 opacity-5 dark:invert"/>
      </div>
    </div>
  );
};
