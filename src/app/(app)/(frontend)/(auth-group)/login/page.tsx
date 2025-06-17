import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PAGES_LINKS } from "@/utils/linksData";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="w-full max-w-[400px] flex flex-col items-center gap-10">
      <h1 className="w-full text-center font-bold text-primary text-2xl">Log In</h1>
      <form action="" className="w-full flex flex-col gap-5">
        <Input type="email" placeholder="Email" />
        <div className="w-full">
          <Input type="Password" placeholder="Password" />
          <Link href={"#"} className="text-greek">Forgot your password?</Link>
        </div>
        <Button type="submit">Log In</Button>
      </form>

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