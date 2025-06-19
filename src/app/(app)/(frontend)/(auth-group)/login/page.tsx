import { LoginUi } from "@/modules/auth/ui/login-ui";
import { caller } from "@/trpc/server";
import { redirect } from "next/navigation";

export default async function LoginPage() {

  const session = await caller.auth.session()

  if (session?.user) {
    redirect("/")
  }
  return <><LoginUi /></>
}
