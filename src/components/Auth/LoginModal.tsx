"use client"

import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { GoogleOAuthButton } from './GoogleOAuthButton'
import useDashboardStore from '@/zustand/DashboardStore'
import Link from 'next/link'
import { PAGES_LINKS } from '@/utils/linksData'
import { cn } from '@/lib/utils'
import { buttonVariants } from '../ui/button'
// import { usePathname } from 'next/navigation'
// import { AUTH_CALLBACK_STORE_STRING } from '@/constants'

const LoginModal = () => {
  const { loginModalOpen, setLoginModalOpen } = useDashboardStore()
  // const pathname = usePathname()

  return (
    <Dialog open={loginModalOpen} onOpenChange={setLoginModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login First</DialogTitle>
          <DialogDescription>
            Please Login first to be able to perform this action!
          </DialogDescription>
          <DialogFooter>
            <div className='w-full flex flex-col items-center gap-5 mt-5'>
              <DialogTrigger asChild>
                <Link
                  onClick={() => {
                    // if (typeof window !== undefined) {
                    //   localStorage.setItem(AUTH_CALLBACK_STORE_STRING, pathname);
                    // }
                  }}
                  href={`${PAGES_LINKS.login.link}`}
                  className={cn(
                    buttonVariants({
                      variant: "greek",
                    }),
                    "flex-1 w-full"
                  )}
                >
                  Login
                </Link>
              </DialogTrigger>
              <p>or</p>
              <DialogTrigger asChild>
                <GoogleOAuthButton notLoginPage={true} />
              </DialogTrigger>
            </div>

          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default LoginModal