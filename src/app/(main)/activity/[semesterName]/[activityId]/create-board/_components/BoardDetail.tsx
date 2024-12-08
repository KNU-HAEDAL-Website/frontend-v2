import { NameLabel } from '@/components/feature'
import { Label } from '@/components/ui'

type CreateBoardDetailProps = {
  semesterName: string
  activityName: string
  userName: string
}

export const CreateBoardDetail = ({
  semesterName,
  activityName,
  userName,
}: CreateBoardDetailProps) => {
  const detailData = [
    { index: 0, label: '학기', name: semesterName },
    { index: 1, label: '활동명', name: activityName },
    { index: 2, label: '생성자', name: userName },
  ]

  return (
    <div className="flex justify-evenly py-6">
      {detailData.map((detail) => (
        <div key={detail.index} className="flex items-center gap-2">
          <Label className="text-md">{detail.label}</Label>
          <NameLabel name={detail.name} />
        </div>
      ))}
    </div>
  )
}
