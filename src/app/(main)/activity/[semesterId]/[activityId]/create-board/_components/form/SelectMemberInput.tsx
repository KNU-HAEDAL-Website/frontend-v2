'use client'

import { Dispatch, SetStateAction } from 'react'

import { useQuery } from '@tanstack/react-query'

import { Skeleton } from '@/components/ui'
import { UserQuries } from '@/service/api'
import { UserResponseDto } from '@/service/models'

import { MultipleMemberSelect } from './MultipleMemberSelect'

type SelectMemberInputProps = {
  selectedMember: UserResponseDto[]
  setSelectedMember: Dispatch<SetStateAction<UserResponseDto[]>>
}

export const SelectMemberInput = ({
  selectedMember,
  setSelectedMember,
}: SelectMemberInputProps) => {
  const { data: users, status, error } = useQuery(UserQuries.list())

  if (status === 'pending')
    return <Skeleton className="h-8 w-full bg-slate-50" />

  if (!users) return <div>유저가 없습니다.</div>

  if (error) return <div>{error.message}</div>

  return (
    <MultipleMemberSelect
      options={users}
      onChange={(members) => setSelectedMember(members)}
      value={selectedMember}
    />
  )
}
