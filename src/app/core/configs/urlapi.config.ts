export enum UrlApi {
  // Auth
  AUTH_LOGIN = `api/auth/login`,
  AUTH_VERIFY_CODE = `api/auth/verify-code`,
  AUTH_REGISTER = `api/auth/register`,
  AUTH_FORGOT_PASSWORD = `api/auth/forgot-password`,

  // Admin user
  ADMIN_CREATE_USER = `api/admin/user/create`,
  ADMIN_UPDATE_USER = `api/admin/user/update`,
  ADMIN_DELETE_USER = `api/admin/user/delete`,
  ADMIN_RESET_PASSWORD_USER = `api/admin/user/reset-password`,
  ADMIN_GET_ALL_USER = `api/admin/user/get-all`,
}
