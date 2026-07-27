# Milestone 1: Project Setup

## Mục tiêu milestone
Khởi tạo cấu trúc dự án từ nền móng ban đầu cho cả Frontend (Vite + React) và Backend (NestJS), thiết lập cấu hình cơ sở cho Clean Architecture, TailwindCSS, thư mục lưu trữ, và CI cơ bản trên GitHub Actions. Không bao gồm các service nghiệp vụ cụ thể.

## User Review Required
> [!IMPORTANT]
> Dưới đây là kế hoạch tổ chức source code cho Milestone 1. Bạn cần xác nhận lại:
> - Có muốn chia thành 2 thư mục `frontend` và `backend` trong cùng một repository (monorepo dạng cơ bản) không, hay tách 2 repositories riêng?
> - Theo thiết kế hiện tại, tôi giả định dùng chung 1 repo với thư mục con `frontend` và `backend`.

## Proposed Changes

### Structure & Folder Outline
Dự án sẽ chia làm hai phần chính nằm trong cùng một repository tổng:

#### Backend (`/backend`)
- **Ngôn ngữ/Framework:** Node.js + TypeScript + NestJS
- **ORM:** Prisma
- **Cấu hình đặc biệt:**
  - `src/modules/health/`: Sinh endpoint `GET /health` để Vercel/Render có thể ping check cold start (theo `deployment-hosting`).
  - `src/common/filters/`: Setup base exception filter trả về format lỗi chuẩn hóa.
  - `src/main.ts`: Cấu hình CORS origin, cookie credentials theo `backend-conventions`.
  - `.env.example`: Khai báo sẵn các block biến (Neon, Upstash, Cloudinary, JWT...).

#### Frontend (`/frontend`)
- **Ngôn ngữ/Framework:** Vite + React 18 + TypeScript + SWC
- **Cấu hình UI:** TailwindCSS, khởi tạo sẵn thư mục `src/components/ui/` cho shadcn/ui.
- **State Mgmt:** Zustand + React Query setup cơ bản `QueryClientProvider` ở main.
- **Axios:** Tạo axios instance trong `src/lib/axios.ts` với `withCredentials: true`.

#### CI/CD Khai báo ban đầu (`/.github`)
- Khởi tạo file `.github/workflows/main.yml` cho việc tự động check lint, type-check cho cả backend và frontend mỗi khi có push hoặc PR vào nhánh main.

### Các lệnh sẽ thực thi trong Pipeline Setup:
1. Tạo thư mục `frontend` bằng Vite (React + SWC + TypeScript).
2. Tạo thư mục `backend` bằng Nest CLI.
3. Cài đặt các thư viện cần thiết cho frontend (Zustand, TailwindCSS...) và backend (Prisma, class-validator...).
4. Thiết lập folder structure theo Clean Architecture cho Backend.

## Verification Plan
### Automated Tests
- CI Workflow đảm bảo build thành công trên cả 2 app frontend và backend.
- Chạy qua các test tự động của NestJS cơ bản.

### Manual Verification
- Vite server chạy local không có lỗi.
- NestJS server chạy local expose `/health` trả về status code 200.
