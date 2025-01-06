import { HttpStatusCode } from 'axios'
import { PageErrorProps } from './page-error.ui'
import { LoaderFunctionArgs, redirect, useNavigate } from 'react-router-dom'
import { pathKeys } from '@/shared/lib/react-router'
import { useSession } from '@/shared/session'

export class PageErrorLoader {
  static async pageError(args: LoaderFunctionArgs) {
    const session = useSession().getSession()
    if (!session) {
      return redirect(pathKeys.login())
    }
    return args
  }
}
class PageErrorModel {

  getPageErrorProps(code: HttpStatusCode): PageErrorProps {
    const navigate = useNavigate()

    switch (code) {
      case HttpStatusCode.NotFound:
        return {
          title: code.toString(),
          description:
            "Looks like you've ventured into the unknown digital realm.",
          btn: {
            label: 'Return to dashboard',
            onClick: () => {
              navigate(pathKeys.home())
            },
          },
        }
      case HttpStatusCode.Unauthorized:
        return {
          title: code.toString(),
          description:
            "Oops! It looks like you don't have permission to view this page.\nYou may need to log in to your account or verify your credentials.",
          btn: {
            label: 'Go to Login',
            onClick: () => {
              useSession().reset()
              navigate(pathKeys.login(), {
                replace: true,
              })
            },
          },
        }
      default:
        return {
          title: '500',
          description: 'An error occurred. Please try again later.',
          btn: {
            label: 'Try again',
            onClick: () => {
              redirect(pathKeys.home())
            },
          },
        }
    }
  }
}

export const pageError = new PageErrorModel()
