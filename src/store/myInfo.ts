import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { Role } from '@/types/user'

export type MyInfo = {
  userName: string
  role?: Role
}

interface MyInfoProps {
  myInfo: MyInfo
  setMyInfo: (myInfo: MyInfo) => void
  clearMyInfo: () => void
  getMyInfo: () => MyInfo
}

export const useMyInfoStore = create(
  persist<MyInfoProps>(
    (set, get) => ({
      myInfo: { userName: '', role: undefined },
      setMyInfo: (myInfo) => set({ myInfo }),
      clearMyInfo: () => set({ myInfo: { userName: '', role: undefined } }),
      getMyInfo: () => get().myInfo,
    }),
    {
      name: 'my-info',
    },
  ),
)
