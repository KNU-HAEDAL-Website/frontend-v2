import { Label, RadioGroup, RadioGroupItem } from '@/components/ui'
import { cn } from '@/lib/utils'
import { Role } from '@/types/user'

type RoleRadioGroupProps = {
  onChange: (value: Role) => void
  disabledRole: Role
}

const ROLES: Role[] = ['ROLE_ADMIN', 'ROLE_TEAM_LEADER', 'ROLE_MEMBER']

export const RoleRadioGroup = ({
  onChange,
  disabledRole,
}: RoleRadioGroupProps) => {
  return (
    <RadioGroup onValueChange={onChange} className="flex flex-col gap-4">
      {ROLES.map((role) => {
        return (
          <div key={role} className="flex items-center space-x-2">
            <RadioGroupItem value={role} disabled={role === disabledRole} />
            <Label className={cn(role === disabledRole && 'text-primary/50')}>
              {role}
            </Label>
          </div>
        )
      })}
    </RadioGroup>
  )
}
