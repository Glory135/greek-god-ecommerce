"use client"

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { toast } from "sonner";


const initialState = {
  fullname: "",
  email: "",
  subject: "",
  order: "",
  message: ""
}

const ContactForm = () => {
  const [contact, setContact] = useState(initialState)
  const trpc = useTRPC()

  const handleChange = (key: string, value: string) => {
    setContact(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const sendMessage = useMutation(trpc.contact.contactUs.mutationOptions({
    onSuccess: () => {
      setContact(initialState)
      toast.success("Message Sent Successfully!");
    },
    onError: () => {
      toast.error("Failed to Send Message try again.");
    },
  }))

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage.mutate(contact)
  }
  return (
    <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
      <Input required value={contact.fullname} onChange={(e) => { handleChange("fullname", e.target.value) }} placeholder="Full Name" className="w-full" />
      <Input required type="email" value={contact.email} onChange={(e) => { handleChange("email", e.target.value) }} placeholder="Email" className="w-full" />
      <Input required value={contact.subject} onChange={(e) => { handleChange("subject", e.target.value) }} placeholder="Subject" className="w-full" />
      <Input value={contact.order} onChange={(e) => { handleChange("order", e.target.value) }} placeholder="Order Ref" className="w-full" />
      <Textarea required value={contact.message} onChange={(e) => { handleChange("message", e.target.value) }} placeholder="Message" className="w-full resize-none" rows={5} />
      <div className="w-full flex justify-end">
        <Button
          disabled={sendMessage.isPending}
          type="submit"
          className="!px-32">
          {sendMessage.isPending && (<Loader2 className="animate-spin" />)}
          Send
        </Button>
      </div>
    </form>
  )
}

export default ContactForm