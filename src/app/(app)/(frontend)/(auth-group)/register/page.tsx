"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PAGES_LINKS } from "@/utils/linksData";
import Image from "next/image";
import Link from "next/link";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/modules/auth/schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter()

  const trpc = useTRPC();
  const queryClient = useQueryClient()
  const register = useMutation(trpc.auth.register.mutationOptions({
    onError: (error) => {
      toast(error.message)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(trpc.auth.session.queryFilter());
      router.push("/")
    }
  }))

  const form = useForm<z.infer<typeof registerSchema>>({
    mode: "all",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
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
          <p>Already have an account? <Link prefetch className="text-greek" href={PAGES_LINKS.login.link}> Log in</Link></p>
        </form>
      </Form>

      <p>Or</p>

      <div className="flex gap-5">
        <Image className="cursor-pointer" src={"/images/oauth/apple.png"} width={35} height={35} alt="apple" />
        <Image className="cursor-pointer" src={"/images/oauth/google.png"} width={35} height={35} alt="google" />
        <Image className="cursor-pointer" src={"/images/oauth/facebook.png"} width={35} height={35} alt="facebook" />
      </div>
      <p className="text-center">
        By clicking &apos;Register Now&apos; you agree to <Link className="text-greek" href="#">terms & conditions</Link> and <Link className="text-greek" href="#">privacy policy</Link>.
      </p>
    </div>
  )
}