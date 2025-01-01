import { LoginForm } from '@/features/authentication/login/login.ui'
import { pathKeys } from '@/shared/lib/react-router'
import { AuthFormWrapper } from '@/shared/ui/auth-form-wrapper'
import { Link, useNavigate } from 'react-router-dom'

export function RegisterPage() {
  const navigate = useNavigate()
  return (
    <AuthFormWrapper title='Welcome to Whisper' description='Create an account' onGoBack={() => navigate(pathKeys.login())}>
     <></>
    </AuthFormWrapper>
  )
}
