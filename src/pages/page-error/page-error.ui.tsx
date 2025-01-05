import { Link } from 'react-router-dom'
import styles from './page-404.module.css'
import { pathKeys } from '@/shared/lib/react-router'
import { Button } from '@/shared/ui/button'

export type PageErrorProps = {
  btn: {
    label: string
    onClick: () => void
  }
  title: string
  description: string
}
export function PageError({ title, description, btn }: PageErrorProps) {
  console.log('object :>> ');
  return (
    <div className="flex items-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="w-full space-y-6 text-center">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl animate-bounce">
            {title}
          </h1>
          <p className="text-gray-500">{description}</p>
        </div>
        <Button
          variant={'link'}
          className="inline-flex h-10 items-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          onClick={btn.onClick}
        >
          {btn.label}
        </Button>
      </div>
    </div>
  )
}
