"use client"
import Image from 'next/image'
import { Button } from '../ui/button'
import { appAuthClient } from "@/lib/auth";
// import { usePathname } from 'next/navigation';
// import { AUTH_CALLBACK_STORE_STRING } from '@/constants';


export const GoogleOAuthButton = ({}: {notLoginPage?:boolean}) => {
  const { oauth } = appAuthClient.signin()
  // const pathname = usePathname()

  const handleGoogleSignin = async () => {
    // if (typeof window !== undefined && notLoginPage) {
    //   localStorage.setItem(AUTH_CALLBACK_STORE_STRING, pathname);
    // }
    oauth('google')
  }

  return (
    <Button onClick={handleGoogleSignin} className='w-full' variant={"outline"} >
      <Image alt="google" width={20} height={20} src="/icons/google.svg" />
      Continue With Google
    </Button>
  )
}
