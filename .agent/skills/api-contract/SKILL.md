---
name: api-contract
description: Use when designing or documenting any REST API endpoint for the CRM project — request/response shape, error format, pagination, validation rules.
---

# API Contract Rules — CRM Project

## Format response chuẩn (bắt buộc cho MỌI endpoint)

**Thành công:**
```json
{
  "success": true,
  "data": { },
  "meta": { "page": 1, "pageSize": 20, "total": 134 }
}
```
`meta` chỉ xuất hiện ở endpoint có pagination.

**Lỗi:**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Trường email không hợp lệ",
    "details": [
      { "field": "email", "issue": "invalid_format" }
    ]
  }
}
```

## Mã lỗi chuẩn hóa (dùng chung 1 danh sách, không tự đặt tên mới tùy tiện)

| HTTP Status | code | Khi nào dùng |
|---|---|---|
| 400 | VALIDATION_ERROR | Input không hợp lệ |
| 401 | UNAUTHORIZED | Chưa đăng nhập / token hết hạn |
| 403 | FORBIDDEN | Không đủ quyền (RBAC) |
| 404 | NOT_FOUND | Không tìm thấy resource |
| 409 | CONFLICT | Trùng dữ liệu (VD: email đã tồn tại) |
| 422 | BUSINESS_RULE_VIOLATION | Vi phạm logic nghiệp vụ (VD: chuyển Lead status không hợp lệ) |
| 500 | INTERNAL_ERROR | Lỗi hệ thống, không lộ chi tiết ra client |

## Quy tắc URL & Method

- Resource dùng danh từ số nhiều: `/api/v1/customers`, không dùng động từ trong URL.
- Versioning bắt buộc: mọi endpoint có prefix `/api/v1/`.
- Nested resource tối đa 1 cấp: `/api/v1/customers/:id/activities` — không lồng sâu hơn.
- Method: `GET` (đọc, không side-effect), `POST` (tạo mới), `PUT`/`PATCH` (cập nhật — PATCH cho partial update), `DELETE` (soft delete).

## Pagination (bắt buộc cho mọi list endpoint)

Query param chuẩn: `?page=1&pageSize=20&sortBy=created_at&sortOrder=desc&search=...`
Không cho phép `pageSize` > 100 (chặn ở validation, tránh query nặng).

## Auth & Permission

- Mọi endpoint (trừ auth endpoints) phải khai báo rõ **role/permission yêu cầu** ngay trong tài liệu API, không để ngầm định.
- Response `403 FORBIDDEN` phải phân biệt được với `401 UNAUTHORIZED` — không gộp chung.

## Khi viết tài liệu API cho 1 endpoint

Luôn trình bày đủ: Method, URL, Quyền yêu cầu, Request (path/query/body), Response (success + các trường hợp lỗi có thể xảy ra), Validation rules cụ thể theo từng field.
