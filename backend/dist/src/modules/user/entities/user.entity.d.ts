export declare class UserEntity {
    id: string;
    tenant_id: string;
    email: string;
    password_hash: string;
    first_name: string | null;
    last_name: string | null;
    role: string;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    deleted_at: Date | null;
}
