# Milestone 3: RBAC & Permission

## Mục tiêu milestone
Thiết lập hệ thống phân quyền (Role-Based Access Control) cho Backend và Frontend để đảm bảo chỉ những người dùng có quyền hợp lệ (Admin, Manager, Sales) mới được thực hiện hoặc nhìn thấy các tính năng đặc thù. Xây dựng trang Quản lý Nhân sự (Admin).

## User Review Required
> [!IMPORTANT]
> 1. **Kiến trúc RBAC:** Đối với đa số CRM cơ bản, roles như (Admin/Manager/Sales) thường cố định. Bạn muốn dùng cấu hình phân quyền "tĩnh" (trong code - dễ, nhanh, scale vừa) hay cần thiết kế bảng DB động (để Admin tự tạo Custom Role và đánh dấu tick từng nhóm Request)? Tôi đề xuất dùng Enum tĩnh cho phiên bản hiện tại để không over-engineering.
> 2. **Dev Environment (Ghi chú ngoài):** Tôi thấy bạn chạy `npm run dev` ở ngoài root và bị lỗi. Bạn có muốn trong cột mốc này, tôi tạo thêm 1 file `package.json` cực nhẹ ở thư mục gốc dùng thư viện `concurrently` để chạy ứng dụng (cả front/back) bằng 1 lệnh duy nhất không?

## Proposed Changes

### Backend (`/backend`)
- **Guards & Decorators (`src/common/guards/`, `src/common/decorators/`):**
  - Thêm `RolesGuard` check JWT token của Request lấy ra trường `role`.
  - Tạo Decorator `@Roles('admin', 'manager')` đặt trên Controller.
- **User Module (`src/modules/user`):**
  - Mở rộng thêm endpoint CRUD (`GET /users`, `POST /users`...) được bảo vệ bởi `@Roles('admin')`.

### Frontend (`/frontend`)
- **RBAC Utility (`src/components/auth/RBAC.tsx`):**
  - Xây dựng component `<CheckRole allowed={['admin']}> ... </CheckRole>` để bọc các nút nhấn hoặc thành phần UI nhạy cảm.
- **Route Protection:** Cập nhật `App.tsx` với tuỳ chọn truyền cấu hình Role vào `ProtectedRoute`.
- **UserManagementPage (`src/pages/admin/UserManagement.tsx`):**
  - Một trang đơn giản hiển thị danh sách người dùng trong hệ thống (gọi API `GET /users`).

### Root Workspace (tuỳ chọn thêm)
- Thêm `package.json` ngoài cùng:
  - `"dev": "concurrently \"npm run start:dev --prefix backend\" \"npm run dev --prefix frontend\""`

## Verification Plan
### Automated Tests
- Backend Test: Unit test the `RolesGuard` đảm bảo reject các account role `sales` khỏi endpoint `admin`.

### Manual Verification
- Chạy hệ thống local.
- Login account Admin -> Thấy menu Quản lý Users và truy cập được api.
- Login account Sales -> Menu mờ đi / vào thẳng link thì bị force kick ra Dashboard hoặc báo lỗi 403 Forbidden.
