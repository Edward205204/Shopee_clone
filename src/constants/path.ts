const path = {
  user: '/user',
  profile: '/user/profile',
  change_password: '/user/password',
  purchase_history: '/user/purchase',
  home: '/',
  login: '/login',
  register: '/register',
  logout: '/logout',
  productDetail: ':nameId',
  cart: '/cart'
} as const;

export default path;
