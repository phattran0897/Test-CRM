# Milestone 2: Authentication

## Mục tiêu milestone
Xây dựng luồng xác thực an toàn (Authentication) cho Frontend và Backend sử dụng JWT & Refresh Token lưu trong HttpOnly Cookie, kèm tính năng Login, Logout, Đổi mật khẩu.

## User Review Required
> [!IMPORTANT]
> Dưới đây là kế hoạch kiến trúc cho chức năng Authentication. Giai đoạn này rất quan trọng về bảo mật. Xin vui lòng phê duyệt phương án:
> 
> 1. **Forgot Password:** Cho tính năng quên mật khẩu, ở phase này hệ thống sẽ chỉ trả token trực tiếp về client (hoặc in log) thay vì gửi email thật, để phù hợp cho việc test trên free-tier. Đồng ý không?
> 2. **Đăng ký (Register):** Vì đây là hệ thống CRM nội bộ, user sẽ do Admin tạo thay vì cho phép đăng ký tự do public. Ở milestone này tôi sẽ cung cấp 1 endpoint để tạo user admin khởi tạo (hoặc seed script), bạn thấy hợp lý không?

## Proposed Changes

### Backend (`/backend`)
- **Schema & Database (`prisma/schema.prisma`):**
  - Thêm bảng `User`: Lưu trữ `email`, `password_hash`, thông tin tài khoản cơ bản, cờ `is_active`.
- **Authentication Module (`src/modules/auth`):**
  - **AuthService**: Logic login (bcrypt compare), sinh Access/Refresh token, hash password. Đóng gói payload.
  - **AuthController**: Các endpoint `POST /auth/login`, `POST /auth/logout`, `POST /auth/refresh`, `POST /auth/change-password`.
- **User Module (`src/modules/user`):**
  - Logic để fetch user theo email, xử lý lấy thông tin account.
- **Core Security:** HttpOnly Cookie (flag `SameSite=None, Secure`) cho các token trả về.

### Frontend (`/frontend`)
- **Dependencies mới:** Cài đặt React Router DOM để điều hướng, lucide-react cho icon.
- **Pages / Màn hình:**
  - `LoginPage`: Form đăng nhập. Tích hợp shadcn/ui components (`Form`, `Input`, `Button`).
  - Giao diện Change Password sau khi user đã đăng nhập.
- **State & Routing:**
  - Cấu hình Zustand để lưu metadata của user (tên, role...).
  - Axios Interceptors: Bắt buộc cấu hình `withCredentials: true`, điều hướng bắt HTTP lỗi 401 thì gửi refresh token trước khi đẩy về login.

## Verification Plan
### Automated Tests
- Unit Tests: Test `AuthService` với mock UserRepository để đảm bảo hash password gọi đúng, verify token trả chuẩn ở nhánh backend (vì API backend logic quan trọng).

### Manual Verification
- Dùng trình duyệt form login Frontend -> Inspect tab Network kiểm tra Cookie `Set-Cookie` được backend trả về đạt chuẩn HttpOnly.
- Gọi lại resource API nào đó, chứng thực request frontend đính kèm đúng Cookie token thay vì gửi qua Header trực tiếp.
