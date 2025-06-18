import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PAGES_LINKS } from "@/utils/linksData";
import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="w-full max-w-[400px] flex flex-col items-center gap-5">
      <h1 className="w-full text-center font-bold text-primary text-2xl">Create Account</h1>

      <form action="" className="w-full flex flex-col items-center gap-3">
        <Input type="text" placeholder="Username" />
        <Input type="email" placeholder="Email" />
        <Input type="Password" placeholder="Password" />
        <Input type="passwor" placeholder="Confirm Password" />
        <Button className="w-full" type="submit">Register Now</Button>
        <p>Already have an account? <Link className="text-greek" href={PAGES_LINKS.login.link}> Log in</Link></p>
      </form>

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