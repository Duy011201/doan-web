export const SETTING = {
  SYSTEM_PAGE: {
    // TODO: Url for related system pages
    RELATED_ADMIN: 'admin',
    RELATED_AUTH: 'auth',
    RELATED_404: '**',

    // TODO: Url for related home pages
    HEADER_HOME: 'home',
    HEADER_BLOG: 'blog',
    HEADER_JOB: 'job',
    HEADER_COMPANY: 'company',
    HEADER_TABLE_PRICE: 'table-price',

    // TODO: Url for related auth pages
    AUTH_REGISTER: 'register',
    AUTH_LOGIN: 'login',
    AUTH_FORGOT_PASSWORD: 'forgot-password',

    // TODO: Url for related admin pages
    DASHBOARD: 'dashboard',
    ADMIN_MANAGER_USER: 'manager-user',
    MANAGER_COMPANY: 'manager-company',
    MANAGER_BLOG: 'manager-blog',
    MANAGER_NOTIFICATION: 'manager-notification',
    MANAGER_SERVICE_PACK: 'manager-service-pack',

  },
  SYSTEM_ROLE: {
    SUPER_ADMIN: 'SUPER_ADMIN',
    ADMIN: 'ADMIN',
    CANDIDATE: 'CANDIDATE',
    EMPLOYER: 'EMPLOYER',
  },
  SYSTEM_STATUS: {
    ACTIVE: 'ACTIVE',
    IN_ACTIVE: 'IN_ACTIVE',
    LOCK: 'LOCK',
  },
  BLOG_STATUS: {
    PENDING: 'PENDING',
    APPROVED: 'APPROVED',
    PUBLISHED: 'PUBLISHED',
  },
  SQL_METHOD: {
    GET: 'GET',
    DELETE: 'DELETE',
    INSERT: 'INSERT',
    UPDATE: 'UPDATE',
  },
  SYSTEM_ACTION: {
    VIEW: 'view',
    CREATE: 'create',
    UPDATE: 'update',
    DELETE: 'delete',
  },
  SYSTEM_HTTP_STATUS: {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
  },
  SYSTEM_HTTP_MESSAGE: {
    INVALID_EMAIL_FORMAT: 'Định dạng email không hợp lệ',
    INVALID_TITLE_FORMAT: 'Định dạng tiêu đề không hợp lệ',
    INVALID_CONTENT_FORMAT: 'Định dạng nội dung không hợp lệ',
    INVALID_PASSWORD_FORMAT: 'Định dạng passwword không hợp lệ',
    INVALID_PASSWORD_NOT_MATCH: 'Định dạng passwword không khớp',
    INVALID_POLICY:
      'Bạn chưa đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của chúng tôi',
    INVALID_ENCRYPTION_AUTHENTICATION: 'Mã xác thực không hợp lệ',
    INVALID_ROLE: 'Định dạng quyền không hợp lệ',
    INVALID_STATUS: 'Định dạng trạng thái không hợp lệ',

    INVALID_COMPANY_NAME_FORMAT: 'Tên công ty không hợp lệ',
    INVALID_COMPANY_FIELD: 'Lĩnh vực công ty không hợp lệ',
    INVALID_COMPANY_PROVINCE: 'Tỉnh không hợp lệ',
    INVALID_COMPANY_CORPORATE_TAX_CODE: 'Mã số thuế công ty không hợp lệ',
    INVALID_TOKEN: 'Định dạng token không hợp lệ',
    INVALID_CONTENT: 'Định dạng nội dung không hợp lệ',

    INVALID_SERVICE_PACK_NAME: 'Định dạng tên gói dịch vụ không hợp lệ',
    INVALID_SERVICE_PACK_PRICE: 'Định dạng giá gói dịch vụ không hợp lệ',
  },
};
