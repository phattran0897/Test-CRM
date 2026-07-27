---
name: backend-conventions
description: Use when writing, reviewing, or refactoring any backend code (NestJS modules, services, controllers, repositories) for the CRM project. Enforces Clean Architecture, SOLID, and Repository Pattern rules.
---

# Backend Conventions — CRM Project

## Stack
- Node.js + TypeScript + NestJS
- ORM: Prisma
- DB: PostgreSQL

## Cấu trúc thư mục (mỗi module)

```
src/modules/<module-name>/
├── controllers/
│   └── <module>.controller.ts        # Chỉ nhận request, gọi service, trả response. KHÔNG chứa business logic.
├── services/
│   └── <module>.service.ts           # Business logic thuần túy, không phụ thuộc trực tiếp vào Prisma/HTTP.
├── repositories/
│   └── <module>.repository.ts        # Duy nhất nơi được gọi Prisma Client. Trả về domain entity, không trả raw DB row.
├── dto/
│   ├── create-<module>.dto.ts        # class-validator decorators bắt buộc
│   └── update-<module>.dto.ts
├── entities/
│   └── <module>.entity.ts            # Domain model, tách biệt khỏi Prisma model
└── <module>.module.ts
```

## Quy tắc bắt buộc

1. **Controller không được import Prisma Client trực tiếp.** Mọi truy cập DB đi qua Repository.
2. **Service không phụ thuộc vào NestJS decorators của HTTP layer** (Req, Res) — giữ service test được độc lập.
3. **Repository Pattern:** mỗi entity có 1 interface `I<Entity>Repository` + 1 implementation `<Entity>PrismaRepository`. Inject qua token, không inject class cụ thể — để dễ mock khi test và dễ đổi ORM sau này.
4. **DTO validation:** mọi input từ client phải qua `class-validator` (`@IsString()`, `@IsUUID()`, `@IsEnum()`...). Không tin dữ liệu client gửi lên dù đã có DB constraint.
5. **Error handling:** dùng NestJS Exception Filters tập trung, không `throw new Error()` thô. Dùng custom exception class kế thừa `HttpException`, map theo error envelope chuẩn (xem skill `api-contract`).
6. **Không business logic trong Controller hoặc Repository** — chỉ Service được phép chứa quyết định nghiệp vụ (VD: tính toán trạng thái Lead, kiểm tra quyền).
7. **Mọi service method public phải có ít nhất 1 unit test** (mock repository, không gọi DB thật).
8. **Không dùng `any`.** Nếu cần kiểu chưa rõ, dùng `unknown` + type guard.

## Auth (JWT + Refresh Token qua HttpOnly Cookie)

- Access token & refresh token set qua `Set-Cookie` với flag `HttpOnly; Secure; SameSite=Lax` (hoặc `None` nếu frontend/backend khác domain — bắt buộc vì Vercel + Render/Railway khác domain nhau).
- KHÔNG bao giờ trả token trong response body JSON để lưu ở localStorage.
- Refresh token endpoint đọc cookie, không đọc từ header/body.
- Vì frontend (Vercel) và backend (Render/Railway) khác domain → phải cấu hình CORS với `credentials: true` và frontend fetch/axios phải bật `withCredentials: true`.
- Dùng `bcrypt` (không dùng `bcryptjs` trừ khi môi trường không hỗ trợ native binding) để hash password, salt rounds tối thiểu 10.

## Khi tạo module mới

Luôn tạo theo đúng thứ tự: entity → repository interface → repository impl → DTO → service → controller → module. Không tạo controller trước khi có service.

## Khi có quyết định phá vỡ pattern trên

Phải giải thích rõ lý do trong Implementation Plan trước khi code, không tự ý làm khác đi.
