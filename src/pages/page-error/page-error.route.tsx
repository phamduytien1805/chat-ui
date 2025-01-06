import { compose, withSuspense } from '@/shared/lib/react'
import { pathKeys } from '@/shared/lib/react-router'
import { createElement, lazy } from 'react'
import { LoaderFunctionArgs, RouteObject } from 'react-router-dom'
import { pageError } from './page-error.model'
import { HttpStatusCode } from 'axios'

const PageError = lazy(() =>
  import('./page-error.ui').then((module) => ({
    default: module.PageError,
  })),
)
const errorPageLoader = (args: LoaderFunctionArgs) =>
  import('./page-error.model').then((module) =>
    module.PageErrorLoader.pageError(args),
  )

const Page404 = () => <PageError {...pageError.getPageErrorProps(HttpStatusCode.NotFound)}/>

const Page401 = () => <PageError {...pageError.getPageErrorProps(HttpStatusCode.Unauthorized)}/>

export const pageErrorRoute: RouteObject = {
  path: pathKeys.error.root(),
  loader: errorPageLoader,
  children: [
    {
      path: pathKeys.error.page404(),
      element: createElement(Page404),
    },
    {
      path: pathKeys.error.page401(),
      element: createElement(Page401),
    },
  ],
}
