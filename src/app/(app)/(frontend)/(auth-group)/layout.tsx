"use client"

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { HERO_SLUGS } from "@/constants";
import useGetUser from "@/hooks/use-get-user";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

export default function AuthGroupLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useGetUser()
  const trpc = useTRPC();
  const { data, isPending } = useQuery(trpc.layout.getHero.queryOptions(
    {
      slug: HERO_SLUGS.auth
    },
  ))

  if (user) {
    redirect("/")
  }

  return (
    <MaxWidthWrapper className="md:py-10 mb-10 flex flex-col md:flex-row gap-5">
      <div className="flex-1 flex justify-center items-center">
        <div className="relative w-full h-[150px] md:h-full md:min-h-[600px] shrink border overflow-hidden">
          {isPending ? (
            // Pending state with skeleton
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gray-400 rounded-full mx-auto animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-400 rounded w-48 mx-auto animate-pulse"></div>
                  <div className="h-3 bg-gray-400 rounded w-32 mx-auto animate-pulse"></div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Image
                fill
                alt="Authentication background"
                src={data?.docs?.hero?.url || "/images/auth_img.jpg"}
                className="object-center object-cover"
              />
              {/* Animated overlay with title and description */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8">
                <div className="text-white space-y-4">
                  {
                    data?.docs?.title && (
                      <h1 className="text-2xl md:text-4xl font-bold animate-in slide-in-from-bottom-4 fade-in duration-700 ease-out">
                        {data?.docs?.title}
                      </h1>
                    )
                  }
                  {
                    data?.docs?.description && (
                      <p className="text-sm md:text-lg max-w-md animate-in slide-in-from-bottom-4 fade-in duration-700 ease-out delay-200">
                        {data?.docs?.description}
                      </p>
                    )
                  }
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="flex-1 flex justify-center py-5 sm:py-20">
        {children}
      </div>
    </MaxWidthWrapper>
  )
}