import { queryOptions } from '@tanstack/react-query'
import { AuthService } from '../api/auth'
import { queryClient } from '../lib/react-query'
import { transformUserDtoToSession } from './session.lib'
import { Session } from './session.types'

export class SessionQueries {
  static currentSessionQuery() {
    return queryOptions({
      queryKey: ['session', 'current-user'],
      queryFn: async ({ signal }) => {
        const response = await AuthService.currentUserQuery({ signal })
        return transformUserDtoToSession(response.data)
      },
      initialData: () =>
        queryClient.getQueryData<Session>(['session', 'current-session']),
      initialDataUpdatedAt: () =>
        queryClient.getQueryState(['session', 'current-session'])
          ?.dataUpdatedAt,
    })
  }

  static verifyEmailQuery(token: string) {
    return queryOptions({
      queryKey: ['session', 'verify-user-email'],
      queryFn: async ({signal}) => AuthService.verifyEmailQuery(token, {signal}),
      initialData: () =>
        queryClient.getQueryData<boolean>(['session', 'verify-user-email']),
      initialDataUpdatedAt: () =>
        queryClient.getQueryState(['session', 'verify-user-email'])
          ?.dataUpdatedAt,
    })
  }
  
}
