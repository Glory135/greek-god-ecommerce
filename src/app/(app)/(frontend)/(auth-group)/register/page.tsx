import { RegisterUi } from "@/modules/auth/ui/register-ui";
import { caller } from "@/trpc/server";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const session = await caller.auth.session()

  if (session?.user) {
    redirect("/")
  }
  return (<><RegisterUi /></>)
}
