"use client"


import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { toast } from "sonner";
import { AUTH_CALLBACK_STORE_STRING } from "@/constants";


export default function GoogleCallback() {
  const router = useRouter();
  const trpc = useTRPC();
  const hasRunRef = useRef(false);

  const callBack_url_redirect = typeof window !== undefined ? localStorage.getItem(AUTH_CALLBACK_STORE_STRING) : "/"


  const callbackMutation = useMutation(trpc.auth.googleAuthCallback.mutationOptions({
    onSuccess: () => {
      router.replace(callBack_url_redirect || "/");
      toast.success("Logged in successfully!")
      if (typeof window !== undefined) {
        localStorage.removeItem(AUTH_CALLBACK_STORE_STRING);
      }
    },
    onError: (error: unknown) => {
      // Fallback for any other error
      console.error("OAuth failed:", error);
      toast.error("Google login failed. Please try again.");
      router.replace("/login?error=oauth");
    },
  }));

  useEffect(() => {
    if (!hasRunRef.current) {
      hasRunRef.current = true;

      setTimeout(() => {
        callbackMutation.mutate();
      }, 100);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center w-full max-w-sm">
        <Image src="/icons/google.svg" alt="Google Logo" width={48} height={48} className="mb-4" />
        {callbackMutation.isError ? (
          <>
            <div className="mb-4">
              <svg className="w-10 h-10 text-red-400 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
              </svg>
            </div>
            <p className="text-lg font-semibold text-red-500 mb-2">Google sign-in failed.</p>
            <p className="text-gray-500 text-sm">Redirecting...</p>
          </>
        ) : (
          <>
            <div className="mb-4">
              <svg className="w-10 h-10 text-blue-500 animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
            </div>
            <p className="text-lg font-semibold text-gray-800 mb-2">Signing you in with Google...</p>
            <p className="text-gray-500 text-sm">Please wait while we complete your sign-in.</p>
          </>
        )}
      </div>
    </div>
  );
}
