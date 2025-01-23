import ResendButton from '@/features/verification/account-verification/resend-verification-btn.ui'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { VerificationPageSkeleton } from './verification-page.skeleton'
import { LogoutButton } from '@/features/session/logout'

export function VerificationPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  useEffect(() => {
    if (searchParams.get('token')) {
      searchParams.delete('token')
      setSearchParams(searchParams)
    }
  }, [searchParams])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen dark:bg-muted p-8">
      <div className="max-w-xxl p-8 dark:bg-neutral-900 shadow-lg rounded-lg ">
        <h2 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">
          Verify Your Email Address
        </h2>
        <p className="text-gray-400 mb-6">
          We've sent a verification link to your email address. Please check
          your inbox and click on the link to verify your email.
        </p>
        <p className="text-gray-400 mb-6">
          If you didn't receive the email, please check your spam folder or
          click the button below to resend the verification email.
        </p>
        <div className="flex justify-center gap-4">
          <ResendButton />
          <LogoutButton />
        </div>
      </div>
    </div>
  )
}
