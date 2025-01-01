import { LoaderFunctionArgs, redirect } from 'react-router-dom'


export class RegisterLoader {
  static async registerPage(args: LoaderFunctionArgs) {
    // if (useSessionStore.getState().session) {
    //   return redirect(pathKeys.home())
    // }
    return args
  }
}
