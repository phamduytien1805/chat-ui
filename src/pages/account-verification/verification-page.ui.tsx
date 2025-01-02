import { Button } from '@/shared/ui/button'

export function VerificationPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted p-8">
      <div className="max-w-xxl p-8 bg-neutral-900 shadow-lg rounded-lg ">
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
        <div className="flex justify-center">
          <Button>Resend Verification Email</Button>
        </div>
      </div>
    </div>
  )
}
