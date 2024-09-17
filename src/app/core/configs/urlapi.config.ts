export enum UrlApi {
  // auth
  AUTH_LOGIN = `api/auth/login`,
  AUTH_VERIFY_CODE = `api/auth/verify-code`,
  AUTH_REGISTER = `api/auth/register`,
  AUTH_FORGOT_PASSWORD = `api/auth/forgot-password`,

  // role
  ADMIN_GET_ALL_ROLE = `api/role/get-all`,

  // company
  CREATE_COMPANY = `api/company/create`,
  UPDATE_COMPANY = `api/company/update`,
  DELETE_COMPANY = `api/company/delete`,
  GET_ALL_COMPANY = `api/company/get-all`,
  GET_ALL_HEADER_COMPANY = `api/company/get-all-header`,
  GET_BY_ID_COMPANY = `api/company/get-by-id`,
  FOLLOW_COMPANY = `api/company/follow`,
  LOCK_COMPANY = `api/company/lock`,

  // user
  ADMIN_CREATE_USER = `api/admin/user/create`,
  ADMIN_UPDATE_USER = `api/admin/user/update`,
  ADMIN_DELETE_USER = `api/admin/user/delete`,
  ADMIN_RESET_PASSWORD_USER = `api/admin/user/reset-password`,
  ADMIN_GET_ALL_USER = `api/admin/user/get-all`,
  ADMIN_GET_BY_ID_USER = `api/admin/user/get-by-id`,
  ADMIN_LOCK_USER = `api/admin/user/lock`,
  ADMIN_CHANGE_PASSWORD = `api/admin/user/change-password`,

  // blog
  CREATE_BLOG = `api/blog/create`,
  UPDATE_BLOG = `api/blog/update`,
  DELETE_BLOG = `api/blog/delete`,
  GET_ALL_BLOG = `api/blog/get-all`,
  STATUS_BLOG = `api/blog/status`,
  VIEW_BLOG = `api/blog/view`,
  GET_BY_ID_BLOG = `api/blog/get-by-id`,

  // upload
  STORE_UPLOAD = 'api/store/upload',
  STORE_GET_FILE = 'api/store/files',
  STORE_DOWNLOAD_FILE = 'api/store/download',

  // send notification email
  SEND_NOTIFICATION_EMAIL = 'api/notification/send-content-email',

  // service pack
  CREATE_SERVICE_PACK = `api/service-pack/create`,
  UPDATE_SERVICE_PACK = `api/service-pack/update`,
  DELETE_SERVICE_PACK = `api/service-pack/delete`,
  GET_ALL_SERVICE_PACK = `api/service-pack/get-all`,

  // product
  CREATE_PRODUCT = `api/product/create`,
  UPDATE_PRODUCT = `api/product/update`,
  DELETE_PRODUCT = `api/product/delete`,
  GET_ALL_PRODUCT = `api/product/get-all`,

  // history
  GET_ALL_HISTORY = `api/history/get-all`,

  // recruitment
  CREATE_RECRUITMENT = `api/recruitment/create`,
  UPDATE_RECRUITMENT = `api/recruitment/update`,
  DELETE_RECRUITMENT = `api/recruitment/delete`,
  GET_ALL_RECRUITMENT = `api/recruitment/get-all`,
  GET_ALL_RECRUITMENT_HEADER = `api/recruitment/get-all-header`,
  GET_ALL_RECRUITMENT_HOME = `api/recruitment/get-all-home`,
  GET_ALL_RECRUITMENT_COUNT = `api/recruitment/get-all-count-recruitment`,
  STATUS_RECRUITMENT = `api/recruitment/status`,

  // recruitment process
  CREATE_RECRUITMENT_PROCESS = `api/recruitment-process/create`,
  DELETE_RECRUITMENT_PROCESS = `api/recruitment-process/delete`,
  SAVE_PROFILE = `api/recruitment-process/save-profile`,
  GET_ALL_RECRUITMENT_PROCESS_EMPLOYER = `api/recruitment-process/get-all-employer`,
  GET_ALL_RECRUITMENT_PROCESS_CANDIDATE = `api/recruitment-process/get-all-candidate`,

  // report
  GET_REPORT_EMPLOYER = `api/report/get-employer`,
  GET_REPORT_ADMIN = `api/report/get-admin`,
}
