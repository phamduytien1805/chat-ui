import React from 'react'
import { Button } from '@/shared/ui/button'
import { useResendVerification } from './resend-verification.mutation'

export default function ResendButton() {
  const { mutate: resendEmail } = useResendVerification()
  const handleResend = () => {
    resendEmail()
  }
  return (
    <>
      <Button onClick={handleResend}>Resend Verification Email</Button>
    </>
  )
}
