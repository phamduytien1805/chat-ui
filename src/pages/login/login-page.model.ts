import { pathKeys } from '@/shared/lib/react-router'
import { useSession } from '@/shared/session'
import { LoaderFunctionArgs, redirect } from 'react-router-dom'


export class LoginLoader {
  static async loginPage(args: LoaderFunctionArgs) {
    if (useSession().getSession()) {
      return redirect(pathKeys.home())
    }
    return args
  }
}
