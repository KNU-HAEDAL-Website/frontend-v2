import { SectionWithTitle } from '@/components/feature'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'

import {
  ApproveMemberTable,
  ChangeRoleTable,
  ExpelMemberTable,
} from './_components'

const AdminMemberPage = () => {
  return (
    <div className="flex w-full flex-col items-center">
      <SectionWithTitle title="멤버 관리">
        <Tabs
          defaultValue="change-role"
          className="flex w-full flex-col items-center"
        >
          <TabsList className="flex w-fit gap-4">
            <TabsTrigger value="change-role">권한 변경</TabsTrigger>
            <TabsTrigger value="approve-member">멤버 승인</TabsTrigger>
            <TabsTrigger value="expel-member">내보내기</TabsTrigger>
          </TabsList>
          <TabsContent
            value="change-role"
            className="flex w-full justify-center pt-4"
          >
            <ChangeRoleTable />
          </TabsContent>
          <TabsContent
            value="approve-member"
            className="flex w-full justify-center"
          >
            <ApproveMemberTable />
          </TabsContent>
          <TabsContent
            value="expel-member"
            className="flex w-full justify-center"
          >
            <ExpelMemberTable />
          </TabsContent>
        </Tabs>
      </SectionWithTitle>
    </div>
  )
}

export default AdminMemberPage
