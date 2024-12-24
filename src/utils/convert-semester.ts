import { SemesterResponseDto } from '@/service/models'
import { Semester } from '@/types/activity'

export default function convertSemesterFormat(
  semesters: SemesterResponseDto[],
): Semester[] {
  return semesters.map((semester, index) => {
    const year = semester.semesterName?.slice(0, 4)
    const term = semester.semesterName?.slice(4)

    if (semester.semesterId === undefined) {
      throw new Error('semesterId는 undefined일 수 없습니다.')
    }

    return {
      index,
      semesterId: semester.semesterId,
      semesterName: `${year}-${term}`,
    }
  })
}
