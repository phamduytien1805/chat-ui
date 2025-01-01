import { LoginForm } from '@/features/authentication/login/login.ui'
import { RegisterForm } from '@/features/authentication/register'
import { pathKeys } from '@/shared/lib/react-router'
import { AuthFormWrapper } from '@/shared/ui/auth-form-wrapper'
import { Link, useNavigate } from 'react-router-dom'

export function RegisterPage() {
  const navigate = useNavigate()
  return (
    <AuthFormWrapper
      title="Welcome to Whisper"
      description="Create an account"
      onGoBack={() => navigate(pathKeys.login())}
    >
      <RegisterForm />
      <div className=" text-sm mt-3">
        <Link to={pathKeys.login()} className="text-neutral-400 hover:underline hover:underline-offset-4 ">
          Already have an account?
        </Link>
      </div>
    </AuthFormWrapper>
  )
}
