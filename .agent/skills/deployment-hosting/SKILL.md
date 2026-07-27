---
name: deployment-hosting
description: Use when configuring environment variables, CORS, CI/CD, or anything related to deploying the CRM project across Vercel (frontend), Render/Railway (backend), Neon/Supabase (database), Upstash (Redis), and Cloudinary/Supabase Storage (files).
---

# Deployment & Hosting Rules — CRM Project (Free Tier, đa dịch vụ)

## Sơ đồ hosting

| Thành phần | Dịch vụ | Ghi chú Free Tier |
|---|---|---|
| Frontend | Vercel | Auto-deploy từ branch `main`, preview deploy cho PR |
| Backend | Render hoặc Railway | Có cold start (~30-60s) khi idle — bắt buộc có `/health` endpoint |
| Database | Neon.tech hoặc Supabase | Giới hạn connection, cần pooled connection string |
| Redis | Upstash | Giao tiếp REST/HTTP, không dùng client TCP thường (`ioredis` cấu hình đặc biệt hoặc dùng `@upstash/redis` SDK) |
| File storage | Cloudinary / Supabase Storage | Không lưu file trực tiếp trên backend server (Render/Railway free tier không có persistent disk đáng tin cậy) |

## CORS (bắt buộc vì frontend/backend khác domain)

- Backend NestJS: bật CORS với `origin` = domain Vercel cụ thể (không dùng `*` vì cookie yêu cầu origin cụ thể), `credentials: true`.
- Frontend: mọi request gọi API phải bật `withCredentials: true` (axios) hoặc `credentials: 'include'` (fetch).
- Cookie set từ backend phải có `SameSite=None; Secure` khi frontend/backend khác domain (bắt buộc phải là HTTPS — free tier của cả Vercel và Render/Railway đều có HTTPS mặc định nên OK).

## Biến môi trường (không hardcode, không commit `.env`)

Tối thiểu cần các nhóm biến sau, khai báo mẫu trong `.env.example`:
- `DATABASE_URL`, `DIRECT_URL` (Neon/Supabase — xem skill `db-migration`)
- `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` (hoặc biến tương ứng nếu dùng Supabase Storage)
- `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, thời hạn token
- `FRONTEND_URL` (dùng để cấu hình CORS origin động theo môi trường)
- `NODE_ENV` (development/staging/production)

## Cold start (Render/Railway free tier)

- Bắt buộc có endpoint `GET /health` trả `200 OK` nhanh, không phụ thuộc DB — dùng để: (a) kiểm tra deploy thành công, (b) tích hợp uptime ping nếu cần giảm cold start.
- Frontend: khi gọi API lần đầu sau thời gian rảnh, cần xử lý loading state chờ lâu hơn bình thường (không coi timeout ngắn là lỗi mặc định).

## CI/CD (GitHub Actions)

- Pipeline tối thiểu: lint → typecheck → unit test (Jest) → build. Chỉ deploy khi pipeline pass.
- Frontend deploy: để Vercel tự động deploy qua Git integration, không cần custom GitHub Action riêng trừ khi cần bước build đặc biệt.
- Backend deploy: Render/Railway đều hỗ trợ auto-deploy từ Git — cấu hình build command (`npm run build`) và start command (`npm run start:prod`) đúng theo NestJS.
- Migration Prisma: chạy `prisma migrate deploy` như 1 bước riêng trong pipeline deploy backend (không chạy `migrate dev` ở production).

## Khi thiết kế bất kỳ tính năng nào có thể bị ảnh hưởng bởi free tier

Phải nêu rõ giới hạn liên quan (VD: giới hạn connection DB, giới hạn request Upstash, giới hạn storage Cloudinary) trong Implementation Plan, không giả định tài nguyên vô hạn.
