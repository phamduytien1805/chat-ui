import { LoginForm } from '@/features/authentication/login/login.ui'
import { pathKeys } from '@/shared/lib/react-router'
import { AuthFormWrapper } from '@/shared/ui/auth-form-wrapper'
import { Link } from 'react-router-dom'

export function LoginPage() {
  return (
    <AuthFormWrapper title='Welcome back whisperers!' description="We're so excited to see you again!">
      <LoginForm />
      <div className="text-center text-sm mt-3">
        Don&apos;t have an account?{" "}
        <Link to={pathKeys.register()} className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </AuthFormWrapper>
  )
}
