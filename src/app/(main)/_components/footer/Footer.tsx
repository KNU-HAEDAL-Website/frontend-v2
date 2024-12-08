import { FooterDetail } from './FooterDetail'
import { LinkIcon } from './LinkIcon'

export const Footer = () => {
  return (
    <div className="flex w-full flex-col gap-16 px-12 py-8">
      <div className="flex justify-end gap-4">
        <div className="font-medium">KNU HAEDAL</div>
        <LinkIcon />
      </div>
      <FooterDetail />
    </div>
  )
}
