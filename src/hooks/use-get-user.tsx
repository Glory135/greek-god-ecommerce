
"use client"

import { useTRPC } from "@/trpc/client"
import { useQuery } from "@tanstack/react-query"

const useGetUser = () => {
  const trpc = useTRPC()
  const session = useQuery(trpc.auth.session.queryOptions())
  
  return session?.data?.user
}

export default useGetUser