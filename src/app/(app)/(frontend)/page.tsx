"use client"

import LandingHero from "@/components/Hero/LandingHero";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export default function LandingPage() {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.auth.session.queryOptions())

  return (
    <div className="w-full">
      <LandingHero />
      <div className="h-[200vh]">
        {JSON.stringify(data?.user, null, 2)}
      </div>
    </div>
  )
}