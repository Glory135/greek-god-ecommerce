"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PAGES_LINKS } from "@/utils/linksData";
import Image from "next/image";
import Link from "next/link";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/modules/auth/schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter()

  const trpc = useTRPC();
  const queryClient = useQueryClient()
  const login = useMutation(trpc.auth.login.mutationOptions({
    onError: (error) => {
      toast(error.message)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(trpc.auth.session.queryFilter());
      router.push("/");
    }
  }))

  const form = useForm<z.infer<typeof loginSchema>>({
    mode: "all",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    login.mutate(values)
  }

  return (
    <div className="w-full max-w-[400px] flex flex-col items-center gap-10">
      <h1 className="w-full text-center font-bold text-primary text-2xl">Log In</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center gap-5"
        >
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

          <div className="w-full">
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

            <Link href={"#"} className="text-greek">Forgot your password?</Link>
          </div>
          <Button
            disabled={login.isPending}
            className="w-full"
            type="submit">
            {
              login.isPending && (<Loader2 className="animate-spin" />)
            }
            {
              login.isPending
                ? "Logging in"
                : "Log In"
            }
          </Button>
        </form>
      </Form>

      <p>Or</p>

      <div className="flex gap-5">
        <Image className="cursor-pointer" src={"/images/oauth/apple.png"} width={35} height={35} alt="apple" />
        <Image className="cursor-pointer" src={"/images/oauth/google.png"} width={35} height={35} alt="google" />
        <Image className="cursor-pointer" src={"/images/oauth/facebook.png"} width={35} height={35} alt="facebook" />
      </div>

      <p>New to GreekGod? <Link className="text-greek" href={PAGES_LINKS.register.link}> create an account</Link></p>
    </div>
  )
}

export const dynamic = 'force-dynamic';