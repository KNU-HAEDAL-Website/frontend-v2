import { CrossCircledIcon } from '@radix-ui/react-icons'

interface LoginErrorMessageProps {
  message: string
}

export const LoginErrorMessage = ({ message }: LoginErrorMessageProps) => {
  if (!message) return null

  return (
    <div className="flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-600">
      <CrossCircledIcon />
      <p>{message}</p>
    </div>
  )
}
