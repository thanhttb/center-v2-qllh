import { Navigate, useRoutes } from 'react-router-dom';
// auth
import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
// layouts
import MainLayout from '../layouts/main';
import SimpleLayout from '../layouts/simple';
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';
// config
import { PATH_AFTER_LOGIN } from '../config';
//
import {
  // Auth
  LoginPage,
  GeneralDashboardPage,
  // Đào tạo
  ClassesPage,
  ClassPage,
  AttendancesPage,
  // Dashboard: User
  UserListPage,
  UserEditPage,
  UserCardsPage,
  UserCreatePage,
  UserProfilePage,
  UserAccountPage,
  // Dashboard: Ecommerce
  EcommerceShopPage,
  EcommerceCheckoutPage,
  EcommerceProductListPage,
  EcommerceProductEditPage,
  EcommerceProductCreatePage,
  EcommerceProductDetailsPage,
  // Dashboard: Invoice
  InvoiceListPage,
  InvoiceDetailsPage,
  InvoiceCreatePage,
  InvoiceEditPage,
  // Dashboard: Blog
  BlogPostsPage,
  BlogPostPage,
  BlogNewPostPage,
  // Dashboard: FileManager
  FileManagerPage,
  // Dashboard: App
  ChatPage,
  MailPage,
  CalendarPage,
  KanbanPage,
  //
  BlankPage,
  PermissionDeniedPage,
  //
  // Page500,
  // Page403,
  Page404,
  // HomePage,
  // FaqsPage,
  // AboutPage,
  // Contact,
  // PricingPage,
  // PaymentPage,
  // ComingSoonPage,
  // MaintenancePage,
  //
  StudentRegister,
  EntranceList,
  EntranceCompleted,
  EntranceDiscount,
  EntranceFee,
  FinancialFinaccount,
  FinancialMisa,
  FinancialPayment,
  FinancialReceipt,
  FinancialReportBook,
  FinancialReportCf,
  FinancialRevenue,
  FinancialTransaction,
  PersonnalRolePage,
  PersonnalUserPage,
  PersonnalTeacherPage,
  PersonnalBaseSalaryPage,
  SettingCenterPage,
  SettingRoomsPage,
  SettingCoursePage,
  SettingRelationshipPage,
  SettingStepPage,
  SettingStatusPage,
  QuestionsPage,
  TargetPage,
  EventsPage,
  EventPage,
  CoursesPage,
} from './elements';

// ----------------------------------------------------------------------
const date = new Date();
const dateNow = new Date(date.getFullYear(), date.getMonth()-1, date.getDate())
let timestamp = dateNow.getTime();
let toDate = new Date(date.getFullYear() -1, 0, 1).getTime();

export default function Router() {
  return useRoutes([
    {
      path: '/',
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        {
          path: 'login',
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
      ],
    },
    {
      path: '/',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),

      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        // Bảng điều khiển
        { path: 'dashboard', element: <GeneralDashboardPage /> },
        // Đào tạo
        {
          path: 'train',
          children: [
            { element: <Navigate to="/train/classes" replace />, index: true },
            { path: 'classes', element: <ClassesPage /> },
            { path: 'class/:id', element: <ClassPage /> },
            { path: 'attendance', element: <AttendancesPage /> },
            { path: 'cau-hoi', element: <QuestionsPage /> },
            { path: 'muc-tieu', element: <TargetPage /> },
            { path: 'events', element: <EventsPage /> },
            { path: 'event/:id', element: <EventPage /> },
            { path: 'khoa-hoc', element: <CoursesPage /> },
          ],
        },
        // Công tác học sinh
        {
          path: 'entrance',
          children: [
            { element: <Navigate to="/entrance/quick-create" replace />, index: true },
            { path: 'quick-create', element: <StudentRegister /> },
            { path: `list/2_3_4_1/0/${toDate}/${timestamp}`, element: <EntranceList /> },
            { path: 'completed', element: <EntranceCompleted /> },
            { path: 'discount', element: <EntranceDiscount /> },
            { path: 'fee', element: <EntranceFee /> },
          ],
        },
        // Kế toán
        {
          path: 'accountancy',
          children: [
            { element: <Navigate to="/accountancy/finacount" replace />, index: true },
            { path: 'finacount', element: <FinancialFinaccount /> },
            { path: 'transaction', element: <FinancialTransaction /> },
            { path: 'payment', element: <FinancialPayment /> },
            { path: 'receipt', element: <FinancialReceipt /> },
            {
              path: 'report',
              children: [
                { element: <Navigate to="/accountancy/report/cf" replace />, index: true },
                { path: 'cf', element: <FinancialReportCf /> },
                { path: 'book', element: <FinancialReportBook /> },
                { path: 'revenue', element: <FinancialRevenue /> },
              ],
            },
            { path: 'misa', element: <FinancialMisa /> },
          ],
        },
        // Tài khoản
        { path: 'account', element: <UserAccountPage /> },

        // Nhân sự
        {
          path: 'personal',
          children: [
            { element: <Navigate to="/personal/role" replace />, index: true },
            { path: 'role', element: <PersonnalRolePage /> },
            { path: 'user', element: <PersonnalUserPage /> },
            { path: 'teachers', element: <PersonnalTeacherPage /> },
            { path: 'base-salary', element: <PersonnalBaseSalaryPage /> },
          ],
        },

        // Cài đặt
        {
          path: 'settings',
          children: [
            { element: <Navigate to="/settings/centers" replace />, index: true },
            { path: 'centers', element: <SettingCenterPage /> },
            { path: 'rooms', element: <SettingRoomsPage /> },
            { path: 'courses', element: <SettingCoursePage /> },
            { path: 'relationship', element: <SettingRelationshipPage /> },
            { path: 'step', element: <SettingStepPage /> },
            { path: 'status', element: <SettingStatusPage /> },
          ]
        },
        {
          path: 'e-commerce',
          children: [
            { element: <Navigate to="/dashboard/e-commerce/shop" replace />, index: true },
            { path: 'shop', element: <EcommerceShopPage /> },
            { path: 'product/:name', element: <EcommerceProductDetailsPage /> },
            { path: 'list', element: <EcommerceProductListPage /> },
            { path: 'product/new', element: <EcommerceProductCreatePage /> },
            { path: 'product/:name/edit', element: <EcommerceProductEditPage /> },
            { path: 'checkout', element: <EcommerceCheckoutPage /> },
          ],
        },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/profile" replace />, index: true },
            { path: 'profile', element: <UserProfilePage /> },
            { path: 'cards', element: <UserCardsPage /> },
            { path: 'list', element: <UserListPage /> },
            { path: 'new', element: <UserCreatePage /> },
            { path: ':name/edit', element: <UserEditPage /> },
            { path: 'account', element: <UserAccountPage /> },
          ],
        },
        {
          path: 'invoice',
          children: [
            { element: <Navigate to="/dashboard/invoice/list" replace />, index: true },
            { path: 'list', element: <InvoiceListPage /> },
            { path: ':id', element: <InvoiceDetailsPage /> },
            { path: ':id/edit', element: <InvoiceEditPage /> },
            { path: 'new', element: <InvoiceCreatePage /> },
          ],
        },
        {
          path: 'blog',
          children: [
            { element: <Navigate to="/dashboard/blog/posts" replace />, index: true },
            { path: 'posts', element: <BlogPostsPage /> },
            { path: 'post/:title', element: <BlogPostPage /> },
            { path: 'new', element: <BlogNewPostPage /> },
          ],
        },
        { path: 'files-manager', element: <FileManagerPage /> },
        {
          path: 'mail',
          children: [
            { element: <Navigate to="/dashboard/mail/all" replace />, index: true },
            { path: 'label/:customLabel', element: <MailPage /> },
            { path: 'label/:customLabel/:mailId', element: <MailPage /> },
            { path: ':systemLabel', element: <MailPage /> },
            { path: ':systemLabel/:mailId', element: <MailPage /> },
          ],
        },
        {
          path: 'chat',
          children: [
            { element: <ChatPage />, index: true },
            { path: 'new', element: <ChatPage /> },
            { path: ':conversationKey', element: <ChatPage /> },
          ],
        },
        { path: 'calendar', element: <CalendarPage /> },
        { path: 'kanban', element: <KanbanPage /> },
        { path: 'permission-denied', element: <PermissionDeniedPage /> },
        { path: 'blank', element: <BlankPage /> },
        { path: '*', element: <Navigate to="/404" replace /> },
        { path: '404', element: <Page404 /> },
      ],
      
    },
  ]);
}
