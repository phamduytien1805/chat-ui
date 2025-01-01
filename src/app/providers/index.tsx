import { compose } from '@/shared/lib/react'
import { ErrorHandler, logError } from '@/shared/ui/error-handler'
import { withErrorBoundary } from 'react-error-boundary'
import { QueryClientProvider } from './QueryClientProvider'
import { BrowserRouter } from './RouterProvider'


const enhance = compose((component) =>
  withErrorBoundary(component, {
    FallbackComponent: ErrorHandler,
    onError: logError,
  }),
)

export const Provider = enhance(() => (
  <>
    <GlobalSpinner />
    <QueryClientProvider>
      <BrowserRouter />
    </QueryClientProvider>
  </>
))

function GlobalSpinner() {

  return (
   <></>
  )
}
