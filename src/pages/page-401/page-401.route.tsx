import { compose, withSuspense } from '@/shared/lib/react'
import { pathKeys } from '@/shared/lib/react-router'
import { createElement, lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const Page404 = lazy(() =>
  import('./page-401.ui').then((module) => ({
    default: module.Page404,
  })),
)

const enhance = compose((component) =>
  withSuspense(component, {
    fallback: (
    <></>
    ),
  }),
)

export const page404Route: RouteObject = {
  path: pathKeys.page404(),
  element: createElement(enhance(Page404)),
}
