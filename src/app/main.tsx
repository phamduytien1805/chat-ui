import axios, { HttpStatusCode } from 'axios'
import ReactDOM from 'react-dom/client'
import { Provider } from './providers'
import './index.css'
import { api, handleGenericError } from '@/shared/api'
import { useSession } from '@/shared/session'
import { TokenServiceInstance } from '@/shared/api/token/token.service'

window.addEventListener('error', (event) => {
  if (axios.isAxiosError(event.error)) {
    event.preventDefault()
  }
})

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
    if(error.response?.status === HttpStatusCode.Unauthorized && error.config) {
      return TokenServiceInstance.retry(error.config)
    }
    
    return Promise.reject(handleGenericError(error))
  },
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider />,
)
