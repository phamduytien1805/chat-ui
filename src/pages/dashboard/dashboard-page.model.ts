import { pathKeys } from '@/shared/lib/react-router'
import { useSession } from '@/shared/session'
import { LoaderFunctionArgs, redirect } from 'react-router-dom'

export class DashboardLoader {
  static async dashboardPage(args: LoaderFunctionArgs) {
    const session = useSession().getSession()
    console.log('session :>> ', session);
    if (!session) {
      return redirect(pathKeys.login())
    }
    if (!session.emailVerified) {
      return redirect(pathKeys.accountVerification())
    }
    return args
  }
}
