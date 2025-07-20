"use client"

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

const LookBookSection = () => {

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.lookbook.getMany.queryOptions(
    {
      limit: 5
    },
  ))

  // Ensure data and docs exist before accessing
  const docs = data?.docs || [];
  
  return (
    <div className="w-full min-h-[700px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 grid-rows-6">
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom, #456d4533, rgba(0, 0, 0, 0.218)), url(${docs[0]?.image?.url || '/images/trending1.jpg'})`
        }}
        className=" bg-center bg-cover bg-no-repeat col-start-1 col-end-2 sm:col-span-2 lg:col-start-1 lg:col-end-4 row-start-1 row-end-7 min-h-[500px]"></div>
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom, #456d4533, rgba(0, 0, 0, 0.218)), url(${docs[1]?.image?.url || '/images/trending2.jpg'})`
        }}
        className=" bg-center bg-cover bg-no-repeat col-start-1 sm:col-span-1 lg:col-start-4 lg:col-end-6 row-start-4 row-end-7  min-h-[300px]"></div>
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom, #456d4533, rgba(0, 0, 0, 0.218)), url(${docs[2]?.image?.url || '/images/trending3.jpg'})`
        }}
        className=" bg-center bg-cover bg-no-repeat col-start-1 sm:col-span-1 lg:col-start-4 lg:col-end-6 row-start-1 row-end-4 min-h-[350px]"></div>
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom, #456d4533, rgba(0, 0, 0, 0.218)), url(${docs[3]?.image?.url || '/images/trending4.jpg'})`
        }}
        className=" bg-center bg-cover bg-no-repeat col-start-1 sm:col-span-1 lg:col-start-6 lg:col-end-8 row-start-1 row-end-4 min-h-[250px]"></div>
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom, #456d4533, rgba(0, 0, 0, 0.218)), url(${docs[4]?.image?.url || '/images/trending5.jpg'})`
        }}
        className=" bg-center bg-cover bg-no-repeat col-start-1 sm:col-span-1 lg:col-start-6 lg:col-end-8 row-start-4 row-end-7 min-h-[350px]"></div>
    </div>
  )
}

export default LookBookSection