import { pathKeys } from '@/shared/lib/react-router'
import { useSession } from '@/shared/session'
import { LoaderFunctionArgs, redirect } from 'react-router-dom'


export class LoginLoader {
  static async loginPage(args: LoaderFunctionArgs) {
    const session = useSession().getSession()
    if (session) {
      return redirect(pathKeys.home())
    }
    return args
  }
}
