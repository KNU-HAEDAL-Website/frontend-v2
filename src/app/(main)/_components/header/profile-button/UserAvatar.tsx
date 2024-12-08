import { PersonIcon } from '@radix-ui/react-icons'
import { type VariantProps, cva } from 'class-variance-authority'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui'

const UserAvatarVariants = cva('', {
  variants: {
    size: {
      sm: 'h-9 w-9',
      lg: 'h-24 w-24',
    },
    icon: {
      sm: 'h-7 w-7',
      lg: 'h-16 w-16',
    },
  },
})

interface UserAvatarProps extends VariantProps<typeof UserAvatarVariants> {
  userImage?: string
}

export const UserAvatar = ({ size = 'sm', userImage }: UserAvatarProps) => {
  const icon = size
  return (
    <Avatar className={UserAvatarVariants({ size })}>
      <AvatarImage src={userImage} />
      <AvatarFallback className="text-primary">
        <PersonIcon className={UserAvatarVariants({ icon })} />
      </AvatarFallback>
    </Avatar>
  )
}
