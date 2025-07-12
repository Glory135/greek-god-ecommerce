"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PAGES_LINKS } from "@/utils/linksData";
import Link from "next/link";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/modules/auth/schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import React, { useEffect, useState } from 'react'
import { GoogleOAuthButton } from "@/components/Auth/GoogleOAuthButton";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AUTH_CALLBACK_STORE_STRING } from "@/constants";
import { useRouter } from "next/navigation";


export default function RegisterPage() {
  const [verifyModalOpen, setVerifyModalOpen] = useState(false)
  const [callbackUrl, setCallbackUrl] = useState<string | null>(null);
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(AUTH_CALLBACK_STORE_STRING);
      setCallbackUrl(stored || "/");
    }
  }, []);

  const trpc = useTRPC();
  const queryClient = useQueryClient()
  const register = useMutation(trpc.auth.register.mutationOptions({
    onError: (error) => {
      toast(error.message)
    },
    onSuccess: async () => {
      setVerifyModalOpen(true)
      router.push(callbackUrl || "/");
      toast.success("Logged in successfully!");
      if (typeof window !== "undefined") {
        localStorage.removeItem(AUTH_CALLBACK_STORE_STRING);
      }
      await queryClient.invalidateQueries(trpc.auth.session.queryFilter());
    }
  }))

  const form = useForm<z.infer<typeof registerSchema>>({
    mode: "all",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      last_name: "",
      first_name: "",
      email: "",
      password: ""
    }
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    register.mutate(values)
  }

  const username = form.watch("username")
  const usernameErrors = form.formState.errors.username;
  const showPreview = username && !usernameErrors;

  return (
    <>
      <Dialog open={verifyModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verif your email</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            We’ve sent an email to you for verifycation and to activate your account.
          </DialogDescription>
        </DialogContent>
      </Dialog>
      <div className="w-full max-w-[400px] flex flex-col items-center gap-5">
        <h1 className="w-full text-center font-bold text-primary text-2xl">Create Account</h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col items-center gap-3"
          >
            <FormField
              name="username"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input {...field} type="text" placeholder="Username" />
                  </FormControl>
                  <FormDescription
                    className={cn("hidden", showPreview && "block")}>
                    Your username will be: <strong>{username?.toLowerCase()}</strong>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="first_name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input {...field} type="text" placeholder="First Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="last_name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input {...field} type="text" placeholder="Last Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input {...field} type="email" placeholder="Email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input {...field} type="password" placeholder="Password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={register.isPending}
              className="w-full"
              type="submit">
              {
                register.isPending && (<Loader2 className="animate-spin" />)
              }
              {
                register.isPending ? "Registering" : "Register Account"
              }
            </Button>
            <p>Already have an account? <Link className="text-greek" href={PAGES_LINKS.login.link}> Log in</Link></p>
          </form>
        </Form>

        <p>Or</p>

        <GoogleOAuthButton />

        <p className="text-center">
          By clicking &apos;Register Now&apos; you agree to <Link className="text-greek" href="#">terms & conditions</Link> and <Link className="text-greek" href="#">privacy policy</Link>.
        </p>
      </div>
    </>
  )
}
