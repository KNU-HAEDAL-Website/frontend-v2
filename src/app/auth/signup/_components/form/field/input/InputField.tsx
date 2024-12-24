import { InputHTMLAttributes } from 'react'
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

export interface SignupInputFieldProps
  extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  formLabel: string
  placeholder?: string
  formDescription?: string
}

export const SignupInputField = ({
  name,
  formLabel,
  placeholder,
  formDescription,
  type = 'text',
}: SignupInputFieldProps) => {
  const form = useFormContext()

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
            </div>
          </FormControl>
          <FormDescription className="pl-2">{formDescription}</FormDescription>
          <FormMessage className="pl-2" />
        </FormItem>
      )}
    />
  )
}
