"use client"

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import SectionTitle from "@/components/Sections/SectionTitle";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CONTACT_DETAILS } from "@/constants";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

const initialState = {
  fullname: "",
  email: "",
  subject: "",
  order: "",
  message: ""
}

export default function ContactPage() {
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
    <MaxWidthWrapper>
      <div className="w-full">
        <SectionTitle title="Contact Us" />
        <div className="bg-secondary text-secondary-foreground p-5 rounded flex flex-col gap-3 textstart">
          <p className="text-lg">
            We always love hearing from our customers! Please do not hesitate to contact us should you have any questions regarding our products and sizing recommendations or inquiries about your current order.
          </p>
          <p className="text-lg">
            Contact our Customer Care team through the contact form below, email us at {CONTACT_DETAILS.support_email} or live chat with us via our chat widget on the bottom right hand corner of this page.
          </p>
          <p className="text-lg">
            We will aim to respond to you within 1-2 business days.
          </p>
        </div>
        <div className="my-20 w-full flex justify-center">
          <div className="max-w-[900px] w-full flex flex-col gap-5">
            <div className="flex gap-2 items-center w-full">
              <Mail />
              <h3 className="font-bold text-lg">Write Us</h3>
            </div>
            <p className="w-full text-lg">Your information</p>
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
          </div>
        </div>

        <div className="w-full flex gap-5 flex-wrap justify-center">
          {/* <div className="flex-1 min-w-[400px] p-5 bg-secondary text-secondary-foreground flex flex-col items-center gap-5">
            <Text />
            <h3 className="text-lg font-bold capitalize">Chat with us</h3>
            <p className="text-base">We are here and ready to chat</p>
            <Link target="__blank" href={`https://wa.me/${CONTACT_DETAILS.support_phone.split("+")[1]}?text=Hello%20GreekGod%20`} className={cn(buttonVariants({
              variant: "outline"
            }), "px-30")}>Start Chat</Link>
          </div>
          <div className="flex-1 min-w-[400px] p-5 bg-secondary text-secondary-foreground flex flex-col items-center gap-5">
            <Phone />
            <h3 className="text-lg font-bold capitalize">Call Us</h3>
            <p className="text-base">We are here to talk to you</p>
            <Link target="__blank" href={`tel:${CONTACT_DETAILS.support_phone.split("+")[1]}`} className={cn(buttonVariants({
              variant: "outline"
            }), "px-30")}>{CONTACT_DETAILS.support_phone}</Link>
          </div> */}
          <div className="flex-1 min-w-[400px] p-5 bg-secondary text-secondary-foreground flex flex-col items-center gap-5">
            <Mail />
            <h3 className="text-lg font-bold capitalize">Email us</h3>
            <p className="text-base">You Are Welcome To Send Us An Email</p>
            <Link target="__blank" href={`mailto:${CONTACT_DETAILS.support_email}`} className={cn(buttonVariants({
              variant: "outline"
            }), "px-30")}>Send Email</Link>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  )
}