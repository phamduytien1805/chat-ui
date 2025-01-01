import { motion } from 'framer-motion'
import { Button } from '../button'
import { ChevronLeft } from 'lucide-react'
export function AuthFormWrapper({
  children,
  title,
  description,
  onGoBack,
}: {
  children: React.ReactNode
  title: string
  description: string
  onGoBack?: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
      }}
      className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black text-card-foreground"
    >
      {onGoBack && (
        <Button
          variant="link"
          size="sm"
          className="mb-2 p-0 gap-1"
          onClick={onGoBack}
        >
          <ChevronLeft />
          Go back
        </Button>
      )}
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        {title}
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        {description}
      </p>
      {children}
    </motion.div>
  )
}
