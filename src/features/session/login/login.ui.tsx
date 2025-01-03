import { authContractsDto, authTypesDto } from '@/shared/api/auth'
import { compose } from '@/shared/lib/react'
import { Button } from '@/shared/ui/button'
import { ErrorHandler, logError } from '@/shared/ui/error-handler'
import { Input } from '@/shared/ui/input'
import { withErrorBoundary } from 'react-error-boundary'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useLoginMutation } from './login.mutation'
import { pathKeys } from '@/shared/lib/react-router'
import { RESP_CODE } from '@/shared/lib/enum'

const enhance = compose((component) =>
  withErrorBoundary(component, {
    FallbackComponent: ErrorHandler,
    onError: logError,
  }),
)

export const LoginForm = enhance(() => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useForm<authTypesDto.LoginUserDto>({
    resolver: zodResolver(authContractsDto.LoginUserDtoSchema),
    defaultValues: { email: '', password: '' },
  })

  const { mutate: loginUser, isPending } = useLoginMutation({
    onSuccess: async (response) => {
      navigate(pathKeys.home())
    },

    onError({response}) {
      const error = response?.data as any
      if(error?.code === RESP_CODE.ERROR_AUTHENTICATION) {
        setError('email', { message: 'Invalid email or password' })
        setError('password', { message: 'Invalid email or password' })
      }
    },
  })

  const onSubmit = (loginUserDto: authTypesDto.LoginUserDto) =>
    loginUser(loginUserDto)

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
        disabled={isPending}
        error={errors.email?.message}
        {...register('email')}
      />
      <div>
        <Input
          id="password"
          type="password"
          label="Password"
          required
          disabled={isPending}
          error={errors.password?.message}
          {...register('password')}
        />
        <Button
          variant={'link'}
          size={'sm'}
          type="button"
          disabled={isPending}
          className="p-0 h-auto text-neutral-400"
        >
          Forgot your password?
        </Button>
      </div>
      <Button
        disabled={isPending}
        type="submit"
        className="w-full"
      >
        Login
      </Button>
    </form>
  )
})
