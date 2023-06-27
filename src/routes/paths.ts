// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '';

// ----------------------------------------------------------------------
export const PATH_AUTH = {
  login: '/login',
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

const date = new Date();
const dateNow = new Date(date.getFullYear(), date.getMonth()-1, date.getDate())
let timestamp = dateNow.getTime();
let toDate = new Date(date.getFullYear() -1, 0, 1).getTime();


export const PATH_DASHBOARD = {
  root: path(ROOTS_DASHBOARD, '/dashboard'),
  view: (name: string) => path(ROOTS_DASHBOARD, `/chat/${name}`),
  train: {
    root: path(ROOTS_DASHBOARD, '/train'),
    classes: path(ROOTS_DASHBOARD, '/train/classes'),
    class: (id: string) => path(ROOTS_DASHBOARD, `/train/class/${id}`),
    attendance: path(ROOTS_DASHBOARD, '/train/attendance'),
    cauHoi: path(ROOTS_DASHBOARD, '/train/cau-hoi'),
    mucTieu: path(ROOTS_DASHBOARD, '/train/muc-tieu'),
    events: path(ROOTS_DASHBOARD, '/train/events'),
    event:(id:string) => path(ROOTS_DASHBOARD, `/train/event/${id}`),
    khoaHoc: path(ROOTS_DASHBOARD, '/train/khoa-hoc'),
  },

  entrance: {
    root: path(ROOTS_DASHBOARD, '/entrance'),
    create: path(ROOTS_DASHBOARD, '/entrance/quick-create'),
    completed: path(ROOTS_DASHBOARD, '/entrance/completed'),
    list:(centers: string| null, step: string, toDate: string, fromDate: string) => path(ROOTS_DASHBOARD, `/entrance/list/${centers}/${step}/${toDate}/${fromDate}`),
    demoList: path(ROOTS_DASHBOARD, `/entrance/list/2_3_4_1/0/${toDate}/${timestamp}`),
    discount: path(ROOTS_DASHBOARD, '/entrance/discount'),
    fee: path(ROOTS_DASHBOARD, '/entrance/fee'),
  },

  accountancy: {
    root: path(ROOTS_DASHBOARD, '/accountancy'),
    finacount: path(ROOTS_DASHBOARD, '/accountancy/finacount'),
    transaction: path(ROOTS_DASHBOARD, '/accountancy/transaction'),
    payment: path(ROOTS_DASHBOARD, '/accountancy/payment'),
    receipt: path(ROOTS_DASHBOARD, '/accountancy/receipt'),
    report: {
      root: path(ROOTS_DASHBOARD, '/accountancy/report'),
      cf: path(ROOTS_DASHBOARD, '/accountancy/report/cf'),
      book: path(ROOTS_DASHBOARD, '/accountancy/report/book'),
      revenue: path(ROOTS_DASHBOARD, '/accountancy/report/revenue'),
    },
    misa: path(ROOTS_DASHBOARD, '/accountancy/misa'),
  },
  account: path(ROOTS_DASHBOARD, '/account'),
 
  personal: {
    root: path(ROOTS_DASHBOARD, '/personal'),
    role: path(ROOTS_DASHBOARD, '/personal/role'),
    user: path(ROOTS_DASHBOARD, '/personal/user'),
    teachers: path(ROOTS_DASHBOARD, '/personal/teachers'),
    base_salary: path(ROOTS_DASHBOARD, '/personal/base-salary'),
 
  },

  settings: {
    root: path(ROOTS_DASHBOARD, '/settings'),
    centers: path(ROOTS_DASHBOARD, '/settings/centers'),
    rooms: path(ROOTS_DASHBOARD, '/settings/rooms'),
    relationship: path(ROOTS_DASHBOARD, '/settings/relationship'),
    step: path(ROOTS_DASHBOARD, '/settings/step'),
    status: path(ROOTS_DASHBOARD, '/settings/status'),
    courses: path(ROOTS_DASHBOARD, '/settings/courses'),
  },

  kanban: path(ROOTS_DASHBOARD, '/kanban'),
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  fileManager: path(ROOTS_DASHBOARD, '/files-manager'),
  permissionDenied: path(ROOTS_DASHBOARD, '/permission-denied'),
  blank: path(ROOTS_DASHBOARD, '/blank'),
  general: {
    dashboard: path(ROOTS_DASHBOARD, '/dashboard'),
  },
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all'),
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    view: (name: string) => path(ROOTS_DASHBOARD, `/chat/${name}`),
  },
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    new: path(ROOTS_DASHBOARD, '/user/new'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    account: path(ROOTS_DASHBOARD, '/user/account'),
    edit: (name: string) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
  },
  eCommerce: {
    root: path(ROOTS_DASHBOARD, '/e-commerce'),
    shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
    list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
    checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    new: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
    view: (name: string) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}`),
    edit: (name: string) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    demoView: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
  },
  invoice: {
    root: path(ROOTS_DASHBOARD, '/invoice'),
    list: path(ROOTS_DASHBOARD, '/invoice/list'),
    new: path(ROOTS_DASHBOARD, '/invoice/new'),
    view: (id: string) => path(ROOTS_DASHBOARD, `/invoice/${id}`),
    edit: (id: string) => path(ROOTS_DASHBOARD, `/invoice/${id}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1/edit'),
    demoView: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5'),
  },
  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    posts: path(ROOTS_DASHBOARD, '/blog/posts'),
    new: path(ROOTS_DASHBOARD, '/blog/new'),
    view: (title: string) => path(ROOTS_DASHBOARD, `/blog/post/${title}`),
    demoView: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
  },
  page404: '/404',
};

export const PATH_DOCS = {
  root: 'https://docs.minimals.cc',
  changelog: 'https://docs.minimals.cc/changelog',
};

export const PATH_ZONE_ON_STORE = 'https://mui.com/store/items/zone-landing-page/';

export const PATH_MINIMAL_ON_STORE = 'https://mui.com/store/items/minimal-dashboard/';

export const PATH_FREE_VERSION = 'https://mui.com/store/items/minimal-dashboard-free/';

export const PATH_FIGMA_PREVIEW =
  'https://www.figma.com/file/OBEorYicjdbIT6P1YQTTK7/%5BPreview%5D-Minimal-Web.15.10.22?node-id=0%3A1';
