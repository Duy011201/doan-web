export enum UrlApi {
  // Auth
  AUTH_LOGIN = `api/auth/login`,
  AUTH_VERIFY_CODE = `api/auth/verify-code`,
  AUTH_REGISTER = `api/auth/register`,
  AUTH_FORGOT_PASSWORD = `api/auth/forgot-password`,

  // Admin role
  ADMIN_GET_ALL_ROLE = `api/role/get-all`,

  // Admin user
  ADMIN_CREATE_COMPANY = `api/admin/company/create`,
  ADMIN_UPDATE_COMPANY = `api/admin/company/update`,
  ADMIN_DELETE_COMPANY = `api/admin/company/delete`,
  ADMIN_GET_ALL_COMPANY = `api/admin/company/get-all`,
  ADMIN_LOCK_COMPANY = `api/admin/company/lock`,

  // Admin company
  ADMIN_CREATE_USER = `api/admin/user/create`,
  ADMIN_UPDATE_USER = `api/admin/user/update`,
  ADMIN_DELETE_USER = `api/admin/user/delete`,
  ADMIN_RESET_PASSWORD_USER = `api/admin/user/reset-password`,
  ADMIN_GET_ALL_USER = `api/admin/user/get-all`,
  ADMIN_LOCK_USER = `api/admin/user/lock`,

  // Upload
  STORE_UPLOAD = 'api/store/upload',
  STORE_GET_FILE = 'api/store/files',
}
