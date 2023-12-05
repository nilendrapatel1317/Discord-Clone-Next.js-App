"use client";
import { useState } from "react";
import { Check, Copy, RefreshCw, Share2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModalStore";
import { useOrigin } from "@/hooks/useOrigin";
import axios from "axios";
import Link from "next/link";
export const InviteModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const origin = useOrigin();

  const isModalOpen = isOpen && type === "invite";
  const { server } = data;

  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const onNew = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `/api/servers/${server?.id}/inviteCode`
      );

      onOpen("invite", { server: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Invite Friends
          </DialogTitle>
          <DialogDescription>
            <p>Anyone can join your server with this link.</p>
          </DialogDescription>
        </DialogHeader>
        <div className="px-6 pt-3 pb-6">
          <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
            Server invite link
          </Label>
          <div className="flex flex-col items-start">
            <Input
              disabled={isLoading}
              className="my-2 bg-zinc-300/50 border-0  focus-visible:ring-0 text-black focus-visible:ring-offset-0"
              value={inviteUrl}
            />
            <Button
              disabled={isLoading}
              onClick={onCopy}
              variant="link"
              size="sm"
              className="text-sm text-zinc-500"
            >
              {copied ? (
                <Check className="w-4 h-4 mr-3" />
              ) : (
                <Copy className="w-4 h-4 mr-3" />
              )}
              Copy Link
            </Button>
            <Button
              disabled={isLoading}
              variant="link"
              size="sm"
              className="text-sm text-zinc-500"
            >
              <Link href={"https://7labs.io/a/whatsapp-direct"} target="_blank" className="flex">
                <Share2 className="w-4 h-4 mr-3" />
                Send link via WhatsApp 
              </Link><span className="text-xs ml-3 text-rose-500">(Please first copy the link)</span>
            </Button>
            <Button
              onClick={onNew}
              disabled={isLoading}
              variant="link"
              size="sm"
              className="text-sm text-zinc-500"
            >
              <RefreshCw className="w-4 h-4 mr-3" />
              Generate a new link
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
