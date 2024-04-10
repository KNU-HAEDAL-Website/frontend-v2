'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { login } from '@/actions/login'
import { LoginSchema } from '@/schema'
import { FormError } from '@/components/form-error'
import { Button } from '@/components/ui/button'
import { Form, FormField } from '@/components/ui/form'

import { FormInput } from '../../_components/form-input'

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError('')

    startTransition(() => {
      login(values).then((data) => {
        setError(data.error)
      })
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormInput
                inputLabel="아이디"
                placehoder="hobanu"
                isPending={isPending}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormInput
                inputLabel="비밀번호"
                placehoder="********"
                isPending={isPending}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>
        <div className="space-y-2">
          {error && <FormError message={error} />}
          <Button type="submit" className="w-full" disabled={isPending}>
            로그인하기
          </Button>
        </div>
      </form>
    </Form>
  )
}
