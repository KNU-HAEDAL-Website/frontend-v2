import { ReactNode } from 'react'
import { ControllerRenderProps, useFormContext } from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Label,
} from '@/components/ui'

type PostFormFieldProps = {
  name: string
  label: string
  children: (field: ControllerRenderProps) => ReactNode
}

export const PostFormField = ({
  name,
  label,
  children,
}: PostFormFieldProps) => {
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <div className="flex flex-col md:flex-row md:items-center">
            <Label className="text-md w-40">{label}</Label>
            <FormControl>{children(field)}</FormControl>
          </div>
          <div className="flex justify-end">
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  )
}
