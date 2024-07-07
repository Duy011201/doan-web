export enum UrlApi {
  // Auth
  AUTH_LOGIN = `api/auth/login`,
  AUTH_VERIFY_CODE = `api/auth/verify-code`,
  AUTH_REGISTER = `api/auth/register`,
  AUTH_FORGOT_PASSWORD = `api/auth/forgot-password`,

  // Admin role
  ADMIN_GET_ALL_ROLE = `api/role/get-all`,

  // Admin user
  CREATE_COMPANY = `api/company/create`,
  UPDATE_COMPANY = `api/company/update`,
  DELETE_COMPANY = `api/company/delete`,
  GET_ALL_COMPANY = `api/company/get-all`,
  LOCK_COMPANY = `api/company/lock`,

  // Admin company
  ADMIN_CREATE_USER = `api/admin/user/create`,
  ADMIN_UPDATE_USER = `api/admin/user/update`,
  ADMIN_DELETE_USER = `api/admin/user/delete`,
  ADMIN_RESET_PASSWORD_USER = `api/admin/user/reset-password`,
  ADMIN_GET_ALL_USER = `api/admin/user/get-all`,
  ADMIN_LOCK_USER = `api/admin/user/lock`,

  // Admin blog
  CREATE_BLOG = `api/blog/create`,
  UPDATE_BLOG = `api/blog/update`,
  DELETE_BLOG = `api/blog/delete`,
  GET_ALL_BLOG = `api/blog/get-all`,
  STATUS_BLOG = `api/blog/status`,

  // Upload
  STORE_UPLOAD = 'api/store/upload',
  STORE_GET_FILE = 'api/store/files',
}
