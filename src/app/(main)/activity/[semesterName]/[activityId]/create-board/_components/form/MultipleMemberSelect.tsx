'use client'

import { useState } from 'react'

import { Cross2Icon } from '@radix-ui/react-icons'
import { Command as CommandPrimitive } from 'cmdk'

import {
  Badge,
  Button,
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui'
import { User } from '@/types/user'

type MultipleMemberSelectProps = {
  options: User[]
  value: User[]
  onChange: (value: User[]) => void
}

export const MultipleMemberSelect = ({
  options,
  value,
  onChange,
}: MultipleMemberSelectProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const selectMember = (member: User) => {
    if (value.includes(member)) {
      onChange(value.filter((m) => m.userId !== member.userId))
    } else {
      onChange([...value, member])
    }
  }

  return (
    <Command>
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:border-primary">
        <div className="flex flex-wrap gap-1">
          {value.map((member) => (
            <Badge
              key={member.userId}
              variant="secondary"
              onClick={(e) => {
                e.stopPropagation()
                selectMember(member)
              }}
              className="flex w-fit gap-1 rounded-full"
            >
              <div>{member.userName}</div>
              <Button variant="ghost" className="h-fit px-0 py-1">
                <Cross2Icon />
              </Button>
            </Badge>
          ))}
          <CommandPrimitive.Input
            onBlur={() => setIsOpen(false)}
            onClick={() => setIsOpen((prev) => !prev)}
            placeholder="게시판 이용자를 입력해주세요."
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <CommandList>
        {isOpen && (
          <CommandGroup className="top-0 z-10 mt-2 h-full w-full overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            {options.map((member) => (
              <CommandItem
                key={member.studentNumber}
                onMouseDown={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
                onSelect={() => {
                  selectMember(member)
                }}
              >
                {member.studentNumber} {member.userName}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  )
}
