import { atomWithStorage } from 'jotai/utils'
import { Session } from './session.types'
import { Nullable } from '../lib/types'
import { store } from '@/app/providers/StoreProvider'
import { LoaderFunctionArgs, redirect } from 'react-router-dom'
import { pathKeys } from '../lib/react-router'
import { queryClient } from '../lib/react-query'
import { SessionQueries } from './session.queries'

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
    reset: () => store.set(sessionAtom, null),
  }
}

export class SessionLoader {
  static async sessionLoader(args: LoaderFunctionArgs) {
    if (!useSession().getSession()) {
      return redirect(pathKeys.login())
    }

    const userData = await queryClient.fetchQuery(
      SessionQueries.currentSessionQuery(),
    )

    useSession().setSession((prev) => ({
     ...userData, 
     accessToken: prev?.accessToken || ''
    }))
    return args
  }
}
