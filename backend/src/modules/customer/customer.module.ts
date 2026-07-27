import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { CustomerPrismaRepository } from './repositories/customer.prisma.repository';
import { I_CUSTOMER_REPOSITORY } from './repositories/customer.repository.interface';

@Module({
    controllers: [CustomerController],
    providers: [
        CustomerService,
        {
            provide: I_CUSTOMER_REPOSITORY,
            useClass: CustomerPrismaRepository,
        },
    ],
    exports: [CustomerService],
})
export class CustomerModule { }
