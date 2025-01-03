import { atomWithStorage } from 'jotai/utils'
import { Session } from './session.types'
import { Nullable } from '../lib/types'
import { store } from '@/app/providers/StoreProvider'
import { LoaderFunctionArgs, redirect } from 'react-router-dom'
import { pathKeys } from '../lib/react-router'
import { queryClient } from '../lib/react-query'
import { SessionQueries } from './session.queries'
import { useGlobalLoading } from '../ui/global-loading/global-loading.model'

export const sessionAtom = atomWithStorage<Nullable<Session>>(
  'session',
  null,
  undefined,
  { getOnInit: true },
)

export const useSession = () => {
  return {
    getSession: () => store.get(sessionAtom),
    setSession: (
      updater:
        | Nullable<Session>
        | ((prev: Nullable<Session>) => Nullable<Session>),
    ) => store.set(sessionAtom, updater),
  }
}

export class SessionLoader {
  static async sessionLoader(args: LoaderFunctionArgs) {
    const { setSession, getSession } = useSession()
    const session = getSession()
    if (!session) {
      return redirect(pathKeys.login())
    }

    const userData = await queryClient
      .fetchQuery(SessionQueries.currentSessionQuery())

    const newSession = {
      ...session,
      ...userData,
    }
    setSession(newSession)
    return args
  }
}
