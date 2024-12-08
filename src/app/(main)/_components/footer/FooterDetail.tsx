type FooterDetailData = {
  id: number
  label: string
  content: string
}

export const FooterDetail = () => {
  return (
    <div className="flex flex-col justify-end gap-6 text-sm sm:flex-row sm:gap-10">
      {footerDetailData.map((detail) => (
        <div key={detail.id} className="flex flex-col gap-2">
          <div className="font-semibold">{detail.label}</div>
          <div>{detail.content}</div>
        </div>
      ))}
    </div>
  )
}

const footerDetailData: FooterDetailData[] = [
  {
    id: 0,
    label: 'Location',
    content: '대구광역시 북구 대학로 80 경북대학교 IT 대학 1호관 108A',
  },
  {
    id: 1,
    label: 'Made by',
    content: 'dkwls0234@gmail.com',
  },
  {
    id: 2,
    label: 'Contact to',
    content: 'tfer2442@gmail.com',
  },
]
