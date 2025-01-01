import { loginPageRoute } from '@/pages/login'
import { page404Route } from '@/pages/page-404'
import { compose, withSuspense } from '@/shared/lib/react'
import { pathKeys } from '@/shared/lib/react-router'
import { createElement, lazy } from 'react'
import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  redirect,
  useRouteError,
} from 'react-router-dom'


export function BrowserRouter() {
  return <RouterProvider router={browserRouter} />
}

const enhance = compose((component) =>
  withSuspense(component, { FallbackComponent: LayoutSkeleton }),
)

const AuthLayout = lazy(() =>
  import('@/pages/layouts').then((module) => ({
    default: module.AuthLayout,
  })),
)


const browserRouter = createBrowserRouter([
  {
    errorElement: <BubbleError />,
    children: [
      {
        element: createElement(enhance(AuthLayout)),
        children: [loginPageRoute]
      },
      {
        element: createElement(Outlet),
        children: [page404Route],
      },
      {
        loader: async () => redirect(pathKeys.page404()),
        path: '*',
      },
    ],
  },
])

// https://github.com/remix-run/react-router/discussions/10166
function BubbleError() {
  const error = useRouteError()

  if (error) throw error
  return null
}

function LayoutSkeleton() {
  return (
    <></>
  )
}