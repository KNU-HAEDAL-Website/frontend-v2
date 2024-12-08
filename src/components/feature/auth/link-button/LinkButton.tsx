import Link from 'next/link'

import { Button } from '@/components/ui'

type LinkButtonProps = {
  label: string
  linkTo: string
}

export const LinkButton = ({ label, linkTo }: LinkButtonProps) => {
  return (
    <div className="flex w-fit justify-center">
      <Button variant="link" className="font-normal">
        <Link href={linkTo} className="text-white">
          {label}
        </Link>
      </Button>
    </div>
  )
}
