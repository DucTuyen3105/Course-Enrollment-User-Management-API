# Hệ Thống Quản Lý Người Dùng và Đăng Ký Khóa Học

## 📋 Mô Tả

Đây là một API RESTful được xây dựng bằng NestJS để quản lý người dùng và đăng ký khóa học. Hệ thống bao gồm các tính năng xác thực, phân quyền, quản lý người dùng và đăng ký khóa học với cơ chế bảo mật JWT.

## 🚀 Tính Năng Chính

### 🔐 Xác Thực & Phân Quyền
- **JWT Authentication**: Sử dụng JWT để xác thực và quản lý phiên đăng nhập
- **RBAC (Role-Based Access Control)**: Phân quyền chi tiết với RoleGuard
- **Token Management**: Lưu trữ token trong database với khả năng vô hiệu hóa khi logout
- **Auto Admin Creation**: Tự động tạo tài khoản admin khi khởi động ứng dụng

### 👥 Quản Lý Người Dùng
- **CRUD Operations**: Tạo, đọc, cập nhật, xóa người dùng
- **User Registration**: Đăng ký người dùng mới với validation
- **User Login/Logout**: Đăng nhập và đăng xuất an toàn
- **Profile Management**: Người dùng có thể quản lý thông tin cá nhân
- **Admin Controls**: Admin có thể quản lý tất cả người dùng

### 📚 Quản Lý Khóa Học
- **Course Management**: Quản lý danh sách khóa học
- **Single Enrollment**: Mỗi người dùng chỉ được đăng ký một khóa học
- **Enrollment Control**: Đăng ký và hủy đăng ký khóa học
- **Role-based Access**: Phân quyền truy cập theo vai trò

### 🛡️ Bảo Mật & Xử Lý Lỗi
- **Global Exception Filter**: Xử lý tất cả lỗi HTTP và validation
- **Data Validation**: Sử dụng Class Validator để đảm bảo dữ liệu hợp lệ
- **Response Standardization**: Chuẩn hóa format response với GlobalResponseType
- **Data Transformation**: Ẩn các field trống trong response

## 🏗️ Kiến Trúc Hệ Thống

```
src/
├── auth/                    # Module xác thực
│   ├── auth.controller.ts   # Controller xử lý login/logout
│   ├── auth.service.ts      # Service xử lý logic xác thực
│   ├── auth.guard.ts        # Guard bảo vệ routes
│   ├── role.guard.ts        # Guard phân quyền theo role
│   └── jwt.constants.ts     # Cấu hình JWT
├── user/                    # Module quản lý người dùng
│   ├── user.controller.ts   # Controller CRUD người dùng
│   └── user.service.ts      # Service logic người dùng
├── course/                  # Module quản lý khóa học
│   ├── course.controller.ts # Controller CRUD khóa học
│   └── course.service.ts    # Service logic khóa học
├── entities/                # Database entities
│   ├── user.entity.ts       # Entity người dùng
│   ├── course.entity.ts     # Entity khóa học
│   └── token.entity.ts      # Entity quản lý token
├── dto/                     # Data Transfer Objects
│   ├── request/             # Request DTOs
│   └── response/            # Response DTOs
├── decorator/               # Custom decorators
├── enum/                    # Enums
└── GlobalResponse/          # Global response handling
```

## 🛠️ Công Nghệ Sử Dụng

- **Framework**: NestJS
- **Database**: MySQL với TypeORM
- **Authentication**: JWT
- **Validation**: Class Validator & Class Transformer
- **Documentation**: Swagger/OpenAPI
- **Language**: TypeScript

## 📦 Cài Đặt

### Yêu Cầu Hệ Thống
- Node.js (v16 trở lên)
- MySQL
- npm hoặc yarn

### Các Bước Cài Đặt

1. **Clone repository**
```bash
git clone <repository-url>
cd user-management-system
```

2. **Cài đặt dependencies**
```bash
npm install
```

3. **Cấu hình database**
- Tạo database MySQL
- Cập nhật thông tin kết nối trong file cấu hình

4. **Chạy ứng dụng**
```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

## 🔧 Scripts Có Sẵn

```bash
# Development
npm run start:dev          # Chạy ở chế độ development với auto-reload
npm run start:debug        # Chạy ở chế độ debug

# Production
npm run build              # Build ứng dụng
npm run start:prod         # Chạy production

# Testing
npm run test               # Chạy unit tests
npm run test:watch         # Chạy tests với watch mode
npm run test:cov           # Chạy tests với coverage
npm run test:e2e           # Chạy end-to-end tests

# Code Quality
npm run lint               # Chạy ESLint
npm run format             # Format code với Prettier
```

## 📚 API Documentation

Sau khi chạy ứng dụng, truy cập Swagger UI tại:
```
http://localhost:3000/api
```

### Endpoints Chính

#### Authentication
- `POST /auth/signin` - Đăng nhập
- `POST /auth/logout` - Đăng xuất

#### User Management
- `GET /user` - Lấy danh sách người dùng (Admin)
- `GET /user/:id` - Lấy thông tin người dùng
- `POST /user` - Tạo người dùng mới
- `PUT /user/:id` - Cập nhật thông tin người dùng
- `DELETE /user/:id` - Xóa người dùng (Admin)

#### Course Management
- `GET /course` - Lấy danh sách khóa học
- `POST /course` - Tạo khóa học mới (Admin)
- `PUT /course/:id` - Cập nhật khóa học (Admin)
- `DELETE /course/:id` - Xóa khóa học (Admin)

#### Course Enrollment
- `POST /course/register` - Đăng ký khóa học
- `POST /course/unregister` - Hủy đăng ký khóa học

## 🔑 Tài Khoản Mặc Định

Khi khởi động lần đầu, hệ thống sẽ tự động tạo tài khoản admin:

- **Username**: `admin`
- **Password**: `admin`
- **Role**: `admin`

## 🗄️ Cấu Trúc Database

### Bảng Users
- `id` (UUID, Primary Key)
- `name` (VARCHAR)
- `email` (VARCHAR, Unique)
- `password` (VARCHAR, Hashed)
- `roles` (ENUM: 'user', 'admin')

### Bảng Courses
- `course_id` (UUID, Primary Key)
- `name` (VARCHAR)

### Bảng User_Courses (Many-to-Many)
- `user_id` (UUID, Foreign Key)
- `course_id` (UUID, Foreign Key)

### Bảng Tokens
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key)
- `token` (VARCHAR)
- `expires_at` (DATETIME)

## 🔒 Bảo Mật

- Mật khẩu được hash bằng bcrypt
- JWT tokens có thời hạn và được lưu trữ an toàn
- Role-based access control cho tất cả endpoints
- Input validation với Class Validator
- Global exception handling

## 🤝 Đóng Góp

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📄 License

Dự án này được phân phối dưới giấy phép MIT. Xem file `LICENSE` để biết thêm thông tin.

## 📞 Liên Hệ

Nếu có câu hỏi hoặc góp ý, vui lòng tạo issue trong repository hoặc liên hệ qua email.

---

**Lưu ý**: Đây là phiên bản development. Để sử dụng trong production, hãy cấu hình các biến môi trường và bảo mật phù hợp.