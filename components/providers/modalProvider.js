"use client";

import { useEffect, useState } from "react";

import {CreateServerModal} from "@/components/modals/createServerModel";
import {InviteModal} from "@/components/modals/inviteModel";
import {EditServerModal}  from "@/components/modals/editServerModel";


export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      {/* <MembersModal /> */}
      {/* <CreateChannelModal /> */}
      {/* <LeaveServerModal /> */}
      {/* <DeleteServerModal /> */}
      {/* <DeleteChannelModal /> */}
      {/* <EditChannelModal /> */}
      {/* <MessageFileModal /> */}
      {/* <DeleteMessageModal /> */}
    </>
  );
};
