import { verificationPageRoute } from '@/pages/account-verification'
import { dashboardPageRoute } from '@/pages/dashboard'
import { loginPageRoute } from '@/pages/login'
import { pageErrorRoute } from '@/pages/page-error'
import { registerPageRoute } from '@/pages/register'
import { compose, withSuspense } from '@/shared/lib/react'
import { pathKeys } from '@/shared/lib/react-router'
import { useSession } from '@/shared/session'
import { createElement, lazy } from 'react'
import {
  LoaderFunctionArgs,
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


const WorkspaceLayout = lazy(() =>
  import('@/pages/layouts').then((module) => ({
    default: module.WorkspaceLayout,
  })),
)

const browserRouter = createBrowserRouter([
  {
    errorElement: <BubbleError />,
    children: [
      {
        element: createElement(enhance(AuthLayout)),
        children: [loginPageRoute,registerPageRoute]
      },
      {
        element: createElement(enhance(WorkspaceLayout)),
        children: [dashboardPageRoute],
      },
      {
        element: createElement(Outlet),
        children: [pageErrorRoute,verificationPageRoute],
      },
      {
        loader: async () => redirect(pathKeys.error.page404()),
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
    <>hehehhe</>
  )
}
