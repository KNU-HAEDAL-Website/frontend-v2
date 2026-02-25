import { ChevronRightCircle } from 'lucide-react'

import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'

interface RecruitLinkButtonProps {
  className?: string
}

export const RecruitLinkButton = ({ className }: RecruitLinkButtonProps) => {
  const handleClick = () => {
    window.location.href = 'https://forms.gle/wGXzya4Xs5FtBtsa6'
  }

  return (
    <Button
      className={cn(
        'gap-4 rounded-xl bg-[#E2E2E2] px-8 py-6 text-black hover:bg-gray-300',
        className,
      )}
      onClick={handleClick}
    >
      <div className="flex items-center text-blue-600">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L14.8858 9.11416L22 12L14.8858 14.8858L12 22L9.11416 14.8858L2 12L9.11416 9.11416L12 2Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <div className="text-lg font-bold">신청 폼 바로가기</div>
      <ChevronRightCircle className="h-6 w-6 stroke-[1.5]" />
    </Button>
  )
}
