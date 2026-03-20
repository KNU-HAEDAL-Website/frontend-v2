import { Admin, BasePosition } from '@/types'

export type Position2026 =
  | BasePosition
  | '트랙조직위원장'
  | '홍보부장'
  | '기술관리부장'

export const ADMIN_2026: Admin<Position2026>[] = [
  {
    position: '회장',
    userId: 'pigmal1',
  },
  {
    position: '부회장',
    userId: 'antilog01',
  },
  {
    position: '총무',
    userId: 'g1new25',
  },
  {
    position: '교육운영진장',
    userId: 'edmondsu235',
  },
  {
    position: '트랙조직위원장',
    userId: 'haetae050501',
  },
  {
    position: '홍보부장',
    userId: 'chaemin0601',
  },
  {
    position: '기술관리부장',
    userId: 'juyoung0620',
  },
] as const
