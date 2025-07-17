"use client"

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import SectionTitle from "@/components/Sections/SectionTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Text } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [contact, setContact] = useState({
    fullname: "",
    email: "",
    subject: "",
    order: "",
    message: ""
  })

  const handleChange = (key: string, value: string) => {
    setContact(prev => ({
      ...prev,
      [key]: value
    }))
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
            Contact our Customer Care team through the contact form below, email us at hello@GreekGod.com or live chat with us via our chat widget on the bottom right hand corner of this page.

          </p>
          <p className="text-lg">
            We will aim to respond to you within 1-2 business days.
          </p>
        </div>
        <div className="my-10 w-full flex justify-center">
          <div className="max-w-[900px] w-full flex flex-col gap-10">
            <div className="flex gap-2 items-center w-full">
              <Mail />
              <h3 className="font-bold text-lg">Write Us</h3>
            </div>
            <p className="w-full text-lg">Your information</p>
            <form className="w-full flex flex-col gap-5">
              <Input value={contact.fullname} onChange={(e) => { handleChange("fullname", e.target.value) }} placeholder="Full Name" className="w-full" />
              <Input type="email" value={contact.email} onChange={(e) => { handleChange("email", e.target.value) }} placeholder="Email" className="w-full" />
              <Input value={contact.subject} onChange={(e) => { handleChange("subject", e.target.value) }} placeholder="Subject" className="w-full" />
              <Input value={contact.order} onChange={(e) => { handleChange("order", e.target.value) }} placeholder="Order Ref" className="w-full" />
              <Textarea value={contact.message} onChange={(e) => { handleChange("message", e.target.value) }} placeholder="Message" className="w-full resize-none" rows={5} />
              <div className="w-full flex justify-end">
                <Button type="submit" className="!px-32">Send</Button>
              </div>
            </form>
          </div>
        </div>

        <div className="w-full flex gap-5 flex-wrap justify-center">
          <div className="flex-1 min-w-[400px] p-5 bg-secondary text-secondary-foreground flex flex-col items-center gap-5">
            <Text />
            <h3 className="text-lg font-bold capitalize">Chat with us</h3>
            <p className="text-base">We are here and ready to chat</p>
            <Button className="px-30" variant={"outline"}>Start Chat</Button>
          </div>
          <div className="flex-1 min-w-[400px] p-5 bg-secondary text-secondary-foreground flex flex-col items-center gap-5">
            <Phone />
            <h3 className="text-lg font-bold capitalize">Call Us</h3>
            <p className="text-base">We are here to talk to you</p>
            <Button className="px-30" variant={"outline"}>+1(929)460-3208</Button>
          </div>
          <div className="flex-1 min-w-[400px] p-5 bg-secondary text-secondary-foreground flex flex-col items-center gap-5">
            <Mail />
            <h3 className="text-lg font-bold capitalize">Email us</h3>
            <p className="text-base">You Are Welcome To Send Us An Email</p>
            <Button className="px-30" variant={"outline"}>Send Email</Button>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  )
}