import { CrossCircledIcon } from '@radix-ui/react-icons'

type LoginProps = {
  result: {
    data?: {
      message?: string
      status?: number
      token?: string
    }
    serverError?: string
    validationErrors?: Record<string, string[] | undefined> | undefined
  }
}

export const LoginErrorMessage = ({ result }: LoginProps) => {
  const { serverError, validationErrors, data } = result

  const validationError =
    (validationErrors &&
      Object.values(validationErrors).flatMap((error) => error)[0]) ||
    ''

  if (serverError) {
    return <ErrorMessageBox message={serverError} />
  }

  if (validationError) {
    return <ErrorMessageBox message={validationError} />
  }

  if (data?.message) {
    return <ErrorMessageBox message={data.message} />
  }
}

const ErrorMessageBox = ({ message }: { message: string }) => {
  if (!message) return null

  return (
    <div className="flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-600">
      <CrossCircledIcon />
      <p>{message}</p>
    </div>
  )
}
