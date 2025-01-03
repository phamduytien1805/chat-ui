import { pathKeys } from '@/shared/lib/react-router'
import { SessionLoader, useSession } from '@/shared/session'
import { LoaderFunctionArgs, redirect } from 'react-router-dom'

export class DashboardLoader extends SessionLoader {
  static async dashboardPage(_args: LoaderFunctionArgs) {
    const args = await this.sessionLoader(_args)
    const session = useSession().getSession()
    if (!session?.emailVerified) {
      return redirect(pathKeys.accountVerification())
    }
    return args
  }
}
