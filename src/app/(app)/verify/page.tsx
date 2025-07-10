"use client"

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTRPC } from '@/trpc/client'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import Image from 'next/image'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PAGES_LINKS } from '@/utils/linksData'
import Link from 'next/link'

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const trpc = useTRPC()
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading')

  const verifyEmailMutation = useMutation(trpc.auth.verifyEmail.mutationOptions({
    onSuccess: (data) => {
      setVerificationStatus('success')
      toast.success(data.message)
      // Redirect to home page after 3 seconds
      setTimeout(() => {
        router.push('/login')
      }, 3000)
    },
    onError: (error) => {
      setVerificationStatus('error')
      toast.error(error.message || 'Email verification failed')
    },
  }))

  useEffect(() => {
    if (token) {
      verifyEmailMutation.mutate({ token })
    } else {
      setVerificationStatus('error')
      toast.error('Invalid verification link')
    }
  }, [token])

  const renderContent = () => {
    switch (verificationStatus) {
      case 'loading':
        return (
          <>
            <div className="mb-6">
              <Loader2 className="w-16 h-16 text-greek-500 animate-spin mx-auto" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Verifying Your Email</h1>
            <p className="text-gray-600 text-center max-w-md">
              Please wait while we verify your email address. This should only take a moment.
            </p>
          </>
        )

      case 'success':
        return (
          <>
            <div className="mb-6">
              <CheckCircle className="w-16 h-16 text-greek-500 mx-auto" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Email Verified Successfully! 🎉</h1>
            <p className="text-gray-600 text-center max-w-md mb-6">
              Welcome to GreekGod! Your email has been verified and your account is now active.
              You&apos;ll be redirected to the home page shortly.
            </p>
            <div className="w-full justify-center flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => router.push('/')}
              >
                Go to Home
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push(PAGES_LINKS.login.link)}
              >
                Login Now
              </Button>
            </div>
          </>
        )

      case 'error':
        return (
          <>
            <div className="mb-6">
              <XCircle className="w-16 h-16 text-red-500 mx-auto" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Verification Failed</h1>
            <p className="text-gray-600 text-center max-w-md mb-6">
              We couldn&apos;t verify your email address. This could be because the link has expired
              or is invalid. Please try requesting a new verification email.
            </p>
            <div className="w-full justify-center flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => router.push(PAGES_LINKS.login.link)}
              >
                Go to Login
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push('/')}
              >
                Back to Home
              </Button>
            </div>
          </>
        )
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-greek-50 to-emerald-100 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center w-full max-w-md border border-greek-100">
        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/logo/logo-icon.png"
            alt="GreekGod Logo"
            width={64}
            height={64}
            className="rounded-lg shadow-md"
          />
        </div>

        {/* Content */}
        <div className="text-center">
          {renderContent()}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-greek-200 w-full">
          <p className="text-sm text-gray-500 text-center">
            Need help?{' '}
            <Link href="/contact" className="text-greek-600 hover:text-greek-700 font-medium">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}