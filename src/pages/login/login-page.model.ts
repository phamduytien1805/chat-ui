import { LoaderFunctionArgs, redirect } from 'react-router-dom'


export class LoginLoader {
  static async loginPage(args: LoaderFunctionArgs) {
    // if (useSessionStore.getState().session) {
    //   return redirect(pathKeys.home())
    // }
    return args
  }
}
