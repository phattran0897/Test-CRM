import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserPrismaRepository } from './repositories/user.prisma.repository';
import { I_USER_REPOSITORY } from './repositories/user.repository.interface';

@Module({
    providers: [
        UserService,
        {
            provide: I_USER_REPOSITORY,
            useClass: UserPrismaRepository,
        },
    ],
    exports: [UserService],
})
export class UserModule { }
