import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { IUserRepository } from './user.repository.interface';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findByEmail(tenantId: string, email: string): Promise<UserEntity | null> {
        const user = await this.prisma.users.findUnique({
            where: { uq_users_tenant_email: { tenant_id: tenantId, email } },
        });
        return user as UserEntity | null;
    }

    async findById(id: string): Promise<UserEntity | null> {
        const user = await this.prisma.users.findUnique({ where: { id } });
        return user as UserEntity | null;
    }

    async create(data: Partial<UserEntity>): Promise<UserEntity> {
        const user = await this.prisma.users.create({ data: data as any });
        return user as UserEntity;
    }

    async update(id: string, data: Partial<UserEntity>): Promise<UserEntity> {
        const user = await this.prisma.users.update({ where: { id }, data: data as any });
        return user as UserEntity;
    }
}
