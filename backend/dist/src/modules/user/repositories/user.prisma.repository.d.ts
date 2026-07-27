import { PrismaService } from '../../../common/prisma/prisma.service';
import { IUserRepository } from './user.repository.interface';
import { UserEntity } from '../entities/user.entity';
export declare class UserPrismaRepository implements IUserRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByEmail(tenantId: string, email: string): Promise<UserEntity | null>;
    findById(id: string): Promise<UserEntity | null>;
    create(data: Partial<UserEntity>): Promise<UserEntity>;
    update(id: string, data: Partial<UserEntity>): Promise<UserEntity>;
}
