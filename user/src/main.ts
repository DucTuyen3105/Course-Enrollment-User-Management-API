import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
      .setTitle("Course Enrollment & User Management API")
      .setDescription(
          "Course Enrollment & User Management API\n" +
          "\n" +
          "Đây là API quản lý người dùng và đăng ký khóa học, bao gồm các tính năng chính:\n" +
          "\n" +
          "Authentication & Authorization:\n" +
          "- Sử dụng JWT để xác thực token và kiểm tra tính hợp lệ.\n" +
          "- Triển khai RBAC (Role-Based Access Control) với RoleGuard để phân quyền chi tiết.\n" +
          "- Token lưu trong cơ sở dữ liệu, gắn id trong payload để quản lý trạng thái (hết hạn, logout).\n" +
          "\n" +
          "User Management:\n" +
          "- CRUD người dùng với DTO chuẩn hóa dữ liệu trả về.\n" +
          "- Đăng ký người dùng với Class Validator để đảm bảo dữ liệu hợp lệ và kiểm tra xem người dùng.\n" +
          "- Đăng nhập: kiểm tra thông tin người dùng, sinh token và lưu trạng thái token.\n" +
          "- Logout: xóa token khỏi cơ sở dữ liệu để vô hiệu hóa.\n" +
          "- Người dùng chỉ thao tác trên thông tin của chính họ (đổi mật khẩu, xem thông tin); admin có thể thao tác trên tất cả.\n" +
          "\n" +
          "Course Enrollment:\n" +
          "- Người dùng chỉ được đăng ký một khóa học duy nhất.\n" +
          "- Cho phép đăng ký và hủy đăng ký khóa học.\n" +
          "- Phân quyền để chỉ user hoặc admin thực hiện các thao tác phù hợp.\n" +
          "\n" +
          "Response Formatting & Exception Handling:\n" +
          "- Sử dụng Exception Filter để xử lý tất cả lỗi HTTP và Class Validator, đảm bảo response chuẩn.\n" +
          "- Class Transformer & Interceptor để ẩn các field trống trong DTO response, giữ dữ liệu trả về gọn gàng.\n" +
          "- Chuẩn hóa dữ liệu trả về khi thành công theo `GlobalResponseType`, bao gồm `data`, `message`, `statusCode`.\n" +
          "\n" +
          "Lifecycle Event:\n" +
          "- Ứng dụng tự động khởi tạo tài khoản admin khi khởi chạy.\n" +
          "- Tài khoản mặc định: username = 'admin', password = 'admin', role = 'admin'.\n" +
          "- Đảm bảo chỉ tạo nếu tài khoản admin chưa tồn tại, tránh trùng lặp khi restart ứng dụng."
      )
      .setVersion('1.0')
      .addBearerAuth()
      .build()
  const document = SwaggerModule.createDocument(app,config)
  SwaggerModule.setup('api',app,document );
  await app.listen(process.env.PORT ?? 3000);

}
bootstrap();
