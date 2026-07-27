import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository, I_USER_REPOSITORY } from './repositories/user.repository.interface';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @Inject(I_USER_REPOSITORY) private readonly userRepository: IUserRepository,
    ) { }

    async findByEmail(tenantId: string, email: string): Promise<UserEntity | null> {
        return this.userRepository.findByEmail(tenantId, email);
    }

    async findById(id: string): Promise<UserEntity | null> {
        return this.userRepository.findById(id);
    }

    async update(id: string, data: Partial<UserEntity>): Promise<UserEntity> {
        return this.userRepository.update(id, data);
    }
}
