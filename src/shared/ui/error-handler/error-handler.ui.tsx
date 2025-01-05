import { HttpStatusCode, isAxiosError } from 'axios'
import { Button } from '../button'
import { Navigate } from 'react-router-dom'
import { pathKeys } from '@/shared/lib/react-router'

type ErrorHandlerProps = {
  error: Error
  resetErrorBoundary?: (...args: any[]) => void
}

const isDevelopment = import.meta.env.DEV

export function ErrorHandler(props: ErrorHandlerProps) {
  const { error, resetErrorBoundary } = props
  // console.log('error :>> ', error);
  // if(isAxiosError(error) && error.status === HttpStatusCode.Unauthorized) {
  //   return <Navigate to={pathKeys.error.page401()} />
  // }

  return (
    <div>
      <h3>Something went wrong.</h3>
      {isDevelopment && (
        <>
          <ul className="error-messages">
            <li key={error.message}>{error.message}</li>
          </ul>
          <pre>{error.stack}</pre>
        </>
      )}
      <Button
        type="button"
        onClick={resetErrorBoundary}
      >
        Try again
      </Button>
    </div>
  )
}
