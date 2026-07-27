---
name: db-migration
description: Use when designing database schema, writing Prisma migrations, adding tables/columns/indexes, or reviewing anything related to the PostgreSQL database for the CRM project.
---

# Database Migration Rules — CRM Project

## Stack
- PostgreSQL
- Prisma Migrate

## Naming convention

- Table: `snake_case`, số nhiều — VD: `customers`, `leads`, `sales_opportunities`
- Cột: `snake_case` — VD: `first_name`, `created_at`
- Khóa chính: luôn tên `id`, kiểu `UUID` (dùng `gen_random_uuid()` hoặc `uuid_generate_v4()`)
- Khóa ngoại: `<singular_ref_table>_id` — VD: `customer_id`, `assigned_user_id`
- Bảng trung gian (many-to-many): `<table_a>_<table_b>` theo thứ tự alphabet — VD: `contracts_tags`
- Tên constraint: `fk_<table>_<ref_table>`, `uq_<table>_<column>`, `idx_<table>_<column>`

## Cột bắt buộc cho MỌI bảng nghiệp vụ

```sql
id          UUID PRIMARY KEY DEFAULT gen_random_uuid()
created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
created_by  UUID REFERENCES users(id)
updated_by  UUID REFERENCES users(id)
deleted_at  TIMESTAMPTZ NULL   -- dùng cho soft delete, KHÔNG hard delete dữ liệu nghiệp vụ
```

## Index bắt buộc

- Mọi cột dùng để `WHERE`, `JOIN`, `ORDER BY` thường xuyên (VD: `customers.email`, `leads.status`, `leads.assigned_to`) phải có index.
- Mọi cột `deleted_at` nên có partial index: `CREATE INDEX ... WHERE deleted_at IS NULL`.
- Mọi foreign key phải có index đi kèm (Postgres không tự tạo index cho FK).

## Constraint

- Cột không được NULL trong nghiệp vụ → khai báo `NOT NULL` ngay từ đầu, không để xử lý ở tầng code.
- Enum cố định (VD: lead status) → dùng Postgres ENUM type hoặc bảng lookup riêng nếu cần mở rộng động, không dùng string tự do.
- Giá trị tiền tệ → dùng `NUMERIC(15,2)`, không dùng `FLOAT`/`DOUBLE`.

## Quy tắc viết migration

1. Mỗi migration chỉ làm **một thay đổi logic** (1 bảng mới, hoặc 1 nhóm cột liên quan) — không gộp nhiều thay đổi không liên quan vào 1 migration.
2. Migration phải **reversible** khi có thể (Prisma tự sinh down migration, nhưng nếu là raw SQL phải tự viết rollback).
3. Không sửa migration đã chạy trên môi trường khác (staging/prod) — luôn tạo migration mới để sửa.
4. Trước khi tạo bảng mới, kiểm tra ERD hiện tại (`prisma/schema.prisma`) để tránh trùng lặp hoặc phá vỡ quan hệ đã có.
5. Multi-tenant: nếu dự án cần multi-tenant, mọi bảng nghiệp vụ phải có cột `tenant_id` + index ngay từ migration đầu tiên — không thêm sau.

## Lưu ý riêng cho Neon.tech / Supabase (Serverless Postgres)

- Bắt buộc dùng connection string dạng **pooled** (VD: Neon pooler endpoint, hoặc Supabase port 6543 qua PgBouncer) cho Prisma Client ở runtime — connection string trực tiếp (unpooled) chỉ dùng khi chạy migration.
- Trong `.env`, tách rõ 2 biến: `DATABASE_URL` (pooled, dùng cho app) và `DIRECT_URL` (unpooled, dùng cho `prisma migrate`) — khai báo cả 2 trong `schema.prisma` (`directUrl`).
- Free tier của Neon/Supabase giới hạn số connection đồng thời thấp → Prisma Client phải cấu hình `connection_limit` hợp lý, tránh mở quá nhiều connection khi backend chạy nhiều instance (Render/Railway có thể scale).
- Tính đến khả năng serverless Postgres "sleep" khi không hoạt động (đặc biệt Neon free tier) → query đầu tiên sau thời gian rảnh có thể chậm hơn bình thường, không coi đó là lỗi.

## Khi generate ERD

Trình bày dạng Mermaid `erDiagram` kèm giải thích quan hệ 1-n / n-n, không chỉ liệt kê bảng suông.
