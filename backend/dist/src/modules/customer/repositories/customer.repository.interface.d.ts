import { CustomerEntity } from '../entities/customer.entity';
export declare const I_CUSTOMER_REPOSITORY = "ICustomerRepository";
export interface ICustomerRepository {
    findAll(tenantId: string, skip: number, take: number, search?: string): Promise<{
        data: CustomerEntity[];
        total: number;
    }>;
    findById(tenantId: string, id: string): Promise<CustomerEntity | null>;
    create(data: Omit<CustomerEntity, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>): Promise<CustomerEntity>;
    update(tenantId: string, id: string, data: Partial<CustomerEntity>): Promise<CustomerEntity>;
    softDelete(tenantId: string, id: string): Promise<void>;
}
