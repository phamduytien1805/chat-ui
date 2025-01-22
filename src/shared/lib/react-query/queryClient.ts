import { AxiosValidationError } from '@/shared/axios'
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 3,
      throwOnError: (error) => {
        if (error.code === AxiosValidationError.ERR_BAD_VALIDATION) {
          return true
        }
        return false
      },
    },
    mutations: {
      throwOnError: (error) => {
        if (error.code === AxiosValidationError.ERR_BAD_VALIDATION) {
          return true
        }
        return false
      },
    },
  },
})
