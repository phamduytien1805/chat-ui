import { authContractsDto, authTypesDto } from '@/shared/api/auth'
import { compose } from '@/shared/lib/react'
import { Button } from '@/shared/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card'
import { ErrorHandler, logError } from '@/shared/ui/error-handler'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { withErrorBoundary } from 'react-error-boundary'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

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

  // const { mutate, isPending } = useLoginMutation({
  //   onSuccess: async (response) => {
  //     const { username } = response.data.user
  //     navigate(pathKeys.profile.byUsername({ username }))
  //   },

  //   onError(error) {
  //     setError('root', { message: error.message })
  //   },
  // })

  const canSubmit = [isDirty, isValid].every(Boolean)

  const onSubmit = (loginUserDto: authTypesDto.LoginUserDto) => {}

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
          {...register('email')}
        />
        <div>
          <Input
            id="password"
            type="password"
            label="Password"
            required
            error={errors.password?.message}
            {...register('password')}
          />
          <Button
            variant={'link'}
            size={'sm'}
            className="p-0 h-auto text-neutral-400"
          >
            Forgot your password?
          </Button>
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={!canSubmit}
        >
          Login
        </Button>
    </form>
  )
})
