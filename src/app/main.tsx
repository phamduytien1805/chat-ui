import axios, { HttpStatusCode } from 'axios'
import ReactDOM from 'react-dom/client'
import { Provider } from './providers'
import './index.css'
import { api, handleGenericError } from '@/shared/api'
import { useSession } from '@/shared/session'
import { TokenServiceInstance } from '@/shared/api/token/token.service'
import { useEffect } from 'react'
import { pathKeys } from '@/shared/lib/react-router'
import { browserRouter } from './providers/RouterProvider'

window.addEventListener('error', (event) => {
  if (axios.isAxiosError(event.error)) {
    event.preventDefault()
  }
})

const App = () => {
  useEffect(() => {
    api.interceptors.request.use(
      (config) => {
        const session = useSession().getSession()
        if (session) {
          config.headers.Authorization = `Bearer ${session.accessToken}`
        }
        return config
      },
      (error) => Promise.reject(error),
    )

    api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (!axios.isAxiosError(error)) {
          return Promise.reject(error)
        }
        if (
          error.response?.status === HttpStatusCode.Unauthorized &&
          error.config
        ) {
          return TokenServiceInstance.retry(error.config).catch((error) =>{
            console.log('Error refreshing token', error)
            return browserRouter.navigate(pathKeys.error.page401())
          })
        }

        return Promise.reject(handleGenericError(error))
      },
    )
  }, [])
  return <Provider />
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />,
)
