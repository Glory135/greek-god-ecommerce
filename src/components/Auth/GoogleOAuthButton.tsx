"use client"
import Image from 'next/image'
import { Button } from '../ui/button'
import { appAuthClient } from "@/lib/auth";


export const GoogleOAuthButton = () => {
  const { oauth } = appAuthClient.signin()

  const handleGoogleSignin = async () => {
    oauth('google')
  }

  return (
    <Button onClick={handleGoogleSignin} className='w-full' variant={"outline"} >
      <Image alt="google" width={20} height={20} src="/icons/google.svg" />
      Continue With Google
    </Button>
  )
}
