# Walkthrough: CRM Project

## Milestone 1: Project Setup
- Khởi tạo Frontend (Vite/React/Tailwind) và Backend (NestJS/Prisma).
- Cấu hình Clean Architecture. Thiết lập Github Actions CI.

## Milestone 2: Authentication
- **Backend Auth & User Module:**
  - Cập nhật Schema cho `User` & `Tenant` theo chuẩn Multi-tenant.
  - Setup JWT login, đính kèm `access_token` và `refresh_token` qua HttpOnly cookie (`SameSite=none`, `Secure`).
  - Xử lý endpoint `/auth/refresh` và `/auth/logout`.
  - Viết và chạy thành công Unit Tests cho AuthService.
- **Frontend State & UI:**
  - Thiết lập Axios Interceptors chuẩn bị sẵn auto-refresh token (tự bắt 401 Unauthorized và phát request lấy access token mới). 
  - Khởi tạo màn hình Login (`LoginPage`) bằng Raw TailwindCSS làm backup cho Shadcn. Tích hợp Zustand lưu state người dùng.
  - Bảo vệ các đường dẫn React Router bằng `ProtectedRoute`.
- **Bảo mật (OWASP focus):**
  - Tránh XSS: Token hoàn toàn nằm trong HttpOnly cookie.
  - Tránh lộ thông tin cá nhân: Log không in ra token hay password. 
  - Phân quyền theo chuẩn `bcrypt`.

Dự án đã sẵn sàng cho Milestone kế tiếp, các testcase đơn vị đều Pass 100%. Tương tác database được mô hình hoá nghiêm chỉnh trên Postgres qua Prisma.
