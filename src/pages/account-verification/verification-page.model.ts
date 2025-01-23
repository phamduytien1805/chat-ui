import { queryClient } from '@/shared/lib/react-query'
import { pathKeys } from '@/shared/lib/react-router'
import { SessionLoader, useSession } from '@/shared/session'
import { SessionQueries } from '@/shared/session/session.queries'
import { useGlobalLoading } from '@/shared/ui/global-loading/global-loading.model'
import { LoaderFunctionArgs, redirect } from 'react-router-dom'


export class VerificationLoader extends SessionLoader {
  static async verificationPage(_args: LoaderFunctionArgs) {
    await this.verifyEmail(_args)
    const args = this.sessionLoader(_args)
    const session = useSession().getSession()
    if (session?.emailVerified) {
      return redirect(pathKeys.home())
    }
    return args
  }
  static async verifyEmail(args: LoaderFunctionArgs) {
    const {increment, decrement} = useGlobalLoading()

    try {
      increment()
      const token = new URL(args.request.url).searchParams.get('token')
      if(!token) return;
      await queryClient.fetchQuery(
        SessionQueries.verifyEmailQuery(token),
      )
      return
    }
    finally {
      decrement()
    }
  }
}
