import { compose } from '@/shared/lib/react'
import { ErrorHandler, logError } from '@/shared/ui/error-handler'
import { withErrorBoundary } from 'react-error-boundary'
import { QueryClientProvider } from './QueryClientProvider'
import { BrowserRouter } from './RouterProvider'
import { ThemeProvider } from './ThemeProvider'
import { TextLoadingEffect } from '@/shared/ui/textg-loading-effect'
import { useAtom, useAtomValue } from 'jotai'
import { GlobalLoading, globalLoadingState } from '@/shared/ui/global-loading'

const enhance = compose((component) =>
  withErrorBoundary(component, {
    FallbackComponent: ErrorHandler,
    onError: logError,
  }),
)

export const Provider = enhance(() => (
  <>
    <ThemeProvider
      defaultTheme="dark"
      storageKey="ui-theme"
    >
      <GlobalSpinner />
      <QueryClientProvider>
        <BrowserRouter />
      </QueryClientProvider>
    </ThemeProvider>
  </>
))

function GlobalSpinner() {
  const numOfRequestDisplay = useAtomValue(globalLoadingState)
  return (
    <>
      <GlobalLoading display={numOfRequestDisplay > 0} />
    </>
  )
}
