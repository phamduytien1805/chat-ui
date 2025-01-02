import { AuthService, authTypesDto } from '@/shared/api/auth'
import { sessionLib, useSession } from '@/shared/session'
import {
  DefaultError,
  UseMutationOptions,
  useMutation,
} from '@tanstack/react-query'

export function useRegisterMutation(
  options?: Pick<
    UseMutationOptions<
      Awaited<ReturnType<typeof AuthService.createUserMutation>>,
      DefaultError,
      authTypesDto.CreateUserDto,
      unknown
    >,
    'mutationKey' | 'onMutate' | 'onSuccess' | 'onError' | 'onSettled'
  >,
) {
  const {
    mutationKey = [],
    onMutate,
    onSuccess,
    onError,
    onSettled,
  } = options || {}

  return useMutation({
    mutationKey: ['session', 'register-user', ...mutationKey],

    mutationFn: async (createUserDto: authTypesDto.CreateUserDto) =>
      AuthService.createUserMutation({ createUserDto }),

    onMutate,

    onSuccess: async (response, variables, context) => {
      console.log('object :>> ', response)
      const user = response.data
      const { setSession } = useSession()
      const session = sessionLib.transformUserDtoToSession({
        ...user,
        access_token: '',
        refresh_token: '',
      })
      console.log('user :>> ', user, session)
      setSession(session)

      await onSuccess?.(response, variables, context)
    },

    onError,

    onSettled,
  })
}
