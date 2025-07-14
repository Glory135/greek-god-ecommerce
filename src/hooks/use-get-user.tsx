
"use client"

import { useTRPC } from "@/trpc/client"
import { useQuery } from "@tanstack/react-query"

const useGetUser = () => {
  const trpc = useTRPC()
  const session = useQuery(trpc.auth.session.queryOptions())
  
  return {
    user: session?.data?.user,
    isLoading: session?.isLoading,
    isError: session?.isError,
    error: session?.error
  }
}

export default useGetUser