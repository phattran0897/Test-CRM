import { CustomerService } from './customer.service';
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    findAll(req: any, page: string, limit: string, search: string): Promise<{
        data: import("./entities/customer.entity").CustomerEntity[];
        total: number;
    }>;
    findOne(req: any, id: string): Promise<import("./entities/customer.entity").CustomerEntity>;
    create(req: any, body: any): Promise<import("./entities/customer.entity").CustomerEntity>;
    update(req: any, id: string, body: any): Promise<import("./entities/customer.entity").CustomerEntity>;
    remove(req: any, id: string): Promise<void>;
}
