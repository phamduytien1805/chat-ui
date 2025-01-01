import { compose } from '@/shared/lib/react'
import { ErrorHandler, logError } from '@/shared/ui/error-handler'
import { withErrorBoundary } from 'react-error-boundary'
import { QueryClientProvider } from './QueryClientProvider'
import { BrowserRouter } from './RouterProvider'
import { ThemeProvider } from './ThemeProvider'


const enhance = compose((component) =>
  withErrorBoundary(component, {
    FallbackComponent: ErrorHandler,
    onError: logError,
  }),
)

export const Provider = enhance(() => (
  <>
  <ThemeProvider defaultTheme='dark' storageKey='ui-theme'>
  <GlobalSpinner />
    <QueryClientProvider>
      <BrowserRouter />
    </QueryClientProvider>
  </ThemeProvider>
  </>
))

function GlobalSpinner() {

  return (
   <></>
  )
}
