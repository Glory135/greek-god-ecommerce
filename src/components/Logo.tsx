import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

export const LogoIcon = ({ className }: { className?: string }) => {
  return (
    <Link href={"/"} className={cn("relative w-[75px] h-[70px]", className)}>
      <Image src={"/logo/logo-icon.png"} fill alt="Greek God" className="object-contain" />
    </Link>
  )
}
export const LogoText = ({ className }: { className?: string }) => {
  return (
    <Link href={"/"} className={cn("relative w-[100px] h-[40px]", className)}>
      <Image src={"/logo/logo-text.png"} fill alt="Greek God" className="object-contain" />
    </Link>
  )
}
export const LogoFull = ({ className }: { className?: string }) => {
  return (
    <Link href={"/"} className={cn("relative w-[175px] h-[60px]", className)}>
      <Image src={"/logo/logo-full.png"} fill alt="Greek God" className="object-contain" />
    </Link>
  )
}