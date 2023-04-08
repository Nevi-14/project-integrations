// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  maxCharCodigoProd: 6,
  preURL:'https://',
  preURL2:'https://dev-coding.com/cabys/api',
  TestURL:'_test',
  postURL:'dev-coding.com/cabys/api/',
  prdMode: false,
  mapboxKey:'pk.eyJ1IjoibWhlcnJhIiwiYSI6ImNrcWxhdXk4eTByMDUyd28xNnZ2b2hoMjMifQ.IrIAxPGO4oFiRVR8U5sqkA',
  getLoginAPI:'get/log/in?username=',
  getCompaniesAPI:'get/companies',
  getUsersAPI:'get/users/company?id=',
  getCompanyUserAPI:'get/company/user?id=',
  getCompanyUsersAPI:'get/company/users',
  getCompanyAPI:'get/company?id=',
  getCustomersAPI:'get/customers/company?id=',
  getProductsAPI:'get/products/company?id=',
  postCompanyAPI:'post/company',
  postUserAPI:'post/user',
  postCompanyUserAPI:'post/company/user',
  postCustomerAPI:'post/customer',
  postProductsAPI:'post/product',
  postEmail:'post/send/email',
  putCompanyAPI:'put/company?id=',
  putUserAPI:'put/user?id=',
  putCompanyUserAPI:'put/company/user?id=',
  putCustomerAPI:'put/customer?id=',
  putProductAPI:'put/product?id=',
  deleteCompanyAPI:'delete/company?id=',
  deleteUserAPI:'delete/user?id=',
  deleteCompanyUserAPI:'delete/company/user?id=',
  deleteCustomerAPI:'delete/customer?id=',
  deleteProductAPI:'delete/product?id='

  
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
