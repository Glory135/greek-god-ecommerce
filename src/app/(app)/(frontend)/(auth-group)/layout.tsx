import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { caller } from "@/trpc/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

export default async function AuthGroupLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await caller.auth.session();

  if (session.user) {
    redirect("/")
  }
  return (
    <MaxWidthWrapper className="md:py-10 mb-10 flex flex-col md:flex-row gap-5">
      <div className="flex-1 flex justify-center items-center">
        <div className="relative w-full h-[200px] md:h-[800px] shrink border">
          <Image fill alt="" src={"/images/auth_img.jpg"} className="object-center object-cover" />
        </div>
      </div>
      <div className="flex-1 flex justify-center py-5 sm:py-20">
        {children}
      </div>
    </MaxWidthWrapper>
  )
}