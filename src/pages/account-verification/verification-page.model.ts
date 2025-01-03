import { pathKeys } from '@/shared/lib/react-router'
import { SessionLoader, useSession } from '@/shared/session'
import { LoaderFunctionArgs, redirect } from 'react-router-dom'


export class VerificationLoader extends SessionLoader {
  static async verificationPage(_args: LoaderFunctionArgs) {
    const args = this.sessionLoader(_args)
    const session = useSession().getSession()
    if (session?.emailVerified) {
      return redirect(pathKeys.home())
    }
    return args
  }
}
