import React from 'react'
import { Button } from '@/shared/ui/button'
import { useResendVerification } from './resend-verification.mutation'

export default function ResendButton() {
  const { mutate: resendEmail, isPending } = useResendVerification()
  const handleResend = () => {
    resendEmail()
  }
  return (
    <>
      <Button onClick={handleResend} disabled={isPending}>Resend Verification Email</Button>
    </>
  )
}
