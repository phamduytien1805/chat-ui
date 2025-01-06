import { queryClient } from './../lib/react-query/queryClient'
import { AuthService, authTypesDto } from '@/shared/api/auth'
import { sessionLib, useSession } from '@/shared/session'
import {
  DefaultError,
  UseMutationOptions,
  useMutation,
} from '@tanstack/react-query'
import { SessionQueries } from './session.queries'

export function useRefreshSession(
  options?: Pick<
    UseMutationOptions<
      Awaited<ReturnType<typeof AuthService.requestTokenMutation>>,
      DefaultError,
      undefined,
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
    mutationKey: ['session', 'refresh-token', ...mutationKey],

    mutationFn: async () => AuthService.requestTokenMutation(),

    onMutate: async () => {
      await Promise.all([
        await queryClient.cancelQueries({
          queryKey: SessionQueries.currentSessionQuery().queryKey,
        }),
        onMutate?.(undefined),
      ])
    },

    onSuccess: async (response, variables, context) => {
      const user = response.data
      const { setSession } = useSession()
      const session = sessionLib.transformUserAuthenticatedDtoToSession(user)
      setSession(session)

      await onSuccess?.(response, variables, context)
    },

    onError,

    onSettled,
  })
}
