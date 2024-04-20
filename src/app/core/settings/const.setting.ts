export const CONSTANT = {
  COMPANY_FIELD: [
    { code: 'RETAIL_WHOLESALE', name: 'Bán lẻ/Bán sỉ' },
    {
      code: 'PACKAGING_PRINTING_STICKERS',
      name: 'Bao bì/In ấn/Nhãn dán',
    },
    { code: 'INSURANCE', name: 'Bảo hiểm' },
    {
      code: 'REAL_ESTATE_LEASE',
      name: 'Bất động sản/Cho thuê',
    },
    { code: 'GOVERNMENT_NGO', name: 'Chính phủ & NGO' },
    { code: 'STOCK', name: 'Chứng khoán' },
    { code: 'SUPPLY_CHAIN', name: 'Chuỗi cung ứng' },
    {
      code: 'MECHANICAL_MACHINES_INDUSTRIAL_EQUIPMENT',
      name: 'Cơ khí/Máy móc/Thiết bị công nghiệp',
    },
    { code: 'SUPPLY_MANPOWER', name: 'Cung cấp nhân lực' },
    {
      code: 'TEXTILE_GARMENT_FOOTWEAR',
      name: 'Dệt may/May mặc/Giày dép',
    },
    {
      code: 'WAREHOUSING_SERVICES',
      name: 'Dịch vụ kho bãi',
    },
    {
      code: 'LODGING_RESTAURANT_HOTEL_TOURISM',
      name: 'Dịch vụ lưu trú/Nhà hàng/Du lịch',
    },
    {
      code: 'ENVIRONMENTAL_SERVICES_WASTE',
      name: 'Dịch vụ môi trường/Chất thải',
    },
    {
      code: 'MEDICAL_SERVICES_HEALTH_CARE',
      name: 'Dịch vụ y tế/Chăm sóc sức khỏe',
    },
    {
      code: 'ELECTRICAL_ELECTRONIC',
      name: 'Điện/Điện tử',
    },
    { code: 'PHARMACEUTICAL', name: 'Dược phẩm' },
    {
      code: 'EDUCATION_TRAINING',
      name: 'Giáo dục/Đào tạo',
    },
    { code: 'CONSUMER_GOODS', name: 'Hàng tiêu dùng' },
    {
      code: 'LOGISTICS_TRANSPORTATION',
      name: 'Hậu cần/Giao nhận',
    },
    {
      code: 'INFORMATION_TECHNOLOGY_SYSTEMS_EQUIPMENT',
      name: 'Hệ thống CNTT/Thiết bị',
    },
    {
      code: 'CHEMICAL_BIOCHEMISTRY',
      name: 'Hóa chất/Hóa sinh',
    },
    { code: 'ACCOUNTING_AUDIT', name: 'Kế toán/Kiểm toán' },
    {
      code: 'MINING_OIL_AND_GAS',
      name: 'Khai khoáng/Dầu khí',
    },
    {
      code: 'ARCHITECTURE_INTERIOR',
      name: 'Kiến trúc nội thất',
    },
    {
      code: 'CONSTRUCTION_ENGINEERING_INFRASTRUCTURE',
      name: 'Ký sư xây dựng/Cơ sở hạ tầng',
    },
    {
      code: 'BEAUTY_PERSONAL_CARE',
      name: 'Làm đẹp/Chăm sóc cá nhân',
    },
    {
      code: 'LAW_LEGAL_SERVICES',
      name: 'Luật/Dịch vụ pháp lý',
    },
    { code: 'BANKING', name: 'Ngân hàng' },
    {
      code: 'ART_ENTERTAINMENT',
      name: 'Nghệ thuật/Giải trí',
    },
    { code: 'RESEARCH', name: 'Nghiên cứu' },
    { code: 'IMPORT_EXPORT', name: 'Nhập khẩu/Xuất khẩu' },
    { code: 'PLASTIC_RUBBER', name: 'Nhựa/Cao su' },
    { code: 'WOODEN_FURNITURE', name: 'Nội thất/Gỗ' },
    {
      code: 'AGRICULTURE_FORESTRY_AQUACULTURE',
      name: 'Nông nghiệp/Lâm nghiệp/Nuôi trồng thủy sản',
    },
    { code: 'AUTOMOBILE', name: 'Ô tô' },
    {
      code: 'INFORMATION_TECHNOLOGY_SOFTWARE_SOFTWARE_SERVICES',
      name: 'Phần mềm CNTT/ Dịch vụ phần mềm',
    },
    { code: 'PRODUCTION', name: 'Sản xuất' },
    {
      code: 'PRODUCTION_AND_DISTRIBUTION_OF_ELECTRICITY_GAS_WATER',
      name: 'Sản xuất và phân phối điện/Khí đốt/Nước',
    },
    { code: 'FINANCE', name: 'Tài chính' },
    { code: 'MEDICAL_EQUIPMENT', name: 'Thiết bị y tế' },
    {
      code: 'FASHION_JEWELERY',
      name: 'Thời trang/Trang sức',
    },
    { code: 'VETERINARY', name: 'Thú y' },
    { code: 'E_COMMERCE', name: 'Thương mại điện tử' },

    {
      code: 'MEDIA_PRESS_ADVERTISING',
      name: 'Truyền thông/Báo chí/Quảng cáo',
    },
    { code: 'AUTOMATION', name: 'Tự động hóa' },
    { code: 'TRANSPORTATION', name: 'Vận tải' },
    {
      code: 'CONSTRUCTION_MATERIALS',
      name: 'Vật liệu xây dựng',
    },
    { code: 'TELECOMMUNICATION', name: 'Viễn thông' },
    { code: 'OTHER', name: 'Khác' },
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
    INVALID_RULE:
      'Bạn chưa đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của chúng tôi',
    INVALID_ENCRYPTION_AUTHENTICATION: 'Mã xác thực không hợp lệ',

    INVALID_COMPANY_NAME_FORMAT: 'Tên công ty không hợp lệ',
    INVALID_COMPANY_FIELD: 'Lĩnh vực công ty không hợp lệ',
    INVALID_COMPANY_PROVINCE: 'Tỉnh không hợp lệ',
    INVALID_COMPANY_CORPORATE_TAX_CODE: 'Mã số thuế công ty không hợp lệ',
    INVALID_TOKEN: 'Định dạng token không hợp lệ',
  },
  LOGO_COMPANY: [
    { url: '../../../assets/images/logo_lg.png', name: 'LG' },
    { url: '../../../assets/images/logo_lottemart.webp', name: 'Lotte Mart' },
    { url: '../../../assets/images/logo_nutifood.webp', name: 'Nuti Food' },
    {
      url: '../../../assets/images/logo_techcombank.webp',
      name: 'Techcombank',
    },
    { url: '../../../assets/images/logo_thaco.webp', name: 'Thaco' },
    { url: '../../../assets/images/logo_vettel.webp', name: 'Vettel' },
    { url: '../../../assets/images/logo_vinamilk.webp', name: 'Vinamilk' },
    { url: '../../../assets/images/logo_vinfast.webp', name: 'Vinfast' },
    { url: '../../../assets/images/logo_yamaha.webp', name: 'Yamaha' },
  ],
};
