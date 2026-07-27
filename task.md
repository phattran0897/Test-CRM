# CRM Project Plan

## Milestone 1: Project Setup
- [x] Khởi tạo thư mục `frontend` (Vite, React 18, TailwindCSS, Zustand)
- [x] Khởi tạo thư mục `backend` (NestJS, Prisma, Clean Architecture)
- [x] Thiết lập thư viện và cấu hình cho Frontend và Backend
- [x] Tạo module `/health` cho Backend
- [x] Thiết lập CI/CD cơ bản (`.github/workflows`)
- [x] Kiểm tra Manual Verification & Automated Verification
- [x] Commit và Push toàn bộ source lên GitHub

## Milestone 2: Authentication
- [x] Phê duyệt Implementation Plan Milestone 2
- [x] Thiết lập Schema User trên Prisma (backend)
- [x] Xây dựng User Module & Repository Pattern
- [x] Xây dựng Auth Module (Login, Refresh Token, Logout, Change Password) sử dụng HttpOnly Cookie (backend)
- [x] Thiết lập Routing và Authentication State (Zustand + Axios Interceptors) trên Frontend
- [x] Xây dựng màn hình Login, Change Password UI (frontend)
- [x] Kiểm thử luồng đăng nhập (Verification)
- [x] Viết Unit Test cho AuthService
