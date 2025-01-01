import * as React from 'react'

import { cn } from '@/shared/lib/utils'
import { Label } from './label'

const RawInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})

export type BaseInput = {
  error?: string
  label?: string
}

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'> & BaseInput
>(({ className, type, error, label,required, ...props }, ref) => {
  return (
    <div className="grid gap-2">
      <div className="flex flex-center align-center">
        <Label
          htmlFor={label}
          className={cn({
            'text-red-500': error,
          })}
        >
          {label}
          {error ? (
            <span className="text-xs italic">
              {' - '}
              {error}
            </span>
          ) : (
            required && (
              <span className="leading-none text-red-500"> *</span>
            )
          )}
        </Label>
      </div>
      <RawInput
        type={type}
        className={className}
        {...props}
        ref={ref}
      />
    </div>
  )
})

Input.displayName = 'Input'

export { Input }
