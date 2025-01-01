import { createElement, lazy } from 'react'
import { LoaderFunctionArgs, RouteObject } from 'react-router-dom'

import { compose, withSuspense } from '@/shared/lib/react'
import { pathKeys } from '@/shared/lib/react-router'
import { DashboardLoader } from './dashboard-page.model'

const dashboardPageLoader = (args: LoaderFunctionArgs) =>
  import('./dashboard-page.model').then((module) =>
    module.DashboardLoader.dashboardPage(args),
  )

const DashboardPage = lazy(() =>
  import('./dashboard-page.ui').then((module) => ({
    default: module.DashboardPage,
  })),
)

const enhance = compose((component) =>
  withSuspense(component, { FallbackComponent: () => <></> }),
)

export const dashboardPageRoute: RouteObject = {
  path: pathKeys.home(),
  element: createElement(enhance(DashboardPage)),
  loader: dashboardPageLoader,
}
