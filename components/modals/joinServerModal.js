"use client";

import axios from "axios";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FileUpload from "../Extra/FileUpload";
import { Plus } from "lucide-react";

const formSchema = z.object({
  serverlink: z.string().min(40, {
    message: "Server link is required.",
  }),
});

export const JoinServerModel = ({ user, from }) => {
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();

  if (!user || user === null) {
    return router.push("/sign-in");
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serverlink: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async ({ serverlink }) => {
    console.log(serverlink);
    const link = document.createElement("a");
    link.href = serverlink;
    // link.setAttribute("target", "_blank");
    link.click();
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {!from ? (
          <Button variant="default" size="lg">
            Join Server
          </Button>
        ) : (
          <Plus />
        )}
      </DialogTrigger>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Join Server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Give your server a personality with a name and an image. You can
            always change it later.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="serverlink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Server Link
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Paste your server link here"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button variant="primary" disabled={isLoading}>
                Join Now
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
