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

export const PATH_DASHBOARD = {
  // dashboard:  path(ROOTS_DASHBOARD, '/dashboard'),
  root:  path(ROOTS_DASHBOARD, '/dashboard'),
  classes: {
    root: path(ROOTS_DASHBOARD, '/classes'),
    attendance: path(ROOTS_DASHBOARD, '/attendance'),
    cauHoi: path(ROOTS_DASHBOARD, '/cau-hoi'),
    mucTieu: path(ROOTS_DASHBOARD, '/muc-tieu'),
    events: path(ROOTS_DASHBOARD, '/events'),
    khoaHoc: path(ROOTS_DASHBOARD, '/khoa-hoc'),
  },
  // cauHoi: {
  //   root: path(ROOTS_DASHBOARD, '/cau-hoi'),
  // },
  entrance: {
    root: path(ROOTS_DASHBOARD, '/entrance/quick-create'),
    completed: path(ROOTS_DASHBOARD, '/entrance/completed'),
    list: path(ROOTS_DASHBOARD, '/entrance/list/2_3_4_5'),
    discount: path(ROOTS_DASHBOARD, '/discount'),
    fee: path(ROOTS_DASHBOARD, '/fee'),
  },

  financial: {
    finacount: path(ROOTS_DASHBOARD, '/finacount'),
    transaction: path(ROOTS_DASHBOARD, '/transaction'),
    payment: path(ROOTS_DASHBOARD, '/payment'),
    receipt: path(ROOTS_DASHBOARD, '/receipt'),
    cf: path(ROOTS_DASHBOARD, '/report/cf'),
    book: path(ROOTS_DASHBOARD, '/report/book'),
    revenue: path(ROOTS_DASHBOARD, '/report/revenue'),
    misa: path(ROOTS_DASHBOARD, '/misa'),
  },
  account: path(ROOTS_DASHBOARD, '/account'),
  settings: {
    role: path(ROOTS_DASHBOARD, '/role'),
    user: path(ROOTS_DASHBOARD, '/user'),
    relationship: path(ROOTS_DASHBOARD, '/relationship'),
    step: path(ROOTS_DASHBOARD, '/step'),
    status: path(ROOTS_DASHBOARD, '/status'),
  },
  teachers : path(ROOTS_DASHBOARD, '/teachers'),
  base_salary: path(ROOTS_DASHBOARD, '/base-salary'),
  centers: path(ROOTS_DASHBOARD, '/centers'),
  rooms: path(ROOTS_DASHBOARD, '/rooms'),
  courses: path(ROOTS_DASHBOARD, '/courses'),



  kanban: path(ROOTS_DASHBOARD, '/kanban'),
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  fileManager: path(ROOTS_DASHBOARD, '/files-manager'),
  permissionDenied: path(ROOTS_DASHBOARD, '/permission-denied'),
  blank: path(ROOTS_DASHBOARD, '/blank'),
  general: {
    dashboard:  path(ROOTS_DASHBOARD, '/dashboard'),
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
