# Walkthrough: Milestone 1 - Project Setup

## Cấu trúc dự án
Dự án được cấu trúc dạng monorepo chứa hai thư mục độc lập `frontend` và `backend`.

### 1. Frontend (`/frontend`)
- Khởi tạo thành công qua Vite bằng `react-ts`.
- Đã cài đặt Tailwind CSS v3 cùng PostCSS và Autoprefixer; file cấu hình `tailwind.config.js` đã được tinh chỉnh để scan thư mục `src`.
- Các thư viện state management (Zustand), data fetching (React Query, Axios) và biễu đồ (Recharts) đã được cài đặt sẵn.
- Chạy `npm run build` không gặp lỗi.

### 2. Backend (`/backend`)
- Khởi tạo thành công bằng Nest CLI.
- Prisma ORM đã được tích hợp (`npx prisma init`).
- Đã cài đặt các class-validator, class-transformer cho DTO.
- Đã tạo `HealthModule` và expose endpoint `GET /health` (`src/modules/health/health.controller.ts`) làm endpoint check cold start.
- `main.ts` được chỉnh sửa để hỗ trợ CORS origin từ cấu hình environment variable.
- Chạy `npm run build` thành công.

### 3. CI/CD (`.github/workflows/main.yml`)
- Đã tạo Github actions cơ bản thực hiện công việc checkout, cài NodeJS 18, sau đó cài dependency, format/lint và chạy tests cho cả frontend và backend mỗi khi có thay đổi trên nhánh `main`.

## Kết quả kiểm thử
- Frontend Build: ✅ Pass
- Backend Build: ✅ Pass

Dự án đã sẵn sàng để đi vào phát triển chức năng cụ thể ở Milestone kế tiếp.
