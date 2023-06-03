// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/label';
import Iconify from '../../../components/iconify';
import SvgColor from '../../../components/svg-color';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: icon('ic_blog'),
  cart: icon('ic_cart'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: '',
    items: [
      { title: 'Bảng điều khiển', path: PATH_DASHBOARD.general.dashboard, icon: <DashboardIcon /> },
      // Đào tạo
      {
        title: 'Đào tạo',
        path: PATH_DASHBOARD.classes.root,
        icon: <LocalLibraryIcon />,
        children: [
          { title: 'Lớp học', path: PATH_DASHBOARD.classes.root },
          { title: 'Điểm danh', path: PATH_DASHBOARD.classes.attendance },
          { title: 'Kho bài tập', path: PATH_DASHBOARD.classes.cauHoi },
          { title: 'Mục tiêu KS', path: PATH_DASHBOARD.classes.mucTieu },
          { title: 'Thi thử', path: PATH_DASHBOARD.classes.events },
          { title: 'Khóa học', path: PATH_DASHBOARD.classes.khoaHoc },
        ],
      },
      // Công tác học sinh
      {
        title: 'Công tác học sinh',
        path: PATH_DASHBOARD.entrance.root,
        icon: <AccountBoxIcon />,
        children: [
          { title: 'Đăng ký ghi danh', path: PATH_DASHBOARD.entrance.root },
          {
            title: 'Danh sách',
            path: PATH_DASHBOARD.entrance.list,
            children: [
              {
                title: 'DS ghi danh',
                path: PATH_DASHBOARD.entrance.list,
              },
              {
                title: 'DS hoàn thành',
                path: PATH_DASHBOARD.entrance.completed,
              },
            ],
          },
          { title: 'Ưu đãi', path: PATH_DASHBOARD.entrance.discount },
          { title: 'Học phí', path: PATH_DASHBOARD.entrance.fee },
        ],
      },

      // Kế toán
      {
        title: 'Kế toán',
        path: PATH_DASHBOARD.financial.finacount,
        icon: <AccountBalanceIcon />,
        children: [
          { title: 'Tài khoản', path: PATH_DASHBOARD.financial.finacount },
          { title: 'Giao dịch', path: PATH_DASHBOARD.financial.transaction },
          { title: 'Phiếu chi', path: PATH_DASHBOARD.financial.payment },
          { title: 'Phiếu thu', path: PATH_DASHBOARD.financial.receipt },
          {
            title: 'Báo cáo',
            path: PATH_DASHBOARD.financial.cf,
            children: [
              {
                title: 'Báo cáo dòng tiền',
                path: PATH_DASHBOARD.financial.cf,
              },
              {
                title: 'Sổ quỹ tiền mặt',
                path: PATH_DASHBOARD.financial.book,
              },
              {
                title: 'Lương giáo viên',
                path: PATH_DASHBOARD.financial.revenue,
              },
            ],
          },
          { title: 'Kết xuất dữ liệu', path: PATH_DASHBOARD.financial.misa },
        ],
      },
      {
        title: 'Tài khoản',
        path: PATH_DASHBOARD.account,
        icon: ICONS.user,
      },
      {
        title: 'Nhân sự',
        path: PATH_DASHBOARD.settings.role,
        icon: <PeopleIcon />,
        children: [
          { title: 'Chức vụ', path: PATH_DASHBOARD.settings.role },
          { title: 'Người dùng', path: PATH_DASHBOARD.settings.user },
          { title: 'Giáo viên', path: PATH_DASHBOARD.teachers },
          { title: 'Lương tối thiểu', path: PATH_DASHBOARD.base_salary },
        ],
      },
      {
        title: 'Cài đặt',
        path: PATH_DASHBOARD.centers,
        icon: <SettingsIcon />,
        children: [
          { title: 'Cơ sở', path: PATH_DASHBOARD.centers },
          { title: 'Phòng học', path: PATH_DASHBOARD.rooms },
          { title: 'Khóa học', path: PATH_DASHBOARD.courses },
          { title: 'Cấu hình quan hệ', path: PATH_DASHBOARD.settings.relationship },
          { title: 'Cấu hình quy trình', path: PATH_DASHBOARD.settings.step },
          { title: 'Cấu hình trạng thái', path: PATH_DASHBOARD.settings.status },
        ],
      },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'management',
  //   items: [
  //     // USER
  //     {
  //       title: 'user',
  //       path: PATH_DASHBOARD.user.root,
  //       icon: ICONS.user,
  //       children: [
  //         { title: 'profile', path: PATH_DASHBOARD.user.profile },
  //         { title: 'cards', path: PATH_DASHBOARD.user.cards },
  //         { title: 'list', path: PATH_DASHBOARD.user.list },
  //         { title: 'create', path: PATH_DASHBOARD.user.new },
  //         { title: 'edit', path: PATH_DASHBOARD.user.demoEdit },
  //         { title: 'account', path: PATH_DASHBOARD.user.account },
  //       ],
  //     },

  //     // E-COMMERCE
  //     {
  //       title: 'ecommerce',
  //       path: PATH_DASHBOARD.eCommerce.root,
  //       icon: ICONS.cart,
  //       children: [
  //         { title: 'shop', path: PATH_DASHBOARD.eCommerce.shop },
  //         { title: 'product', path: PATH_DASHBOARD.eCommerce.demoView },
  //         { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
  //         { title: 'create', path: PATH_DASHBOARD.eCommerce.new },
  //         { title: 'edit', path: PATH_DASHBOARD.eCommerce.demoEdit },
  //         { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout },
  //       ],
  //     },

  //     // INVOICE
  //     {
  //       title: 'invoice',
  //       path: PATH_DASHBOARD.invoice.root,
  //       icon: ICONS.invoice,
  //       children: [
  //         { title: 'list', path: PATH_DASHBOARD.invoice.list },
  //         { title: 'details', path: PATH_DASHBOARD.invoice.demoView },
  //         { title: 'create', path: PATH_DASHBOARD.invoice.new },
  //         { title: 'edit', path: PATH_DASHBOARD.invoice.demoEdit },
  //       ],
  //     },

  //     // BLOG
  //     {
  //       title: 'blog',
  //       path: PATH_DASHBOARD.blog.root,
  //       icon: ICONS.blog,
  //       children: [
  //         { title: 'posts', path: PATH_DASHBOARD.blog.posts },
  //         { title: 'post', path: PATH_DASHBOARD.blog.demoView },
  //         { title: 'create', path: PATH_DASHBOARD.blog.new },
  //       ],
  //     },
  //     {
  //       title: 'File manager',
  //       path: PATH_DASHBOARD.fileManager,
  //       icon: ICONS.folder,
  //     },
  //   ],
  // },

  // // APP
  // // ----------------------------------------------------------------------
  // {
  //   subheader: 'app',
  //   items: [
  //     {
  //       title: 'mail',
  //       path: PATH_DASHBOARD.mail.root,
  //       icon: ICONS.mail,
  //       info: <Label color="error">+32</Label>,
  //     },
  //     {
  //       title: 'chat',
  //       path: PATH_DASHBOARD.chat.root,
  //       icon: ICONS.chat,
  //     },
  //     {
  //       title: 'calendar',
  //       path: PATH_DASHBOARD.calendar,
  //       icon: ICONS.calendar,
  //     },
  //     {
  //       title: 'kanban',
  //       path: PATH_DASHBOARD.kanban,
  //       icon: ICONS.kanban,
  //     },
  //   ],
  // },

  // // DEMO MENU STATES
  // {
  //   subheader: 'Other cases',
  //   items: [
  //     {
  //       // default roles : All roles can see this entry.
  //       // roles: ['user'] Only users can see this item.
  //       // roles: ['admin'] Only admin can see this item.
  //       // roles: ['admin', 'manager'] Only admin/manager can see this item.
  //       // Reference from 'src/guards/RoleBasedGuard'.
  //       title: 'item_by_roles',
  //       path: PATH_DASHBOARD.permissionDenied,
  //       icon: ICONS.lock,
  //       roles: ['admin'],
  //       caption: 'only_admin_can_see_this_item',
  //     },
  //     {
  //       title: 'menu_level',
  //       path: '#/dashboard/menu_level',
  //       icon: ICONS.menuItem,
  //       children: [
  //         {
  //           title: 'menu_level_2a',
  //           path: '#/dashboard/menu_level/menu_level_2a',
  //         },
  //         {
  //           title: 'menu_level_2b',
  //           path: '#/dashboard/menu_level/menu_level_2b',
  //           children: [
  //             {
  //               title: 'menu_level_3a',
  //               path: '#/dashboard/menu_level/menu_level_2b/menu_level_3a',
  //             },
  //             {
  //               title: 'menu_level_3b',
  //               path: '#/dashboard/menu_level/menu_level_2b/menu_level_3b',
  //               children: [
  //                 {
  //                   title: 'menu_level_4a',
  //                   path: '#/dashboard/menu_level/menu_level_2b/menu_level_3b/menu_level_4a',
  //                 },
  //                 {
  //                   title: 'menu_level_4b',
  //                   path: '#/dashboard/menu_level/menu_level_2b/menu_level_3b/menu_level_4b',
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       title: 'item_disabled',
  //       path: '#disabled',
  //       icon: ICONS.disabled,
  //       disabled: true,
  //     },

  //     {
  //       title: 'item_label',
  //       path: '#label',
  //       icon: ICONS.label,
  //       info: (
  //         <Label color="info" startIcon={<Iconify icon="eva:email-fill" />}>
  //           NEW
  //         </Label>
  //       ),
  //     },
  //     {
  //       title: 'item_caption',
  //       path: '#caption',
  //       icon: ICONS.menuItem,
  //       caption:
  //         'Quisque malesuada placerat nisl. In hac habitasse platea dictumst. Cras id dui. Pellentesque commodo eros a enim. Morbi mollis tellus ac sapien.',
  //     },
  //     {
  //       title: 'item_external_link',
  //       path: 'https://www.google.com/',
  //       icon: ICONS.external,
  //     },
  //     {
  //       title: 'blank',
  //       path: PATH_DASHBOARD.blank,
  //       icon: ICONS.blank,
  //     },
  //   ],
  // },
];

export default navConfig;
