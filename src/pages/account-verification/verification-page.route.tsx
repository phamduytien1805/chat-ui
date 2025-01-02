import { createElement, lazy } from 'react'
import { LoaderFunctionArgs, RouteObject } from 'react-router-dom'

import { compose, withSuspense } from '@/shared/lib/react'
import { pathKeys } from '@/shared/lib/react-router'
import { GlobalLoading } from '@/shared/ui/global-loading'

const verificationPageLoader = (args: LoaderFunctionArgs) =>
  import('./verification-page.model').then((module) =>
    module.VerificationLoader.verificationPage(args),
  )

const VerificationPage = lazy(() =>
  import('./verification-page.ui').then((module) => ({
    default: module.VerificationPage,
  })),
)

const enhance = compose((component) =>
  withSuspense(component, { FallbackComponent: () => <GlobalLoading display={true} /> }),
)

export const verificationPageRoute: RouteObject = {
  path: pathKeys.accountVerification(),
  element: createElement(enhance(VerificationPage)),
  loader: verificationPageLoader,
}
