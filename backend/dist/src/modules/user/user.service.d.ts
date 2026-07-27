import type { IUserRepository } from './repositories/user.repository.interface';
import { UserEntity } from './entities/user.entity';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: IUserRepository);
    findByEmail(tenantId: string, email: string): Promise<UserEntity | null>;
    findById(id: string): Promise<UserEntity | null>;
    update(id: string, data: Partial<UserEntity>): Promise<UserEntity>;
}
