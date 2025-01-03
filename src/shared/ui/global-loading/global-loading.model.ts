import { store } from '@/app/providers/StoreProvider'
import { atom } from 'jotai'

export const globalLoadingState = atom(0)

export const useGlobalLoading = () => {
  return {
    get: () => store.get(globalLoadingState),
    increment: () => store.set(globalLoadingState, (prev) => prev + 1),
    decrement: () => store.set(globalLoadingState, (prev) => prev - 1),
  }
}
