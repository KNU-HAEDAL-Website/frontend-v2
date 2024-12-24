'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'

import { Button, Input, Label } from '@/components/ui'
import { API_ERROR_MESSAGES } from '@/constant/errorMessage'
import { queryClient } from '@/lib/query-client'
import { Login, LoginSchema } from '@/schema/auth'
import { UserQuries, loginApi } from '@/service/api'
import { useAuthStore } from '@/store/auth'
import { useMyInfoStore } from '@/store/myInfo'

import { LoginErrorMessage } from './ErrorMessageBox'

export const LoginForm = () => {
  const { mutate: login, isPending } = useMutation({
    mutationFn: loginApi,
    onSuccess: (accessToken) => {
      onSuccessLogin(accessToken)
    },
    onError: (error) => {
      onErrorLogin(error)
    },
  })

  const setAccessToken = useAuthStore((state) => state.setAccessToken)
  const setMyInfo = useMyInfoStore((state) => state.setMyInfo)

  const form = useForm<Login>({
    resolver: zodResolver(LoginSchema),
    mode: 'onSubmit',
    defaultValues: {
      userId: '',
      password: '',
    },
  })

  const router = useRouter()
  const [message, setMessage] = useState('')

  const onSubmit = form.handleSubmit(
    (values) => {
      login({ data: values })
      setMessage('')
    },
    (errors) => {
      const errorMessage =
        Object.values(errors).flatMap((error) => error.message)[0] || ''
      setMessage(errorMessage)
    },
  )

  const onSuccessLogin = async (accessToken: string) => {
    setAccessToken(accessToken)

    try {
      const myInfo = await queryClient.fetchQuery(
        UserQuries.detail({ userId: form.getValues('userId') }),
      )

      if (myInfo) {
        setMyInfo({ userName: myInfo.userName, role: myInfo.role })
        router.push('/')
        form.reset(form.getValues())
      }
    } catch (error) {
      setMessage(API_ERROR_MESSAGES.UNKNOWN_ERROR)
    }
  }

  const onErrorLogin = (error: Error) => {
    if (error instanceof AxiosError) {
      const res = error.response

      if (res?.status === 400 || res?.status === 401) {
        setMessage(res.data.message)
        return
      }
    }

    setMessage(API_ERROR_MESSAGES.UNKNOWN_ERROR)
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="userId">아이디</Label>
        <Input {...form.register('userId')} name="userId" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">비밀번호</Label>
        <Input {...form.register('password')} name="password" type="password" />
        <Button className="mt-8" disabled={isPending} type="submit">
          로그인하기
        </Button>
      </div>
      <LoginErrorMessage message={message} />
    </form>
  )
}
