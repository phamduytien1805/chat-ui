import { AuthService } from '@/shared/api/auth'
import { useSession } from '@/shared/session'
import {
  DefaultError,
  UseMutationOptions,
  useMutation,
} from '@tanstack/react-query'

export function useLogoutMutation(
  options?: Pick<
    UseMutationOptions<
      Awaited<ReturnType<typeof AuthService.logoutUserMutation>>,
      DefaultError,
      void,
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
    mutationKey: ['session', 'logout-user', ...mutationKey],

    mutationFn: () => AuthService.logoutUserMutation(),

    onMutate,

    onSuccess: async (response, variables, context) => {
      useSession().reset()
      await onSuccess?.(response, variables, context)
    },

    onError,

    onSettled,
  })
}
