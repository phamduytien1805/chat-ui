import { AuthService, authTypesDto } from '@/shared/api/auth'
import { AxiosValidationError } from '@/shared/axios'
import { sessionLib, useSession } from '@/shared/session'
import {
  DefaultError,
  UseMutationOptions,
  useMutation,
} from '@tanstack/react-query'

export function useResendVerification(
  options?: Pick<
    UseMutationOptions<
      Awaited<ReturnType<typeof AuthService.resendVerificationEmailMutation>>,
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
    mutationKey: ['resend-email', ...mutationKey],

    mutationFn: async () => AuthService.resendVerificationEmailMutation(),

    onMutate,

    onSuccess: async (response, variables, context) => {
      await onSuccess?.(response, variables, context)
    },
    
    onError,

    onSettled,
  })
}
