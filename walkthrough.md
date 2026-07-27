# Walkthrough: CRM Project

## Milestone 1: Project Setup
- Khởi tạo Frontend (Vite/React/Tailwind) và Backend (NestJS/Prisma).
- Cấu hình Clean Architecture. Thiết lập Github Actions CI với check linter/tester hoàn thiện.

## Milestone 2: Authentication
- Backend Auth & User Module: JWT token cắm vào cookie (`Strict/Lax/None`) được config kỹ qua HttpOnly.
- Frontend State & UI: Axios interceptor tự refresh token, Router, Component Auth cơ sở.

## Milestone 3: RBAC & Permission
- Nâng cấp DevX (Developer Experience): Xây dựng thư mục tiện ích gốc với `package.json` bọc `concurrently`, dễ dàng start cả ứng dụng chỉ bằng lệh `npm run dev`.
- **Backend:** Xây dựng `RolesGuard` đảm bảo đánh giá endpoint thông qua metadata `@Roles` và JWT payload logic Role (Admin/Manager/Sales). Triển khai `UserController` phân quyền chặt chẽ (`GET /users`, `POST /users` bị chặn bởi Role Admin).
- **Frontend:** Thiết kế Component `<CheckRole>` cho tuỳ biến hiển thị UI linh hoạt dành cho các phòng ban, ngăn chặn rò rỉ dữ liệu UI chưa cấp phép. Bổ sung `UserManagementPage` cho route Administrator (`/admin/users`) được bảo vệ hoàn toàn bởi hệ thống luồng Guard và Client Component.
- Kiểm thử Guard vượt qua 100% case qua Jest. Toàn bộ code push thành công lên repotitory.
