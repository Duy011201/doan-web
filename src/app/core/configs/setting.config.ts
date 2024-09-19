export const SETTING = {
  SYSTEM_PAGE: {
    // TODO: Url for related system pages
    RELATED_PAGE: 'page',
    RELATED_ADMIN: 'admin',
    RELATED_AUTH: 'auth',
    RELATED_EMPLOYER: 'employer',
    RELATED_CANDIDATE: 'candidate',
    RELATED_404: '**',

    // TODO: Url for related home pages
    HEADER_HOME: 'home',
    HEADER_BLOG_NEW: 'blog-new',
    HEADER_BLOG_NEW_DETAIL: 'blog-new/:id',
    HEADER_SEARCH_COMPANY: 'search-company',
    HEADER_SEARCH_COMPANY_DETAIL: 'search-company/:id',
    HEADER_SEARCH_RECRUITMENT: 'search-recruitment',
    HEADER_SEARCH_RECRUITMENT_DETAIL: 'search-recruitment/:id',
    HEADER_TABLE_PRICE: 'table-price',
    HEADER_ORDER: 'manager-order',

    // TODO: Url for related auth pages
    AUTH_REGISTER: 'register',
    AUTH_LOGIN: 'login',
    AUTH_LOGOUT: 'logout',
    AUTH_FORGOT_PASSWORD: 'forgot-password',

    // TODO: Url for related pages
    DASHBOARD: 'dashboard',
    MANAGER_USER: 'manager-user',
    MANAGER_COMPANY: 'manager-company',
    MANAGER_BLOG: 'manager-blog',
    MANAGER_NOTIFICATION: 'manager-notification',
    MANAGER_SERVICE_PACK: 'manager-service-pack',
    MANAGER_ORDER_APPROVAL: 'manager-order-approval',
    MANAGER_CART: 'manager-cart',
    MANAGER_HISTORY: 'manager-history',
    MANAGER_RECRUITMENT: 'manager-recruitment',
    MANAGER_PROCESS: 'manager-process',
    MANAGER_CHANGE_PASSWORD: 'manager-change-password',
    MANAGER_REPORT: 'manager-report'
  },
  SYSTEM_ROLE: {
    // SUPER_ADMIN: 'SUPER_ADMIN',
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
    REJECT: 'REJECT'
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
    INVALID_SERVICE_PACK_PROMOTION: 'Định dạng khuyến mãi không hợp lệ',
    INVALID_SERVICE_PACK_EXPIRATION_DATE: 'Định dạng ngày hết hạn không hợp lệ',

    INVALID_KEYWORD_FORMAT: 'Định dạng từ khóa không hợp lệ',
    INVALID_DESCRIPTION_FORMAT: 'Định dạng mô tả không hợp lệ',
    INVALID_ADDRESS_FORMAT: 'Định dạng địa chỉ không hợp lệ',
    INVALID_REQUIRED_FORMAT: 'Định dạng yêu cầu không hợp lệ',
    INVALID_PROVINCE_FORMAT: 'Định dạng tỉnh không hợp lệ',
    INVALID_FIELD_FORMAT: 'Định dạng lĩnh vực không hợp lệ',
    INVALID_TIME_FORM_FORMAT: 'Định dạng hình thức làm việc không hợp lệ',
    INVALID_TIME_START: 'Định dạng thời gian bắt đầu không hợp lệ',
    INVALID_TIME_END: 'Định dạng thời gian kết thúc không hợp lệ',
    INVALID_SALARY_FROM_FORMAT: 'Định dạng mức lương bắt đầu không hợp lệ',
    INVALID_SALARY_TO_FORMAT: 'Định dạng mức lương kết thúc không hợp lệ',
    INVALID_SALARY_FROM_LESS_SALARY_TO_FORMAT: 'Định dạng mức lương từ nhỏ hơn mức lương đến không hợp lệ',
  },
  PRODUCT_STATUS: {
    DRAFT: 'DRAFT',
    PENDING: 'PENDING',
    PAID: 'PAID',
    REJECT: 'REJECT'
  },
  RECRUITMENT: {
    PENDING: 'PENDING',
    APPROVED: 'APPROVED',
    PUBLISHED: 'PUBLISHED',
    REJECT: 'REJECT'
  },
  SERVICE_PACK: {
    HIEU_UNG_DO_DAM: 'Hiệu ứng đỏ đậm',
    CONG_TY_NOI_BAT: 'Công ty nổi bật',
    HIEU_UNG_HOT: 'Hiệu ứng hot',
    HIEU_UNG_DONG_KHUNG: 'Hiệu ứng đóng khung',
  },
};
