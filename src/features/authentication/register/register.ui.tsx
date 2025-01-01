import { authContractsDto, authTypesDto } from '@/shared/api/auth'
import { compose } from '@/shared/lib/react'
import { Button } from '@/shared/ui/button'
import { ErrorHandler, logError } from '@/shared/ui/error-handler'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { withErrorBoundary } from 'react-error-boundary'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRegisterMutation } from './register.mutation'
import { pathKeys } from '@/shared/lib/react-router'
import { RESP_CODE } from '@/shared/lib/enum'

const enhance = compose((component) =>
  withErrorBoundary(component, {
    FallbackComponent: ErrorHandler,
    onError: logError,
  }),
)

export const RegisterForm = enhance(() => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useForm<authTypesDto.CreateUserDto>({
    resolver: zodResolver(authContractsDto.CreateUserDtoSchema),
    defaultValues: { email: '', password: '', username: '' },
  })

  const { mutate: registerUser, isPending } = useRegisterMutation({
    onSuccess: async (response) => {
      navigate(pathKeys.home())
    },

    onError({response}) {
     const error =response?.data as any
     if(error.code as any ===RESP_CODE.ERROR_UNIQUE) {
      const errorMsg = 'Email or Username is used'
      setError('email', { message: errorMsg })
      setError('username', { message:errorMsg })
     }
    },
  })

  const canSubmit = [ !isPending].every(Boolean)


  const onSubmit = (loginUserDto: authTypesDto.CreateUserDto) =>{
    registerUser(loginUserDto)
  }

  return (
    <form
      className="mt-5 flex flex-col gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        id="email"
        type="email"
        label="Email"
        placeholder="m@example.com"
        required
        error={errors.email?.message}
        disabled={isPending}
        {...register('email')}
      />
      <Input
        id="username"
        type="text"
        label="Username"
        required
        disabled={isPending}
        error={errors.username?.message}
        {...register('username')}
      />
      <Input
        id="password"
        type="password"
        label="Password"
        disabled={isPending}
        required
        error={errors.password?.message}
        {...register('password')}
      />
      <Button
        type="submit"
        className="w-full"
        disabled={!canSubmit}
      >
        Continue
      </Button>
    </form>
  )
})
