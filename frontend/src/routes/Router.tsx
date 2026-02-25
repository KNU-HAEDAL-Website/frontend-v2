import { BrowserRouter, Route, Routes } from 'react-router'

import { ScrollToTop } from '@/components/feature'
import {
  ActivityBoardPage,
  ActivityPage,
  ActivityPostPage,
  AdminMemberPage,
  AdminSemesterPage,
  // CommingSoonPage,
  CreateActivityPostPage,
  CreateBoardPage,
  CreateNoticePostPage,
  EditActivityPostPage,
  EditBoardPage,
  EditNoticePostPage,
  FindAccountPage,
  LoginPage,
  MainPage,
  MemberPage,
  MyPage,
  NotFoundPage,
  NoticePage,
  NoticePostPage,
  RecruitPage,
  RedirectActivityPage,
  SignupPage,
} from '@/pages'

import {
  ActivityRoute,
  AdminActivityPostRoute,
  AdminBoardRoute,
  AdminNoticeRoute,
  AdminRoute,
  AuthRoute,
  MyPageRoute,
  SuspenseRoute,
} from './custom-route'
import { MainRoute } from './custom-route/main'

export const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/auth" element={<AuthRoute />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="find" element={<FindAccountPage />} />
        </Route>

        <Route path="/admin" element={<AdminRoute />}>
          <Route path="member" element={<AdminMemberPage />} />
          <Route path="semester" element={<AdminSemesterPage />} />
        </Route>

        <Route element={<MainRoute />}>
          <Route path="/activity" element={<ActivityRoute />}>
            <Route path=":semesterId" element={<RedirectActivityPage />} />
            <Route path=":semesterId/:activityId">
              <Route index element={<ActivityPage />} />
              <Route path="create-board" element={<CreateBoardPage />} />
              <Route path="boards/:boardId">
                <Route index element={<ActivityBoardPage />} />
                <Route element={<AdminBoardRoute />}>
                  <Route path="edit-board" element={<EditBoardPage />} />
                </Route>
                <Route path="posts/:postId">
                  <Route index element={<ActivityPostPage />} />
                  <Route element={<AdminActivityPostRoute />}>
                    <Route path="edit" element={<EditActivityPostPage />} />
                  </Route>
                </Route>
                <Route
                  path="create-post"
                  element={<CreateActivityPostPage />}
                />
              </Route>
            </Route>
          </Route>

          <Route path="/notice" element={<SuspenseRoute />}>
            <Route index element={<NoticePage />} />
            <Route path="posts/:postId" element={<NoticePostPage />} />
            <Route element={<AdminNoticeRoute />}>
              <Route
                path="posts/:postId/edit"
                element={<EditNoticePostPage />}
              />
              <Route path="create-post" element={<CreateNoticePostPage />} />
            </Route>
          </Route>

          <Route path="/mypage" element={<MyPageRoute />}>
            <Route index element={<MyPage />} />
          </Route>

          <Route path="member" element={<SuspenseRoute />}>
            <Route index element={<MemberPage />} />
          </Route>
        </Route>
        <Route path="/" element={<MainPage />} />
        <Route path="/recruit">
          {/* <Route index element={<CommingSoonPage />} /> */}
          <Route index element={<RecruitPage />} />
        </Route>
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
