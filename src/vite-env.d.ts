/// <reference types="vite/client" />

import '@tanstack/react-query'
import { AxiosError } from 'axios'

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError
  }
}
