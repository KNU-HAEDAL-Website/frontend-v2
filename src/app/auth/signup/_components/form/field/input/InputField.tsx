import { InputHTMLAttributes, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui'
import { cn } from '@/lib/utils'
import { CheckRespose } from '@/service/server/auth/signup'

import { CheckStudentNumberButton, CheckUserIdButton } from './check-button'

interface SignupInputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  formLabel: string
  placeholder?: string
  formDescription?: string
  doubleCheck?: 'userId' | 'studentNumber'
}

export const SignupInputField = ({
  name,
  formLabel,
  placeholder,
  formDescription,
  type = 'text',
  doubleCheck,
}: SignupInputFieldProps) => {
  const form = useFormContext()
  const fieldValue = form.watch(name)
  const [checkResult, setCheckResult] = useState<CheckRespose>()

  useEffect(() => {
    setCheckResult({ success: false, message: '' })
  }, [fieldValue])

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{formLabel}</FormLabel>
          <FormControl>
            <div className="flex gap-2">
              <Input
                type={type}
                value={field.value}
                onChange={field.onChange}
                placeholder={placeholder}
              />
              {doubleCheck === 'userId' && (
                <CheckUserIdButton
                  value={field.value}
                  setCheckResult={setCheckResult}
                />
              )}
              {doubleCheck === 'studentNumber' && (
                <CheckStudentNumberButton
                  value={field.value}
                  setCheckResult={setCheckResult}
                />
              )}
            </div>
          </FormControl>
          <FormDescription className="pl-2">{formDescription}</FormDescription>
          <FormMessage className="pl-2" />
          {checkResult && (
            <p
              className={cn(
                checkResult.success ? 'text-blue-600' : 'text-red-600',
                'text-sm',
              )}
            >
              {checkResult.message}
            </p>
          )}
        </FormItem>
      )}
    />
  )
}
