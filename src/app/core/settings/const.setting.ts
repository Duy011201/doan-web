export const CONSTANT = {
  COMPANY_FIELD: [
    { CODE: 'RETAIL_WHOLESALE', NAME: 'Bán lẻ/Bán sỉ' },
    {
      CODE: 'PACKAGING_PRINTING_STICKERS',
      NAME: 'Bao bì/In ấn/Nhãn dán',
    },
    { CODE: 'INSURANCE', NAME: 'Bảo hiểm' },
    {
      CODE: 'REAL_ESTATE_LEASE',
      NAME: 'Bất động sản/Cho thuê',
    },
    { CODE: 'GOVERNMENT_NGO', NAME: 'Chính phủ & NGO' },
    { CODE: 'STOCK', NAME: 'Chứng khoán' },
    { CODE: 'SUPPLY_CHAIN', NAME: 'Chuỗi cung ứng' },
    {
      CODE: 'MECHANICAL_MACHINES_INDUSTRIAL_EQUIPMENT',
      NAME: 'Cơ khí/Máy móc/Thiết bị công nghiệp',
    },
    { CODE: 'SUPPLY_MANPOWER', NAME: 'Cung cấp nhân lực' },
    {
      CODE: 'TEXTILE_GARMENT_FOOTWEAR',
      NAME: 'Dệt may/May mặc/Giày dép',
    },
    {
      CODE: 'WAREHOUSING_SERVICES',
      NAME: 'Dịch vụ kho bãi',
    },
    {
      CODE: 'LODGING_RESTAURANT_HOTEL_TOURISM',
      NAME: 'Dịch vụ lưu trú/Nhà hàng/Du lịch',
    },
    {
      CODE: 'ENVIRONMENTAL_SERVICES_WASTE',
      NAME: 'Dịch vụ môi trường/Chất thải',
    },
    {
      CODE: 'MEDICAL_SERVICES_HEALTH_CARE',
      NAME: 'Dịch vụ y tế/Chăm sóc sức khỏe',
    },
    {
      CODE: 'ELECTRICAL_ELECTRONIC',
      NAME: 'Điện/Điện tử',
    },
    { CODE: 'PHARMACEUTICAL', NAME: 'Dược phẩm' },
    {
      CODE: 'EDUCATION_TRAINING',
      NAME: 'Giáo dục/Đào tạo',
    },
    { CODE: 'CONSUMER_GOODS', NAME: 'Hàng tiêu dùng' },
    {
      CODE: 'LOGISTICS_TRANSPORTATION',
      NAME: 'Hậu cần/Giao nhận',
    },
    {
      CODE: 'INFORMATION_TECHNOLOGY_SYSTEMS_EQUIPMENT',
      NAME: 'Hệ thống CNTT/Thiết bị',
    },
    {
      CODE: 'CHEMICAL_BIOCHEMISTRY',
      NAME: 'Hóa chất/Hóa sinh',
    },
    { CODE: 'ACCOUNTING_AUDIT', NAME: 'Kế toán/Kiểm toán' },
    {
      CODE: 'MINING_OIL_AND_GAS',
      NAME: 'Khai khoáng/Dầu khí',
    },
    {
      CODE: 'ARCHITECTURE_INTERIOR',
      NAME: 'Kiến trúc nội thất',
    },
    {
      CODE: 'CONSTRUCTION_ENGINEERING_INFRASTRUCTURE',
      NAME: 'Ký sư xây dựng/Cơ sở hạ tầng',
    },
    {
      CODE: 'BEAUTY_PERSONAL_CARE',
      NAME: 'Làm đẹp/Chăm sóc cá nhân',
    },
    {
      CODE: 'LAW_LEGAL_SERVICES',
      NAME: 'Luật/Dịch vụ pháp lý',
    },
    { CODE: 'BANKING', NAME: 'Ngân hàng' },
    {
      CODE: 'ART_ENTERTAINMENT',
      NAME: 'Nghệ thuật/Giải trí',
    },
    { CODE: 'RESEARCH', NAME: 'Nghiên cứu' },
    { CODE: 'IMPORT_EXPORT', NAME: 'Nhập khẩu/Xuất khẩu' },
    { CODE: 'PLASTIC_RUBBER', NAME: 'Nhựa/Cao su' },
    { CODE: 'WOODEN_FURNITURE', NAME: 'Nội thất/Gỗ' },
    {
      CODE: 'AGRICULTURE_FORESTRY_AQUACULTURE',
      NAME: 'Nông nghiệp/Lâm nghiệp/Nuôi trồng thủy sản',
    },
    { CODE: 'AUTOMOBILE', NAME: 'Ô tô' },
    {
      CODE: 'INFORMATION_TECHNOLOGY_SOFTWARE_SOFTWARE_SERVICES',
      NAME: 'Phần mềm CNTT/ Dịch vụ phần mềm',
    },
    { CODE: 'PRODUCTION', NAME: 'Sản xuất' },
    {
      CODE: 'PRODUCTION_AND_DISTRIBUTION_OF_ELECTRICITY_GAS_WATER',
      NAME: 'Sản xuất và phân phối điện/Khí đốt/Nước',
    },
    { CODE: 'FINANCE', NAME: 'Tài chính' },
    { CODE: 'MEDICAL_EQUIPMENT', NAME: 'Thiết bị y tế' },
    {
      CODE: 'FASHION_JEWELERY',
      NAME: 'Thời trang/Trang sức',
    },
    { CODE: 'VETERINARY', NAME: 'Thú y' },
    { CODE: 'E_COMMERCE', NAME: 'Thương mại điện tử' },

    {
      CODE: 'MEDIA_PRESS_ADVERTISING',
      NAME: 'Truyền thông/Báo chí/Quảng cáo',
    },
    { CODE: 'AUTOMATION', NAME: 'Tự động hóa' },
    { CODE: 'TRANSPORTATION', NAME: 'Vận tải' },
    {
      CODE: 'CONSTRUCTION_MATERIALS',
      NAME: 'Vật liệu xây dựng',
    },
    { CODE: 'TELECOMMUNICATION', NAME: 'Viễn thông' },
    { CODE: 'OTHER', NAME: 'Khác' },
  ],
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
    ADMIN_DASHBOARD: 'dashboard',
    ADMIN_MANAGER_USER: 'manager-user',
  },
  SYSTEM_STATUS_CODE: {
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
  SYSTEM_MESSAGE: {
    INVALID_EMAIL_FORMAT: 'Định dạng email không hợp lệ',
    INVALID_PASSWORD_FORMAT: 'Định dạng passwword không hợp lệ',
    INVALID_PASSWORD_NOT_MATCH: 'Định dạng passwword không khớp',
    INVALID_POLICY:
      'Bạn chưa đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của chúng tôi',
    INVALID_ENCRYPTION_AUTHENTICATION: 'Mã xác thực không hợp lệ',

    INVALID_COMPANY_NAME_FORMAT: 'Tên công ty không hợp lệ',
    INVALID_COMPANY_FIELD: 'Lĩnh vực công ty không hợp lệ',
    INVALID_COMPANY_PROVINCE: 'Tỉnh không hợp lệ',
    INVALID_COMPANY_CORPORATE_TAX_CODE: 'Mã số thuế công ty không hợp lệ',
    INVALID_TOKEN: 'Định dạng token không hợp lệ',
  },
  LOGO_COMPANY: [
    { URL: '../../../assets/images/logo_lg.png', NAME: 'LG' },
    { URL: '../../../assets/images/logo_lottemart.webp', NAME: 'Lotte Mart' },
    { URL: '../../../assets/images/logo_nutifood.webp', NAME: 'Nuti Food' },
    {
      URL: '../../../assets/images/logo_techcombank.webp',
      NAME: 'Techcombank',
    },
    { URL: '../../../assets/images/logo_thaco.webp', NAME: 'Thaco' },
    { URL: '../../../assets/images/logo_vettel.webp', NAME: 'Vettel' },
    { URL: '../../../assets/images/logo_vinamilk.webp', NAME: 'Vinamilk' },
    { URL: '../../../assets/images/logo_vinfast.webp', NAME: 'Vinfast' },
    { URL: '../../../assets/images/logo_yamaha.webp', NAME: 'Yamaha' },
  ],
};
