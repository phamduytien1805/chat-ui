import { cn } from '@/shared/lib/utils'
import { TextLoadingEffect } from '../textg-loading-effect'

export type GlobalLoadingProps = {
    display?: boolean
}
export const GlobalLoading = ({display}: GlobalLoadingProps) => {
  return (
    <div className={cn("h-[100vh] w-full mx-auto p-4 md:p-8 fixed top-0 z-50 bg-background",{
        hidden: !display
    })}>
      <TextLoadingEffect text="Whisper" />
    </div>
  )
}
