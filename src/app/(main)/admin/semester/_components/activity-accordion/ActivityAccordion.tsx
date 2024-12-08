'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui'
import { Semester } from '@/types/activity'

import { ActivityList } from './ActivityList'
import { AddActivityForm } from './AddForm'

interface ActivityAccordionProps {
  semesters: Semester[]
}

export const ActivityAccordion = ({ semesters }: ActivityAccordionProps) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {semesters.map((semester) => (
        <AccordionItem value={semester.semesterName} key={semester.semesterId}>
          <AccordionTrigger className="text-md font-semibold">
            {semester.semesterName}
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-4 px-4">
              <AddActivityForm semesterId={semester.semesterId} />
              <ActivityList semester={semester} />
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
