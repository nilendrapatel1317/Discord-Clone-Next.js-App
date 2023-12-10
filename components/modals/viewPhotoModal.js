"use client";

import axios from "axios";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import FileUpload from "@/components/Extra/FileUpload";
import { useModal } from "../../hooks/useModalStore";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Server name is required.",
  }),
  imageUrl: z.string().min(1, {
    message: "Server image is required.",
  }),
});

export const ViewPhotoModal = () => {
  const {isOpen , onClose , type , data} = useModal();
  const router = useRouter();
  const fileUrl = data;
  // console.log(fileUrl)

  const isModalOpen = isOpen && type === "viewPhoto";  

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values) => {
    try {
      const response = await axios.post("/api/servers", values);
      const serverId = response.data.id; // Assuming your server API returns the server ID
  
      form.reset();
      // router.push(`/servers/${serverId}`);
      router.refresh();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">

        <img src={fileUrl} alt="Photo" className="w-full h-full object-cover" />
        
      </DialogContent>
    </Dialog>
  );
};


