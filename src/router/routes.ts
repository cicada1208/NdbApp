export default [
  {
    path: '/',
    name: 'Home',
    view: 'Home', // Relative to /src/views
    title: '首頁',
    icon: 'mdi-home',
    auth: true,
    nav: true
  },
  {
    path: '/Login',
    name: 'Login',
    view: 'Login',
    title: '登入',
    icon: 'mdi-login', //'mdi-login-variant',
    auth: false,
    nav: false
  },
  {
    path: '/ClinicalTranInfo',
    name: 'ClinicalTranInfo',
    view: 'ClinicalTranInfo',
    title: '病房動態',
    icon: 'mdi-transit-transfer',
    auth: true,
    nav: true
  },
  {
    path: '/ClinicalPatInfo',
    name: 'ClinicalPatInfo',
    view: 'ClinicalPatInfo',
    title: '病人資訊',
    icon: 'mdi-card-account-details-outline', //'mdi-card-account-details',
    auth: true,
    nav: true
  },
  {
    path: '/ClinicalOP',
    name: 'ClinicalOP',
    view: 'ClinicalOP',
    title: '手術',
    icon: 'mdi-knife',
    auth: true,
    nav: true
  },
  {
    path: '/Test',
    name: 'Test',
    view: 'Test',
    title: '測試',
    icon: 'mdi-test-tube',
    auth: false,
    nav: false
  }
];
