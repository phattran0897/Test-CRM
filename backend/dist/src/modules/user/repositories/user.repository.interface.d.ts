import { UserEntity } from '../entities/user.entity';
export declare const I_USER_REPOSITORY = "IUserRepository";
export interface IUserRepository {
    findByEmail(tenantId: string, email: string): Promise<UserEntity | null>;
    findById(id: string): Promise<UserEntity | null>;
    create(data: Partial<UserEntity>): Promise<UserEntity>;
    update(id: string, data: Partial<UserEntity>): Promise<UserEntity>;
}
